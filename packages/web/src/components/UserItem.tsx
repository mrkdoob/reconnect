import React from "react"
import { Box } from "@chakra-ui/core"
import gql from "graphql-tag.macro"

import { UserItemFragment } from "../lib/graphql"

export const USER_ITEM = gql`
  fragment UserItem on User {
    id
    firstName
    email
  }
`

interface Props {
  user: UserItemFragment
}

export function UserItem({ user }: Props) {
  return <Box>Hi UserItem</Box>
}
