import React, { useState } from "react"
import { Flex, Box, Button, Text, useToast } from "@chakra-ui/core"
import gql from "graphql-tag.macro"
import * as Yup from "yup"
import { RouteComponentProps, Link, Redirect } from "@reach/router"
import { useApolloClient } from "@apollo/client"

import { Input } from "../components/Input"
import {
  MeFragmentDoc,
  useLoginMutation,
  MeQuery,
  MeDocument,
  LoginInput,
} from "../lib/graphql"

import { useForm } from "../lib/hooks/useForm"
import { Form } from "../components/Form"
import { useMe } from "../components/providers/MeProvider"
import { colors } from "../lib/colors"
import { ForgotPasswordForm } from "../components/ForgotPasswordForm"

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().min(6, "Must be at least 6 characters"),
})

export const Login: React.FC<RouteComponentProps> = () => {
  const client = useApolloClient()
  const [login] = useLoginMutation()
  const form = useForm({ validationSchema: LoginSchema })
  const me = useMe()
  const toast = useToast()
  const [showForgetPass, setShowForgetPass] = useState(false)

  const onSubmit = async (values: LoginInput) => {
    const res = await login({
      variables: { data: values },
    })
    form.handler(res, {
      onSuccess: data => {
        localStorage.setItem("token", data.login.token)
        client.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: data.login.user },
        })
        toast({
          title: "Welcome back!",
          description: "You have succesfully logged in.",
          status: "success",
          duration: 4000,
          isClosable: true,
        })
      },
    })
  }

  if (me) return <Redirect noThrow={true} to={`/`} />

  return (
    <Flex
      h="Calc(100vh - 120px)"
      w={{ base: "100vw", md: "100%" }}
      align="center"
      justifyContent="flex-start"
      p={{ base: 10, lg: "10%" }}
      direction="column"
      mt="120px"
    >
      <Flex fontWeight="semibold" fontSize="4xl" pb={8}>
        <Text color={colors[0]}>B</Text>
        <Text color={colors[1]}>e</Text>
        <Text color={colors[2]}>co</Text>
        <Text color={colors[3]}>me</Text>
      </Flex>
      <Box w={["100%", 400]}>
        {showForgetPass ? (
          <ForgotPasswordForm handleClick={() => setShowForgetPass(false)} />
        ) : (
          <Form onSubmit={onSubmit} {...form}>
            <Input name="email" label="Email" placeholder="jim@gmail.com" />
            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="********"
            />
            <Flex align="center" mt={8}>
              <Button
                variantColor="blue"
                type="submit"
                loadingText="loading"
                isLoading={form.formState.isSubmitting}
                mr={8}
              >
                Login
              </Button>
              {form.appError && <Text color="red.500">{form.appError}</Text>}
            </Flex>
            <Button
              variantColor="blue"
              variant="link"
              loadingText="loading"
              size="xs"
              mt={4}
              onClick={() => setShowForgetPass(true)}
            >
              Forgot password
            </Button>
            <Flex align="center" mt={6}>
              <Text mr={4} mt={1}>
                New to Become?
              </Text>
              <Link to={`/register`}>
                <Button
                  variantColor="blue"
                  variant="link"
                  loadingText="loading"
                >
                  Register
                </Button>
              </Link>
            </Flex>
          </Form>
        )}
      </Box>
    </Flex>
  )
}
