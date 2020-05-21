import React from "react"
import gql from "graphql-tag"
import { Button, Stack, useToast, Text, Flex } from "@chakra-ui/core"

import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import { FormError } from "./FormError"
import { useCreateCustomUserTaskMutation } from "../lib/graphql"

// TODO: Fragment
export const CREATE_USER_TASK = gql`
  mutation CreateCustomUserTask($data: CreateCustomUserTaskInput!) {
    createCustomUserTask(data: $data) {
      id
      description
      fullDescription
    }
  }
`

const UserTaskSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
  fullDescription: Yup.string().required("Required"),
})
interface Props {
  onClose: () => void
}
export const LevelRewardItemForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    defaultValues: { password: "" },
    validationSchema: UserTaskSchema,
  })

  const [createUserTask] = useCreateCustomUserTaskMutation()

  const handleSubmit = async (data: {
    description: string
    fullDescription: string
  }) => {
    const res = await createUserTask({ variables: { data } })

    return form.handler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Good luck with your practice!",
        })
        props.onClose()
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit} {...form}>
      <Stack spacing={4} shouldWrapChildren>
        <Text>Spice things up by adding something to your daily practice</Text>
        <Input
          name="description"
          label="Title"
          isRequired={true}
          placeholder="Become a little bit better"
        />
        <Input
          name="fullDescription"
          label="Description"
          isRequired={true}
          placeholder="Conciously breathe in and out for 10 minutes"
        />
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
