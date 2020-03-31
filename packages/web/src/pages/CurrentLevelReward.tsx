import React from "react"
import { RouteComponentProps } from "@reach/router"
import gql from "graphql-tag.macro"
import {
  LevelRewardFragmentDoc,
  useGetCurrentLevelRewardQuery,
} from "../lib/graphql"
import { LevelRewardItem } from "../components/LevelRewardItem"

export const GET_CURRENT_LEVEL_REWARD = gql`
  query GetCurrentLevelReward {
    me {
      id
      userLevel {
        id
        level {
          ...LevelReward
        }
      }
    }
  }
  ${LevelRewardFragmentDoc}
`

export const CurrentLevelReward: React.FC<RouteComponentProps> = () => {
  const { data, loading } = useGetCurrentLevelRewardQuery()
  const levelReward = data?.me?.userLevel?.level

  return (
    <>
      <LevelRewardItem levelReward={levelReward} loading={loading} />
    </>
  )
}
