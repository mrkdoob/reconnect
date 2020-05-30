import React from "react"
import { Button, Stack, useToast, Flex } from "@chakra-ui/core"
import {
  UpdateCourseInput,
  OptionItemFragmentDoc,
  UpdateOptionInput,
  OptionItemFragment,
  useUpdateOptionMutation,
  useDestroyOptionMutation,
  useDestroyLevelTaskOptionMutation,
  GetLevelTasksDocument,
} from "../lib/graphql"
import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import { FormError } from "./FormError"
import { Textarea } from "./Textarea"
import gql from "graphql-tag.macro"
import { mutationHandler } from "../lib/mutationHandler"
import { DeleteItem } from "./DeleteItem"

export const OPTION_ITEM = gql`
  fragment OptionItem on Option {
    id
    label
    description
    fullDescription
    videoUrl
    createdByAdmin
  }
`

export const DESTROY_OPTION = gql`
  mutation DestroyOption($optionId: String!) {
    destroyOption(optionId: $optionId)
  }
`

export const DESTROY_LEVELTASK_OPTION = gql`
  mutation DestroyLevelTaskOption($levelTaskOptionId: String!) {
    destroyLevelTaskOption(levelTaskOptionId: $levelTaskOptionId)
  }
`

export const UPDATE_OPTION = gql`
  mutation UpdateOption($optionId: String!, $data: UpdateOptionInput!) {
    updateOption(optionId: $optionId, data: $data) {
      ...OptionItem
    }
  }
  ${OptionItemFragmentDoc}
`

const OptionSchema = Yup.object().shape<UpdateOptionInput>({
  label: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  fullDescription: Yup.string().required("Required"),
  videoUrl: Yup.string(),
})
interface Props {
  onClose: () => void
  option: OptionItemFragment
  levelTaskOptionId: string
  levelId?: string | null
  destroyOption?: boolean
}
export const CourseLevelTaskOptionEditForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    defaultValues: {
      label: props.option.label,
      description: props.option.description,
      fullDescription: props.option.fullDescription,
      videoUrl: props.option.videoUrl,
    },
    validationSchema: OptionSchema,
  })

  const [updateOption] = useUpdateOptionMutation()
  const [destroyOption] = useDestroyOptionMutation()
  const [destroyLevelTaskOption] = useDestroyLevelTaskOptionMutation({
    refetchQueries: [
      { query: GetLevelTasksDocument, variables: { levelId: props.levelId } },
    ],
  })

  const handleDestroy = async () => {
    const res = await destroyLevelTaskOption({
      variables: { levelTaskOptionId: props.levelTaskOptionId },
    })

    mutationHandler(res, {
      onSuccess: async () => {
        destroyOption &&
          (await destroyOption({
            variables: {
              optionId: props.option.id,
            },
          }))
        toast({
          status: "success",
          description: "Successfully deleted!",
        })
        props.onClose()
      },
    })
  }

  const handleSubmit = async (values: UpdateCourseInput) => {
    const res = await updateOption({
      variables: { optionId: props.option.id, data: values },
    })

    return form.handler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Success!",
        })
        props.onClose()
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit} {...form}>
      <Stack spacing={4} shouldWrapChildren>
        <Input name="label" label="Label" isRequired={true} />
        <Input name="description" label="Title" isRequired={true} />
        <Textarea
          name="fullDescription"
          label="Description"
          isRequired={true}
        />
        <Input name="videoUrl" label="YouTube embed link" />

        <DeleteItem handleDestroy={handleDestroy} text="this option" />

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
