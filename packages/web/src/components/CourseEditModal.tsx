import React from "react"
import { useDisclosure, Button } from "@chakra-ui/core"
import { Modal } from "./Modal"
import { CourseEditForm } from "./CourseEditForm"
import { CourseItemFragment } from "../lib/graphql"

interface Props {
  course: CourseItemFragment
}

export const CourseEditModal = ({ course }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        // @ts-ignore
        zIndex="99"
        top="0"
        right="0"
        position="absolute"
        variantColor="blue"
        aria-label="Edit course"
        leftIcon="edit"
        onClick={onOpen}
      >
        Edit course
      </Button>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <CourseEditForm onClose={onClose} course={course} />
      </Modal>
    </>
  )
}
