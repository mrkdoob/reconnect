import React from "react"
import { RouteComponentProps } from "@reach/router"
import gql from "graphql-tag.macro"
import { LevelRewardFragmentDoc, useGetLevelRewardQuery } from "../lib/graphql"

import { LevelRewardItem } from "../components/LevelRewardItem"

//TO DO: Perhaps remove levelTasks

export const GET_LEVEL_REWARD = gql`
  query GetLevelReward($levelId: String!) {
    getLevel(levelId: $levelId) {
      ...LevelReward
    }
  }
  ${LevelRewardFragmentDoc}
`

interface Props extends RouteComponentProps<{ levelId?: string }> {}

export const LevelReward: React.FC<Props> = props => {
  const levelId = props.levelId as string

  const { data, loading } = useGetLevelRewardQuery({ variables: { levelId } })

  const levelReward = data?.getLevel

  return (
    <>
      <LevelRewardItem levelReward={levelReward} loading={loading} />
    </>
  )
}
