import React from "react"
import { Link } from "@reach/router"
import { Markup } from "interweave"

import { Page } from "../components/Page"
import { styled } from "../components/providers/ThemeProvider"
import {
  Flex,
  Text,
  Button,
  Heading,
  useDisclosure,
  Box,
} from "@chakra-ui/core"
import { Border } from "../components/Border"
import {
  LevelRewardFragment,
  LevelTaskItemFragmentDoc,
  UserTaskItemFragment,
} from "../lib/graphql"
import gql from "graphql-tag.macro"
import { LevelTaskItem } from "./LevelTaskItem"
import { Modal } from "./Modal"
import { LevelRewardItemForm } from "./LevelRewardItemForm"
import { SelfCreatedTaskItem } from "./SelfCreatedTaskItem"

export const LEVEL_REWARD = gql`
  fragment LevelReward on Level {
    id
    title
    cover
    levelNumber
    rewardText
    rewardDescription
    levelTasks {
      ...LevelTaskItem
    }
  }
  ${LevelTaskItemFragmentDoc}
`

interface Props {
  levelReward?: LevelRewardFragment | null
  tasks?: UserTaskItemFragment[] | null
  loading: boolean
}

export function LevelRewardItem({ levelReward, tasks, loading }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Page loading={loading}>
        <Flex
          justify="center"
          w="100%"
          h="100%"
          direction="column"
          align="center"
          pb={{ base: 8, md: 32 }}
        >
          <StyledTile
            p={{ base: "2", md: "8" }}
            w={{ base: "100%", md: "3xl" }}
          >
            <Border mt={12} mb={{ base: 8, md: 16 }} />
            <Text mb={6}>{levelReward?.rewardDescription}</Text>
            {/* Renders HTML in string */}
            <Heading mb={4}>{levelReward?.title}</Heading>
            <Markup content={levelReward?.rewardText} />

            {tasks &&
              tasks?.length > 0 &&
              tasks.map(task => (
                <React.Fragment key={task.id}>
                  {task.description ? (
                    <SelfCreatedTaskItem userTask={task} />
                  ) : (
                    <LevelTaskItem userTask={task} />
                  )}
                </React.Fragment>
              ))}

            {/* TODO: Show levelTasks if not current level 

            {levelReward?.levelTasks &&
              levelReward?.levelTasks?.length > 0 &&
              levelReward?.levelTasks?.map(task => (
                <LevelTaskItem key={task.id} levelTask={task} />
              ))} */}

            <Flex justify="space-between" align="center" mt={8}>
              <Text fontWeight="semibold">
                Want to challenge yourself a bit more?
              </Text>
              <Button
                leftIcon="add"
                w="fit-content"
                variantColor="green"
                onClick={onOpen}
              >
                Add your own practice
              </Button>
            </Flex>
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
      <Modal
        size="xl"
        title="Create your own practice"
        onClose={onClose}
        isOpen={isOpen}
      >
        <Box w="100%">
          <LevelRewardItemForm onClose={onClose} />
        </Box>
      </Modal>
    </>
  )
}

// TODO: Make component?
const StyledTile = styled(Flex)`
  flex-direction: column;
  border-radius: ${p => p.theme.radii.lg};
`
