import React from "react"
import { Flex, Box, Text, Image } from "@chakra-ui/core"
import { styled } from "./providers/ThemeProvider"
import { CourseFragment } from "../lib/graphql"
import { Hourglass } from "../lib/imageLinks"
import { Tree } from "../lib/imageLinks"
import { Food } from "../lib/imageLinks"
import { Mask } from "../lib/imageLinks"
import { YinYang } from "../lib/imageLinks"

interface Props {
  course: CourseFragment
}

export function CourseLeadIn(props: Props) {
  return (
    <Flex flexWrap="wrap" justify="center" mt={12}>
      <Box w={["100%", "28%"]} my={[4, 0]} mx={[0, 4]}>
        <Flex h="100%" align="center">
          <Flex minWidth="20%" justify="center" align="center">
            {" "}
            <Image
              src={Hourglass}
              h={{ base: "5rem", lg: "8rem" }}
              w={{ base: "5rem", lg: "8rem" }}
            />
          </Flex>
          <Box w="80%">
            <BoxHeader>Duration</BoxHeader>
            <BoxSubHeader>{props.course?.duration}</BoxSubHeader>
            <Text fontSize="sm">Practice a few minutes a day</Text>
          </Box>
        </Flex>
      </Box>
      <Box w={["100%", "30%"]} my={[4, 0]} mx={[0, 4]}>
        <Flex h="100%" align="center">
          {/* TODO: Fix this alignment */}
          <Flex minWidth="20%" justify="center" align="center">
            {" "}
            {props.course.rewardType === "tree" ? (
              <Image
                src={Tree}
                h={{ base: "3rem", lg: 20 }}
                w={{ base: "4rem", lg: 32 }}
              />
            ) : props.course.rewardType === "meal" ? (
              <Image
                src={Food}
                h={{ base: "2.5rem", lg: 16 }}
                w={{ base: "2.5rem", lg: 16 }}
                mr={{ base: 0, lg: 4 }}
              />
            ) : (
              <Image
                src={Mask}
                h={{ base: "3rem", lg: 20 }}
                w={{ base: "3rem", lg: 20 }}
              />
            )}
          </Flex>
          <Box w="80%">
            <BoxHeader>
              {props.course.rewardType === "tree" ? "Plant" : "support"}
            </BoxHeader>
            {/* <BoxSubHeader>{props.course.rewardType}s</BoxSubHeader> */}
            <BoxSubHeader>Help those in need</BoxSubHeader>
            <Text fontSize="sm">
              {/* You will have a chance to{" "}
              {props.course.rewardType === "tree" ? "plant" : "provide"}{" "}
              {props.course.rewardType}s everyday together with your team* */}
              Each time you practice, we will donate to a charity to help those
              in need.
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box w={["100%", "30%"]} my={[4, 0]} mx={[0, 4]}>
        <Flex h="100%" align="center">
          <Flex minWidth="20%" justify="center" align="center">
            {" "}
            <Image
              src={YinYang}
              h={{ base: "2rem", lg: "3rem" }}
              w={{ base: "2rem", lg: "3rem" }}
              mr={{ base: 0, md: 6 }}
            />
          </Flex>
          <Box w="80%">
            <BoxHeader>Learn about</BoxHeader>
            <BoxSubHeader>{props.course?.category}</BoxSubHeader>
            <Text fontSize="sm">{props.course?.benefits}</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

const BoxHeader = styled(Text)`
  color: ${p => p.theme.colors.gray[700]};
  text-transform: uppercase;
  letter-spacing: 0.125rem;
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: ${p => p.theme.fontWeights.semibold};
  margin-bottom: ${p => p.theme.space[2]};
`

const BoxSubHeader = styled(Text)`
  color: ${p => p.theme.colors.gray[800]};
  font-size: ${p => p.theme.fontSizes.lg};
  font-weight: ${p => p.theme.fontWeights.semibold};
  margin-bottom: ${p => p.theme.space[2]};
`
