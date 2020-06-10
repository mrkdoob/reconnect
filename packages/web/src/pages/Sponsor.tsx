import React, { useState } from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Page } from "../components/Page"
import gql from "graphql-tag.macro"
import {
  UserBoosterItemFragmentDoc,
  useUpdateBoosterMutation,
  UserBoosterSponsorItemFragmentDoc,
  useGetBoosterQuery,
} from "../lib/graphql"
import { Flex, Text, useToast, Button, Image } from "@chakra-ui/core"
import { mutationHandler } from "../lib/mutationHandler"

export const USER_BOOSTER_SPONSOR_ITEM = gql`
  fragment UserBoosterSponsorItem on UserBooster {
    id
    sponsorAmount
    user {
      id
      fullName
      firstName
      avatar
      activeUserCourse {
        id
        course {
          id
          slug
          name
        }
      }
    }
  }
`

export const UPDATE_BOOSTER = gql`
  mutation UpdateBooster(
    $userBoosterId: String!
    $data: UpdateUserBoosterInput!
  ) {
    updateUserBooster(userBoosterId: $userBoosterId, data: $data) {
      ...UserBoosterItem
    }
  }
  ${UserBoosterItemFragmentDoc}
`

export const GET_BOOSTER = gql`
  query GetBooster($userBoosterId: String!) {
    getUserBooster(userBoosterId: $userBoosterId) {
      ...UserBoosterSponsorItem
    }
  }
  ${UserBoosterSponsorItemFragmentDoc}
`

interface Props extends RouteComponentProps<{ id: string }> {}

export const Sponsor: React.FC<Props> = props => {
  const [confirm, setConfirm] = useState(false)
  const userBoosterId = props.id as string
  const [update] = useUpdateBoosterMutation()
  const { data, loading } = useGetBoosterQuery({
    variables: { userBoosterId },
  })
  const booster = data?.getUserBooster
  const toast = useToast()

  const handleConfirm = async () => {
    const res = await update({
      variables: {
        userBoosterId,
        data: {
          sponsorAccepted: true,
        },
      },
    })
    mutationHandler(res, {
      onSuccess: () => {
        setConfirm(true)
        toast({
          status: "success",
          description: "Thank you!",
        })
      },
    })
  }

  return (
    <Page loading={loading}>
      <Flex
        justify="center"
        w={{ base: "100%", md: "30rem" }}
        h="100%"
        direction="column"
        align="center"
        pb={32}
        textAlign="center"
      >
        {booster?.user?.avatar && (
          <Image src={booster?.user.avatar} size={24} rounded="full" />
        )}
        {!confirm ? (
          <>
            <Text mt={8}>
              {booster?.user?.fullName} asks you to sponsor him/her for{" "}
              {booster?.sponsorAmount} euro.
            </Text>
            <Text mb={8}>
              You will be asked to donate once {booster?.user?.firstName}{" "}
              completes his {booster?.user?.activeUserCourse?.course?.name}{" "}
              challenge.
            </Text>
            {/* TODO: Add foundation info */}
            <Button variantColor="blue" onClick={handleConfirm}>
              Confirm
            </Button>
          </>
        ) : (
          <>
            <Text my={4}>Thank you!</Text>
            <Flex align="center">
              <Link
                to={`/courses/${booster?.user?.activeUserCourse?.course?.slug}`}
              >
                <Button variantColor="blue" variant="link">
                  Click here
                </Button>
              </Link>
              <Text ml={1} mt="2px">
                if you would like to join the same challenge.
              </Text>
            </Flex>
          </>
        )}
      </Flex>
    </Page>
  )
}
