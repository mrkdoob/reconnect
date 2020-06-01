import React from "react"
import {
  Flex,
  Heading,
  Box,
  Spinner,
  Button,
  useDisclosure,
} from "@chakra-ui/core"
import { Badge } from "styled-icons/boxicons-regular/Badge"

import gql from "graphql-tag.macro"
import {
  MessageFragmentDoc,
  useGetAdminCourseMessagesQuery,
  MessageFragment,
} from "../lib/graphql"
import { Center } from "./Center"
import { Modal } from "./Modal"
import { Table, Column } from "./Table"
import { AdminCourseMessageCreateForm } from "./AdminCourseMessageCreateForm"
import { AdminCourseMessageItem } from "./AdminCourseMessageItem"

export const GET_ADMIN_COURSE_MESSAGES = gql`
  query GetAdminCourseMessages($courseId: String!) {
    getCourseMessages(courseId: $courseId) {
      ...Message
    }
  }
  ${MessageFragmentDoc}
`

interface Props {
  courseId: string
}

type I = MessageFragment

export function AdminCourseMessageList(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, loading } = useGetAdminCourseMessagesQuery({
    variables: { courseId: props.courseId },
  })
  const messages = data?.getCourseMessages

  return (
    <>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Flex
          justify="center"
          mt={{ base: 4, md: "12" }}
          px={{ base: "2", md: "0" }}
          w="100%"
        >
          <Flex
            direction="column"
            align="center"
            w="100%"
            pt={{ base: 6, md: 12 }}
          >
            <Flex align="center">
              <Box as={Badge} h={8} mb={1} color="blue.500" />
            </Flex>

            <Heading mb={4} fontWeight="normal" fontSize="2xl">
              Course messages
            </Heading>

            {messages && (
              <Box w="100%">
                <Table
                  loading={loading}
                  noData="No messages have been created yet"
                  data={messages}
                >
                  <Column<I>
                    row={message => (
                      <AdminCourseMessageItem message={message} />
                    )}
                  />
                </Table>
              </Box>
            )}
            {/* TODO: Add Reward item */}
            <Button variantColor="blue" onClick={onOpen} mb={8} leftIcon="add">
              Create new message
            </Button>
          </Flex>
        </Flex>
      )}
      <Modal size="xl" isOpen={isOpen} onClose={onClose} title="Create message">
        <AdminCourseMessageCreateForm
          onClose={onClose}
          courseId={props.courseId}
          order={messages ? messages.length + 1 : 1}
        />
      </Modal>
    </>
  )
}
