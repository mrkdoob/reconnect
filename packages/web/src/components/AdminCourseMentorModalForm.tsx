import React from "react"
import { Button, Stack, useToast, Flex, useDisclosure } from "@chakra-ui/core"

import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { FormError } from "./FormError"
import {
  useUpdateSettingsMutation,
  UpdateInput,
  MentorItemFragment,
} from "../lib/graphql"
import { Textarea } from "./Textarea"
import { Modal } from "./Modal"

interface ModalProps {
  mentor: MentorItemFragment
}

export const AdminCourseMentorModalForm = ({ mentor }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex w="100%" justify="flex-end">
      <Button
        variantColor="blue"
        aria-label="Create level"
        leftIcon="edit"
        onClick={onOpen}
        mb={4}
      >
        Edit
      </Button>
      <Modal size="xl" title="Edit bio" isOpen={isOpen} onClose={onClose}>
        <AdminCourseMentorForm onClose={onClose} mentor={mentor} />
      </Modal>
    </Flex>
  )
}

export const MentorSchema = Yup.object().shape<UpdateInput>({
  bio: Yup.string().required("Required"),
})
interface Props {
  onClose: () => void
  mentor: MentorItemFragment
}
const AdminCourseMentorForm: React.FC<Props> = props => {
  const toast = useToast()

  const form = useForm({
    defaultValues: {
      bio: props.mentor.bio,
    },
    validationSchema: MentorSchema,
  })

  const [updateSettings] = useUpdateSettingsMutation()

  const handleSubmit = async (values: UpdateInput) => {
    const res = await updateSettings({
      variables: {
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
        <Textarea
          name="bio"
          label="Bio"
          isRequired={true}
          size="lg"
          placeholder="Every week I hop on a conference call to teach, answer questions, and give feedback to members of Octalysis Prime. If you want to take your Gamification practice to the next level, then come join us."
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
            Update
          </Button>
        </Flex>
        <FormError />
      </Stack>
    </Form>
  )
}
