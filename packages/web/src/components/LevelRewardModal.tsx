import React from "react"
import {
  Text,
  SlideIn,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Button,
  Image,
} from "@chakra-ui/core"
import { Link } from "@reach/router"
import gql from "graphql-tag.macro"
import { LevelItemFragment, useEndMyCourseMutation } from "../lib/graphql"

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
  mutation EndMyCourse {
    endMyCourse {
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
}

export const LevelRewardModal = ({
  levelCompleted,
  onClose,
  level,
  rewardCount,
}: Props) => {
  const [endCourse] = useEndMyCourseMutation()

  const handleEndOfCourse = async () => {
    endCourse()
    onClose()
  }

  return (
    <>
      {/* 
      // @ts-ignore */}
      <SlideIn in={levelCompleted}>
        {/* // eslint-disable-next-line react/jsx-no-undef */}
        {(styles: any) => (
          <Modal onClose={onClose} isOpen={levelCompleted} size="xl">
            <ModalOverlay opacity={styles.opacity} />
            <ModalContent
              pb={5}
              {...styles}
              borderRadius="lg"
              textAlign="center"
            >
              <ModalHeader>
                {level?.isLast ? "You've made it to the end!" : "Level up!"}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="column">
                  <Text mb={4}>{level?.rewardDescription}</Text>
                  {rewardCount && rewardCount !== 0 && (
                    <Text mb={4}>
                      Together your group has planted {rewardCount} tree(s)
                    </Text>
                  )}
                  <Text mb={4}>
                    {level?.isLast
                      ? "This is the end of the course. Continue learning by trying out some of our other courses."
                      : "There are new lessons and practices waiting for you."}
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
                    <Link to={`/levelreward/${level.id}`}>
                      <Button
                        my={6}
                        onClick={onClose}
                        variantColor="blue"
                        w="100%"
                      >
                        Continue
                      </Button>
                    </Link>
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
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </SlideIn>
    </>
  )
}
