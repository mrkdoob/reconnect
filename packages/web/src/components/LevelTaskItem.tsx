import React from "react"
import {
  Text,
  Box,
  AspectRatioBox,
  Button,
  Flex,
  useDisclosure,
  Icon,
  Collapse,
  Tag,
  Stack,
  useToast,
} from "@chakra-ui/core"
import {
  LevelTaskItemFragment,
  LevelTaskOptionItemFragmentDoc,
  LevelTaskOptionItemFragment,
  useUpdateUserTaskMutation,
  UserTaskItemFragment,
} from "../lib/graphql"
import gql from "graphql-tag.macro"
import { Modal } from "./Modal"
import { mutationHandler } from "../lib/mutationHandler"

export const LEVEL_TASK_OPTION_ITEM = gql`
  fragment LevelTaskOptionItem on LevelTaskOption {
    id
    order
    label
    description
    fullDescription
    videoUrl
  }
`

export const LEVEL_TASK_ITEM = gql`
  fragment LevelTaskItem on LevelTask {
    id
    order
    description
    fullDescription
    videoUrl
    options {
      ...LevelTaskOptionItem
    }
  }
  ${LevelTaskOptionItemFragmentDoc}
`

interface Props {
  levelTask?: LevelTaskItemFragment
  userTask?: UserTaskItemFragment
  hideDescription?: boolean
}

export function LevelTaskItem({ levelTask, userTask, hideDescription }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const task = userTask
    ? userTask.levelTaskOptionId
      ? userTask.levelTaskOption
      : userTask.levelTask
    : levelTask

  return (
    <>
      <Text as="i" mt={6}>
        {!hideDescription && task?.description}
      </Text>
      <Text>{task?.fullDescription}</Text>
      {task?.videoUrl && (
        <>
          <AspectRatioBox ratio={4 / 3}>
            <Box
              mt={6}
              as="iframe"
              title="task video"
              // @ts-ignore
              src={task.videoUrl || ""}
              allowFullScreen
              borderRadius="lg"
            />
          </AspectRatioBox>
          <Box mb={6} />
        </>
      )}
      {task?.options && task?.options?.length > 0 && (
        <Flex justify="flex-end" mt={8}>
          <Button size="sm" w="fit-content" onClick={onOpen}>
            More options
          </Button>
        </Flex>
      )}

      <Modal
        size="xl"
        title="Select a different practice"
        onClose={onClose}
        isOpen={isOpen}
      >
        <Box w="100%">
          <Text>{task?.description} is currently selected.</Text>
          {task?.options?.map((option, index) => (
            <React.Fragment key={option.id}>
              <LevelTaskOptionItem
                option={option}
                taskId={userTask?.id}
                modalClose={onClose}
              />
              {task?.options && index !== task?.options?.length - 1 && (
                <Box height="2px" bg="gray.100" borderRadius="lg" />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Modal>
    </>
  )
}

interface OptionProps {
  option: LevelTaskOptionItemFragment
  taskId?: string
  modalClose: () => void
}

function LevelTaskOptionItem({ option, taskId, modalClose }: OptionProps) {
  const [
    updateTask,
  ] = useUpdateUserTaskMutation(/*{
    update: (cache, res) => {
      if (res.data) {
        cache.writeQuery({
          query: GetCurrentLevelRewardDocument,
          data: {
            levelTaskOptionId: res.data.updateUserTask?.levelTaskOptionId,
          },
        })
      }
    },
  }*/)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const toast = useToast()
  const labels = option.label ? option.label.split(",") : []

  const handleSelect = async (levelTaskOptionId: string) => {
    if (!taskId) return

    modalClose()
    const res = await updateTask({
      variables: {
        taskId,
        data: { levelTaskOptionId },
      },
    })
    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Good luck with your practice!",
        })
      },
    })
  }

  return (
    <Box my={8}>
      <Flex
        justify="space-between"
        align="center"
        direction={{ base: "column", md: "row" }}
        cursor="pointer"
        onClick={isOpen ? onClose : onOpen}
      >
        <Flex align="center" justify={{ base: "space-between", md: "center" }}>
          <Text fontWeight="semibold" mr={4}>
            {option.description}
          </Text>
          <Icon
            size="1.5rem"
            color="gray.300"
            name={isOpen ? "chevron-up" : "chevron-down"}
            transform="0.3s ease-in-out"
          />
        </Flex>
        <Stack spacing={4} isInline justify="flex-end" mt={{ base: 4, md: 0 }}>
          {labels.map(label => (
            <Tag
              key={label}
              w="fit-content"
              h="fit-content"
              size="sm"
              variantColor="green"
              color="white"
              whiteSpace="nowrap"
            >
              {label}
            </Tag>
          ))}
        </Stack>
      </Flex>
      <Collapse isOpen={isOpen} mt={4}>
        <Text>{option.fullDescription}</Text>
        {option.videoUrl && (
          <>
            <AspectRatioBox ratio={4 / 3}>
              <Box
                mt={6}
                as="iframe"
                title="task video"
                // @ts-ignore
                src={option.videoUrl || ""}
                allowFullScreen
                borderRadius="lg"
              />
            </AspectRatioBox>
            <Box mb={12} />
            <Flex justify="flex-end">
              <Button onClick={onClose} px={8} mr={4} variant="ghost">
                Hide
              </Button>
              <Button
                px={8}
                variantColor="blue"
                onClick={() => handleSelect(option.id)}
              >
                Select
              </Button>
            </Flex>
          </>
        )}
      </Collapse>
    </Box>
  )
}
