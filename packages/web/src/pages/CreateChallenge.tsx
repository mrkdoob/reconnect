import React from "react"
import { RouteComponentProps } from "@reach/router"

import { Page } from "../components/Page"
import { Text, Button, Tooltip, useDisclosure, Collapse } from "@chakra-ui/core"
import { Center } from "../components/Center"
import { useMe } from "../components/providers/MeProvider"
import { CourseCreateForm } from "../components/CourseCreateForm"

interface Props extends RouteComponentProps<{}> {}

export const CreateChallenge: React.FC<Props> = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const me = useMe()
  const allowedToCreateCourse =
    me?.userBooster?.coinsEarned && me?.userBooster?.coinsEarned >= 100

  return (
    <Page>
      <Center>
        {!isOpen && (
          <>
            <Text mb={4}>
              Join the fun and create your own 5-day challenge.
            </Text>
            <Tooltip
              aria-label="Unlock by earning 100 coins"
              hasArrow
              label="Unlock by earning 100 coins"
              placement="top"
              isOpen={allowedToCreateCourse ? false : undefined}
            >
              <Button
                variantColor="blue"
                onClick={onOpen}
                isDisabled={!allowedToCreateCourse}
              >
                Create a challenge
              </Button>
            </Tooltip>
          </>
        )}
        {me && (
          <Collapse
            mt="60px"
            title="Create a challenge"
            size="full"
            isOpen={isOpen}
          >
            <CourseCreateForm onClose={onClose} mentorId={me.id} />
          </Collapse>
        )}
      </Center>
    </Page>
  )
}
