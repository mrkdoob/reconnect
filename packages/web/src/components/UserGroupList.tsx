import React from "react"
import { Text, Flex, Box, Progress, Image, Tooltip } from "@chakra-ui/core"
import { UserGroupItem } from "./UserGroupItem"
import {
  UserGroupItemFragment,
  GroupUserTaskItemFragment,
} from "../lib/graphql"
import { User } from "styled-icons/boxicons-regular/User"
import { InfoCircle } from "styled-icons/boxicons-regular/InfoCircle"
import Tree from "../lib/assets/tree.png"
import Food from "../lib/assets/food.png"
import Coin from "../lib/assets/coin.png"

interface Props {
  group: UserGroupItemFragment
}

export function UserGroupList({ group }: Props) {
  const completedMembers = group?.users?.filter(u => u.groupOrder > 0)

  const currentMembersInProgress: GroupUserTaskItemFragment[] = []

  group.users?.map(user => {
    if (
      user.groupOrder !== 0 &&
      user.groupOrder > group.groupMembersFinished - 3
    ) {
      currentMembersInProgress.push(user)
    }
  })

  while (currentMembersInProgress.length < 4)
    currentMembersInProgress.push({
      id: "",
      firstName: "...",
      // avatar:
      // "https://cdn4.iconfinder.com/data/icons/communication-146/60/man-avatar-circle-question-mark-512.png",
      groupOrder: 0,
    })

  return (
    <>
      {group && group.users && (
        <>
          <Text mb={4} fontSize="sm" fontWeight="semibold">
            Todays group progress
          </Text>
          <Flex w="100%" direction="column">
            <Flex align="center" justify="space-between" position="relative">
              <Progress
                value={
                  ((group.groupQiCoins % group.qiForReward) /
                    group.qiForReward) *
                  100
                }
                borderRadius="lg"
                h={2}
                w="90%"
                color="green"
              />
              {group.rewardType === "tree" ? (
                <Image src={Tree} h={12} w={16} />
              ) : (
                <Image src={Food} h={12} w={12} mx={4} />
              )}
              <Tooltip
                // @ts-ignore
                ariaLabel={
                  group.qiForReward -
                  (group.groupQiCoins % group.qiForReward) +
                  (group.rewardType === "tree"
                    ? " more Qi coins needed to plant a tree"
                    : " more Qi coins needed to provide a meal")
                }
                label={
                  group.qiForReward -
                  (group.groupQiCoins % group.qiForReward) +
                  (group.rewardType === "tree"
                    ? " more Qi coins needed to plant a tree"
                    : " more Qi coins needed to provide a meal")
                }
              >
                <Box
                  position="absolute"
                  right="0"
                  top={6}
                  as={InfoCircle}
                  h={6}
                  ml={2}
                  color="gray.300"
                />
              </Tooltip>
            </Flex>
            <Flex justify="space-between" mt={6}>
              {currentMembersInProgress.length > 0 &&
                currentMembersInProgress.map((user, index) => (
                  <UserGroupItem key={index} user={user} />
                ))}
            </Flex>

            <Flex align="center">
              <Text ml={4} fontSize="lg"></Text>
            </Flex>
            <Flex align="center" mt={8}>
              <Flex w={16} justify="center" align="center">
                <Image src={Coin} h={8} w={8} />
              </Flex>
              <Text ml={4} fontSize="lg">
                {group.groupQiCoins} Qi coins earned
              </Text>
            </Flex>
            <Flex align="center" mt={8}>
              <Flex justify="center" align="center" w={16}>
                {group.rewardType === "tree" ? (
                  <Image src={Tree} h={12} w={16} />
                ) : (
                  <Image src={Food} h={12} w={12} />
                )}
              </Flex>
              <Text ml={4} fontSize="lg">
                {group.rewardCount - group.oldRewardCount} {group.rewardType}
                {group.rewardCount - group.oldRewardCount !== 1 && "s"}{" "}
                {group.rewardType === "tree" ? "planted" : "provided"} today
              </Text>
            </Flex>
            <Tooltip
              // @ts-ignore
              label={completedMembers.map((user, index) => {
                if (completedMembers && index + 1 < completedMembers.length) {
                  return user.firstName + ", "
                } else if (completedMembers && completedMembers.length === 1) {
                  return user.firstName + " has completed her/his tasks today"
                } else {
                  return user.firstName + " have completed their tasks today"
                }
              })}
              isOpen={
                completedMembers && completedMembers.length > 0
                  ? undefined
                  : false
              }
            >
              <Flex align="center" mt={8}>
                <Flex justify="center" align="center" w={16}>
                  <Box as={User} mx={4} h={8} color="blue.500" />
                </Flex>
                <Flex align="center">
                  <Text ml={4} fontSize="lg">
                    {group.groupMembersFinished} out of {group.users.length}{" "}
                    have completed their tasks
                  </Text>
                  <Box
                    as={InfoCircle}
                    h={{ base: 12, md: 6 }}
                    ml={2}
                    color="gray.300"
                  />
                </Flex>
              </Flex>
            </Tooltip>
          </Flex>
        </>
      )}
    </>
  )
}
