import React from "react"
import { Text } from "@chakra-ui/core"
import { UserTaskItemFragment } from "../lib/graphql"
import { UserTaskItem } from "./UserTaskItem"

interface Props {
  tasks?: UserTaskItemFragment[] | null
  handleDayCompletion: () => void
}

export function UserTaskList({ tasks, handleDayCompletion }: Props) {
  const handleTaskCompletion = (
    completedTask: UserTaskItemFragment | null | undefined,
  ) => {
    if (!completedTask) return

    let allCompleted = true
    tasks?.forEach(task => {
      if (task.id !== completedTask.id && !task.completed) {
        allCompleted = false
        return
      }
    })

    if (allCompleted) handleDayCompletion()
  }

  return (
    <>
      <Text mb={4} fontSize="sm" fontWeight="semibold">
        Daily practice
      </Text>
      {/* TODO: Seperate component & query? */}
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task, index) => (
          // TODO: Move divider here
          <UserTaskItem
            key={task.id}
            task={task}
            isLast={index === tasks.length - 1}
            handleTaskCompletion={handleTaskCompletion}
          />
        ))}
    </>
  )
}
