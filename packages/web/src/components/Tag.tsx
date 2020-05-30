import React from "react"
import { Tag as CTag } from "@chakra-ui/core"

export const Tag = ({ ...props }) => {
  return (
    <CTag
      w="fit-content"
      h="fit-content"
      size="sm"
      variantColor="green"
      color="white"
      whiteSpace="nowrap"
      {...props}
    >
      {props.children}
    </CTag>
  )
}
