import React from "react"
import { RouteComponentProps } from "@reach/router"

import { Page } from "../components/Page"
import {
  SimpleGrid,
  Flex,
  Text,
  Heading,
  Tag,
  Box,
  Image,
  Progress,
  Link,
  useDisclosure,
} from "@chakra-ui/core"
import { styled } from "../components/providers/ThemeProvider"
import { Wrench } from "@styled-icons/fa-solid/Wrench"
import { YinYang } from "@styled-icons/boxicons-solid/YinYang"
import { Tree } from "@styled-icons/boxicons-solid/Tree"
import { Cycling } from "@styled-icons/boxicons-regular/Cycling"
import { GameController } from "@styled-icons/entypo/GameController"
import { Movie } from "@styled-icons/remix-line/Movie"
import { Github } from "@styled-icons/boxicons-logos/Github"
import { Link as LinkIcon } from "@styled-icons/boxicons-regular/Link"

import { Modal } from "../components/Modal"
import { colors } from "../lib/colors"

const items: {
  cover: string
  name: string
  description: string
  fullDescription: string
  tag: string
  url: string
  githubUrl?: string
}[] = [
  {
    cover:
      "https://reconnectapp-dev.s3.eu-central-1.amazonaws.com/screenshot-2020-05-20-at-15-19-30-png",
    name: "Become",
    description: "A platform that promotes behavioral change and wellbeing",
    fullDescription:
      "A personal project to discover if it is possible to use information technology to achieve behavioral change and in turn wellbeing. It uses gamification techniques and social theories in an attempt to help people stick to a daily practice or habit. I am currently in the process of interviewing users to improve and iterate it into the perfect solution.",
    tag: "Self-development",
    url: "https://www.becomebetter.life",
    githubUrl: "https://www.becomebetter.life",
  },
  {
    cover:
      "https://reconnectapp-dev.s3.eu-central-1.amazonaws.com/screenshot-2020-05-20-at-15-18-36-png",
    name: "Common Grounds",
    description:
      "Access the most interesting co-working spaces and creative communities",
    fullDescription:
      " Common Grounds allows freelancers, entrepreneurs & start-ups to access the most interesting co-working spaces and creative communities for the same price as one. I worked mostly on the web front-end and the admin panel.",
    tag: "Co-working",
    url: "https://www.commongrounds.co/en",
  },
  {
    cover:
      "https://reconnectapp-dev.s3.eu-central-1.amazonaws.com/screenshot-2020-05-19-at-12-43-17-png",
    name: "Envestry",
    description: "A secure online funding platform",
    fullDescription:
      "Envestry is a secure online funding platform, a confidential space where sophisticated investors and high-growth businesses can connect, share information, secure deals and grow. I helped with a rebuild and worked mostly on the front-end, admin panel and a few things in the back-end",
    tag: "Fintech",
    url: "https://envestors.envestry.com/",
  },
]

export const Portfolio: React.FC<RouteComponentProps> = () => {
  return (
    <Page disableRedirect={true}>
      <Flex justify="space-between" h="100%">
        <Flex
          justify="center"
          align="center"
          direction="column"
          w="30%"
          textAlign="center"
        >
          <StyledBorderImage
            size="100px"
            rounded="full"
            src={
              "https://pbs.twimg.com/profile_images/529214699041067008/fqPBAr5s_400x400.jpeg"
            }
          />
          <Text fontSize="lg" mt={4} fontWeight="semibold">
            Mark van der Laan
          </Text>
          <Text mt={2}>A full-stack web developer</Text>
          <Text>Born in '92</Text>
          <Text mt={2}>
            I have a passion for user-centered design and great ability to
            empathize with end-users. I'm a fast learner, flexible and
            efficient.
          </Text>

          <Text fontWeight="semibold" fontSize="lg" mt={8}>
            Interests
          </Text>
          <Flex w="60%" justify="space-between" mt={2}>
            <Box as={YinYang} size="1.75rem" color={colors[0]} />
            <Box as={Tree} size="1.75rem" color={colors[0]} />
            <Box as={Cycling} size="1.75rem" color={colors[1]} />
            <Box as={GameController} size="1.75rem" color={colors[2]} />
            <Box as={Movie} size="1.75rem" color={colors[3]} />
          </Flex>

          <Box as={Wrench} size="1.25rem" color="green.200" mt={8} />
          <Text fontWeight="semibold" fontSize="lg" mb={2}>
            Skills
          </Text>
          <ProgressItem label="HTML" value={90} />
          <ProgressItem label="CSS" value={90} />
          <ProgressItem label="React.js" value={85} />
          <ProgressItem label="TypeScript" value={80} />
          <ProgressItem label="GraphQL" value={75} />
          <ProgressItem label="Vanilla JavaScript" value={60} />
          <ProgressItem label="Python" value={60} />
          <ProgressItem label="Java" value={60} />
          <Link href="https://github.com/mrkdoob">
            <StyledHoverIcon mt={8} as={Github} size={16} color="green.200" />
          </Link>
        </Flex>
        {items.length > 0 ? (
          <SimpleGrid
            w="60%"
            h="60%"
            margin="auto 0"
            spacing={6}
            columns={{ base: 1, md: 2 }}
            p={2}
          >
            {items.map((item, index) => (
              <PortfolioItem key={index} item={item} />
            ))}
          </SimpleGrid>
        ) : (
          <Flex align="center" justify="center">
            <Text>No paths created yet</Text>
          </Flex>
        )}
      </Flex>
    </Page>
  )
}

export function ProgressItem(props: { value: number; label: string }) {
  return (
    <Flex w="100%" align="center" justify="center">
      <Text w="40%" textAlign="right" mr={4}>
        {props.label}
      </Text>
      <Progress
        w="35%"
        color={props.value > 70 ? "green" : "blue"}
        size="md"
        value={props.value}
        borderRadius="lg"
        isAnimated
        hasStripe
      />
    </Flex>
  )
}

interface Props {
  item: {
    cover: string
    name: string
    description: string
    fullDescription: string
    tag: string
    url: string
    githubUrl?: string
  }
}

export function PortfolioItem(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <StyledCourseItem borderRadius="lg" onClick={onOpen}>
        <Box w="100%" h={{ base: 120, lg: 150 }} bg="gray.100" rounded="lg">
          {props.item.cover && (
            <StyledCover rounded="lg" src={props.item.cover} />
          )}
          <Tag
            size="sm"
            position="relative"
            left={2}
            bottom={3}
            variantColor="green"
            color="white"
          >
            {props.item.tag}
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
            {props.item.name}
          </Heading>

          <Text fontSize="md" color="gray.400">
            {props.item.description}
          </Text>
        </Flex>
      </StyledCourseItem>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size={"2xl"}
        title={props.item.name}
      >
        <Image rounded="lg" src={props.item.cover} />
        <Text mt={4}>{props.item.fullDescription}</Text>
        <Flex mt={4}>
          <Link href={props.item.url}>
            <StyledHoverIcon as={LinkIcon} size={12} color="green.200" />
          </Link>
          {props.item.githubUrl && (
            <Link href={props.item.githubUrl}>
              <StyledHoverIcon ml={6} as={Github} size={12} color="green.200" />
            </Link>
          )}
        </Flex>
      </Modal>
    </>
  )
}

const StyledCourseItem = styled(Flex)`
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: scale(1.005);
  }
`

const StyledHoverIcon = styled(Box)`
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }
`

const StyledCover = styled(Image)`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-top: 1px solid ${p => p.theme.colors.blue[400]};
  border-left: 1px solid ${p => p.theme.colors.blue[200]};
  border-right: 1px solid ${p => p.theme.colors.green[100]};
  border-bottom: 1px solid ${p => p.theme.colors.green[400]};
`

const StyledBorderImage = styled(Image)`
  object-fit: cover;
  border-top: 2px solid ${p => p.theme.colors.blue[400]};
  border-left: 2px solid ${p => p.theme.colors.blue[200]};
  border-right: 2px solid ${p => p.theme.colors.green[100]};
  border-bottom: 2px solid ${p => p.theme.colors.green[400]};
`
