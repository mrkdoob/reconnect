import React from "react"
import gql from "graphql-tag"
import { Button, Stack, useToast, FormLabel } from "@chakra-ui/core"

import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import { FormError } from "./FormError"
import {
  PetItemFragmentDoc,
  CreatePetInput,
  useCreatePetMutation,
  GetPetsDocument,
} from "../lib/graphql"
import { ButtonGroup } from "./ButtonGroup"
import { ImageCreateInForm } from "./ImageCreateInForm"
import { useS3Upload } from "../lib/hooks/useS3Upload"
import { UPLOAD_PATHS, amzUrl } from "../lib/uploadPaths"

export const CREATE_PET = gql`
  mutation CreatePet($data: CreatePetInput!) {
    createPet(data: $data) {
      ...PetItem
    }
  }
  ${PetItemFragmentDoc}
`

export const PetSchema = Yup.object().shape<CreatePetInput>({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  levelNumber: Yup.number(),
  avatarUrl: Yup.string(),
})

interface Props {
  onClose: () => void
}
export const AdminCoursePetCreateForm: React.FC<Props> = props => {
  const toast = useToast()
  const [images, setImages] = React.useState<File[]>([])

  const form = useForm({
    validationSchema: PetSchema,
  })

  const [upload] = useS3Upload({
    path: UPLOAD_PATHS.pets,
  })

  const [createPet] = useCreatePetMutation({
    refetchQueries: [
      {
        query: GetPetsDocument,
      },
    ],
  })

  const handleSubmit = async (values: CreatePetInput) => {
    let avatarKey
    if (images.length > 0) {
      const uploadedImg = await upload(images[0])
      if (!uploadedImg) return
      avatarKey = amzUrl + uploadedImg.fileKey
    }

    const res = await createPet({
      variables: {
        data: { ...values, levelNumber: 1, avatarUrl: avatarKey }, // TODO: Level number not 1 when multiple levels are possible
      },
    })
    return form.handler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Pet added!",
        })
        props.onClose()
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit} {...form}>
      <Stack spacing={4} shouldWrapChildren>
        <Input name="name" label="Name" />
        <Input name="description" label="Description" />
        <FormLabel>Avatar</FormLabel>
        <ImageCreateInForm images={images} setImages={setImages} />
        <Input name="avatarUrl" label="Or use external avatar url" />
        {/* TODO: Make use of <Input name="levelNumber" label="Level number" /> when implemented*/}

        <ButtonGroup>
          <Button
            variant="ghost"
            loadingText="loading"
            onClick={() => props.onClose()}
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
        </ButtonGroup>
        <FormError />
      </Stack>
    </Form>
  )
}
