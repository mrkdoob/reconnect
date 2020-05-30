import React from "react"
import { Flex, Box, Text, Button, useDisclosure } from "@chakra-ui/core"
import { CourseLevelFragment } from "../lib/graphql"
import { styled } from "./providers/ThemeProvider"
import gql from "graphql-tag.macro"
import { Lock } from "styled-icons/boxicons-solid/Lock"
import { colors } from "../lib/colors"
import { CourseImageModal } from "./CourseImageModal"
import { useMe } from "./providers/MeProvider"
import { Modal } from "./Modal"
import { CourseLevelEditForm } from "./CourseLevelEditForm"
import { CourseLevelTaskCreateModal } from "./CourseLevelTaskCreateModal"

export const COURSE_LEVEL = gql`
  fragment CourseLevel on Level {
    id
    title
    cover
    levelNumber
    maxProgressDays
    isLast
    # Below is only for admin
    rewardText
    rewardDescription
    videoUrl
    rewardUrl
    courseId
  }
`

interface Props {
  level: CourseLevelFragment
}

export function CourseLevelItem(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const me = useMe()

  return (
    <>
      <StyledLevelFlex
        mb={{ base: 4, md: 10 }}
        h={{ base: "32", md: "9rem" }}
        w={{ base: "95vw", md: "420px" }}
        bg={colors[props.level.levelNumber - 1]}
        borderRadius="lg"
      >
        <StyledImageBox
          backgroundImage={`url("${props.level?.cover}")` || ""}
          w={{ base: 32, md: "9rem" }}
          align="center"
          justify="center"
          position="relative"
        >
          {me?.role === "admin" && (
            <CourseImageModal levelId={props.level.id} />
          )}
          {props.level.levelNumber !== 1 && <Box as={Lock} height={10} />}
        </StyledImageBox>

        <Button
          // variantColor="blue"
          aria-label="Edit level"
          color="text"
          leftIcon="edit"
          onClick={onOpen}
          mb={4}
          position="absolute"
          right="0"
        >
          Edit
        </Button>

        <StyledContentFlex
          w={{ base: "Calc(100% - 7rem)", md: "Calc(450px - 8rem)" }}
          pl={{ base: 4, md: 8 }}
          direction="column"
          justify="center"
          borderRadius="lg"
        >
          <Text>Level {props.level.levelNumber}</Text>
          <Text fontWeight="semibold">{props.level.title}</Text>
          <StyledUppercasedText>
            0 / {props.level.maxProgressDays} steps completed
          </StyledUppercasedText>
        </StyledContentFlex>
      </StyledLevelFlex>

      <Modal size="full" title="Edit level" isOpen={isOpen} onClose={onClose}>
        <CourseLevelEditForm onClose={onClose} level={props.level} />
      </Modal>

      <CourseLevelTaskCreateModal levelId={props.level.id} />
    </>
  )
}

const StyledLevelFlex = styled(Flex)`
  position: relative;
  color: ${p => p.theme.colors.white};
`

const StyledImageBox = styled(Flex)`
  border-radius: ${p => p.theme.radii.lg};
  height: 100%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`
const StyledContentFlex = styled(Flex)`
  height: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

const StyledUppercasedText = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 0.125rem;
  margin-top: ${p => p.theme.space[1]};
  font-size: ${p => p.theme.fontSizes.xs};
`
