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
  SlideIn,
} from "@chakra-ui/core"
import { styled } from "./providers/ThemeProvider"

interface Props extends IModal {
  title?: string
  isOpen: boolean
  textAlign?: string
}
export const Modal: React.FC<Props> = props => {
  const { colorMode } = useColorMode()
  const bg = { dark: "gray.800", light: "white" }
  return (
    <>
      {/* 
    // @ts-ignore */}
      <SlideIn in={props.isOpen}>
        {/* // eslint-disable-next-line react/jsx-no-undef */}
        {(styles: any) => (
          <CModal {...props}>
            <ModalOverlay opacity={styles.opacity} />
            <StyledModalContent
              bg={bg[colorMode]}
              p={2}
              {...styles}
              borderRadius="lg"
              textAlign={props.textAlign}
            >
              <ModalHeader>{props.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{props.children}</ModalBody>
            </StyledModalContent>
          </CModal>
        )}
      </SlideIn>
    </>
  )
}

const StyledModalContent = styled(ModalContent)`
  /* border-top: 3px solid ${p => p.theme.colors.blue[400]};
  border-left: 3px solid ${p => p.theme.colors.blue[200]};
  border-right: 3px solid ${p => p.theme.colors.green[100]};
  border-bottom: 3px solid ${p => p.theme.colors.green[400]}; */
`
