import React from "react"
import gql from "graphql-tag.macro"
import {
  MeFragmentDoc,
  useMeQuery,
  MeFragment,
  UserGroupItemFragmentDoc,
} from "../../lib/graphql"
import { useToast } from "../../lib/hooks/useToast"

//TODO: Remove group & userLevel ?? else groupId
export const ME_FRAGMENT = gql`
  fragment Me on User {
    id
    fullName
    email
    groupOrder
    avatar
    groupId
    group {
      ...UserGroupItem
    }
    userLevel {
      levelId
    }
  }
  ${UserGroupItemFragmentDoc}
`

export const ME = gql`
  query Me {
    me {
      ...Me
    }
  }
  ${MeFragmentDoc}
`

export const MeProvider: React.FC = ({ children }) => {
  const { data, loading, error } = useMeQuery({
    fetchPolicy: "cache-and-network",
  })
  const toast = useToast()
  const me = data?.me
  React.useEffect(() => {
    if (!!error) {
      toast({ status: "error", description: "Error connecting to server" })
    }
  }, [error, toast])
  if (loading) {
    return null
  }
  return <MeContext.Provider value={me}>{children}</MeContext.Provider>
}

const MeContext = React.createContext<MeFragment | null | undefined>(undefined)

export function useMe() {
  return React.useContext(MeContext)
}
