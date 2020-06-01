import React from "react"
import gql from "graphql-tag"
import { Button, Stack, useToast, Flex } from "@chakra-ui/core"

import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import { FormError } from "./FormError"
import {
  CourseDayRewardFragmentDoc,
  useCreateCourseDayRewardMutation,
  GetCourseRewardsDocument,
  CreateCourseDayRewardInput,
} from "../lib/graphql"
import { EditorInput } from "./EditorInput"

export const CREATE_COURSE_DAYREWARD = gql`
  mutation CreateCourseDayReward($data: CreateCourseDayRewardInput!) {
    createCourseDayReward(data: $data) {
      ...CourseDayReward
    }
  }
  ${CourseDayRewardFragmentDoc}
`

const DayRewardSchema = Yup.object().shape<CreateCourseDayRewardInput>({
  order: Yup.number(),
  description: Yup.string().required("Required"),
  videoUrl: Yup.string(),
  pictureUrl: Yup.string(),
  courseId: Yup.string(),
})
interface Props {
  onClose: () => void
  courseId: string
  order: number
}
export const CourseDailyRewardCreateForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    validationSchema: DayRewardSchema,
  })

  const [createReward] = useCreateCourseDayRewardMutation({
    refetchQueries: [
      {
        query: GetCourseRewardsDocument,
        variables: { courseId: props.courseId },
      },
    ],
  })

  const handleSubmit = async (values: CreateCourseDayRewardInput) => {
    const res = await createReward({
      variables: {
        data: { ...values, order: props.order, courseId: props.courseId },
      },
    })

    return form.handler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Reward added!",
        })
        props.onClose()
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit} {...form}>
      <Stack spacing={4} shouldWrapChildren>
        <EditorInput name="description" label="Description" />
        <Input name="videoUrl" label="YouTube embed url" />
        <Input name="pictureUrl" label="External picture url" />

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
