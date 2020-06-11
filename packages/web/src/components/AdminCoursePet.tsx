import React from "react"
import {
  Flex,
  Heading,
  Box,
  Spinner,
  Button,
  useDisclosure,
  Text,
  Image,
  useToast,
  IconButton,
  Stack,
} from "@chakra-ui/core"

import gql from "graphql-tag.macro"
import {
  PetItemFragmentDoc,
  useGetPetsQuery,
  PetItemFragment,
  useUpdateCourseMutation,
} from "../lib/graphql"
import { Center } from "./Center"
import { Modal } from "./Modal"
import { Table, Column } from "./Table"
import { CheckCircle } from "styled-icons/boxicons-solid/CheckCircle"
import { Circle } from "styled-icons/boxicons-solid/Circle"
import { mutationHandler } from "../lib/mutationHandler"
import { AdminCoursePetCreateForm } from "./AdminCoursePetCreateForm"
import { useMe } from "./providers/MeProvider"
import { Confirmation } from "./Confirmation"
import { AdminCoursePetEditModal } from "./AdminCoursePetEditModal"

export const GET_PETS = gql`
  query GetPets {
    getAllPets {
      ...PetItem
    }
  }
  ${PetItemFragmentDoc}
`

interface Props {
  coursePetId?: string | null
  courseId: string
}

type I = PetItemFragment

export function AdminCoursePet(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const { data, loading } = useGetPetsQuery()
  const me = useMe()
  const pets = data?.getAllPets

  const [updateCourse] = useUpdateCourseMutation()

  const handleSelect = async (petId: string) => {
    const res = await updateCourse({
      variables: { id: props.courseId, data: { petId } },
    })

    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Selected!",
        })
      },
    })
  }

  return (
    <>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Flex
          justify="center"
          mt={{ base: 4, md: "12" }}
          px={{ base: "2", md: "0" }}
          w="100%"
        >
          <Flex
            direction="column"
            align="center"
            w={{ base: "100vw", lg: "80vw" }}
            pt={{ base: 6, md: 12 }}
          >
            <Flex w="100%" justify="space-between">
              <Heading fontWeight="semibold" fontSize="3xl">
                Select a pet
              </Heading>
              <Button variantColor="blue" onClick={onOpen} leftIcon="add">
                Add
              </Button>
            </Flex>
            {pets && (
              <Box w="100%">
                <Table
                  loading={loading}
                  noData="No messages have been created yet"
                  data={pets}
                >
                  <Column<I>
                    header="Avatar"
                    id="pet.avatarUrl"
                    row={pet => (
                      <Image
                        rounded="full"
                        size="50px"
                        src={pet.avatarUrl || ""}
                      />
                    )}
                  />
                  <Column<I>
                    header="Name"
                    id="pet.name"
                    flex={2}
                    row={pet => (
                      <Text
                        color={
                          pet.id === props.coursePetId
                            ? "green.200"
                            : "colorText"
                        }
                        fontWeight={
                          pet.id === props.coursePetId ? "semibold" : "normal"
                        }
                      >
                        {pet.name}
                      </Text>
                    )}
                  />
                  <Column<I>
                    header="Description"
                    flex={2}
                    id="pet.description"
                    row={pet => (
                      <Text
                        color={
                          pet.id === props.coursePetId
                            ? "green.200"
                            : "colorText"
                        }
                        fontWeight={
                          pet.id === props.coursePetId ? "semibold" : "normal"
                        }
                      >
                        {pet.description}
                      </Text>
                    )}
                  />
                  <Column<I>
                    header="Selected"
                    id="pet.id"
                    flex={1}
                    row={pet => (
                      <Box
                        color={
                          pet.id === props.coursePetId
                            ? "green.200"
                            : "gray.100"
                        }
                        as={pet.id === props.coursePetId ? CheckCircle : Circle}
                        h={8}
                        w={8}
                        onClick={() => handleSelect(pet.id)}
                      />
                    )}
                  />
                  <Column<I>
                    id="pet.createdBy"
                    flex={1}
                    row={pet => (
                      <>
                        {me?.role === "admin" ||
                          (me?.id === pet.createdBy && (
                            <AdminCoursePetEditModal pet={pet} />
                          ))}
                      </>
                    )}
                  />
                  }
                </Table>
              </Box>
            )}
          </Flex>
        </Flex>
      )}
      <Modal size="xl" isOpen={isOpen} onClose={onClose} title="Create a pet">
        <AdminCoursePetCreateForm onClose={onClose} />
      </Modal>
    </>
  )
}
