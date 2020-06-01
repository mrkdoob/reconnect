import React from "react"
import { FormLabel, Text } from "@chakra-ui/core"
import { FormLabelProps } from "@chakra-ui/core/dist/FormLabel"

interface Props extends Omit<FormLabelProps, "children"> {
  name?: string
  label?: string
  subLabel?: string
}

export const InputLabel: React.FC<Props> = props => {
  if (!props.label) return null
  return (
    <FormLabel htmlFor={props.name} {...props}>
      {props.label}
      {props.subLabel && (
        <Text ml={2} as="span" fontSize="0.8rem" color="gray.600">
          {props.subLabel}
        </Text>
      )}
    </FormLabel>
  )
}
