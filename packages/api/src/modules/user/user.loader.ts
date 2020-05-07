import DataLoader from "dataloader"

import { In } from "typeorm"
import { Group } from "../group/group.entity"
import { UserCourse } from "../userCourse/userCourse.entity"
import { UserLevel } from "../userLevel/userLevel.entity"
import { UserTask } from "../userTask/userTask.entity"
import { UserGroupMessage } from "../userGroupMessage/userGroupMessage.entity"
import { UserDayReward } from "../userDayReward/userDayReward.entity"

// USER TASKS
export const userTasksLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const userIds = [...keys]
    const tasks = await UserTask.getRepository().find({
      where: {
        userId: In(userIds),
      },
      order: {
        order: "ASC",
      },
    })
    const map: { [key: string]: UserTask[] } = {}
    tasks.forEach(task => {
      if (task.userId in map) {
        map[task.userId].push(task)
      } else {
        map[task.userId] = [task]
      }
    })
    return userIds.map(userId => map[userId] || [])
  })

// USER PROGRESS
export const userCourseLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const userIds = [...keys]
    const userCourses = await UserCourse.getRepository().find({
      where: {
        userId: In(userIds),
      },
    })
    const map: { [key: string]: UserCourse[] } = {}
    userCourses.forEach(userCourse => {
      if (userCourse.userId in map) {
        map[userCourse.userId].push(userCourse)
      } else {
        map[userCourse.userId] = [userCourse]
      }
    })
    return userIds.map(userId => map[userId] || [])
  })

// USER GROUP
export const userGroupsLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const groupIds = [...keys]
    const groups = await Group.getRepository().findByIds(groupIds, {
      cache: true,
    })
    const map: { [key: string]: Group } = {}
    groups.forEach(group => {
      if (!group.hasId) return null
      map[group.id] = group
    })
    return groupIds.map(id => map[id]) || {}
  })

// USER LEVEL
export const userLevelLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const userIds = [...keys]
    const userLevels = await UserLevel.getRepository().find({
      where: {
        userId: In(userIds),
      },
      cache: true,
    })
    const map: { [key: string]: UserLevel } = {}
    userLevels.forEach(userLevel => {
      if (!userLevel.userId) return null
      map[userLevel.userId] = userLevel
    })
    return userIds.map(id => map[id]) || {}
  })

// USER GROUP MESSAGE
export const userGroupMessageLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const userIds = [...keys]
    const userGroupMessages = await UserGroupMessage.getRepository().find({
      where: {
        userId: In(userIds),
      },
      cache: true,
    })
    const map: { [key: string]: UserGroupMessage } = {}
    userGroupMessages.forEach(message => {
      if (!message.userId) return null
      map[message.userId] = message
    })
    return userIds.map(id => map[id]) || {}
  })

// USER DAY REWARD
export const userDayRewardLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const userIds = [...keys]
    const userDayRewards = await UserDayReward.getRepository().find({
      where: {
        userId: In(userIds),
      },
      cache: true,
    })
    const map: { [key: string]: UserDayReward } = {}
    userDayRewards.forEach(reward => {
      if (!reward.userId) return null
      map[reward.userId] = reward
    })
    return userIds.map(id => map[id]) || {}
  })
