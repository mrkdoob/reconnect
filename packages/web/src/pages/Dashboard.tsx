import React, { useState } from "react"
import { RouteComponentProps, Redirect } from "@reach/router"

import { Page } from "../components/Page"
import { Flex, Text, Box, Image, Progress, Spinner } from "@chakra-ui/core"
import { styled } from "../components/providers/ThemeProvider"
import Tree from "../lib/assets/tree.png"

import gql from "graphql-tag.macro"
import {
  useCompleteMeMutation,
  UserLevelItemFragmentDoc,
  UserTaskItemFragmentDoc,
  UserGroupItemFragmentDoc,
  UserGroupMessageFragmentDoc,
  MyDashboardFragmentDoc,
  useMyDashboardQuery,
  MyDashboardDocument,
  LevelItemFragmentDoc,
} from "../lib/graphql"
import { UserTaskList } from "../components/UserTaskList"
import { UserGroupList } from "../components/UserGroupList"
import { UserMessageModal } from "../components/UserMessageModal"
import { DailyRewardModal } from "../components/DailyRewardModal"
import { LevelRewardModal } from "../components/LevelRewardModal"

export const USER_LEVEL = gql`
  fragment UserLevelItem on UserLevel {
    id
    completed
    progressDay
    level {
      ...LevelItem
    }
  }
  ${LevelItemFragmentDoc}
`

export const MY_DASHBOARD_FRAGMENT = gql`
  fragment MyDashboard on User {
    id
    groupOrder
    tasks {
      ...UserTaskItem
    }
    group {
      ...UserGroupItem
    }
    userLevel {
      ...UserLevelItem
    }
    userGroupMessage {
      ...UserGroupMessage
    }
  }
  ${UserLevelItemFragmentDoc}
  ${UserTaskItemFragmentDoc}
  ${UserGroupItemFragmentDoc}
  ${UserGroupMessageFragmentDoc}
`

export const MY_DASHBOARD = gql`
  query MyDashboard {
    me {
      ...MyDashboard
    }
  }
  ${MyDashboardFragmentDoc}
`

export const COMPLETE_ME = gql`
  mutation CompleteMe {
    completeMe {
      ...MyDashboard
    }
  }
  ${MyDashboardFragmentDoc}
`

export const Dashboard: React.FC<RouteComponentProps> = () => {
  const [dayCompleted, setDayCompleted] = useState(false)
  const [levelCompleted, setLevelCompleted] = useState(false)
  const { data, loading } = useMyDashboardQuery({
    fetchPolicy: "cache-and-network",
  })
  const me = data?.me
  const [completeMe] = useCompleteMeMutation({
    update: (cache, res) => {
      if (res.data) {
        cache.writeQuery({
          query: MyDashboardDocument,
          data: { me: res.data.completeMe },
        })
      }
    },
  })

  const progressPercent = me?.userLevel?.level
    ? (me.userLevel.progressDay / me.userLevel.level.maxProgressDays) * 100
    : 0

  const handleDayCompletion = async () => {
    if (!me || !me.userLevel) return
    me?.userLevel.progressDay + 1 === me?.userLevel.level?.maxProgressDays
      ? setLevelCompleted(true)
      : setDayCompleted(true)

    completeMe().catch(e => console.log(e))
  }

  if (!loading && !me?.group)
    return <Redirect noThrow={true} to={`/courses/`} />

  return (
    <>
      {loading ? (
        <Flex align="center" justify="center" w="100%" h="100%">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.200"
            size="xl"
          />
        </Flex>
      ) : (
        <Page disableRedirect={true}>
          <Flex
            h={{ base: 175, md: 40 }}
            w="100%"
            fontSize="sm"
            fontWeight="semibold"
            justify="center"
            align="center"
            mt={8}
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            {/* User progress */}
            <Box
              w={{ base: "lg", md: "45%", lg: "lg" }}
              p={{ base: 2, lg: 8 }}
              m={{ base: 2, md: 2, lg: 6 }}
            >
              <Flex justify="space-between" mb={4}>
                <Text>Succesful days</Text>
                <Text color="gray.500">
                  Level {me?.userLevel?.level?.levelNumber}
                </Text>
              </Flex>
              <Flex align="center" justify="space-between">
                <Progress
                  value={progressPercent}
                  borderRadius="lg"
                  h={2}
                  w="90%"
                  color="green"
                />
                <Text>
                  {me?.userLevel?.progressDay}/
                  {me?.userLevel?.level?.maxProgressDays}
                </Text>
              </Flex>
            </Box>

            {/* Trees planted */}
            <Flex
              w={{ base: "lg", md: "45%", lg: "lg" }}
              p={{ base: 0, lg: 8 }}
              m={{ base: 0, md: 2, lg: 6 }}
              align="center"
              justify="center"
            >
              <Image
                src={Tree}
                h={{ base: 12, lg: 24 }}
                w={{ base: 16, lg: 32 }}
              />
              <Text
                mr={{ base: 4, lg: 12 }}
                fontSize={{ base: "xl", md: "2xl" }}
              >
                {me?.group?.rewardCount} total trees planted
              </Text>
            </Flex>
          </Flex>

          <Flex
            w="100%"
            align="space-between"
            flexWrap={{ base: "wrap", md: "nowrap" }}
            justify="center"
          >
            {/* User tasks */}
            <StyledTile
              my={{ base: 4, lg: 8 }}
              mx={{ base: 0, md: 2, lg: 6 }}
              w={{ base: "lg", md: "50%", lg: "lg" }}
              p={{ base: 6, md: 8 }}
            >
              <UserTaskList
                tasks={me?.tasks}
                handleDayCompletion={handleDayCompletion}
              />
            </StyledTile>
            {/* Group progress */}
            <StyledTile
              my={{ base: 4, lg: 8 }}
              mx={{ base: 0, md: 2, lg: 6 }}
              w={{ base: "lg", md: "50%", lg: "lg" }}
              p={{ base: 6, md: 8 }}
            >
              {me?.group && <UserGroupList group={me.group} />}
            </StyledTile>
          </Flex>
          {me?.userGroupMessage && (
            <UserMessageModal userGroupMessage={me.userGroupMessage} />
          )}
          <DailyRewardModal
            dayCompleted={dayCompleted}
            onClose={() => setDayCompleted(false)}
          />
          <LevelRewardModal
            levelCompleted={me?.tasks?.length === 0 || levelCompleted}
            onClose={() => setDayCompleted(false)}
            level={me?.userLevel?.level}
            rewardCount={me?.group?.rewardCount}
          />
        </Page>
      )}
    </>
  )
}

const StyledTile = styled(Flex)`
  flex-direction: column;
  height: 100%;
  /* padding: ${p => p.theme.space[8]}; */
  border-radius: ${p => p.theme.radii.lg};
  background-color: ${p => p.theme.colors.gray[50]};
  /* box-shadow: ${p => p.theme.shadows.md}; */
`
