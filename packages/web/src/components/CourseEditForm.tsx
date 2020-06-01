import React from "react"
import { Button, Stack, useToast, Flex } from "@chakra-ui/core"
import {
  useUpdateCourseMutation,
  UpdateCourseInput,
  CourseItemFragment,
  useDestroyCourseMutation,
} from "../lib/graphql"
import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import { FormError } from "./FormError"
import { Textarea } from "./Textarea"
import { Select } from "./Select"
import { rewardTypes } from "../lib/rewards"
import { navigate } from "@reach/router"
import gql from "graphql-tag.macro"
import { mutationHandler } from "../lib/mutationHandler"
import { DeleteItem } from "./DeleteItem"
import { EditorInput } from "./EditorInput"

export const DESTROY_COURSE = gql`
  mutation DestroyCourse($id: String!) {
    destroyCourse(id: $id)
  }
`

const CourseSchema = Yup.object().shape<UpdateCourseInput>({
  category: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  fullDescription: Yup.string().required("Required"),
  rewardType: Yup.string().required("Required"),
  benefits: Yup.string().required("Required"),
})
interface Props {
  onClose: () => void
  course: CourseItemFragment
}
export const CourseEditForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    defaultValues: {
      category: props.course.category,
      name: props.course.name,
      description: props.course.description,
      fullDescription: props.course.fullDescription,
      rewardType: props.course.rewardType,
      benefits: props.course.benefits,
    },
    validationSchema: CourseSchema,
  })

  const [updateCourse] = useUpdateCourseMutation()
  const [destroyCourse] = useDestroyCourseMutation()

  const handleDestroy = async () => {
    const res = await destroyCourse({
      variables: {
        id: props.course.id,
      },
    })
    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Successfully deleted!",
        })
        props.onClose()
        navigate("/courses")
      },
    })
  }

  const handleSubmit = async (values: UpdateCourseInput) => {
    const res = await updateCourse({
      variables: { id: props.course.id, data: values },
    })

    return form.handler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Success!",
        })
        props.onClose()
        const url: string = res?.data?.updateCourse
          ? "/courses/" + res.data.updateCourse.slug
          : "/courses/"
        navigate(url)
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit} {...form}>
      <Stack spacing={4} shouldWrapChildren>
        <Input name="name" label="Title" isRequired={true} />
        <Input name="description" label="Short description" isRequired={true} />
        <Input name="category" label="Category" isRequired={true} />
        <Textarea name="benefits" label="Benefits" isRequired={true} />
        <EditorInput name="fullDescription" label="Full description" />
        <Select label="Reward" name="rewardType" options={rewardTypes} />
        <DeleteItem handleDestroy={handleDestroy} text="this course" />

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
