import React from "react"
import {
  Text,
  Box,
  AspectRatioBox,
  // Tag,
  // Flex,
  // Collapse,
  // useDisclosure,
  // Icon,
} from "@chakra-ui/core"
import {
  LevelTaskItemFragment,
  LevelTaskOptionItemFragmentDoc,
  // LevelTaskOptionItemFragment,
} from "../lib/graphql"
import gql from "graphql-tag.macro"

export const LEVEL_TASK_OPTION_ITEM = gql`
  fragment LevelTaskOptionItem on LevelTaskOption {
    id
    order
    label
    description
    fullDescription
    videoUrl
  }
`

export const LEVEL_TASK_ITEM = gql`
  fragment LevelTaskItem on LevelTask {
    id
    order
    description
    fullDescription
    videoUrl
    options {
      ...LevelTaskOptionItem
    }
  }
  ${LevelTaskOptionItemFragmentDoc}
`

interface Props {
  task: LevelTaskItemFragment
}

export function LevelTaskItem({ task }: Props) {
  return (
    <>
      <Text as="i" mt={6}>
        {task.description}
      </Text>
      <Text>{task.fullDescription}</Text>
      {task.videoUrl && (
        <>
          <AspectRatioBox ratio={4 / 3}>
            <Box
              mt={6}
              as="iframe"
              title="task video"
              // @ts-ignore
              src={task.videoUrl || ""}
              allowFullScreen
              borderRadius="lg"
            />
          </AspectRatioBox>
          <Box mb={6} />
        </>
      )}
      {/* TODO: Possible feature */}
      {/* <Box w="100%">
        {task?.options?.map(option => (
          <LevelTaskOptionItem key={option.id} option={option} />
        ))}
      </Box> */}
    </>
  )
}

// TODO: Possible feature

// interface OptionProps {
//   option: LevelTaskOptionItemFragment
// }

// function LevelTaskOptionItem({ option }: OptionProps) {
//   const { isOpen, onClose, onOpen } = useDisclosure()

//   return (
//     <Box mt={8}>
//       <Flex justify="space-between" align="center">
//         <Flex align="center">
//           <Text as="i" mr={4}>
//             {option.description}
//           </Text>
//           <Icon
//             size="1.25rem"
//             color="gray.300"
//             name={isOpen ? "chevron-up" : "chevron-down"}
//             onClick={isOpen ? onClose : onOpen}
//             cursor="pointer"
//             transform="0.3s ease-in-out"
//           />
//         </Flex>
//         <Tag
//           ml={8}
//           w="fit-content"
//           h="fit-content"
//           size="sm"
//           variantColor="cyan"
//         >
//           {option.label}
//         </Tag>
//       </Flex>
//       <Collapse isOpen={isOpen} mt={4}>
//         <Text>{option.fullDescription}</Text>
//         {option.videoUrl && (
//           <>
//             <AspectRatioBox ratio={4 / 3}>
//               <Box
//                 mt={6}
//                 as="iframe"
//                 title="task video"
//                 // @ts-ignore
//                 src={option.videoUrl || ""}
//                 allowFullScreen
//                 borderRadius="lg"
//               />
//             </AspectRatioBox>
//             <Box mb={6} />
//           </>
//         )}
//       </Collapse>
//     </Box>
//   )
// }
