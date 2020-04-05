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
import { Link, navigate } from "@reach/router"
import gql from "graphql-tag.macro"
import {
  LevelItemFragment,
  useEndMyCourseMutation,
  MeDocument,
} from "../lib/graphql"

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
    endCourse()
    onClose()
  }

  const handleLevelUpClose = () => {
    onClose()
    if (level?.id && !level?.isLast) navigate(`/levelreward/${level.id}`)
  }

  return (
    <>
      {/* 
      // @ts-ignore */}
      <SlideIn in={levelCompleted}>
        {/* // eslint-disable-next-line react/jsx-no-undef */}
        {(styles: any) => (
          <Modal
            onClose={
              level?.id && !level?.isLast
                ? handleLevelUpClose
                : handleEndOfCourse
            }
            isOpen={levelCompleted}
            size="xl"
          >
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
                  {rewardCount !== 0 && (
                    <Text mb={4}>
                      {" "}
                      {/* TODO: Change trees*/}
                      Together your group has{" "}
                      {rewardType === "tree" ? "planted" : "donated"}{" "}
                      {rewardCount} {rewardType}(s)"
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
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </SlideIn>
    </>
  )
}
