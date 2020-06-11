import React from "react"
import {
  Image,
  Button,
  useDisclosure,
  useToast,
  IconButton,
  Stack,
  FormLabel,
  ButtonGroup,
} from "@chakra-ui/core"

import gql from "graphql-tag.macro"
import {
  PetItemFragmentDoc,
  PetItemFragment,
  useUpdatePetMutation,
  UpdatePetInput,
  useDestroyPetMutation,
  GetPetsDocument,
} from "../lib/graphql"
import { Modal } from "./Modal"
import { mutationHandler } from "../lib/mutationHandler"
import { PetSchema } from "./AdminCoursePetCreateForm"
import { useMe } from "./providers/MeProvider"
import { Confirmation } from "./Confirmation"
import { useForm } from "../lib/hooks/useForm"
import { useS3Upload } from "../lib/hooks/useS3Upload"
import { UPLOAD_PATHS, amzUrl } from "../lib/uploadPaths"
import { Form } from "./Form"
import { Input } from "./Input"
import { ImageCreateInForm } from "./ImageCreateInForm"
import { FormError } from "./FormError"

export const DESTROY_PET = gql`
  mutation DestroyPet($petId: String!) {
    destroyPet(petId: $petId)
  }
`

export const UPDATE_PET = gql`
  mutation UpdatePet($petId: String!, $data: UpdatePetInput!) {
    updatePet(petId: $petId, data: $data) {
      ...PetItem
    }
  }
  ${PetItemFragmentDoc}
`

interface Props {
  pet: PetItemFragment
}

export function AdminCoursePetEditModal(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const me = useMe()
  const [destroyPet] = useDestroyPetMutation({
    refetchQueries: [
      {
        query: GetPetsDocument,
      },
    ],
  })

  const handleDestroy = async () => {
    const res = await destroyPet({
      variables: { petId: props.pet.id },
    })

    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Deleted!",
        })
      },
    })
  }

  return (
    <>
      {me?.role === "admin" ||
        (me?.id === props.pet.createdBy && (
          <Stack spacing={4} isInline>
            <IconButton aria-label="Edit pet" icon="edit" onClick={onOpen} />
            <Confirmation onSubmit={handleDestroy}>
              <IconButton
                aria-label="Delete message"
                variantColor="red"
                icon="delete"
              />
            </Confirmation>
          </Stack>
        ))}

      <Modal size="xl" isOpen={isOpen} onClose={onClose} title="Edit pet">
        <AdminCoursePetEditForm onClose={onClose} pet={props.pet} />
      </Modal>
    </>
  )
}

interface EditFormProps {
  onClose: () => void
  pet: PetItemFragment
}

const AdminCoursePetEditForm: React.FC<EditFormProps> = props => {
  const toast = useToast()
  const [images, setImages] = React.useState<File[]>([])

  const form = useForm({
    defaultValues: {
      name: props.pet.name,
      description: props.pet.description,
      levelNumber: props.pet.levelNumber,
      avatarUrl: props.pet.avatarUrl,
    },
    validationSchema: PetSchema,
  })

  const [upload] = useS3Upload({
    path: UPLOAD_PATHS.pets,
  })

  const [updatePet] = useUpdatePetMutation()

  const handleSubmit = async (values: UpdatePetInput) => {
    let avatarKey
    if (images.length > 0) {
      const uploadedImg = await upload(images[0])
      if (!uploadedImg) return
      avatarKey = amzUrl + uploadedImg.fileKey
    }

    const res = await updatePet({
      variables: {
        petId: props.pet.id,
        data: { ...values, avatarUrl: avatarKey },
      },
    })

    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Edited!",
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
        {props.pet.avatarUrl && (
          <Image rounded="full" size="50px" src={props.pet.avatarUrl} />
        )}
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
            Submit
          </Button>
        </ButtonGroup>
        <FormError />
      </Stack>
    </Form>
  )
}
