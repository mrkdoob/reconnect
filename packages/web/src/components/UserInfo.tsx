import React from "react"
import gql from "graphql-tag.macro"
import { Box } from "@chakra-ui/core"

import { UserInfoFragment } from "../lib/graphql"

export const USER_INFO = gql`
  fragment UserInfo on User {
    id
    email
    firstName
    lastName
  }
`

interface Props {
  user: UserInfoFragment
}

export const UserInfo = ({ user }: Props) => {
  return <Box>Hi userinfo</Box>
}
