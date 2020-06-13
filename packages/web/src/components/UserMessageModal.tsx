import React, { useState } from "react"
import gql from "graphql-tag.macro"
import { Text, Flex, Image, Button, AspectRatioBox, Box } from "@chakra-ui/core"

import {
  useUpdateUserGroupMessageMutation,
  UserGroupMessageFragment,
  UserPetItemFragment,
} from "../lib/graphql"
import { useToggle } from "../lib/hooks/useToggle"
import { Markup } from "interweave"
import { Modal } from "./Modal"
import { UserPetItem } from "./UserPetItem"
import { HealthPotion, Coin, Tree, Food } from "../lib/imageLinks"

export const USER_GROUP_MESSAGE = gql`
  fragment UserGroupMessage on UserGroupMessage {
    id
    isRead
    showOption
    message {
      id
      message
      videoUrl
      pictureUrl
      fullHeightPic
      order
    }
  }
`

export const UPDATE_USER_GROUP_MESSAGE = gql`
  mutation UpdateUserGroupMessage(
    $userGroupMessageId: String!
    $data: UpdateUserGroupMessageInput!
    $updateToNextMessage: Boolean!
  ) {
    updateUserGroupMessage(
      userGroupMessageId: $userGroupMessageId
      data: $data
      updateToNextMessage: $updateToNextMessage
    ) {
      isRead
      showOption
    }
  }
`
interface Props {
  userGroupMessage: UserGroupMessageFragment
  rewardType?: string
  userHasFailed: boolean
  userPet: UserPetItemFragment
}

export const MAX_RETRIES = 1

export const UserMessageModal: React.FC<Props> = props => {
  const [modalOpen, toggleModal] = useToggle({
    default:
      !props.userGroupMessage?.isRead && props.userGroupMessage?.showOption,
  }) // TODO: Change useToggle
  const [showMessage, setShowMessage] = useState(
    props.userGroupMessage?.message?.order !== 1,
  )

  const [updateUserGroupMessage] = useUpdateUserGroupMessageMutation()

  // TODO: Add or remove?
  // const handleDontShowMe = async () => {
  //   toggleModal()
  //   if (!props.userGroupMessage) return

  //   updateUserGroupMessage({
  //     variables: {
  //       userGroupMessageId: props.userGroupMessage.id,
  //       data: {
  //         showOption: false,
  //       },
  //     },
  //   })
  // }

  const handleClose = async () => {
    toggleModal()
    if (!props.userGroupMessage) return

    updateUserGroupMessage({
      variables: {
        userGroupMessageId: props.userGroupMessage.id,
        data: {
          isRead: true,
        },
        updateToNextMessage: !props.userHasFailed,
      },
    })
  }

  return (
    <Modal
      onClose={handleClose}
      isOpen={modalOpen}
      size={props.userHasFailed ? "md" : "2xl"}
      title={
        props.userHasFailed
          ? ""
          : props.userGroupMessage?.message?.order === 1
          ? "Welcome"
          : "Welcome back!"
      }
    >
      {props.userHasFailed ? (
        <Flex direction="column" align="center" mb={4} textAlign="center">
          {props.userPet.lifes === 3 ? (
            <>
              {props.userPet.pet ? (
                <>
                  <Text mb={4}>
                    {/* TODO?: Make dynamic if max_retries > 1 */}
                    Your {props.userPet.pet.name} died :({" "}
                  </Text>
                  <Text mb={4}>Your level progress is set back to 0</Text>
                  <Image src={HealthPotion} h={20} w={20} />
                  <Text my={4}>
                    {/* TODO: Dynamic mentor name? */}
                    Your mentor has given you a health potion to revive your
                    spirit animal.
                  </Text>
                  <Text mb={4}>You have one more chance to succeed!</Text>
                </>
              ) : (
                <Text mb={4}>
                  You have lost your progress :( You can try again once more.
                </Text>
              )}
            </>
          ) : (
            <>
              {props.userPet.pet ? (
                <Text mb={4}>
                  Your {props.userPet.pet.name} has lost health :(
                </Text>
              ) : (
                <Text mb={4}>You have lost health :(</Text>
              )}
            </>
          )}
          <UserPetItem userPet={props.userPet} />
        </Flex>
      ) : (
        <Flex direction="column">
          {/* FIRST MESSAGE @ START OF COURSE */}
          {props.userGroupMessage?.message?.order === 1 && (
            <>
              {!showMessage && (
                <Flex
                  justify="center"
                  align="center"
                  textAlign="center"
                  direction="column"
                >
                  <Flex align="center" mb={2}>
                    <Image src={Coin} size={12} mr={8} />
                    <Image
                      src={props.rewardType === "tree" ? Tree : Food}
                      size={16}
                    />
                  </Flex>
                  <Text mb={4}>
                    Upon completing your daily practice you will recieve coins
                    that will contribute towards the chosen charity.
                  </Text>

                  <UserPetItem userPet={props.userPet} />
                  <Text mb={4} mt={2}>
                    When you fail to complete your daily tasks your animal
                    spirit will lose one health. When it loses all health, you
                    will lose your progress.
                  </Text>
                  <Button
                    my={6}
                    onClick={() => setShowMessage(true)}
                    variantColor="blue"
                  >
                    Continue
                  </Button>
                </Flex>
              )}
            </>
          )}
          {showMessage && (
            <>
              {props.userGroupMessage?.message?.pictureUrl && (
                <Image
                  src={props.userGroupMessage.message.pictureUrl}
                  alt="Message picture"
                  w="625px"
                  h={
                    props.userGroupMessage.message.fullHeightPic ? "" : "300px"
                  }
                  objectFit="cover"
                  borderRadius="lg"
                  my={4}
                />
              )}
              {props.userGroupMessage?.message?.videoUrl && (
                <>
                  <AspectRatioBox ratio={4 / 3}>
                    <Box
                      mt={6}
                      as="iframe"
                      title="task video"
                      // @ts-ignore
                      src={props.userGroupMessage?.message?.videoUrl || ""}
                      allowFullScreen
                      borderRadius="lg"
                    />
                  </AspectRatioBox>
                  <Box mb={6} />
                </>
              )}
              <Markup content={props.userGroupMessage?.message?.message} />

              <Button my={6} onClick={handleClose} variantColor="blue">
                Continue
              </Button>
            </>
          )}
          {/* TODO: Add or remove? <Button fontSize="sm" onClick={handleDontShowMe} variant="ghost">
          Don't show me again
        </Button> */}
        </Flex>
      )}
    </Modal>
  )
}
