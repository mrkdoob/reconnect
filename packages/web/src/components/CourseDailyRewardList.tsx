import React from "react"
import {
  Flex,
  Heading,
  Box,
  Spinner,
  Button,
  useDisclosure,
} from "@chakra-ui/core"
import { Badge } from "styled-icons/boxicons-regular/Badge"

import gql from "graphql-tag.macro"
import {
  CourseDayRewardFragmentDoc,
  useGetCourseRewardsQuery,
  CourseDayRewardFragment,
} from "../lib/graphql"
import { Center } from "./Center"
import { Modal } from "./Modal"
import { CourseDailyRewardItem } from "./CourseDailyRewardItem"
import { Table, Column } from "./Table"
import { CourseDailyRewardCreateForm } from "./CourseDailyRewardCreateForm"

export const GET_COURSE_REWARDS = gql`
  query GetCourseRewards($courseId: String!) {
    getCourse(courseId: $courseId) {
      id
      courseDayRewards {
        ...CourseDayReward
      }
    }
  }
  ${CourseDayRewardFragmentDoc}
`

interface Props {
  courseId: string
}

type I = CourseDayRewardFragment

export function CourseDailyRewardList(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, loading } = useGetCourseRewardsQuery({
    variables: { courseId: props.courseId },
  })
  const rewards = data?.getCourse.courseDayRewards

  return (
    <>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Flex
          justify="center"
          mt={{ base: 4, md: "12" }}
          px={{ base: "2", md: "0" }}
          w="100%"
        >
          <Flex
            direction="column"
            align="center"
            w={["100%", "70%"]}
            pt={{ base: 6, md: 12 }}
          >
            <Flex align="center">
              <Box as={Badge} h={8} mb={1} color="blue.500" />
            </Flex>

            <Heading mb={6} fontWeight="normal" fontSize="2xl">
              Daily rewards
            </Heading>

            {rewards && (
              <Box w="100%">
                <Table
                  loading={loading}
                  noData="No rewards have been created yet"
                  data={rewards}
                >
                  <Column<I>
                    row={reward => <CourseDailyRewardItem reward={reward} />}
                  />
                </Table>
              </Box>
            )}
            {/* TODO: Add Reward item */}
            <Button variantColor="blue" onClick={onOpen} mb={8} leftIcon="add">
              Create new reward
            </Button>
          </Flex>
        </Flex>
      )}
      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        title="Create Daily Reward"
      >
        <CourseDailyRewardCreateForm
          onClose={onClose}
          courseId={props.courseId}
          order={rewards ? rewards.length + 1 : 1}
        />
      </Modal>
    </>
  )
}
