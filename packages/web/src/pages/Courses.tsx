import React from "react"
import { RouteComponentProps } from "@reach/router"

import { Page } from "../components/Page"
import gql from "graphql-tag.macro"
import { CourseItemFragmentDoc, useGetAllCoursesQuery } from "../lib/graphql"
import { SimpleGrid, Flex, Text } from "@chakra-ui/core"
import { CourseItem } from "../components/CourseItem"

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
  const courses = data?.getAllCourses || []

  return (
    <Page disableRedirect={true} title="Select a path" loading={loading}>
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
  )
}
