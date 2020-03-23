import React from "react"
import {
  FormLabel,
  Select as CSelect,
  SelectProps,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/core"
import { useFormContext, FieldError } from "react-hook-form"

interface Props extends SelectProps {
  name: string
  label?: string
  options: any[]
}

export const Select = ({ label, placeholder, ...props }: Props) => {
  const { register, errors } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string
  return (
    <FormControl isInvalid={!!fieldError} mb={4} isRequired={props.isRequired}>
      {label && <FormLabel htmlFor={props.name}>{label}</FormLabel>}
      <CSelect ref={register} mb={0} variant="filled" {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {props.options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </CSelect>
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
