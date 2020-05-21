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
import { Markup } from "interweave"

export const LEVEL_TASK_OPTION_ITEM = gql`
  fragment LevelTaskOptionItem on LevelTaskOption {
    id
    order
    option {
      id
      label
      description
      fullDescription
      videoUrl
    }
  }
`

export const LEVEL_TASK_ITEM = gql`
  fragment LevelTaskItem on LevelTask {
    id
    order
    description
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

// TODO: Seperate components for levelTask and userTask?

export function LevelTaskItem({ levelTask, userTask, hideDescription }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const task =
    levelTask && levelTask.options
      ? levelTask.options[0].option
      : userTask?.levelTaskOption?.option

  const otherOptions =
    levelTask && levelTask.options
      ? levelTask.options
      : userTask?.levelTaskOption?.options

  return (
    <>
      <Text as="i" mt={6}>
        {!hideDescription && task?.description}
      </Text>

      <Markup content={task?.fullDescription} />
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
      {otherOptions && otherOptions.length > 1 && (
        <Flex justify="flex-end" mt={8}>
          <Button leftIcon="edit" size="sm" w="fit-content" onClick={onOpen}>
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
          {otherOptions &&
            otherOptions.map((option, index) => (
              <React.Fragment key={option.id}>
                <LevelTaskOptionItem
                  taskOption={option}
                  taskId={userTask?.id}
                  modalClose={onClose}
                />
                {otherOptions && index !== otherOptions.length - 1 && (
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
  taskOption: LevelTaskOptionItemFragment
  taskId?: string
  modalClose: () => void
}

function LevelTaskOptionItem({ taskOption, taskId, modalClose }: OptionProps) {
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
  const labels = taskOption?.option?.label
    ? taskOption?.option?.label.split(",")
    : []

  const handleSelect = async (levelTaskOptionId: string | undefined) => {
    if (!taskId || !levelTaskOptionId) return

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
            {taskOption?.option?.description}
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
        <Markup content={taskOption?.option?.fullDescription} />

        {taskOption?.option?.videoUrl && (
          <>
            <AspectRatioBox ratio={4 / 3}>
              <Box
                mt={6}
                as="iframe"
                title="task video"
                // @ts-ignore
                src={taskOption?.option?.videoUrl || ""}
                allowFullScreen
                borderRadius="lg"
              />
            </AspectRatioBox>
            <Box mb={12} />
          </>
        )}
        <Flex justify="flex-end" mt={4}>
          <Button onClick={onClose} px={8} mr={4} variant="ghost">
            Hide
          </Button>
          <Button
            px={8}
            variantColor="blue"
            onClick={() => handleSelect(taskOption?.id)}
          >
            Select
          </Button>
        </Flex>
      </Collapse>
    </Box>
  )
}
