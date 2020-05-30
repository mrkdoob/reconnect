import React from "react"
import { useDisclosure, Button } from "@chakra-ui/core"
import { Modal } from "./Modal"
import {
  LevelTaskItemFragmentDoc,
  useGetLevelTasksQuery,
  useCreateLevelTaskMutation,
  GetLevelTasksDocument,
  useDestroyLevelTaskMutation,
} from "../lib/graphql"
import gql from "graphql-tag.macro"
import { CourseLevelTaskCreateForm } from "./CourseLevelTaskCreateForm"
import { mutationHandler } from "../lib/mutationHandler"
import { CourseLevelTaskAdminItem } from "./CourseLevelTaskAdminItem"
import { CourseLevelTaskOptions } from "./CourseLevelTaskOptions"

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

export const DESTROY_LEVELTASK = gql`
  mutation DestroyLevelTask($levelTaskId: String!) {
    destroyLevelTask(levelTaskId: $levelTaskId)
  }
`

export const CourseLevelTaskCreateModal = ({ levelId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [levelTaskId, setLevelTaskId] = React.useState("")
  const [showExistingOptions, setShowExistingOptions] = React.useState(false)

  const { data } = useGetLevelTasksQuery({ variables: { levelId } })
  const [createLevelTask] = useCreateLevelTaskMutation({
    refetchQueries: [{ query: GetLevelTasksDocument, variables: { levelId } }],
  })
  const [destroyLevelTask] = useDestroyLevelTaskMutation({
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

  const handleCancel = async () => {
    const res = await destroyLevelTask({
      variables: {
        levelTaskId,
      },
    })

    mutationHandler(res, {
      onSuccess: () => {
        onClose()
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
          size={showExistingOptions ? "full" : "xl"}
          title="Create a task"
          isOpen={isOpen}
          onClose={handleCancel}
        >
          {showExistingOptions ? (
            <>
              <Button
                variant="link"
                variantColor="blue"
                mb={4}
                onClick={() => setShowExistingOptions(false)}
              >
                Back
              </Button>
              <CourseLevelTaskOptions
                order={1}
                levelTaskId={levelTaskId}
                onClose={() => setShowExistingOptions(false)}
                levelId={levelId}
              />
            </>
          ) : (
            <>
              <Button
                variant="link"
                variantColor="blue"
                mb={4}
                onClick={() => setShowExistingOptions(true)}
              >
                Select from existing options
              </Button>
              <CourseLevelTaskCreateForm
                onClose={onClose}
                onCancel={handleCancel}
                levelId={levelId}
                levelTaskId={levelTaskId}
                order={1}
              />
            </>
          )}
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
