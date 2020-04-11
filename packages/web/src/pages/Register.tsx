import React from "react"
import { Flex, Box, Button, Text, useToast } from "@chakra-ui/core"
import gql from "graphql-tag.macro"
import * as Yup from "yup"
import { RouteComponentProps, Link, navigate } from "@reach/router"
import { useApolloClient } from "@apollo/client"

import { Input } from "../components/Input"
import {
  MeFragmentDoc,
  MeQuery,
  MeDocument,
  useRegisterMutation,
  RegisterInput,
} from "../lib/graphql"

import { useForm } from "../lib/hooks/useForm"
import { Form } from "../components/Form"
import { colors } from "../lib/colors"

export const REGISTER = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().min(6, "Must be at least 6 characters"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
})

export const Register: React.FC<RouteComponentProps> = () => {
  const client = useApolloClient()
  const [register] = useRegisterMutation()
  const form = useForm({ validationSchema: RegisterSchema })
  const toast = useToast()

  const onSubmit = async (values: RegisterInput) => {
    const res = await register({
      variables: { data: values },
    })
    form.handler(res, {
      onSuccess: data => {
        localStorage.setItem("token", data.register.token)
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 4000,
          isClosable: true,
        })
        client.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: data.register.user },
        })
        navigate("/") // TODO: Go back to previous page when its course page?
      },
    })
  }
  return (
    <Flex
      h="Calc(100vh - 120px)"
      w="100%"
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
        <Form onSubmit={onSubmit} {...form}>
          <Input name="email" label="Email" placeholder="jim@gmail.com" />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="********"
          />
          <Flex justify="space-between">
            <Input
              name="firstName"
              label="First name"
              type="firstName"
              placeholder="John"
              w="95%"
            />
            <Input
              name="lastName"
              label="Last name"
              type="lastName"
              placeholder="Doeloe"
            />
          </Flex>
          <Flex align="center" mt={4}>
            <Button
              variantColor="blue"
              type="submit"
              loadingText="loading"
              isLoading={form.formState.isSubmitting}
              mr={8}
            >
              Register
            </Button>
            <Link to={`/login`}>
              <Button
                variantColor="blue"
                type="submit"
                loadingText="loading"
                variant="link"
              >
                Login
              </Button>
            </Link>

            {form.appError && <Text color="red.500">{form.appError}</Text>}
          </Flex>
        </Form>
      </Box>
    </Flex>
  )
}
