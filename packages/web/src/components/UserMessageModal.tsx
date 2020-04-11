import React from "react"
import gql from "graphql-tag.macro"
import { Text, Flex, Image, Button, AspectRatioBox, Box } from "@chakra-ui/core"

import {
  useUpdateUserGroupMessageMutation,
  UserGroupMessageFragment,
} from "../lib/graphql"
import { useToggle } from "../lib/hooks/useToggle"
import { Markup } from "interweave"
import { Modal } from "./Modal"

export const USER_GROUP_MESSAGE = gql`
  fragment UserGroupMessage on UserGroupMessage {
    id
    isRead
    showOption
    groupMessage {
      id
      rewardCount
      leftCoinsCount
    }
    message {
      id
      message
      videoUrl
      pictureUrl
      fullHeightPic
    }
  }
`

export const UPDATE_USER_GROUP_MESSAGE = gql`
  mutation UpdateUserGroupMessage(
    $userGroupMessageId: String!
    $data: UpdateUserGroupMessageInput!
  ) {
    updateUserGroupMessage(
      userGroupMessageId: $userGroupMessageId
      data: $data
    ) {
      isRead
      showOption
    }
  }
`
interface Props {
  userGroupMessage: UserGroupMessageFragment
  rewardType?: string
}

export const UserMessageModal: React.FC<Props> = props => {
  const [modalOpen, toggleModal] = useToggle({
    default:
      !props.userGroupMessage?.isRead && props.userGroupMessage?.showOption,
  }) // TODO: Change useToggle

  const [updateUserGroupMessage] = useUpdateUserGroupMessageMutation()

  const handleDontShowMe = async () => {
    toggleModal()
    if (!props.userGroupMessage) return

    updateUserGroupMessage({
      variables: {
        userGroupMessageId: props.userGroupMessage.id,
        data: {
          showOption: false,
        },
      },
    })
  }

  const handleClose = async () => {
    toggleModal()
    if (!props.userGroupMessage) return

    updateUserGroupMessage({
      variables: {
        userGroupMessageId: props.userGroupMessage.id,
        data: {
          isRead: true,
        },
      },
    })
  }

  return (
    <Modal
      onClose={handleClose}
      isOpen={modalOpen}
      size="2xl"
      title="Good job!"
    >
      <Flex direction="column">
        {props.userGroupMessage?.groupMessage?.rewardCount !== 0 && (
          <Text mb={4}>
            Together with your team you have{" "}
            {props.rewardType === "tree" ? "planted" : "donated"}{" "}
            {props.userGroupMessage?.groupMessage?.rewardCount}{" "}
            {props.rewardType}
            {props.userGroupMessage?.groupMessage?.rewardCount !== 1 &&
              "s"}{" "}
            yesterday. Thank you!
          </Text>
        )}

        {props.userGroupMessage?.groupMessage?.leftCoinsCount !== 0 && (
          <Text mb={4}>
            There are {props.userGroupMessage?.groupMessage?.leftCoinsCount}{" "}
            coins left from yesterday. These will give you a head start today to{" "}
            {props.rewardType === "tree" ? "plant" : "donate"} the next{" "}
            {props.rewardType}.
          </Text>
        )}
        {props.userGroupMessage?.message?.pictureUrl && (
          <Image
            src={props.userGroupMessage.message.pictureUrl}
            alt="Message picture"
            w="625px"
            h={props.userGroupMessage.message.fullHeightPic ? "" : "300px"}
            objectFit="cover"
            borderRadius="lg"
            mb={4}
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
        <Button fontSize="sm" onClick={handleDontShowMe} variant="ghost">
          Don't show me again
        </Button>
      </Flex>
    </Modal>
  )
}
