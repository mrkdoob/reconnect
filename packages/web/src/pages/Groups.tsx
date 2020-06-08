import React from "react"
import { RouteComponentProps, navigate } from "@reach/router"

import { Page } from "../components/Page"
import gql from "graphql-tag.macro"
import {
  GroupItemFragmentDoc,
  useGetCourseGroupsQuery,
  useStartMyCourseMutation,
  MyDashboardFragmentDoc,
  MentorItemFragmentDoc,
  useEndMyCourseMutation,
  MeDocument,
} from "../lib/graphql"
import {
  SimpleGrid,
  Flex,
  Text,
  Box,
  Heading,
  useToast,
  Button,
} from "@chakra-ui/core"
import { GroupItem } from "../components/GroupItem"
import { styled } from "../components/providers/ThemeProvider"
import { Badge } from "styled-icons/boxicons-regular/Badge"
import { useMe } from "../components/providers/MeProvider"
import { Confirmation } from "../components/Confirmation"
import { GroupsSponsorModal } from "../components/GroupsSponsorModal"

export const GET_COURSE_GROUPS = gql`
  query GetCourseGroups($slug: String!) {
    courseBySlug(slug: $slug) {
      id
      groups {
        ...GroupItem
      }
      mentor {
        ...MentorItem
        firstName
      }
    }
  }
  ${GroupItemFragmentDoc}
  ${MentorItemFragmentDoc}
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

  const course = data?.courseBySlug
  const groups = course?.groups || []
  const courseId = course?.id
  const me = useMe()
  const [stopCourse, setStopCourse] = React.useState(false)

  const [startCourse] = useStartMyCourseMutation()

  const toast = useToast()

  const handleGroupSelect = (groupId: string) => {
    if (!courseId || !groupId) return
    startCourse({
      variables: { courseId, groupId },
    })
      .then(() => {
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

  const [endCourse] = useEndMyCourseMutation({
    refetchQueries: [{ query: MeDocument }],
  })

  const handleEndCourse = async () => {
    await endCourse({
      variables: {
        hasFailed: true,
      },
    })
      .then(() => {
        toast({
          title: "Done!",
          status: "success",
        })
        setStopCourse(true)
      })
      .catch(() => {
        toast({
          title: "Oops!",
          description: "Something went wrong",
          status: "error",
        })
      })
  }

  return (
    <Page loading={loading}>
      <Flex
        justify="center"
        // w="100%"
        w={{ base: "100%", md: "30rem" }}
        h="100%"
        direction="column"
        align="center"
        pb={32}
      >
        {me?.groupId && !stopCourse ? (
          <>
            <Text mb={4}>
              It seems that you are already following a course.
            </Text>
            <Text fontWeight="semibold" mb={4}>
              Would you like to quit this course?
            </Text>
            <Confirmation onSubmit={handleEndCourse}>
              <Button variantColor="blue">Stop course</Button>
            </Confirmation>
          </>
        ) : (
          <>
            {groups.length === 1 && course?.mentor ? (
              <GroupsSponsorModal
                handleSelect={() => handleGroupSelect(groups[0].id)}
              />
            ) : (
              <>
                <Flex align="center">
                  <Box mb={1} color="blue.500" h="2rem" as={Badge} />
                </Flex>

                <Heading mb={6} fontWeight="normal" fontSize="2xl">
                  Select a group
                </Heading>
                {groups.length > 0 ? (
                  <StyledSimpleGrid
                    // w={{ base: "98vw", md: "30rem" }}
                    w="100%"
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
              </>
            )}
          </>
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
