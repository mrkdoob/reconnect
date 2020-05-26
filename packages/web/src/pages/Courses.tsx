import React from "react"
import { RouteComponentProps } from "@reach/router"

import { Page } from "../components/Page"
import gql from "graphql-tag.macro"
import { CourseItemFragmentDoc, useGetAllCoursesQuery } from "../lib/graphql"
import {
  SimpleGrid,
  Flex,
  Text,
  Button,
  Heading,
  useDisclosure,
} from "@chakra-ui/core"
import { CourseItem } from "../components/CourseItem"
import { useMe } from "../components/providers/MeProvider"
import { Modal } from "../components/Modal"
import { CourseCreateForm } from "../components/CourseCreateForm"

export const GET_SPACES = gql`
  query GetAllCourses {
    getAllCourses {
      ...CourseItem
    }
  }
  ${CourseItemFragmentDoc}
`

export const Courses: React.FC<RouteComponentProps> = () => {
  const { data, loading } = useGetAllCoursesQuery({
    fetchPolicy: "cache-and-network",
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const courses = data?.getAllCourses || []
  const me = useMe()

  return (
    <>
      <Page disableRedirect={true} loading={loading}>
        <Flex w="100%" justify="space-between" mt={16} mb={8} align="center">
          <Heading>Select a path</Heading>
          {me?.role === "admin" && (
            <Button leftIcon="add" variantColor="blue" onClick={onOpen}>
              Create a challenge
            </Button>
          )}
        </Flex>
        {courses.length > 0 ? (
          <SimpleGrid spacing={6} columns={{ base: 1, md: 2, lg: 3 }} p={2}>
            {courses.map(course => (
              <CourseItem key={course.id} course={course} />
            ))}
          </SimpleGrid>
        ) : (
          <Flex align="center" justify="center">
            <Text>No paths created yet</Text>
          </Flex>
        )}
      </Page>

      {me && (
        <Modal
          title="Create a challenge"
          size="xl"
          isOpen={isOpen}
          onClose={onClose}
        >
          <CourseCreateForm onClose={onClose} mentorId={me.id} />
        </Modal>
      )}
    </>
  )
}
