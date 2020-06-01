import React from "react"
import {
  Flex,
  useDisclosure,
  Image,
  IconButton,
  Stack,
  useToast,
  Box,
} from "@chakra-ui/core"
import {
  CourseDayRewardFragment,
  useDestroyRewardMutation,
  GetCourseRewardsDocument,
  useUpdateCourseDayRewardMutation,
} from "../lib/graphql"
import gql from "graphql-tag.macro"
import { Modal } from "./Modal"
import { Markup } from "interweave"
import { CourseDailyRewardEditForm } from "./CourseDailyRewardEditForm"
import { mutationHandler } from "../lib/mutationHandler"
import { Confirmation } from "./Confirmation"
import { ImageCreate } from "./ImageCreate"

export const COURSE_DAY_REWARD = gql`
  fragment CourseDayReward on CourseDayReward {
    id
    order
    description
    pictureUrl
    videoUrl
    courseId
  }
`

export const DESTROY_REWARDD = gql`
  mutation DestroyReward($courseDayRewardId: String!) {
    destroyCourseDayReward(courseDayRewardId: $courseDayRewardId)
  }
`

interface Props {
  reward: CourseDayRewardFragment
}

export function CourseDailyRewardItem(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [destroyReward] = useDestroyRewardMutation({
    refetchQueries: [
      {
        query: GetCourseRewardsDocument,
        variables: { courseId: props.reward.courseId },
      },
    ],
  })
  const toast = useToast()

  const handleDestroy = async () => {
    const res = await destroyReward({
      variables: {
        courseDayRewardId: props.reward.id,
      },
    })
    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Successfully deleted!",
        })
        onClose()
      },
    })
  }

  return (
    <>
      <Flex w="100%" justify="space-between" align="center" p={2}>
        <Flex fontSize="xs" align="center" w="90%">
          <Box position="relative" mr={8} w="125px">
            <Image
              src={props.reward.pictureUrl || ""}
              rounded="lg"
              objectFit="cover"
              size="125px"
            />
            <RewardImageModal reward={props.reward} />
          </Box>
          <Box w="calc(100% - 125px - 2rem)" wordBreak="break-all">
            <Markup content={props.reward?.description} />
          </Box>
        </Flex>
        <Stack spacing={4} isInline w="10%">
          <IconButton aria-label="Edit reward" icon="edit" onClick={onOpen} />
          <Confirmation onSubmit={handleDestroy}>
            <IconButton
              aria-label="Delete reward"
              variantColor="red"
              icon="delete"
            />
          </Confirmation>
        </Stack>
      </Flex>
      <Modal size="full" title="Edit reward" isOpen={isOpen} onClose={onClose}>
        <CourseDailyRewardEditForm onClose={onClose} reward={props.reward} />
      </Modal>
    </>
  )
}

function RewardImageModal(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [updateReward] = useUpdateCourseDayRewardMutation({
    refetchQueries: [
      {
        query: GetCourseRewardsDocument,
        variables: { courseId: props.reward.courseId },
      },
    ],
  })

  const handleSubmit = async (url: string) => {
    const res = await updateReward({
      variables: {
        courseDayRewardId: props.reward.id,
        data: { pictureUrl: url },
      },
    })

    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Updated!",
        })
        onClose()
      },
    })
  }

  return (
    <>
      <IconButton
        position="absolute"
        right="0"
        bottom="0"
        aria-label="Edit reward"
        icon="edit"
        onClick={onOpen}
        variantColor="blue"
      />

      <Modal
        size="md"
        title="Edit reward image"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ImageCreate onClose={onClose} handleUpload={handleSubmit} />
      </Modal>
    </>
  )
}
