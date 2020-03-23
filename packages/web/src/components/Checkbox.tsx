import React from "react"
import {
  FormLabel,
  Checkbox as CCheckbox,
  CheckboxProps,
  FormControl,
  Box,
} from "@chakra-ui/core"
import { useFormContext, FieldError } from "react-hook-form"
import { InputError } from "./InputError"

interface Props extends CheckboxProps {
  name: string
  label?: string
}

export const Checkbox = ({ label, ...props }: Props) => {
  const { register, errors } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string
  return (
    <FormControl isInvalid={!!fieldError} mb={0}>
      {label && <FormLabel htmlFor={props.name}>{label}</FormLabel>}
      <Box>
        <CCheckbox
          ref={register}
          mb={0}
          variantColor="primary"
          size="lg"
          {...props}
        />
      </Box>
      <InputError error={fieldError} />
    </FormControl>
  )
}
