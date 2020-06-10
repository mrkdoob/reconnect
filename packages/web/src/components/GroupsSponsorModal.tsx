import React, { useState } from "react"
import {
  useDisclosure,
  Button,
  Stack,
  Flex,
  Text,
  Input,
  FormLabel,
  useToast,
} from "@chakra-ui/core"
import { Modal } from "./Modal"
import gql from "graphql-tag.macro"
import {
  UserBoosterItemFragmentDoc,
  useUpdateMyBoosterMutation,
} from "../lib/graphql"
import { mutationHandler } from "../lib/mutationHandler"

export const USER_BOOSTER_ITEM = gql`
  fragment UserBoosterItem on UserBooster {
    id
    sponsorAmount
    coinReward
    treesEarned
    mealsEarned
    coinsEarned
    sponsorEmail
    sponsorId
    sponsorAccepted
  }
`

export const UPDATE_MY_BOOSTER = gql`
  mutation UpdateMyBooster($data: UpdateUserBoosterInput!) {
    updateCurrentUserBooster(data: $data) {
      ...UserBoosterItem
    }
  }
  ${UserBoosterItemFragmentDoc}
`

interface Props {
  handleSelect: () => void
  duration: number
}

export const GroupsSponsorModal = ({ handleSelect, duration }: Props) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [confirmCommunity, setConfirmCommunity] = useState(false)
  const [confirmInvite, setConfirmInvite] = useState(false)

  const [mail, setMail] = React.useState("")
  const handleChange = (event: any) => setMail(event.target.value)
  const coinReward = duration * 2 // TODO: Currently based on 1 euro sponsor
  const sponsorAmount = 1 // TODO: Make dynamic option

  const [update] = useUpdateMyBoosterMutation()

  const handleConfirmCommunity = async () => {
    const res = await update({
      variables: {
        data: {
          coinReward,
          sponsorAmount,
          boostDays: duration,
        },
      },
    })
    mutationHandler(res, {
      onSuccess: () => {
        handleSelect()
        onClose()
        toast({
          status: "success",
          description: "Thank you!",
        })
      },
    })
  }

  const handleConfirmInvite = async () => {
    setConfirmInvite(true)
    const res = await update({
      variables: {
        data: {
          sponsorEmail: mail,
          coinReward,
          sponsorAmount,
          boostDays: duration,
        },
      },
    })
    mutationHandler(res, {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Email sent!",
        })
        onClose()
      },
    })
  }

  const handleClose = async () => {
    onClose()
    setConfirmInvite(false)
    setConfirmCommunity(false)
  }

  return (
    <Flex textAlign="center" align="center" direction="column">
      <Text fontWeight="semibold" mb={4}>
        Would you like to plant extra trees while following the program?
      </Text>
      <Text fontWeight="semibold" mb={8}>
        You can ask a friend, family member or someone from our community to
        sponsor you.
      </Text>
      <Stack isInline spacing={4}>
        <Button mr={8} variant="ghost" onClick={handleSelect}>
          No, thank you
        </Button>
        <Button variantColor="green" onClick={onOpen}>
          Sponsor
        </Button>
      </Stack>
      <Modal size="xl" isOpen={isOpen} onClose={handleClose}>
        <Flex
          direction="column"
          justify="center"
          align="center"
          textAlign="center"
        >
          {confirmCommunity ? (
            <>
              {/* TODO: Show picture + name of sponsor */}
              <Text>
                Someone will sponsor you and donate a total of 5 trees. Each day
                when you complete your tasks 1 tree will be donated.
              </Text>
              <Text my={4}>
                Please sponsor another member by donating 1 euro to Isha
              </Text>
              <Button
                my={4}
                variantColor="green"
                onClick={handleConfirmCommunity}
              >
                I have donated
              </Button>
            </>
          ) : confirmInvite ? (
            <>
              <Text>We have sent an email with instruction.</Text>
              <Text my={4}>
                Please keep your sponsor up to date with your progress, so that
                she or he can support and sponsor you.
              </Text>
              <Button my={4} variantColor="blue" onClick={handleSelect}>
                Let's begin
              </Button>
            </>
          ) : (
            <>
              <Text>
                You can ask a member of our community to sponor you for 5 trees
                (1 euro). To make this sustainable we would like you to sponsor
                someone else as well.
              </Text>
              <Button
                my={4}
                variantColor="green"
                onClick={() => setConfirmCommunity(true)}
              >
                Ask community
              </Button>
              <Text my={4}>
                Or ask a friend or family member to sponsor you for 5 trees (1
                euro).
              </Text>
              <Flex align="center" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input onChange={handleChange} variant="filled" />
              </Flex>
              <Button mb={4} variantColor="blue" onClick={handleConfirmInvite}>
                Sent mail
              </Button>
            </>
          )}
        </Flex>
      </Modal>
    </Flex>
  )
}
