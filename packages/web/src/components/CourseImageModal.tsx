import React from "react"
import { useDisclosure, IconButton } from "@chakra-ui/core"
import { Modal } from "./Modal"
import { CourseImageCreateForm } from "./CourseImageCreateForm"

interface Props {
  courseId?: string
  levelId?: string
}

export const CourseImageModal = ({ courseId, levelId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        // @ts-ignore
        zIndex="99"
        bottom="0"
        right="0"
        position="absolute"
        variantColor="blue"
        aria-label="Edit image"
        icon="edit"
        onClick={onOpen}
      />
      <Modal title="Upload image" isOpen={isOpen} onClose={onClose}>
        <CourseImageCreateForm
          onClose={onClose}
          courseId={courseId}
          levelId={levelId}
        />
      </Modal>
    </>
  )
}
