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
  CreateMessageInput,
  useCreateMessageMutation,
  GetAdminCourseMessagesDocument,
} from "../lib/graphql"
import { Textarea } from "./Textarea"
import { Checkbox } from "./Checkbox"

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($data: CreateMessageInput!) {
    createMessage(data: $data) {
      ...Message
    }
  }
  ${MessageFragmentDoc}
`

const MessageSchema = Yup.object().shape<CreateMessageInput>({
  order: Yup.number(),
  message: Yup.string().required("Required"),
  pictureUrl: Yup.string(),
  videoUrl: Yup.string(),
  fullHeightPic: Yup.boolean(),
  courseId: Yup.string(),
})
interface Props {
  onClose: () => void
  courseId: string
  order: number
}
export const AdminCourseMessageCreateForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    validationSchema: MessageSchema,
  })

  const [createMessage] = useCreateMessageMutation({
    refetchQueries: [
      {
        query: GetAdminCourseMessagesDocument,
        variables: { courseId: props.courseId },
      },
    ],
  })

  const handleSubmit = async (values: CreateMessageInput) => {
    const res = await createMessage({
      variables: {
        data: { ...values, order: props.order, courseId: props.courseId },
      },
    })
    return form.handler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Message added!",
        })
        props.onClose()
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit} {...form}>
      <Stack spacing={4} shouldWrapChildren>
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
            Create
          </Button>
        </Flex>
        <FormError />
      </Stack>
    </Form>
  )
}
