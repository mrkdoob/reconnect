import React from "react"
import { Flex, Heading, Box } from "@chakra-ui/core"
import { CourseFragment, MyCourseProgressFragment } from "../lib/graphql"
import { Badge } from "styled-icons/boxicons-regular/Badge"
import { CourseLevelCreateModal } from "./CourseLevelCreateModal"
import { AdminCourseLevelItem } from "./AdminCourseLevelItem"

interface Props {
  course: CourseFragment | MyCourseProgressFragment
}

export function AdminCourseLevelList(props: Props) {
  return (
    <Flex
      justify="center"
      mt={{ base: 4, md: "12" }}
      px={{ base: "2", md: "0" }}
      w="100%"
    >
      <Flex
        direction="column"
        align="center"
        w={["100%", "70%"]}
        pt={{ base: 6, md: 12 }}
      >
        <Flex align="center">
          <Box as={Badge} h={8} mb={1} color="blue.500" />
        </Flex>

        <Heading mb={6} fontWeight="normal" fontSize="2xl">
          Your path
        </Heading>
        <CourseLevelCreateModal courseId={props.course.id} />

        {props.course?.levels &&
          props.course.levels.length > 0 &&
          props.course.levels.map(level => (
            <AdminCourseLevelItem key={level.id} level={level} />
          ))}
      </Flex>
    </Flex>
  )
}
