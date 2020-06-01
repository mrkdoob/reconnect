import React from "react"
import gql from "graphql-tag"
import { Button, Stack, useToast, Flex } from "@chakra-ui/core"

import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import { FormError } from "./FormError"
import {
  CreateLevelInput,
  CourseLevelFragmentDoc,
  useCreateLevelMutation,
  GetCourseDocument,
} from "../lib/graphql"
import { Textarea } from "./Textarea"
import { Checkbox } from "./Checkbox"
import { EditorInput } from "./EditorInput"

export const CREATE_LEVEL = gql`
  mutation CreateLevel($data: CreateLevelInput!) {
    createLevel(data: $data) {
      ...CourseLevel
    }
  }
  ${CourseLevelFragmentDoc}
`

export const LevelSchema = Yup.object().shape<CreateLevelInput>({
  levelNumber: Yup.number()
    .required("Required")
    .typeError("Must be a number"),
  maxProgressDays: Yup.number()
    .required("Required")
    .typeError("Must be a number"),
  title: Yup.string().required("Required"),
  rewardText: Yup.string().required("Required"),
  rewardDescription: Yup.string().required("Required"),
  videoUrl: Yup.string(),
  rewardUrl: Yup.string(),
  courseId: Yup.string(),
  isLast: Yup.boolean(),
})
interface Props {
  onClose: () => void
  courseId: string
}
export const CourseLevelCreateForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    defaultValues: { courseId: props.courseId },
    validationSchema: LevelSchema,
  })

  const [createLevel] = useCreateLevelMutation({
    refetchQueries: [
      { query: GetCourseDocument, variables: { slug: props.courseId } },
    ],
  })

  const handleSubmit = async (values: CreateLevelInput) => {
    // TODO: Check if url is embed url
    // const YouTubeUrl = values.videoUrl?.includes("embed") ? values.videoUrl :
    const res = await createLevel({
      variables: { data: { ...values, courseId: props.courseId } },
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
        <Input name="levelNumber" label="Level number" isRequired={true} />
        <Input
          name="maxProgressDays"
          label="Duration in days"
          isRequired={true}
          placeholder="5"
        />
        <Input
          name="title"
          label="Title"
          isRequired={true}
          placeholder="Introduction"
        />
        <EditorInput
          name="rewardText"
          label="Lesson content"
          isRequired={true}
        />
        <Textarea
          name="rewardDescription"
          label="Reward text displayed when reaching this level"
          isRequired={true}
          placeholder="Good job on reaching level 2!"
        />
        <Input
          name="videoUrl"
          label="YouTube embed link"
          placeholder="https://www.youtube.com/embed/y8sXeRNCh2k"
        />
        <Input
          name="rewardUrl"
          label="Link of picture or GIF to show @ level up"
          placeholder="https://www.gify.comm/lela"
        />
        <Checkbox name="isLast" label="Is last level?" />

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
