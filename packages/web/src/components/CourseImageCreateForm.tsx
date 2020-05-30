import React from "react"
import { Button, Box, Image, IconButton, Flex } from "@chakra-ui/core"
import { useDropzone } from "react-dropzone"
import gql from "graphql-tag.macro"
import {
  useGetSignedUrlMutation,
  CourseItemFragmentDoc,
  GetCourseDocument,
  useUpdateCourseMutation,
  useUpdateLevelMutation,
} from "../lib/graphql"
import { formatFileName } from "../lib/helpers"
import { useToast } from "../lib/hooks/useToast"
import { useOpen } from "../lib/hooks/useOpen"

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: String!, $data: UpdateCourseInput!) {
    updateCourse(id: $id, data: $data) {
      ...CourseItem
    }
  }
  ${CourseItemFragmentDoc}
`

interface Props {
  onClose?: () => void
  courseId?: string
  levelId?: string
}

// TODO: Create generic component to use amzn upload for NewCover and NewAvatar

export const CourseImageCreateForm: React.FC<Props> = props => {
  const [images, setImages] = React.useState<File[]>([])
  const [loading, setLoading, setStopLoading] = useOpen()
  const [getSigned] = useGetSignedUrlMutation()

  // TODO: Move one level down and give mutation in function as prop?
  const [updateCourse] = useUpdateCourseMutation({
    refetchQueries: [{ query: GetCourseDocument }],
  })

  // TODO: Move one level down and give mutation in function as prop?
  const [updateLevel] = useUpdateLevelMutation({
    refetchQueries: [{ query: GetCourseDocument }],
  })

  const toast = useToast()

  const onDrop = React.useCallback((newImages: File[]) => {
    setImages([...newImages])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  const handleSubmit = async () => {
    try {
      setLoading()
      if (images.length === 0) return
      const imageKey = ``
      const imageData = {
        image: images[0],
        fileType: images[0].type,
        key: imageKey + formatFileName(images[0].name),
      }
      const key = imageKey + formatFileName(images[0].name)
      // GET SIGNED URLS
      const res = await getSigned({
        variables: {
          data: {
            key,
            fileType: images[0].type,
          },
        },
      })

      // UPLOAD TO S3
      if (!res.data?.getSignedS3Url) return
      try {
        const signedRequest = res.data.getSignedS3Url
        await fetch(signedRequest, {
          method: "PUT",
          headers: {
            "Content-Type": images[0].type,
          },
          body: images[0],
        }).catch(() => {
          // TODO: network error
        })
      } catch (error) {
        console.log(error)
      }

      const amzUrl = "https://reconnectapp-dev.s3.eu-central-1.amazonaws.com/"

      if (props.courseId)
        await updateCourse({
          variables: {
            id: props.courseId,
            data: {
              cover: amzUrl + imageData.key,
            },
          },
        }).then(() => {
          props.onClose && props.onClose()
        })

      if (props.levelId)
        await updateLevel({
          variables: {
            levelId: props.levelId,
            data: {
              cover: amzUrl + imageData.key,
            },
          },
        }).then(() => {
          props.onClose && props.onClose()
        })

      setStopLoading()
    } catch (error) {
      setStopLoading()
      toast({ status: "error", description: "Error uploading images" })
    }
  }
  return (
    <Box>
      <Box p={2}>
        <Box
          {...getRootProps()}
          textAlign="center"
          cursor="pointer"
          p={2}
          mb={4}
          border="2px dashed"
          borderColor="gray.200"
        >
          <input {...getInputProps()} />
          Drag or click here to upload image
        </Box>
        {images?.length > 0 && (
          <PreviewImage
            src={URL.createObjectURL(images[0])}
            loading={loading}
            onRemove={() => setImages([])}
            width="300px"
          />
        )}
      </Box>
      <Flex p={4} justify="flex-end">
        <Button
          variant="ghost"
          onClick={props.onClose}
          isDisabled={loading}
          mr={8}
        >
          Cancel
        </Button>
        <Button
          variantColor="blue"
          onClick={handleSubmit}
          isDisabled={loading}
          isLoading={loading}
        >
          Submit
        </Button>
      </Flex>
    </Box>
  )
}

interface PreviewImageProps {
  src: string
  onRemove: () => void
  loading: boolean
  width?: string
}
export function PreviewImage(props: PreviewImageProps) {
  return (
    <Box
      pos="relative"
      size="150px"
      w={props.width || "150px"}
      h="150px"
      m="0 auto"
    >
      <IconButton
        pos="absolute"
        top={0}
        size="sm"
        isLoading={props.loading}
        isDisabled={props.loading}
        right={0}
        icon="delete"
        variantColor="red"
        aria-label="Remove image"
        onClick={props.onRemove}
      />
      <Image src={props.src} rounded="lg" objectFit="cover" w="100%" h="100%" />
    </Box>
  )
}
