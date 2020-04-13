import React from "react"
import { Flex, Box, Text, Heading } from "@chakra-ui/core"
import gql from "graphql-tag.macro"
import { GroupItemFragment } from "../lib/graphql"
import { styled } from "./providers/ThemeProvider"
import dayjs from "dayjs"
import { User } from "styled-icons/boxicons-regular/User"
import { colorsWithTrans } from "../lib/colors"

export const GROUP_ITEM = gql`
  fragment GroupItem on Group {
    id
    name
    startDate
    endDate
    groupSize
    users {
      id
      fullName
    }
  }
`

interface Props {
  group: GroupItemFragment
  index: number
  isLast: boolean
  handleGroupSelect: (groupId: string) => void
}

export function GroupItem(props: Props) {
  return (
    <StyledGroupItem
      borderRadius="lg"
      onClick={() => props.handleGroupSelect(props.group.id)}
    >
      <Flex py={6} px={12} justify="space-between">
        <Flex align="flex-start" justify="center" direction="column">
          <Heading fontWeight="normal" fontSize={{ base: "xl", md: "2xl" }}>
            {props.group.name}
          </Heading>
          {props.group.startDate && (
            <Text fontSize="md" color="gray.400">
              Starts {dayjs(props.group.startDate).format("DD MMM")}
            </Text>
          )}
        </Flex>
        <Flex align="center" justify="flex-end">
          <Heading
            color="gray.400"
            fontWeight="normal"
            fontSize={{ sm: "lg", md: "xl" }}
          >
            {props.group?.users?.length} / {props.group.groupSize}
          </Heading>
          <Box as={User} h={8} ml={2} color={colorsWithTrans[props.index]} />
        </Flex>
      </Flex>
      {!props.isLast && (
        <Box
          height="2px"
          width="80%"
          bg={colorsWithTrans[props.index]}
          margin="0 auto"
          borderRadius="lg"
        />
      )}
    </StyledGroupItem>
  )
}

const StyledGroupItem = styled(Flex)`
  flex-direction: column;
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.colors.gray[100]};
    /* transform: scale(1.005); */
  }
`
