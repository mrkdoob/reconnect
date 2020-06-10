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

import { Markup } from "interweave"
import { Border } from "./Border"
import { Coin } from "../lib/imageLinks"
import { MyDashboardFragment } from "../lib/graphql"

export const USER_DAY_REWARD_ITEM = gql`
  fragment UserDayRewardItem on UserDayReward {
    id
    courseDayReward {
      id
      description
      pictureUrl
      videoUrl
    }
  }
`

interface Props {
  onClose: () => void
  me: MyDashboardFragment
  dayCompleted: boolean
}

export const DailyRewardModal = ({ onClose, me, dayCompleted }: Props) => {
  const [show, setShow] = React.useState(false)
  const reward = me.userDayReward?.courseDayReward

  const daysLeft =
    me?.userLevel?.level?.maxProgressDays && me?.userLevel?.progressDay
      ? me?.userLevel?.level?.maxProgressDays - me?.userLevel?.progressDay
      : 0

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
                  {/* TODO: Dynamic coins amount and days amount */}
                  <Flex mb={4} align="center" justify="center">
                    <Text>
                      You have earned {me.userBooster?.coinReward} coins{" "}
                    </Text>
                    <Image src={Coin} size={6} mx={2} />
                    <Text>and have {daysLeft} days left to level up.</Text>
                  </Flex>
                  <Text mb={4}>You have unlocked a wisdom scroll.</Text>
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
                  <Collapse my={4} isOpen={show} fontSize="xl">
                    {reward?.pictureUrl && (
                      <Flex justify="center">
                        <Image
                          src={reward.pictureUrl}
                          alt="Message picture"
                          w="500px"
                          h="275px"
                          objectFit="cover"
                          borderRadius="lg"
                          mb={6}
                        />
                      </Flex>
                    )}
                    <Markup content={reward?.description} />
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
