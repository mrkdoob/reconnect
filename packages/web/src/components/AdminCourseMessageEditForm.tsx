import React from "react"
import gql from "graphql-tag"
import { Button, Stack, useToast, Flex } from "@chakra-ui/core"

import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import { FormError } from "./FormError"
import {
  MessageFragmentDoc,
  useUpdateMessageMutation,
  MessageFragment,
  UpdateMessageInput,
  GetAdminCourseMessagesDocument,
} from "../lib/graphql"
import { Textarea } from "./Textarea"
import { Checkbox } from "./Checkbox"

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($messageId: String!, $data: UpdateMessageInput!) {
    updateMessage(messageId: $messageId, data: $data) {
      ...Message
    }
  }
  ${MessageFragmentDoc}
`

export const MessageSchema = Yup.object().shape<UpdateMessageInput>({
  order: Yup.number()
    .typeError("Must be a number")
    .required("Required"),
  message: Yup.string().required("Required"),
  pictureUrl: Yup.string(),
  videoUrl: Yup.string(),
  fullHeightPic: Yup.boolean(),
})
interface Props {
  onClose: () => void
  message: MessageFragment
}
export const AdminCourseMessageEditForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    defaultValues: {
      order: props.message.order,
      message: props.message.message,
      pictureUrl: props.message.pictureUrl,
      videoUrl: props.message.videoUrl,
      fullHeightPic: props.message.fullHeightPic,
      courseId: props.message.courseId,
    },
    validationSchema: MessageSchema,
  })

  const [updateMessage] = useUpdateMessageMutation({
    refetchQueries: [
      {
        query: GetAdminCourseMessagesDocument,
        variables: { courseId: props.message.courseId },
      },
    ],
  })

  const handleSubmit = async (values: UpdateMessageInput) => {
    const res = await updateMessage({
      variables: {
        messageId: props.message.id,
        data: { ...values },
      },
    })

    return form.handler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Updated!",
        })
        props.onClose()
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit} {...form}>
      <Stack spacing={4} shouldWrapChildren>
        <Input name="order" label="Order" />
        <Textarea
          name="message"
          label="Message"
          isRequired={true}
          placeholder="Isha is providing meals and PPE."
        />
        <Input name="videoUrl" label="YouTube embed url" />
        <Input name="pictureUrl" label="External picture url" />
        <Checkbox name="fullHeightPic" label="Show picture with more height?" />

        <Flex justify="flex-end">
          <Button
            variantColor="blue"
            variant="link"
            loadingText="loading"
            onClick={() => props.onClose()}
            mr={8}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variantColor="blue"
            isLoading={form.formState.isSubmitting}
          >
            Update
          </Button>
        </Flex>
        <FormError />
      </Stack>
    </Form>
  )
}
