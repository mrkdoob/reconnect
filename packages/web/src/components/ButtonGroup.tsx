import React from "react"

import { ButtonGroup as CButtonGroup, ButtonGroupProps } from "@chakra-ui/core"

export const ButtonGroup: React.FC<ButtonGroupProps> = props => (
  <CButtonGroup
    spacing={4}
    display="flex"
    flexWrap="wrap"
    justifyContent="flex-end"
    alignItems="center"
    {...props}
  >
    {props.children}
  </CButtonGroup>
)
