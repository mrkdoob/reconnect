import React from "react"
import { Box, Flex } from "@chakra-ui/core"
import { Badge } from "styled-icons/boxicons-regular/Badge"

export const Border = ({ ...props }) => {
  return (
    <Flex align="center" justify="center" {...props}>
      <Box
        height="1px"
        backgroundColor="gray.200"
        w={{ base: "32", md: "56" }}
      />
      <Box as={Badge} h={8} mx={4} color="blue.500" />
      <Box
        height="1px"
        backgroundColor="gray.200"
        w={{ base: "32", md: "56" }}
      />
    </Flex>
  )
}
