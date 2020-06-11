import React from "react"
import { Image, Flex, Box } from "@chakra-ui/core"
import gql from "graphql-tag.macro"
import { Heart } from "styled-icons/boxicons-solid/Heart"

import { PetItemFragmentDoc, UserPetItemFragment } from "../lib/graphql"

export const PET_ITEM = gql`
  fragment PetItem on Pet {
    id
    description
    name
    levelNumber
    avatarUrl
    createdBy
  }
`

export const USER_PET_ITEM = gql`
  fragment UserPetItem on UserPet {
    id
    lifes
    isActive
    pet {
      ...PetItem
    }
  }
  ${PetItemFragmentDoc}
`

interface Props {
  userPet: UserPetItemFragment
}

export const MAX_LIFES = 3

export function UserPetItem({ userPet }: Props) {
  return (
    <>
      {userPet && (
        <Flex align="center" mt={4} justify="center" pr={8}>
          {userPet.pet?.avatarUrl && (
            <Image
              src={userPet.pet?.avatarUrl}
              h={12}
              w={12}
              rounded="full"
              opacity={userPet.lifes / MAX_LIFES + 0.1}
            />
          )}
          {[...Array(userPet.lifes)].map((x, i) => (
            <Box
              key={i}
              as={Heart}
              h={{ base: 6, md: 8 }}
              w={{ base: 6, md: 8 }}
              ml={8}
              color="red.400"
            />
          ))}
          {[...Array(MAX_LIFES - userPet.lifes)].map((x, i) => (
            <Box
              key={i}
              as={Heart}
              h={{ base: 6, md: 8 }}
              w={{ base: 6, md: 8 }}
              ml={8}
              color="gray.200"
            />
          ))}
        </Flex>
      )}
    </>
  )
}
