import React from "react"
import {
  FormLabel,
  Textarea as CTextarea,
  InputProps,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/core"
import { useFormContext, FieldError } from "react-hook-form"

interface Props extends InputProps {
  name: string
  label: string
}

export const Textarea = ({ label, ...props }: Props) => {
  const { register, errors } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string

  return (
    <FormControl isInvalid={!!fieldError} mb={4} isRequired={props.isRequired}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <CTextarea ref={register} mb={0} variant="filled" {...props} />
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
