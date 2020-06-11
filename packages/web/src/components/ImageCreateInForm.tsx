import React from "react"
import { Box } from "@chakra-ui/core"
import { useDropzone } from "react-dropzone"
import { PreviewImage } from "./ImageCreate"

interface Props {
  images: File[]
  setImages: (image: File[]) => void
}

export const ImageCreateInForm: React.FC<Props> = props => {
  const onDrop = React.useCallback((newImages: File[]) => {
    props.setImages([...newImages])
  }, [props])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

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
        {props.images?.length > 0 && (
          <PreviewImage
            src={URL.createObjectURL(props.images[0])}
            onRemove={() => props.setImages([])}
          />
        )}
      </Box>
    </Box>
  )
}
