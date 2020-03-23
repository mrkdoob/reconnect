import React from "react"
import { InputProps, FormControl, Input } from "@chakra-ui/core"
import { useFormContext } from "react-hook-form"

interface InlineInputProps extends InputProps {
  name: string
}
export function InlineInput(props: InlineInputProps) {
  const { register, errors } = useFormContext()
  const error = errors?.[props.name]
  return (
    <FormControl isInvalid={!!error} w={props.w} mr={props.mr}>
      <Input
        ref={register}
        bg="transparent"
        variant="filled"
        fontWeight="semibold"
        mr={0}
        {...props}
        w="100%"
      />
    </FormControl>
  )
}
