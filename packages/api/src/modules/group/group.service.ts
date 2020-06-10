import { Service, Inject } from "typedi"
import { GroupRepository } from "./group.repository"
import { Group } from "./group.entity"
import { UserCourseRepository } from "../userCourse/userCourse.repository"
import { UserRepository } from "../user/user.repository"
import { UserBoosterRepository } from "../userBooster/userBooster.repository"
import { UserBoosterService } from "../userBooster/userBooster.service"

@Service()
export class GroupService {
  @Inject(() => GroupRepository)
  groupRepository: GroupRepository
  @Inject(() => UserBoosterRepository)
  userBoosterRepository: UserBoosterRepository
  @Inject(() => UserBoosterService)
  userBoosterService: UserBoosterService
  @Inject(() => UserRepository)
  userRepository: UserRepository
  @Inject(() => UserCourseRepository)
  userCourseRepository: UserCourseRepository

  async create(data: Partial<Group>): Promise<Group> {
    const group = await Group.create(data).save()
    return group
  }

  async update(groupId: string, data: Partial<Group>): Promise<Group> {
    const group = await this.groupRepository.findById(groupId)
    return group.update(data)
  }

  async endOfCourseSetFinalTreeCount(userId: string, hasFailed: boolean) {
    const user = await this.userRepository.findById(userId)
    const group =
      user.groupId && (await this.groupRepository.findById(user.groupId))
    const userCourse = await this.userCourseRepository.findByUserId(userId)
    if (!hasFailed) {
      group &&
        userCourse.update({
          isActive: false,
          finishedRewardCount: group.rewardCount,
        })
    } else {
      userCourse.destroy()
    }
  }

  async completeMember(
    groupId: string | null,
    userId: string,
  ): Promise<Group | undefined> {
    if (!groupId) return
    const group = await this.groupRepository.findById(groupId)
    const booster = await this.userBoosterRepository.findByUserId(userId)

    const rewardAmount = Math.floor(booster.coinReward / group.coinsForReward)

    await this.userBoosterService.useBoosterByUserId(userId, rewardAmount)

    const data: Partial<Group> = {
      groupMembersFinished: group.groupMembersFinished + 1,
      rewardCount: group.rewardCount + rewardAmount,
      groupCoins: group.groupCoins + booster.coinReward,
    }
    return group.update(data)
  }

  async destroy(groupId: string): Promise<boolean> {
    const group = await this.groupRepository.findById(groupId)
    return group.destroy()
  }

  async resetMembersFinished() {
    const groups = await this.groupRepository.findAll()
    groups.map(group =>
      group.update({
        groupMembersFinished: 0,
      }),
    )
  }
}
