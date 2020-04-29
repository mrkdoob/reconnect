import React from "react"
import { FormControl, FormErrorMessage } from "@chakra-ui/core"
import { useFormContext, FormContextValues } from "react-hook-form"

interface Props {
  error?: string
}
export const FormError: React.FC<Props> = props => {
  const { appError } = useFormContext() as FormContextValues<
    Record<string, any>
  > & { appError?: string }
  if (!appError && !props.error) return null
  return (
    <FormControl isInvalid={!!appError || !!props.error}>
      <FormErrorMessage>{appError || props.error}</FormErrorMessage>
    </FormControl>
  )
}
