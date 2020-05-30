import React from "react"
import { useDisclosure, Button } from "@chakra-ui/core"
import { Modal } from "./Modal"
import {
  LevelTaskItemFragmentDoc,
  useGetLevelTasksQuery,
  useCreateLevelTaskMutation,
  GetLevelTasksDocument,
} from "../lib/graphql"
import gql from "graphql-tag.macro"
import { CourseLevelTaskCreateForm } from "./CourseLevelTaskCreateForm"
import { mutationHandler } from "../lib/mutationHandler"
import { CourseLevelTaskAdminItem } from "./CourseLevelTaskAdminItem"

interface Props {
  levelId: string
}

export const GET_LEVEL_TASKS = gql`
  query GetLevelTasks($levelId: String!) {
    getLevel(levelId: $levelId) {
      id
      levelTasks {
        ...LevelTaskItem
      }
    }
  }
  ${LevelTaskItemFragmentDoc}
`

export const CREATE_LEVEL_TASK = gql`
  mutation CreateLevelTask($data: CreateLevelTaskInput!) {
    createLevelTask(data: $data) {
      ...LevelTaskItem
    }
  }
  ${LevelTaskItemFragmentDoc}
`

export const CourseLevelTaskCreateModal = ({ levelId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [levelTaskId, setLevelTaskId] = React.useState("")

  const { data } = useGetLevelTasksQuery({ variables: { levelId } })
  const [createLevelTask] = useCreateLevelTaskMutation({
    refetchQueries: [{ query: GetLevelTasksDocument, variables: { levelId } }],
  })
  const levelTasks = data?.getLevel.levelTasks

  const createTaskHandler = async () => {
    const res = await createLevelTask({
      variables: {
        data: { order: levelTasks ? levelTasks.length + 1 : 1, levelId },
      },
    })

    mutationHandler(res, {
      onSuccess: res => {
        setLevelTaskId(res.createLevelTask.id)
        onOpen()
      },
    })
  }

  return (
    <>
      <Button
        variantColor="blue"
        aria-label="Create task"
        leftIcon="edit"
        onClick={createTaskHandler}
        mb={4}
      >
        Create new task
      </Button>
      {levelTaskId !== "" && (
        <Modal
          size="xl"
          title="Create a task"
          isOpen={isOpen}
          onClose={onClose}
        >
          <CourseLevelTaskCreateForm
            onClose={onClose}
            levelId={levelId}
            levelTaskId={levelTaskId}
          />
        </Modal>
      )}
      {levelTasks?.map(task => (
        <React.Fragment key={task.id}>
          <CourseLevelTaskAdminItem levelTask={task} />
        </React.Fragment>
      ))}
    </>
  )
}
