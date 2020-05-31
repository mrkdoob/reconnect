import React from "react"
import {
  Flex,
  useDisclosure,
  Image,
  IconButton,
  Stack,
  useToast,
} from "@chakra-ui/core"
import {
  MessageFragment,
  GetAdminCourseMessagesDocument,
  useDestroyMessageMutation,
  useUpdateMessageMutation,
} from "../lib/graphql"
import gql from "graphql-tag.macro"
import { Modal } from "./Modal"
import { Markup } from "interweave"
import { mutationHandler } from "../lib/mutationHandler"
import { Confirmation } from "./Confirmation"
import { ImageCreate } from "./ImageCreate"
import { AdminCourseMessageEditForm } from "./AdminCourseMessageEditForm"

export const Message = gql`
  fragment Message on Message {
    id
    message
    order
    pictureUrl
    videoUrl
    fullHeightPic
    courseId
  }
`

export const DESTROY_MESSAGE = gql`
  mutation DestroyMessage($messageId: String!) {
    destroyMessage(messageId: $messageId)
  }
`

interface Props {
  message: MessageFragment
}

export function AdminCourseMessageItem(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [destroyMessage] = useDestroyMessageMutation({
    refetchQueries: [
      {
        query: GetAdminCourseMessagesDocument,
        variables: { courseId: props.message.courseId },
      },
    ],
  })
  const toast = useToast()

  const handleDestroy = async () => {
    const res = await destroyMessage({
      variables: {
        messageId: props.message.id,
      },
    })
    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Successfully deleted!",
        })
        onClose()
      },
    })
  }

  return (
    <>
      <Flex w="100%" justify="space-between" align="center">
        <Flex direction="column" align="center">
          <Flex position="relative" justify="align">
            <Image
              src={props.message.pictureUrl || ""}
              rounded="lg"
              size="75px"
              objectFit="cover"
            />
            )}
            <MessageImageModal message={props.message} />
          </Flex>
        </Flex>

        <Flex fontSize="xs" align="center">
          <Markup content={props.message?.message} />
        </Flex>
        <Stack spacing={4} isInline>
          <IconButton aria-label="Edit reward" icon="edit" onClick={onOpen} />
          <Confirmation onSubmit={handleDestroy}>
            <IconButton
              aria-label="Delete message"
              variantColor="red"
              icon="delete"
            />
          </Confirmation>
        </Stack>
      </Flex>
      <Modal size="full" title="Edit reward" isOpen={isOpen} onClose={onClose}>
        <AdminCourseMessageEditForm onClose={onClose} message={props.message} />
      </Modal>
    </>
  )
}

interface ImageProps {
  message: MessageFragment
}

export function MessageImageModal(props: ImageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [updateMessage] = useUpdateMessageMutation({
    refetchQueries: [
      {
        query: GetAdminCourseMessagesDocument,
        variables: { courseId: props.message.courseId },
      },
    ],
  })

  const handleSubmit = async (url: string) => {
    const res = await updateMessage({
      variables: {
        messageId: props.message.id,
        data: { pictureUrl: url },
      },
    })

    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Updated!",
        })
        onClose()
      },
    })
  }

  return (
    <>
      {!isOpen && (
        <IconButton
          position="absolute"
          right="0"
          bottom="0"
          aria-label="Edit message"
          icon="edit"
          onClick={onOpen}
          variantColor="blue"
        />
      )}

      <Modal title="Upload image" onClose={onClose} isOpen={isOpen}>
        <ImageCreate onClose={onClose} handleUpload={handleSubmit} />
      </Modal>
    </>
  )
}
