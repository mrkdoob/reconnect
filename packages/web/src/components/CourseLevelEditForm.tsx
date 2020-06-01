import React from "react"
import gql from "graphql-tag"
import { Button, Stack, useToast, Flex } from "@chakra-ui/core"

import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import { FormError } from "./FormError"
import {
  CreateLevelInput,
  CourseLevelFragmentDoc,
  GetCourseDocument,
  useUpdateLevelMutation,
  CourseLevelFragment,
  useDestroyLevelMutation,
} from "../lib/graphql"
import { Textarea } from "./Textarea"
import { Checkbox } from "./Checkbox"
import { LevelSchema } from "./CourseLevelCreateForm"
import { mutationHandler } from "../lib/mutationHandler"
import { DeleteItem } from "./DeleteItem"
import { EditorInput } from "./EditorInput"

export const UPDATE_LEVEL = gql`
  mutation UpdateLevel($levelId: String!, $data: UpdateLevelInput!) {
    updateLevel(levelId: $levelId, data: $data) {
      ...CourseLevel
    }
  }
  ${CourseLevelFragmentDoc}
`

export const DESTROY_LEVEL = gql`
  mutation DestroyLevel($levelId: String!) {
    destroyLevel(levelId: $levelId)
  }
`

interface Props {
  onClose: () => void
  level: CourseLevelFragment
}
export const CourseLevelEditForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    defaultValues: {
      levelNumber: props.level.levelNumber,
      maxProgressDays: props.level.maxProgressDays,
      title: props.level.title,
      rewardText: props.level.rewardText,
      rewardDescription: props.level.rewardDescription,
      videoUrl: props.level.videoUrl,
      rewardUrl: props.level.rewardUrl,
      courseId: props.level.courseId,
      isLast: props.level.isLast,
    },
    validationSchema: LevelSchema,
  })

  const [updateLevel] = useUpdateLevelMutation({
    refetchQueries: [
      { query: GetCourseDocument, variables: { slug: props.level.courseId } },
    ],
  })

  const [destroyLevel] = useDestroyLevelMutation({
    refetchQueries: [
      { query: GetCourseDocument, variables: { slug: props.level.courseId } },
    ],
  })

  const handleDestroy = async () => {
    const res = await destroyLevel({
      variables: {
        levelId: props.level.id,
      },
    })
    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Successfully deleted!",
        })

        props.onClose()
      },
    })
  }

  const handleSubmit = async (values: CreateLevelInput) => {
    // TODO: Check if url is embed url
    // const YouTubeUrl = values.videoUrl?.includes("embed") ? values.videoUrl :
    const res = await updateLevel({
      variables: { levelId: props.level.id, data: { ...values } },
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
        />
        <Input name="title" label="Title" isRequired={true} />
        <EditorInput
          name="rewardText"
          label="Lesson content"
          isRequired={true}
        />
        <Textarea
          name="rewardDescription"
          label="Reward text displayed when reaching this level"
          isRequired={true}
        />
        <Input name="videoUrl" label="YouTube embed link" />
        <Input
          name="rewardUrl"
          label="Link of picture or GIF to show @ level up"
        />
        <Checkbox name="isLast" label="Is last level?" />

        <DeleteItem handleDestroy={handleDestroy} text="this level" />
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
            Save
          </Button>
        </Flex>
        <FormError />
      </Stack>
    </Form>
  )
}
