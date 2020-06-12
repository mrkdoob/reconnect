import React from "react"
import gql from "graphql-tag"
import { Button, Stack, useToast, Text, Flex } from "@chakra-ui/core"

import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "./Form"
import { Input } from "./Input"
import { FormError } from "./FormError"
import { useForgotPasswordMutation } from "../lib/graphql"

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
})
interface Props {
  handleClick: () => void
}
export const ForgotPasswordForm: React.FC<Props> = props => {
  const toast = useToast()
  const [success, setSuccess] = React.useState<boolean>(false)

  const form = useForm({
    defaultValues: { password: "" },
    validationSchema: ForgotSchema,
  })

  const [forgotPassword] = useForgotPasswordMutation()

  const handleSubmit = async (data: { email: string }) => {
    const res = await forgotPassword({ variables: { email: data.email } })

    return form.handler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          description: "An email with instruction has been sent",
        })
        setSuccess(true)
      },
    })
  }

  return (
    <>
      {success ? (
        <Flex direction="column" align="center">
          <Text textAlign="center">Check your email for instructions.</Text>
          <Button
            variantColor="blue"
            variant="link"
            loadingText="loading"
            mt={8}
            onClick={() => props.handleClick()}
          >
            Return to login
          </Button>
        </Flex>
      ) : (
        <Form onSubmit={handleSubmit} {...form}>
          <Stack spacing={4} shouldWrapChildren>
            <Text>
              Don't worry! You may have forgotten your password, but we can help
              you out. Enter your email below and we'll email you a link to
              reset your password.
            </Text>
            <Input
              name="email"
              label="Your email adress"
              type="email"
              isRequired={true}
              placeholder="jim@gmail.com"
            />
            <Button
              type="submit"
              variantColor="blue"
              isLoading={form.formState.isSubmitting}
            >
              Reset password
            </Button>
            <Button
              variantColor="blue"
              variant="link"
              loadingText="loading"
              size="xs"
              mt={4}
              onClick={() => props.handleClick()}
            >
              Return to login
            </Button>
            <FormError />
          </Stack>
        </Form>
      )}
    </>
  )
}
