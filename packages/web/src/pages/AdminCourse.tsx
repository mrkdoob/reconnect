import React from "react"
import { RouteComponentProps, Link, Redirect } from "@reach/router"

import { Page } from "../components/Page"
import { useGetCourseQuery } from "../lib/graphql"
import {
  Flex,
  Text,
  Box,
  Heading,
  Button,
  Image,
  TabPanel,
  Tabs,
  Tab,
  TabList,
  TabPanels,
} from "@chakra-ui/core"
import { styled } from "../components/providers/ThemeProvider"

import { Border } from "../components/Border"
import { CourseLeadIn } from "../components/CourseLeadIn"
import { Markup } from "interweave"
import { useMe } from "../components/providers/MeProvider"
import { CourseImageModal } from "../components/CourseImageModal"
import { CourseEditModal } from "../components/CourseEditModal"
import { CourseDailyRewardList } from "../components/CourseDailyRewardList"
import { AdminCourseMessageList } from "../components/AdminCourseMessageList"
import { AdminCourseLevelList } from "../components/AdminCourseLevelList"
import { AdminCourseMentorModalForm } from "../components/AdminCourseMentorModalForm"
import { AdminCoursePet } from "../components/AdminCoursePet"

interface Props extends RouteComponentProps<{ slug: string }> {}

export const AdminCourse: React.FC<Props> = props => {
  const slug = props.slug as string
  const { data, loading } = useGetCourseQuery({ variables: { slug } })
  const course = data?.courseBySlug
  const me = useMe()

  if (me?.role !== "admin" && course?.mentor && me?.id !== course?.mentor?.id)
    return <Redirect noThrow={true} to={`/courses`} />
  return (
    <Page disableRedirect={true} loading={loading}>
      {course ? (
        <Tabs isFitted>
          <StyledTabList>
            <Tab>Info</Tab>
            <Tab>Levels</Tab>
            <Tab>Rewards</Tab>
            <Tab>Messages</Tab>
            <Tab>Pet</Tab>
          </StyledTabList>

          <TabPanels m="60px">
            <TabPanel>
              {/* Banner */}
              <StyledCoverBox
                rounded="lg"
                backgroundImage={`url("${course?.cover}")` || ""}
                mt={{ base: 8, md: 0 }}
              >
                <CourseEditModal course={course} />
                <CourseImageModal courseId={course.id} />
                <Box
                  rounded="lg"
                  bg="black"
                  // @ts-ignore
                  opacity="0.1"
                  w="100%"
                  h="100%"
                  position="absolute"
                />
                <Flex
                  direction="column"
                  h="100%"
                  w="100%"
                  justify="center"
                  align="center"
                  textAlign="center"
                  // @ts-ignore
                  opacity="0.99"
                >
                  {/* TODO: Fix text readability */}
                  <Text
                    textTransform="uppercase"
                    letterSpacing="0.25rem"
                    fontSize="xs"
                    fontWeight="semibold"
                    mb={4}
                  >
                    {course?.category}
                  </Text>
                  <Heading mb={3} fontWeight="normal">
                    {course?.name}
                  </Heading>
                  <Text mb={4}>{course?.description}</Text>
                  <Link to={`/${course?.slug}/groups`}>
                    <Button variantColor="gray" px={8}>
                      <Text
                        textTransform="uppercase"
                        letterSpacing="0.125rem"
                        fontSize="xs"
                        color="text"
                      >
                        Start now
                      </Text>
                    </Button>
                  </Link>
                </Flex>
              </StyledCoverBox>

              {/* Lead in*/}
              <CourseLeadIn course={course} />

              {/* Full description */}
              <Flex justify="center" align="center" mt={{ base: 0, md: 12 }}>
                <Box w={["100%", "70%"]}>
                  <Border mb={{ base: 12, md: 20 }} mt={8} />
                  {/* Description */}
                  <Box px={4} fontSize="lg">
                    <Markup content={course?.fullDescription} />
                  </Box>
                  {/* Mentor */}
                  {course.mentor && (
                    <>
                      <Border my={{ base: 12, md: 20 }} mt={8} />
                      <AdminCourseMentorModalForm mentor={course.mentor} />
                      <Flex
                        px={4}
                        fontSize="lg"
                        justify="center"
                        align="center"
                        direction={{ base: "column", md: "row" }}
                      >
                        {course.mentor.avatar && (
                          <Image
                            src={course.mentor?.avatar}
                            size={24}
                            rounded="full"
                            mr={{ base: 0, md: 8 }}
                            mb={{ base: 8, md: 0 }}
                          />
                        )}
                        <Box>
                          <Text fontWeight="semibold">
                            Created by by {course.mentor.fullName}
                          </Text>
                          <Markup content={course.mentor.bio} />
                        </Box>
                      </Flex>
                    </>
                  )}
                </Box>
              </Flex>
            </TabPanel>
            <TabPanel>
              <AdminCourseLevelList course={course} />
            </TabPanel>
            <TabPanel>
              <CourseDailyRewardList courseId={course.id} />
            </TabPanel>
            <TabPanel>
              <AdminCourseMessageList courseId={course.id} />
            </TabPanel>
            <TabPanel>
              <AdminCoursePet courseId={course.id} coursePetId={course.petId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Flex align="center" justify="center">
          <Text>No course found</Text>
        </Flex>
      )}
    </Page>
  )
}

const StyledCoverBox = styled(Box)`
  position: relative;
  height: 40vh;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  color: ${p => p.theme.colors.white};
`

const StyledTabList = styled(TabList)`
  z-index: 999;
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: ${p => p.theme.colors.white};
`
