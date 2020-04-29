import React from "react"
import gql from "graphql-tag"
import { Heading, Button, Stack, useToast, Flex } from "@chakra-ui/core"

import { RouteComponentProps, navigate } from "@reach/router"
import Yup from "../lib/yup"
import { useForm } from "../lib/hooks/useForm"
import { Page } from "../components/Page"
import { Form } from "../components/Form"
import { Input } from "../components/Input"
import { FormError } from "../components/FormError"
import { ResetPasswordInput, useResetPasswordMutation } from "../lib/graphql"

export const RESET_PASSWORD = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(8, "Must be at least 8 characters"),
  // .matches(new RegExp("^((?=.*[A-Z])(?=.*[0-9]))"), {
  //   message: "Must contain one uppercase character and one number",
  // }),
})

interface Props extends RouteComponentProps {
  token?: string
}

export const ResetPassword: React.FC<Props> = props => {
  const toast = useToast()
  const [success, setSuccess] = React.useState<boolean>(false)

  const token = props.token as string

  const form = useForm({
    defaultValues: { password: "" },
    validationSchema: PasswordSchema,
  })

  const [resetPassword] = useResetPasswordMutation()

  const handleSubmit = async (data: ResetPasswordInput) => {
    const res = await resetPassword({ variables: { data: { ...data, token } } })

    return form.handler(res, {
      onSuccess: () => {
        toast({ status: "success", description: "Password updated" })
        setSuccess(true)
      },
    })
  }

  return (
    <Page disableRedirect={true}>
      {success ? (
        <Stack spacing={4} shouldWrapChildren mt="100px">
          <Heading as="h3" fontSize="1.4rem">
            Password updated!
          </Heading>
          <Button onClick={() => navigate("/login")} variantColor="blue">
            Go to login
          </Button>
        </Stack>
      ) : (
        <Flex align="center" mt="100px">
          <Form onSubmit={handleSubmit} {...form}>
            <Stack spacing={4} shouldWrapChildren>
              <Heading>Reset your password</Heading>
              <Input
                name="password"
                label="New password"
                type="password"
                isRequired={true}
                placeholder="********"
              />
              <Button
                type="submit"
                variantColor="blue"
                isLoading={form.formState.isSubmitting}
              >
                Submit
              </Button>
              <FormError />
            </Stack>
          </Form>
        </Flex>
      )}
    </Page>
  )
}
