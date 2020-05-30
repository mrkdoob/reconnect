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
  Stack,
  Tag,
  useToast,
} from "@chakra-ui/core"
import {
  LevelTaskItemFragment,
  LevelTaskOptionItemFragment,
  useDestroyLevelTaskMutation,
  GetLevelTasksDocument,
} from "../lib/graphql"
import { Modal } from "./Modal"
import { Markup } from "interweave"
import { CourseLevelTaskOptionEditForm } from "./CourseLevelTaskOptionEditForm"
import { CourseLevelTaskCreateForm } from "./CourseLevelTaskCreateForm"
import { CourseLevelTaskOptions } from "./CourseLevelTaskOptions"
import { mutationHandler } from "../lib/mutationHandler"
import { DeleteItem } from "./DeleteItem"

interface Props {
  levelTask: LevelTaskItemFragment
}

export function CourseLevelTaskAdminItem({ levelTask }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showCreate, setShowCreate] = React.useState(false)
  const [showExistingOptions, setShowExistingOptions] = React.useState(false)
  const toast = useToast()

  const [destroyLevelTask] = useDestroyLevelTaskMutation({
    refetchQueries: [
      {
        query: GetLevelTasksDocument,
        variables: { levelId: levelTask.levelId },
      },
    ],
  })

  const handleDestroy = async () => {
    const res = await destroyLevelTask({
      variables: { levelTaskId: levelTask.id },
    }).catch(e => {})
    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Successfully deleted!",
        })
        onClose()
      },
      onServerError: e => {
        const description = e.includes("violates foreign key")
          ? "Remove all options first"
          : "Oops.. something went wrong"
        toast({
          status: "error",
          description: description,
          duration: 9000,
        })
      },
    })
  }

  return (
    <>
      {levelTask.options && levelTask.options.length > 0 ? (
        <>
          <Text as="i" mt={4}>
            {levelTask.options[0].option?.description}
          </Text>

          <Markup content={levelTask.options[0].option?.fullDescription} />
          {levelTask.options[0].option?.videoUrl && (
            <>
              <AspectRatioBox ratio={4 / 3}>
                <Box
                  mt={6}
                  as="iframe"
                  title="task video"
                  // @ts-ignore
                  src={levelTask.options[0].option?.videoUrl || ""}
                  allowFullScreen
                  borderRadius="lg"
                />
              </AspectRatioBox>
              <Box mb={6} />
            </>
          )}
        </>
      ) : (
        <>
          <Text mt={4}>Task {levelTask.order}</Text>
          <Text>No option for this task yet</Text>
        </>
      )}
      {levelTask.options && (
        <Flex justify="flex-end" mt={8} w="100%">
          <Button
            leftIcon="edit"
            size="sm"
            w="fit-content"
            onClick={onOpen}
            mb={4}
          >
            More options
          </Button>
        </Flex>
      )}

      <Modal
        size={showExistingOptions ? "full" : "xl"}
        title="More options"
        onClose={onClose}
        isOpen={isOpen}
      >
        <Box w="100%" h="100%">
          {showCreate ? (
            <>
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
                    order={levelTask.options ? levelTask.options.length : 1}
                    levelTaskId={levelTask.id}
                    onClose={() => {
                      setShowExistingOptions(false)
                      setShowCreate(false)
                    }}
                    levelId={levelTask.levelId}
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
                    onClose={() => setShowCreate(false)}
                    levelId={levelTask.levelId}
                    levelTaskId={levelTask.id}
                    order={levelTask.options ? levelTask.options.length : 1}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Flex justify="flex-end">
                <Button
                  size="sm"
                  variantColor="blue"
                  leftIcon="add"
                  onClick={() => setShowCreate(true)}
                >
                  Add
                </Button>
              </Flex>
              {levelTask.options &&
                levelTask.options.map((option, index) => (
                  <React.Fragment key={option.id}>
                    <LevelTaskOptionItem
                      taskOption={option}
                      levelId={levelTask.levelId}
                    />

                    {levelTask.options &&
                      index !== levelTask.options.length - 1 && (
                        <Box height="2px" bg="gray.100" borderRadius="lg" />
                      )}
                  </React.Fragment>
                ))}
            </>
          )}
          <DeleteItem text="this task" handleDestroy={handleDestroy} />
        </Box>
      </Modal>
    </>
  )
}

interface OptionProps {
  taskOption: LevelTaskOptionItemFragment
  levelId?: string | null
}

function LevelTaskOptionItem({ taskOption, levelId }: OptionProps) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [showEdit, setShowEdit] = React.useState(false)

  const labels = taskOption?.option?.label
    ? taskOption?.option?.label.split(",")
    : []

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
        {!showEdit ? (
          <>
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
                leftIcon="edit"
                onClick={() => setShowEdit(true)}
              >
                Edit
              </Button>
            </Flex>
          </>
        ) : (
          <>
            {taskOption?.option && (
              <CourseLevelTaskOptionEditForm
                levelTaskOptionId={taskOption?.id}
                onClose={() => setShowEdit(false)}
                option={taskOption?.option}
                levelId={levelId}
              />
            )}
          </>
        )}
      </Collapse>
    </Box>
  )
}
