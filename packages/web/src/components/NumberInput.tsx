import React from "react"
import {
  FormLabel,
  NumberInput as CNumberInput,
  NumberInputField,
  InputProps,
  FormErrorMessage,
  FormControl,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/core"
import { useFormContext, FieldError } from "react-hook-form"

interface Props extends InputProps {
  name: string
  label: string
}

export const NumberInput = ({ label, ...props }: Props) => {
  const { register, errors } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string

  return (
    <FormControl isInvalid={!!fieldError} mb={4}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <CNumberInput>
        <NumberInputField ref={register} mb={0} variant="filled" {...props} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </CNumberInput>
      {fieldError &&
        (typeof fieldError === "string" ? (
          <FormErrorMessage>{fieldError}</FormErrorMessage>
        ) : (
          fieldError.types &&
          Object.values(fieldError.types).map((error, i) => (
            <FormErrorMessage key={i}>{error}</FormErrorMessage>
          ))
        ))}
    </FormControl>
  )
}
