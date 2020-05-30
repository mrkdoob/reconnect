import React from "react"
import gql from "graphql-tag"
import { Button, Stack, useToast, Flex } from "@chakra-ui/core"

import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import { FormError } from "./FormError"
import {
  LevelTaskOptionItemFragmentDoc,
  CreateOptionInput,
  useCreateOptionMutation,
  GetLevelTasksDocument,
  useCreateLevelTaskOptionMutation,
} from "../lib/graphql"
import { Textarea } from "./Textarea"

export const CREATE_LEVEL_TASK_OPTION = gql`
  mutation CreateLevelTaskOption($data: CreateLevelTaskOptionInput!) {
    createLevelTaskOption(data: $data) {
      ...LevelTaskOptionItem
    }
  }
  ${LevelTaskOptionItemFragmentDoc}
`

export const CREATE_OPTION = gql`
  mutation CreateOption($data: CreateOptionInput!) {
    createOption(data: $data) {
      id
      label
      description
      fullDescription
      videoUrl
    }
  }
`

export const OptionSchema = Yup.object().shape<CreateOptionInput>({
  label: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  fullDescription: Yup.string().required("Required"),
  videoUrl: Yup.string(),
})
interface Props {
  onClose: () => void
  onCancel?: () => void
  levelId?: string | null
  levelTaskId: string
  order?: number
}
export const CourseLevelTaskCreateForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    validationSchema: OptionSchema,
  })

  const [createOption] = useCreateOptionMutation({
    refetchQueries: [
      { query: GetLevelTasksDocument, variables: { levelId: props.levelId } },
    ],
  })

  const [createTaskOption] = useCreateLevelTaskOptionMutation()

  const handleSubmit = async (values: CreateOptionInput) => {
    // TODO: Check if url is embed url
    // const YouTubeUrl = values.videoUrl?.includes("embed") ? values.videoUrl :
    const res = await createOption({
      variables: { data: values },
    })

    return form.handler(res, {
      onSuccess: async res => {
        await createTaskOption({
          variables: {
            data: {
              optionId: res.createOption.id,
              levelTaskId: props.levelTaskId,
              order: props.order ? props.order : 1,
            },
          },
        }).then(() => {
          toast({
            status: "success",
            title: "Created!",
            duration: 3000,
          })
        })
        props.onClose()
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit} {...form}>
      <Stack spacing={4} shouldWrapChildren>
        <Input name="description" label="Title" isRequired={true} />
        <Input
          name="label"
          label="Label"
          isRequired={true}
          placeholder="Meditation"
        />
        <Textarea
          name="fullDescription"
          label="Description"
          isRequired={true}
          placeholder="Do 10 pushups"
        />
        <Input
          name="videoUrl"
          label="YouTube embed link"
          placeholder="https://www.youtube.com/embed/y8sXeRNCh2k"
        />

        <Flex justify="flex-end">
          <Button
            variantColor="blue"
            variant="link"
            loadingText="loading"
            onClick={() => {
              props.onCancel ? props.onCancel() : props.onClose()
            }}
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
