import React from "react"
import { useDropzone } from "react-dropzone"
import { FieldError, useFormContext } from "react-hook-form"
import {
  Box,
  FormControl,
  IconButton,
  BoxProps,
  Flex,
  Stack,
  Text,
  Image,
} from "@chakra-ui/core"
import { FileDoc } from "@styled-icons/boxicons-solid/FileDoc"
import { InputError } from "./InputError"
import { InputLabel } from "./InputLabel"

interface Props extends Omit<BoxProps, "onDrop"> {
  name: string
  label?: string
  subLabel?: string
  type?: "image" | "file"
  isRequired?: boolean
}

export const FileInput: React.FC<Props> = ({
  label,
  subLabel,
  type = "file",
  isRequired,
  ...props
}) => {
  const {
    errors,
    unregister,
    register,
    setValue,
    watch,
    clearError,
  } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string

  React.useEffect(() => {
    register({ name: props.name })
    return () => unregister(props.name)
  }, [register, unregister, props.name])

  const file = watch(props.name) as File | string

  const onDrop = React.useCallback(
    (newFile: File[]) => {
      clearError(props.name)
      setValue(props.name, newFile[0])
    },
    [props.name, setValue, clearError],
  )
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  return (
    <FormControl isInvalid={!!fieldError} isRequired={isRequired || false}>
      <InputLabel label={label} subLabel={subLabel} name={props.name} py={1} />
      <Flex
        h="60px"
        w="100%"
        align="center"
        justify="center"
        rounded="md"
        overflow="hidden"
        border={!!fieldError ? "2px solid" : "2px dashed"}
        borderColor={!!fieldError ? "red.500" : "gray.300"}
        textAlign="center"
        color="gray.400"
        bg="gray.100"
        {...props}
      >
        {file ? (
          type === "file" ? (
            <Stack
              isInline
              p={2}
              shouldWrapChildren
              align="center"
              h="100%"
              justify="center"
            >
              <Box {...getRootProps()} w="100%">
                <Stack isInline spacing={2} shouldWrapChildren align="center">
                  <input {...getInputProps()} />
                  <FilePreview file={file} />
                  <IconButton
                    aria-label="edit file"
                    icon="edit"
                    size="sm"
                    color="black"
                    variantColor="gray"
                  />
                </Stack>
              </Box>
              {!isRequired && (
                <IconButton
                  aria-label="remove file"
                  icon="delete"
                  size="sm"
                  onClick={() => setValue(props.name, null)}
                  variantColor="red"
                  variant="ghost"
                />
              )}
            </Stack>
          ) : (
            <Box pos="relative" w="100%" h="100%">
              <Box {...getRootProps()} pos="relative" w="100%" h="100%">
                <input {...getInputProps()} />
                <PreviewImage
                  src={
                    typeof file === "string" ? file : URL.createObjectURL(file)
                  }
                />
                <IconButton
                  aria-label="edit file"
                  icon="edit"
                  size="sm"
                  color="black"
                  variantColor="gray"
                  pos="absolute"
                  bottom={4}
                  left={4}
                />
              </Box>
              <IconButton
                aria-label="remove file"
                icon="delete"
                size="sm"
                onClick={() => setValue(props.name, null)}
                variantColor="red"
                pos="absolute"
                bottom={4}
                right={4}
              />
            </Box>
          )
        ) : (
          <Flex
            {...getRootProps()}
            cursor="pointer"
            w="100%"
            h="100%"
            align="center"
            justify="center"
          >
            <input {...getInputProps()} />
            {props.placeholder || type === "file"
              ? "Click here to upload file"
              : "Click here to upload"}
          </Flex>
        )}
      </Flex>
      <InputError error={fieldError} />
    </FormControl>
  )
}

interface FileProps {
  file: File | string
}

function FilePreview(props: FileProps) {
  return (
    <Flex p={1} bg="white" align="center" boxShadow="sm" rounded="md">
      <Box as={FileDoc} size="16px" color="primary.400" mx={2} />
      <Text maxW="200px" isTruncated color="gray.800" pr={2}>
        {typeof props.file === "string"
          ? props.file.split("/").pop()
          : props.file?.name}
      </Text>
    </Flex>
  )
}

interface PreviewImageProps {
  src: string
}
function PreviewImage(props: PreviewImageProps) {
  return <Image src={props.src} objectFit="cover" h="100%" w="100%" />
}
