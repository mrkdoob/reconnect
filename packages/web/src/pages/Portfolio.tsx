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
import { items } from "../lib/portfolioData"

export const Portfolio: React.FC<RouteComponentProps> = () => {
  return (
    <Page disableRedirect={true}>
      <Flex
        justify="space-between"
        h="100%"
        flexWrap="wrap"
        mt={{ base: 16, md: 0 }}
      >
        <Flex
          justify="center"
          align="center"
          direction="column"
          w={{ base: "100%", md: "30%" }}
          textAlign="center"
        >
          <StyledBorderImage
            size="100px"
            rounded="full"
            src={
              "https://avatars3.githubusercontent.com/u/11900068?s=460&u=026263fe9014a9301a19a80f55636d8a8ac43ecc&v=4"
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
          <ProgressItem label="SQL" value={60} />
          <ProgressItem label="Python" value={60} />
          <ProgressItem label="Java" value={60} />
          <Link href="https://github.com/mrkdoob">
            <StyledHoverIcon mt={8} as={Github} size={16} color="green.200" />
          </Link>
        </Flex>
        {items.length > 0 ? (
          <SimpleGrid
            w={{ base: "100%", md: "60%" }}
            h={{ base: "40%", md: "60%" }}
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
            <StyledBorderImage
              h="100%"
              w="100%"
              rounded="lg"
              src={props.item.cover}
            />
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

const StyledBorderImage = styled(Image)`
  object-fit: cover;
  border-top: 2px solid ${p => p.theme.colors.blue[400]};
  border-left: 2px solid ${p => p.theme.colors.blue[200]};
  border-right: 2px solid ${p => p.theme.colors.green[100]};
  border-bottom: 2px solid ${p => p.theme.colors.green[400]};
`
