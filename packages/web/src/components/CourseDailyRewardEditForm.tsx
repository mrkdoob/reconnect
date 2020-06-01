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
  GetCourseRewardsDocument,
  UpdateCourseDayRewardInput,
  useUpdateCourseDayRewardMutation,
  CourseDayRewardFragment,
} from "../lib/graphql"
import { EditorInput } from "./EditorInput"

export const UPDATE_COURSE_DAYREWARD = gql`
  mutation UpdateCourseDayReward(
    $courseDayRewardId: String!
    $data: UpdateCourseDayRewardInput!
  ) {
    updateCourseDayReward(courseDayRewardId: $courseDayRewardId, data: $data) {
      ...CourseDayReward
    }
  }
  ${CourseDayRewardFragmentDoc}
`

const DayRewardSchema = Yup.object().shape<UpdateCourseDayRewardInput>({
  order: Yup.number().typeError("Must be a number"),
  description: Yup.string().required("Required"),
  videoUrl: Yup.string(),
  pictureUrl: Yup.string(),
})
interface Props {
  onClose: () => void
  reward: CourseDayRewardFragment
}
export const CourseDailyRewardEditForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    defaultValues: {
      order: props.reward.order,
      description: props.reward.description,
      videoUrl: props.reward.videoUrl,
      pictureUrl: props.reward.pictureUrl,
    },
    validationSchema: DayRewardSchema,
  })

  const [updateReward] = useUpdateCourseDayRewardMutation({
    refetchQueries: [
      {
        query: GetCourseRewardsDocument,
        variables: { courseId: props.reward.courseId },
      },
    ],
  })

  const handleSubmit = async (values: UpdateCourseDayRewardInput) => {
    const res = await updateReward({
      variables: {
        courseDayRewardId: props.reward.id,
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
            Update
          </Button>
        </Flex>
        <FormError />
      </Stack>
    </Form>
  )
}
