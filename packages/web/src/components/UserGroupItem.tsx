import React from "react"
import { Flex, Image, Text, Box } from "@chakra-ui/core"
import gql from "graphql-tag.macro"
import {
  GroupUserTaskItemFragment,
  GroupUserTaskItemFragmentDoc,
} from "../lib/graphql"
import { Question } from "styled-icons/remix-fill/Question"
import { User } from "styled-icons/boxicons-regular/User"

// TODO: Refactor rewardCount?
export const USER_GROUP = gql`
  fragment UserGroupItem on Group {
    id
    name
    rewardCount
    oldRewardCount
    groupMembersFinished
    groupSize
    qiForReward
    groupQiCoins
    users {
      ...GroupUserTaskItem
    }
  }
  ${GroupUserTaskItemFragmentDoc}
`

export const GROUP_USER_TASK = gql`
  fragment GroupUserTaskItem on User {
    id
    firstName
    avatar
    groupOrder
  }
`

interface Props {
  user?: GroupUserTaskItemFragment
}

export function UserGroupItem({ user }: Props) {
  return (
    <Flex justify="center" align="center" direction="column">
      {user?.avatar ? (
        <Image
          h={{ base: 8, md: 10 }}
          w={{ base: 8, md: 10 }}
          objectFit="cover"
          borderRadius="full"
          src={user?.avatar}
        />
      ) : user?.groupOrder && user?.groupOrder > 0 ? (
        <Box as={User} mx={4} h={8} color="gray.300" />
      ) : (
        <Box
          as={Question}
          w={{ base: 8, md: 10 }}
          h={{ base: 8, md: 10 }}
          color="gray.200"
        />
      )}

      <Text mt={1} fontSize="sm" color="green.400" fontWeight="normal">
        {user?.firstName}
      </Text>
    </Flex>
  )
}
