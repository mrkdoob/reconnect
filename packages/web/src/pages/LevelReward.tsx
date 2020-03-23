import React from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { Markup } from "interweave"

import { Page } from "../components/Page"
import gql from "graphql-tag.macro"
import { LevelRewardFragmentDoc, useGetLevelRewardQuery } from "../lib/graphql"
import { styled } from "../components/providers/ThemeProvider"
import {
  Flex,
  Text,
  Box,
  Button,
  AspectRatioBox,
  Heading,
} from "@chakra-ui/core"
import { Border } from "../components/Border"

//TO DO: Perhaps remove levelTasks
export const LEVEL_REWARD = gql`
  fragment LevelReward on Level {
    id
    title
    cover
    levelNumber
    rewardText
    rewardDescription
    levelTasks {
      id
      order
      description
      fullDescription
      videoUrl
    }
  }
`

export const GET_LEVEL_REWARD = gql`
  query GetLevelReward($levelId: String!) {
    getLevel(levelId: $levelId) {
      ...LevelReward
    }
  }
  ${LevelRewardFragmentDoc}
`

interface Props extends RouteComponentProps<{ levelId: string }> {}

export const LevelReward: React.FC<Props> = props => {
  const levelId = props.levelId as string

  const { data, loading } = useGetLevelRewardQuery({ variables: { levelId } })
  const levelReward = data?.getLevel

  return (
    <Page loading={loading}>
      <Flex
        justify="center"
        w="100%"
        h="100%"
        direction="column"
        align="center"
        pb={{ base: 8, md: 32 }}
      >
        <StyledTile p={{ base: "2", md: "8" }} w={{ base: "100%", md: "3xl" }}>
          <Border mt={12} mb={{ base: 8, md: 16 }} />
          <Text mb={6}>{levelReward?.rewardDescription}</Text>
          {/* Renders HTML in string */}
          <Heading mb={4}>{levelReward?.title}</Heading>
          <Markup content={levelReward?.rewardText} />

          {levelReward?.levelTasks?.map(task => (
            <React.Fragment key={task.id}>
              <Text as="i" mt={6}>
                {task.description}
              </Text>
              <Text>{task.fullDescription}</Text>
              {task.videoUrl && (
                <>
                  <AspectRatioBox ratio={4 / 3}>
                    <Box
                      mt={6}
                      as="iframe"
                      title="task video"
                      // @ts-ignore
                      src={task.videoUrl || ""}
                      allowFullScreen
                      borderRadius="lg"
                    />
                  </AspectRatioBox>
                  <Box mb={6} />
                </>
              )}
            </React.Fragment>
          ))}
          <Border my={16} />
          <Link to={"/"}>
            <Flex justify="center" w="100%">
              <Button variantColor="blue" w="60%">
                Continue
              </Button>
            </Flex>
          </Link>
        </StyledTile>
      </Flex>
    </Page>
  )
}

const StyledTile = styled(Flex)`
  flex-direction: column;
  border-radius: ${p => p.theme.radii.lg};
`
