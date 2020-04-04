import React from "react"
import { Flex, Box, Text, Image } from "@chakra-ui/core"
import { CourseLevelFragment, MyLevelProgressFragment } from "../lib/graphql"
import { styled } from "./providers/ThemeProvider"
import { Book } from "styled-icons/boxicons-regular/Book"
import { Tree } from "../lib/imageLinks"
import { Link } from "@reach/router"

interface Props {
  level: CourseLevelFragment
  userLevel?: MyLevelProgressFragment | null
  isCurrentLevel?: boolean
}

const colors = ["blue.400", "blue.200", "green.100", "green.400"] // Add more colors when using more levels

export function ProgressLevelItem(props: Props) {
  return (
    <Link to={`/levelreward/${props?.level.id}`}>
      <StyledLevelFlex
        mb={{ base: 4, md: 10 }}
        h={{ base: "32", md: "9rem" }}
        w={{ base: "95vw", md: "420px" }}
        bg={colors[props.level.levelNumber - 1]}
        borderRadius="lg"
      >
        <Box
          as={Book}
          h={8}
          color="white"
          position="absolute"
          right={4}
          top={4}
          // @ts-ignore
          zIndex={"tooltip"}
        />
        {!props.isCurrentLevel && (
          <Image
            src={Tree}
            h={12}
            w={16}
            position="absolute"
            right={0}
            bottom={4}
          />
        )}

        <StyledImageBox
          backgroundImage={`url("${props.level?.cover}")` || ""}
          w={{ base: 32, md: "9rem" }}
          align="center"
          justify="center"
        />

        <StyledContentFlex
          w={{ base: "Calc(100% - 7rem)", md: "Calc(450px - 8rem)" }}
          pl={{ base: 4, md: 8 }}
          direction="column"
          justify="center"
          borderRadius="lg"
        >
          {" "}
          <Text>Level {props.level.levelNumber}</Text>
          <Text fontWeight="semibold">{props.level.title}</Text>
          <StyledUppercasedText>
            {props.isCurrentLevel
              ? props?.userLevel?.progressDay
              : props.level.maxProgressDays}{" "}
            / {props.level.maxProgressDays} steps completed
          </StyledUppercasedText>
        </StyledContentFlex>
      </StyledLevelFlex>
    </Link>
  )
}

const StyledLevelFlex = styled(Flex)`
  position: relative;
  color: ${p => p.theme.colors.white};

  &:hover {
    transform: scale(1.005);
  }
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
