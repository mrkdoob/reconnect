import React from "react"
import { Text, Flex, Button, Image } from "@chakra-ui/core"
import { Link, navigate } from "@reach/router"
import gql from "graphql-tag.macro"
import {
  LevelItemFragment,
  useEndMyCourseMutation,
  MeDocument,
} from "../lib/graphql"
import { Modal } from "./Modal"

export const LEVEL_ITEM = gql`
  fragment LevelItem on Level {
    id
    levelNumber
    maxProgressDays
    rewardUrl
    rewardDescription
    isLast
  }
`

export const END_MY_COURSE = gql`
  mutation EndMyCourse($hasFailed: Boolean!) {
    endMyCourse(hasFailed: $hasFailed) {
      id
      groupId
    }
  }
`

interface Props {
  levelCompleted: boolean
  onClose: () => void
  level?: LevelItemFragment | null
  rewardCount?: number
  rewardType?: string
}

export const LevelRewardModal = ({
  levelCompleted,
  onClose,
  level,
  rewardCount,
  rewardType,
}: Props) => {
  const [endCourse] = useEndMyCourseMutation({
    refetchQueries: [{ query: MeDocument }],
  })

  const handleEndOfCourse = () => {
    endCourse({
      variables: {
        hasFailed: false,
      },
    })
    onClose()
  }

  const handleLevelUpClose = () => {
    onClose()
    if (level?.id && !level?.isLast) navigate(`/mylevelreward`)
  }

  return (
    <Modal
      onClose={
        level?.id && !level?.isLast ? handleLevelUpClose : handleEndOfCourse
      }
      isOpen={levelCompleted}
      size="xl"
      title={level?.isLast ? "You've made it to the end!" : "Level up!"}
      textAlign="center"
    >
      <Flex direction="column">
        <Text mb={4}>{level?.rewardDescription}</Text>
        {rewardCount !== 0 && (
          <Text mb={4}>
            Together your group has{" "}
            {rewardType === "tree" ? "planted" : "donated"} {rewardCount}{" "}
            {rewardType}(s)"
          </Text>
        )}
        <Text mb={4}>
          {level?.isLast
            ? "This is the end of the course. Continue learning by trying out some of our other courses."
            : "There is a new teaching waiting for you."}
        </Text>
        {level?.rewardUrl && (
          <Image
            alt="reward image"
            objectFit="cover"
            src={level.rewardUrl || ""}
            width={{ base: "260px", md: "360px" }}
            height={{ base: "200px", md: "300px" }}
            borderRadius="lg"
            margin="0 auto"
          />
        )}
        {level?.id && !level?.isLast ? (
          <Button
            my={6}
            onClick={handleLevelUpClose}
            variantColor="blue"
            w="100%"
          >
            Continue
          </Button>
        ) : (
          <Link to={`/courses`}>
            <Button
              my={6}
              onClick={handleEndOfCourse}
              variantColor="blue"
              w="100%"
            >
              More courses
            </Button>
          </Link>
        )}
      </Flex>
    </Modal>
  )
}
