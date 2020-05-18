import DataLoader from "dataloader"
import { In } from "typeorm"
import { Level } from "../level/level.entity"
import { Group } from "../group/group.entity"
import { CourseDayReward } from "../courseDayReward/courseDayReward.entity"
import { User } from "../user/user.entity"

// TODO: Level loader

export const levelsLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const courseIds = [...keys]
    const levels = await Level.getRepository().find({
      where: {
        groupId: In(courseIds),
      },
      order: {
        levelNumber: "ASC",
      },
    })

    const map: { [key: string]: Level[] } = {}
    levels.forEach(level => {
      if (level.courseId in map) {
        map[level.courseId].push(level)
      } else {
        map[level.courseId] = [level]
      }
    })
    return courseIds.map(courseId => map[courseId] || [])
  })

export const groupsLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const courseIds = [...keys]
    const groups = await Group.getRepository().find({
      where: {
        courseId: In(courseIds),
      },
      //TODO: Filter on available slots?
      // order: {
      //   levelNumber: "ASC",
      // },
    })

    const map: { [key: string]: Group[] } = {}
    groups.forEach(group => {
      if (group.courseId in map) {
        map[group.courseId].push(group)
      } else {
        map[group.courseId] = [group]
      }
    })
    return courseIds.map(courseId => map[courseId] || [])
  })

export const courseDayRewardsLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const courseIds = [...keys]
    const courseDayRewards = await CourseDayReward.getRepository().find({
      where: {
        courseId: In(courseIds),
      },
      order: {
        order: "ASC",
      },
    })

    const map: { [key: string]: CourseDayReward[] } = {}
    courseDayRewards.forEach(dayReward => {
      if (dayReward.courseId in map) {
        map[dayReward.courseId].push(dayReward)
      } else {
        map[dayReward.courseId] = [dayReward]
      }
    })
    return courseIds.map(courseId => map[courseId] || [])
  })

export const mentorLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const userIds = [...keys]
    const mentors = await User.getRepository().findByIds(userIds, {
      cache: true,
    })
    const map: { [key: string]: User } = {}
    mentors.forEach(mentor => (map[mentor.id] = mentor))
    return userIds.map(id => map[id])
  })
