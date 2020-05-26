import React from "react"
import { useDisclosure, Button } from "@chakra-ui/core"
import { Modal } from "./Modal"
import { CourseLevelCreateForm } from "./CourseLevelCreateForm"

interface Props {
  courseId: string
}

export const CourseLevelCreateModal = ({ courseId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        variantColor="blue"
        aria-label="Create level"
        leftIcon="edit"
        onClick={onOpen}
        mb={4}
      >
        Create level
      </Button>
      <Modal size="xl" title="Create a level" isOpen={isOpen} onClose={onClose}>
        <CourseLevelCreateForm onClose={onClose} courseId={courseId} />
      </Modal>
    </>
  )
}
