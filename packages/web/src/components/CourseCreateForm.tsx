import React from "react"
import gql from "graphql-tag"
import { Button, Stack, useToast, Flex } from "@chakra-ui/core"

import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import { FormError } from "./FormError"
import {
  CourseItemFragmentDoc,
  useCreateCourseMutation,
  GetAllCoursesDocument,
} from "../lib/graphql"
import { Textarea } from "./Textarea"
import { Select } from "./Select"
import { rewardTypes } from "../lib/rewards"
import { EditorInput } from "./EditorInput"

export const CREATE_COURSE = gql`
  mutation CreateCourse($data: CreateCourseInput!) {
    createCourse(data: $data) {
      ...CourseItem
    }
  }
  ${CourseItemFragmentDoc}
`

const CourseSchema = Yup.object().shape({
  category: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  fullDescription: Yup.string().required("Required"),
  rewardType: Yup.string().required("Required"),
  benefits: Yup.string().required("Required"),
})
interface Props {
  onClose: () => void
  mentorId: string
}
export const CourseCreateForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    validationSchema: CourseSchema,
  })

  const [createCourse] = useCreateCourseMutation({
    refetchQueries: [{ query: GetAllCoursesDocument }],
  })

  const handleSubmit = async (data: {
    name: string
    category: string
    description: string
    fullDescription: string
    rewardType: string
    benefits: string
  }) => {
    const duration = 5
    const res = await createCourse({
      variables: { data: { ...data, duration, mentorId: props.mentorId } },
    })

    return form.handler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Success!",
          description: "Edit additional information in the course page",
        })
        props.onClose()
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit} {...form}>
      <Stack spacing={4} shouldWrapChildren>
        <Input
          name="name"
          label="Title"
          isRequired={true}
          placeholder="Wake up early"
        />
        <Input
          name="description"
          label="Short description"
          isRequired={true}
          placeholder="A challenge to wake up earlier"
        />
        <Input
          name="category"
          label="Category"
          isRequired={true}
          placeholder="Health"
        />
        <Textarea
          name="benefits"
          label="Benefits"
          isRequired={true}
          placeholder="Learn to implement the healthy habit of waking up earlier and experience an increase of well-being."
        />
        <EditorInput name="fullDescription" label="Full description" />
        <Select label="Reward" name="rewardType" options={rewardTypes} />

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
