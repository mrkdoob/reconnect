import React from "react"
import { RouteComponentProps, Redirect, navigate } from "@reach/router"

import { Page } from "../components/Page"
import gql from "graphql-tag.macro"
import {
  GroupItemFragmentDoc,
  useGetCourseGroupsQuery,
  useStartMyCourseMutation,
  MyDashboardFragmentDoc,
} from "../lib/graphql"
import { SimpleGrid, Flex, Text, Box, Heading, useToast } from "@chakra-ui/core"
import { GroupItem } from "../components/GroupItem"
import { styled } from "../components/providers/ThemeProvider"
import { Badge } from "styled-icons/boxicons-regular/Badge"
import { useMe } from "../components/providers/MeProvider"

export const GET_COURSE_GROUPS = gql`
  query GetCourseGroups($slug: String!) {
    courseBySlug(slug: $slug) {
      id
      groups {
        ...GroupItem
      }
    }
  }
  ${GroupItemFragmentDoc}
`

export const START_MY_COURSE = gql`
  mutation StartMyCourse($courseId: String!, $groupId: String!) {
    startMyCourse(courseId: $courseId, groupId: $groupId) {
      ...MyDashboard
    }
  }
  ${MyDashboardFragmentDoc}
`

interface Props extends RouteComponentProps<{ slug: string }> {}

export const Groups: React.FC<Props> = props => {
  const slug = props.slug as string
  const { data, loading } = useGetCourseGroupsQuery({ variables: { slug } })

  // TODO: Filter groups that are full and dates in past?
  const groups = data?.courseBySlug.groups || []
  const courseId = data?.courseBySlug.id
  const me = useMe()

  const [startCourse] = useStartMyCourseMutation()

  const toast = useToast()

  const handleGroupSelect = (groupId: string) => {
    // TODO: Set up userLevel
    if (!courseId || !groupId) return
    startCourse({
      variables: { courseId, groupId },
    })
      .then(res => {
        navigate("/mylevelreward")
      })
      .catch(() => {
        toast({
          status: "error",
          description:
            "Oops.. something went wrong while setting up your course",
        })
      })
  }

  if (me?.group) {
    return <Redirect noThrow={true} to="/" />
  }
  return (
    <Page loading={loading}>
      <Flex
        justify="center"
        w="100%"
        h="100%"
        direction="column"
        align="center"
        pb={32}
      >
        <Flex align="center">
          <Box mb={1} color="blue.500" h="2rem" as={Badge} />
        </Flex>

        <Heading mb={6} fontWeight="normal" fontSize="2xl">
          Select a group
        </Heading>
        {groups.length > 0 ? (
          <StyledSimpleGrid
            w={{ base: "98vw", md: "30rem" }}
            columns={1}
            boxShadow="lg"
            top={1}
          >
            {groups.map((group, index) => (
              <GroupItem
                index={index}
                key={group.id}
                group={group}
                isLast={groups.length === index + 1}
                handleGroupSelect={handleGroupSelect}
              />
            ))}
          </StyledSimpleGrid>
        ) : (
          <Flex align="center" justify="center">
            <Text>No groups created yet</Text>
            {/* TODO: Create new group? */}
          </Flex>
        )}
      </Flex>
    </Page>
  )
}

const StyledSimpleGrid = styled(SimpleGrid)`
  border-radius: ${p => p.theme.radii.lg};
  border-top: 3px solid ${p => p.theme.colors.blue[400]};
  border-left: 3px solid ${p => p.theme.colors.blue[200]};
  border-right: 3px solid ${p => p.theme.colors.green[100]};
  border-bottom: 3px solid ${p => p.theme.colors.green[400]};
  background-color: ${p => p.theme.colors.gray[50]};
`
