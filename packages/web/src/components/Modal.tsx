import React from "react"

import {
  Modal as CModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  IModal,
  useColorMode,
} from "@chakra-ui/core"

interface Props extends IModal {
  title: string
}
export const Modal: React.FC<Props> = props => {
  const { colorMode } = useColorMode()
  const bg = { dark: "gray.800", light: "white" }
  return (
    <CModal {...props}>
      <ModalOverlay />
      <ModalContent bg={bg[colorMode]} borderRadius="lg">
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.children}</ModalBody>
      </ModalContent>
    </CModal>
  )
}
