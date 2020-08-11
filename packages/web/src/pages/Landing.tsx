import React from "react"
import { RouteComponentProps, navigate } from "@reach/router"

import { Page } from "../components/Page"
import {
  Flex,
  Text,
  Button,
  Image,
  SimpleGrid,
  Box,
  Stack,
} from "@chakra-ui/core"
import { colors } from "../lib/colors"
import { useGetAllCoursesQuery } from "../lib/graphql"
import { CourseItem } from "../components/CourseItem"
import { styled } from "../components/providers/ThemeProvider"

import { BarChart2 } from "@styled-icons/evaicons-solid/BarChart2"
import { Users } from "@styled-icons/fa-solid/Users"
import { HandHoldingHeart } from "@styled-icons/fa-solid/HandHoldingHeart"
import { Microscope } from "@styled-icons/fa-solid/Microscope"

import { Link } from "react-scroll"

interface Props extends RouteComponentProps {}

export const Landing: React.FC<Props> = props => {
  const { data, loading } = useGetAllCoursesQuery({
    fetchPolicy: "cache-and-network",
  })
  const courses = data?.getAllCourses
    .filter(course => course.isPublished === true)
    .slice(0, 5)

  return (
    <Page disableRedirect={true} loading={loading}>
      <Flex
        w="100%"
        h="calc(100vh - 60px)"
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          direction="column"
          justify="center"
          align="space-between"
          w={{ base: "100%", md: "40%" }}
          fontWeight="semibold"
          fontSize="5xl"
          pb={{ base: 8, md: 64 }}
          mt={{ base: "60px", md: 0 }}
        >
          <Text color={colors[0]}>Become</Text>
          <Flex pb={4} mt={-4}>
            <Text color={colors[1]} mr={2}>
              your{" "}
            </Text>
            <Text color={colors[2]} mr={2}>
              best{" "}
            </Text>
            <Text color={colors[3]} mr={2}>
              self
            </Text>
          </Flex>
          <Text color="gray.400" fontSize="2xl">
            Learn new habits joyfully
          </Text>
          <Link
            activeClass="active"
            to="section1"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <Button
              size="lg"
              variant="outline"
              w="fit-content"
              mt={8}
              variantColor="blue"
            >
              Learn more
            </Button>
          </Link>
        </Flex>
        <Flex align="center" w={{ base: "100vw", md: "100%" }} pb={32}>
          <Image src="https://reconnectapp-dev.s3.eu-central-1.amazonaws.com/screenshot-2020-06-29-at-12-51-03-png" />
        </Flex>
      </Flex>
      <Flex
        bg="gray.50"
        position="absolute"
        w="100%"
        left="0"
        justify="center"
        align="center"
        h={{ base: "content-fit", md: "300px" }}
        py={{ base: 8, md: 0 }}
        fontWeight="semibold"
        direction="column"
        id="section1"
      >
        <Stack fontSize="4xl" mb={8} spacing={2} isInline>
          <Text color={colors[0]}>A new</Text>
          <Text color={colors[1]}>way</Text>
          <Text color={colors[2]}>of</Text>
          <Text color={colors[3]}>learning</Text>
        </Stack>
        <Flex
          // spacing={{ base: 8, md: 16 }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <StyledFlexCard mr={{ base: 0, md: 16 }} mb={{ base: 8, md: 0 }}>
            <Box mr={4} color={colors[0]} as={Users} size={8} />
            <Text>Social support</Text>
          </StyledFlexCard>
          <StyledFlexCard mr={{ base: 0, md: 16 }} mb={{ base: 8, md: 0 }}>
            <Box mr={4} color={colors[1]} as={Microscope} size={8} />
            <Text>Proven methods</Text>
          </StyledFlexCard>
          <StyledFlexCard mr={{ base: 0, md: 16 }} mb={{ base: 8, md: 0 }}>
            <Box mr={4} color={colors[2]} as={BarChart2} size={8} />
            <Text>Gradual progress</Text>
          </StyledFlexCard>
          <StyledFlexCard mr={{ base: 0, md: 16 }} mb={{ base: 8, md: 0 }}>
            <Box mr={4} color={colors[3]} as={HandHoldingHeart} size={8} />
            <Text>Meaningful</Text>
          </StyledFlexCard>
        </Flex>
      </Flex>

      <Flex
        mt={{ base: "calc(500px + 1rem)", md: "400px" }}
        direction={{ base: "column", md: "row" }}
      >
        <StyledImageColumn w={{ base: "100%", md: "50%" }}>
          <Image
            h="300px"
            w="400px"
            src="https://reconnectapp-dev.s3.eu-central-1.amazonaws.com/screenshot-2020-06-29-at-12-37-35-png"
          />
        </StyledImageColumn>
        <StyledTextColumn
          w={{ base: "100%", md: "50%" }}
          mt={{ base: 16, md: 0 }}
        >
          <Flex fontWeight="semibold" fontSize="2xl" mb={4}>
            <Text color={colors[0]}>Me</Text>
            <Text color={colors[1]}>ani</Text>
            <Text color={colors[2]}>ngf</Text>
            <Text color={colors[3]}>ul</Text>
          </Flex>
          <Text color="gray.400" fontSize="xl">
            We'll help you see that improving yourself is also something you do
            for others. You'll have a chance to earn charity donations when you
            stick to your new habits and implement a lasting change into your
            life.
          </Text>
        </StyledTextColumn>
      </Flex>
      <Flex
        mt={{ base: 16, md: 32 }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <StyledTextColumn
          w={{ base: "100%", md: "50%" }}
          mt={{ base: 16, md: 0 }}
        >
          <Flex fontWeight="semibold" fontSize="2xl" mb={4}>
            <Text color={colors[0]}>To</Text>
            <Text color={colors[1]}>ge</Text>
            <Text color={colors[2]}>th</Text>
            <Text color={colors[3]}>er</Text>
          </Flex>
          <Text color="gray.400" fontSize="xl">
            Having social support and positive influences increases your chances
            of sticking to new habits. Join a group of like-minded people who
            will support you on your journey.
          </Text>
        </StyledTextColumn>
        <StyledImageColumn w={{ base: "100%", md: "50%" }}>
          <Image
            w="400px"
            h="300px"
            src="https://reconnectapp-dev.s3.eu-central-1.amazonaws.com/screenshot-2020-06-29-at-12-33-46-png"
            objectFit="cover"
            // rounded="full"
          />
        </StyledImageColumn>
      </Flex>
      <Flex mt={{ base: 16, md: 32 }} direction={{ base: "column", md: "row" }}>
        <StyledImageColumn w={{ base: "100vw", md: "60%" }}>
          <Image
            h="300px"
            w="400px"
            src="https://reconnectapp-dev.s3.eu-central-1.amazonaws.com/screenshot-2020-06-29-at-12-33-20-png"
            objectFit="cover"
          />
        </StyledImageColumn>
        <StyledTextColumn
          w={{ base: "100%", md: "50%" }}
          mt={{ base: 16, md: 0 }}
        >
          <Flex fontWeight="semibold" fontSize="2xl" mb={4}>
            <Text color={colors[0]}>Pl</Text>
            <Text color={colors[1]}>ay</Text>
            <Text color={colors[2]}>fu</Text>
            <Text color={colors[3]}>l</Text>
          </Flex>
          <Text color="gray.400" fontSize="xl">
            Most courses provide you with useful content but don't actually help
            you implement any change into your life. We change that by bringing
            you a gamified experience that will help you implement new teachings
            and stick to your new habits in a joyful way.
          </Text>
        </StyledTextColumn>
      </Flex>

      <Flex
        bg="gray.50"
        position="absolute"
        w="100%"
        left="0"
        justify="center"
        align="center"
        direction="column"
        mt="50px"
        h="250px"
      >
        <Flex
          maxW="1200px"
          w="100%"
          px={4}
          align="center"
          justify="space-between"
          direction={{ base: "column", md: "row" }}
        >
          <Flex
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="semibold"
            flexWrap="wrap"
            justify="center"
            mb={{ base: 8, md: 0 }}
          >
            <Text color={colors[0]} mr={2}>
              Create
            </Text>
            <Text color={colors[1]} mr={2}>
              new
            </Text>
            <Text color={colors[2]} mr={2}>
              habits
            </Text>
            <Text color={colors[3]} mr={2}>
              successfully.
            </Text>
          </Flex>
          <Button
            size="lg"
            px={12}
            variantColor="blue"
            onClick={() => navigate("/courses")}
          >
            Let's begin
          </Button>
        </Flex>
      </Flex>

      <Flex
        mt="300px"
        direction="column"
        justify="center"
        align="center"
        py={{ base: 8, md: 24 }}
      >
        <Text
          color="gray.400"
          fontWeight="semibold"
          fontSize="4xl"
          mb={8}
          textAlign="center"
        >
          Explore some of our challenges
        </Text>
        {courses && courses.length > 0 && (
          <SimpleGrid spacing={6} columns={{ base: 1, md: 2, lg: 3 }} p={2}>
            {courses.map(course => (
              <CourseItem key={course.id} course={course} />
            ))}
          </SimpleGrid>
        )}
      </Flex>
    </Page>
  )
}

const StyledTextColumn = styled(Flex)`
  flex-direction: column;
  justify-content: center;
`

const StyledImageColumn = styled(Flex)`
  justify-content: center;
  align-items: center;
`

const StyledFlexCard = styled(Flex)`
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: ${p => p.theme.radii.lg};
  padding: ${p => p.theme.space[2]} ${p => p.theme.space[4]};
`
