import React from "react"
import { RouteComponentProps } from "@reach/router"

import { Page } from "../components/Page"
import gql from "graphql-tag.macro"
import { CourseItemFragmentDoc, useGetAllCoursesQuery } from "../lib/graphql"
import { SimpleGrid, Flex, Text, Heading } from "@chakra-ui/core"
import { CourseItem } from "../components/CourseItem"
import { useMe } from "../components/providers/MeProvider"

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

  const me = useMe()

  const courses =
    data?.getAllCourses.filter(
      course => course.isPublished === true || course.mentor?.id === me?.id,
    ) || []

  return (
    <>
      <Page disableRedirect={true} loading={loading}>
        <Flex w="100%" justify="flex-start" mt={16} mb={8} align="center">
          <Heading>Select a challenge</Heading>
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
    </>
  )
}
