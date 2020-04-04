import React from "react"
import gql from "graphql-tag.macro"
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
  Image,
  Button,
  Collapse,
} from "@chakra-ui/core"

import { MyDailyRewardFragmentDoc, useMyDayRewardQuery } from "../lib/graphql"
import { Markup } from "interweave"
import { Border } from "./Border"

export const MY_DAILY_REWARD = gql`
  fragment MyDailyReward on UserDayReward {
    id
    courseDayReward {
      id
      description
      pictureUrl
      videoUrl
    }
  }
`

export const GET_MY_DAYREWARD = gql`
  query MyDayReward {
    myDayReward {
      ...MyDailyReward
    }
  }
  ${MyDailyRewardFragmentDoc}
`

// export const UPDATE_TO_NEXT_USER_DAY_REWARD = gql`
//   mutation UpdateToNextUserDayReward($userDayRewardId: String!) {
//     updateToNextUserDayReward(userDayRewardId: $userDayRewardId) {
//       id
//       courseDayRewardId
//     }
//   }
// `

interface Props {
  dayCompleted: boolean
  onClose: () => void
}

export const DailyRewardModal = ({ dayCompleted, onClose }: Props) => {
  const [show, setShow] = React.useState(false)

  const { data } = useMyDayRewardQuery()
  const reward = data?.myDayReward

  const handleClose = async () => {
    onClose()
  }

  return (
    <>
      {/* 
    // @ts-ignore */}
      <SlideIn in={dayCompleted}>
        {/* // eslint-disable-next-line react/jsx-no-undef */}
        {(styles: any) => (
          <Modal onClose={handleClose} isOpen={dayCompleted} size="xl">
            <ModalOverlay opacity={styles.opacity} />
            <ModalContent
              pb={5}
              {...styles}
              borderRadius="lg"
              textAlign="center"
            >
              <ModalHeader>Great job!</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="column">
                  <Text mb={4}>
                    You have unlocked an ancient scroll of wisdom.
                  </Text>
                  <Border mb={4} />
                  <Button
                    my={6}
                    onClick={() => setShow(true)}
                    variant="link"
                    variantColor="blue"
                    display={show ? "none" : "block"}
                  >
                    Open
                  </Button>
                  <Collapse mt={4} isOpen={show}>
                    {reward?.courseDayReward?.pictureUrl && (
                      <Flex justify="center">
                        <Image
                          src={reward?.courseDayReward?.pictureUrl}
                          alt="Message picture"
                          w="425px"
                          h="200px"
                          objectFit="cover"
                          borderRadius="lg"
                          mb={6}
                        />
                      </Flex>
                    )}
                    <Text fontSize="xl">
                      <Markup content={reward?.courseDayReward?.description} />
                    </Text>
                  </Collapse>
                  <Border mt={4} />
                  <Button
                    display={show ? "block" : "none"}
                    my={6}
                    onClick={handleClose}
                    variantColor="blue"
                  >
                    Continue
                  </Button>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </SlideIn>
    </>
  )
}
