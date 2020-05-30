import React from "react"
import { Text, Button, Flex, useToast } from "@chakra-ui/core"
import {
  useUpdateUserTaskMutation,
  UserTaskItemFragment,
  useDestroyUserTaskMutation,
  MyDashboardDocument,
} from "../lib/graphql"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import Yup from "../lib/yup"
import { Textarea } from "./Textarea"
import gql from "graphql-tag.macro"
import { mutationHandler } from "../lib/mutationHandler"

export const DESTROY_USERTASK = gql`
  mutation DestroyUserTask($taskId: String!) {
    destroyUserTask(taskId: $taskId)
  }
`

const UserTaskSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
  fullDescription: Yup.string().required("Required"),
})

interface TaskProps {
  userTask: UserTaskItemFragment
  onClose: () => void
}

export function SelfCreatedTaskItemForm({ userTask, onClose }: TaskProps) {
  const [updateTask] = useUpdateUserTaskMutation()
  const [destroyTask] = useDestroyUserTaskMutation({
    refetchQueries: [{ query: MyDashboardDocument }],
  })

  const toast = useToast()
  const form = useForm({
    defaultValues: {
      description: userTask.description,
      fullDescription: userTask.fullDescription,
    },
    validationSchema: UserTaskSchema,
  })

  const handleSubmit = async (data: {
    description: string
    fullDescription: string
  }) => {
    const res = await updateTask({
      variables: {
        taskId: userTask.id,
        data: {
          description: data.description,
          fullDescription: data.fullDescription,
        },
      },
    })
    return form.handler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Good luck with your practice!",
        })
        onClose()
      },
    })
  }

  const handleDestroy = async () => {
    const res = await destroyTask({
      variables: {
        taskId: userTask.id,
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
    <Form onSubmit={handleSubmit} {...form}>
      <Input name="description" label="Title" />
      <Textarea name="fullDescription" label="Discription" />
      <Flex fontSize="sm" mt={8} align="center">
        <Text>Or</Text>
        <Button
          w="fit-content"
          ml={2}
          size="sm"
          mt="1px"
          leftIcon="delete"
          variant="ghost"
          variantColor="red"
          onClick={handleDestroy}
        >
          delete
        </Button>
        <Text>this practice</Text>
      </Flex>

      <Flex justify="flex-end" mt={8}>
        <Button w="fit-content" mr={4} onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button variantColor="blue" w="fit-content" type="submit">
          Save
        </Button>
      </Flex>
    </Form>
  )
}
