import React from "react"
import { Flex, Image, Box, Text, Heading, Tag } from "@chakra-ui/core"
import { Link } from "@reach/router"
import gql from "graphql-tag.macro"
import { CourseItemFragment } from "../lib/graphql"
import { styled } from "./providers/ThemeProvider"

export const COURSE_ITEM = gql`
  fragment CourseItem on Course {
    id
    name
    cover
    category
    description
    slug
    fullDescription
    duration
    benefits
    rewardType
  }
`

interface Props {
  course: CourseItemFragment
}

export function CourseItem(props: Props) {
  return (
    <Link to={`/courses/${props.course.slug}`}>
      <StyledCourseItem borderRadius="lg">
        <Box w="100%" h={{ base: 120, lg: 150 }} bg="gray.100" roundedTop="lg">
          {props.course.cover && (
            <StyledCover rounded="lg" src={props.course.cover} />
          )}
          <Tag
            size="sm"
            position="relative"
            left={2}
            bottom={3}
            variantColor="cyan"
          >
            {props.course.category}
          </Tag>
        </Box>

        <Flex
          p={4}
          align="flex-start"
          justify="center"
          direction="column"
          rounded="lg"
        >
          <Heading
            fontWeight={{ base: "semibold", md: "normal" }}
            fontSize={{ sm: "xl", md: "2xl" }}
          >
            {props.course.name}
          </Heading>
          <Text fontSize="md" color="gray.400">
            {props.course.description}
          </Text>
        </Flex>
      </StyledCourseItem>
    </Link>
  )
}

const StyledCourseItem = styled(Flex)`
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: scale(1.005);
  }
`

const StyledCover = styled(Image)`
  height: 100%;
  width: 100%;
  object-fit: cover;
`
