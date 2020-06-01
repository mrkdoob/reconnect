import React from "react"
import { Flex, Heading, Box } from "@chakra-ui/core"
import {
  CourseFragment,
  MyCourseProgressFragment,
  MyLevelProgressFragment,
} from "../lib/graphql"
import { Badge } from "styled-icons/boxicons-regular/Badge"

import { CourseLevelItem } from "./CourseLevelItem"
import { ProgressLevelItem } from "./ProgressLevelItem"

interface Props {
  course: CourseFragment | MyCourseProgressFragment
  userLevel?: MyLevelProgressFragment | null
}

export function CourseLevelList(props: Props) {
  let completedLevels = 0

  props.course?.levels &&
    props.course.levels.forEach(level => {
      if (props.userLevel && level.id === props.userLevel.level?.id) {
        completedLevels = level.levelNumber
        return
      }
    })

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

        {props.course?.levels &&
          props.course.levels.length > 0 &&
          props.course.levels.map(
            level =>
              !level.isLast &&
              (level.levelNumber <= completedLevels ? (
                <ProgressLevelItem
                  key={level.id}
                  level={level}
                  userLevel={props.userLevel}
                  isCurrentLevel={level.levelNumber === completedLevels}
                />
              ) : (
                <CourseLevelItem key={level.id} level={level} />
              )),
          )}
      </Flex>
    </Flex>
  )
}
