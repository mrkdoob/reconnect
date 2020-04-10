import React, { useState } from "react"
import { Flex, Box, Icon, Collapse } from "@chakra-ui/core"
import gql from "graphql-tag.macro"
import {
  UserTaskItemFragment,
  UserTaskItemFragmentDoc,
  useUpdateUserTaskMutation,
  UserTaskOptionItemFragmentDoc,
} from "../lib/graphql"
import { mutationHandler } from "../lib/mutationHandler"
import { useToggle } from "../lib/hooks/useToggle"
import { LevelTaskItem } from "./LevelTaskItem"

export const USER_TASK_OPTION_ITEM = gql`
  fragment UserTaskOptionItem on LevelTaskOption {
    id
    order
    options {
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
    option {
      id
      label
      description
      fullDescription
      videoUrl
    }
  }
`

export const USER_TASK = gql`
  fragment UserTaskItem on UserTask {
    id
    completed
    levelTaskId
    levelTaskOptionId
    levelTaskOption {
      ...UserTaskOptionItem
    }
  }
  ${UserTaskOptionItemFragmentDoc}
`

export const UPDATE_USERTASK = gql`
  mutation UpdateUserTask($taskId: String!, $data: UpdateUserTaskInput!) {
    updateUserTask(taskId: $taskId, data: $data) {
      ...UserTaskItem
    }
  }
  ${UserTaskItemFragmentDoc}
`

interface Props {
  task: UserTaskItemFragment
  isLast: boolean
  handleTaskCompletion: (
    completedTask: UserTaskItemFragment | null | undefined,
  ) => void
}

export function UserTaskItem({ task, isLast, handleTaskCompletion }: Props) {
  const [complete, setComplete] = useState(task.completed)
  const [descriptionOpen, toggleDescription] = useToggle({ default: false })

  const [updateTask] = useUpdateUserTaskMutation()

  const handleComplete = async () => {
    if (complete) {
      return
    }

    setComplete(true) // TODO: Why not working?

    const res = await updateTask({
      variables: {
        taskId: task.id,
        data: { completed: true },
      },
    })
    mutationHandler(res, {
      onSuccess: data => {
        // TODO: update cache
        if (!data) return
        handleTaskCompletion(data.updateUserTask)
      },
    })
  }

  return (
    <Box>
      <Flex align="center">
        <Flex
          border={complete ? "2px solid" : "2px solid"}
          h={6}
          w={6}
          rounded="md"
          bg={complete ? "green.400" : "white"}
          borderColor={complete ? "green.400" : "gray.200"}
          color="white"
          justify="center"
          align="center"
          onClick={handleComplete}
          cursor="pointer"
        >
          <Icon name="check" size="16px" />
        </Flex>
        <Flex justify="space-between" w="100%" py={4} align="center">
          <Box
            onClick={handleComplete}
            cursor="pointer"
            as="span"
            verticalAlign="top"
            ml={6}
            fontSize="lg"
            color={complete ? "gray.400" : "text"}
            textDecoration={complete ? "line-through" : ""}
          >
            {task.levelTaskOption?.option?.description}
          </Box>
          <Icon
            size="1.5rem"
            color="gray.300"
            onClick={toggleDescription}
            cursor="pointer"
            name={descriptionOpen ? "chevron-up" : "chevron-down"}
            transform="0.3s ease-in-out"
          />
        </Flex>
      </Flex>
      <Collapse mt={2} isOpen={descriptionOpen}>
        <LevelTaskItem userTask={task} hideDescription={true} />
      </Collapse>

      {/* TODO: move divider */}
      {!isLast && (
        <Box
          height="2px"
          width="80%"
          bg="gray.100"
          margin="0 auto"
          borderRadius="lg"
          my={4}
        />
      )}
    </Box>
  )
}
