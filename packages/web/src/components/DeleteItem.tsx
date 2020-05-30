import React from "react"
import { Flex, Text, Button } from "@chakra-ui/core"
import { Confirmation } from "./Confirmation"

interface Props {
  text: string
  handleDestroy: () => void
}

export const DeleteItem: React.FC<Props> = props => {
  return (
    <Flex fontSize="sm" mt={8} align="center">
      <Text>Or</Text>
      <Confirmation onSubmit={props.handleDestroy}>
        <Button
          w="fit-content"
          ml={2}
          size="sm"
          mt="1px"
          leftIcon="delete"
          variant="ghost"
          variantColor="red"
        >
          delete
        </Button>
      </Confirmation>
      <Text>{props.text}</Text>
    </Flex>
  )
}
