import React from "react"
import { Text, Button, Flex, useDisclosure } from "@chakra-ui/core"
import { UserTaskItemFragment } from "../lib/graphql"
import { Modal } from "./Modal"
import { Markup } from "interweave"
import { SelfCreatedTaskItemForm } from "./SelfCreatedTaskItemForm"

interface Props {
  userTask: UserTaskItemFragment
  hideDescription?: boolean
}

export function SelfCreatedTaskItem({ userTask, hideDescription }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {!hideDescription && (
        <Text as="i" mt={6}>
          {userTask?.description}
        </Text>
      )}

      <Markup content={userTask?.fullDescription} />
      <Flex justify="flex-end" mt={8}>
        <Button leftIcon="edit" size="sm" w="fit-content" onClick={onOpen}>
          Edit
        </Button>
      </Flex>

      <Modal
        size="xl"
        title="Edit your practice"
        onClose={onClose}
        isOpen={isOpen}
      >
        <SelfCreatedTaskItemForm userTask={userTask} onClose={onClose} />
      </Modal>
    </>
  )
}
