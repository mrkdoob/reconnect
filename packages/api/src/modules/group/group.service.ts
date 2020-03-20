import { Service, Inject } from "typedi"
import { GroupRepository } from "./group.repository"
import { Group } from "./group.entity"
import { UserCourseRepository } from "../userCourse/userCourse.repository"
import { UserRepository } from "../user/user.repository"

@Service()
export class GroupService {
  @Inject(() => GroupRepository)
  groupRepository: GroupRepository
  @Inject(() => UserRepository)
  userRepository: UserRepository
  @Inject(() => UserCourseRepository)
  UserCourseRepository: UserCourseRepository

  async create(data: Partial<Group>): Promise<Group> {
    const group = await Group.create(data).save()
    return group
  }

  async update(groupId: string, data: Partial<Group>): Promise<Group> {
    const group = await this.groupRepository.findById(groupId)
    return group.update(data)
  }

  async endOfCourseSetFinalTreeCount(groupId: string | null, userId: string) {
    const group = groupId && (await this.groupRepository.findById(groupId))
    const userCourse = await this.UserCourseRepository.findByUserId(userId)
    group &&
      userCourse.update({
        isActive: false,
        finishedRewardCount: group.rewardCount,
      })
  }

  async completeMember(groupId: string | null): Promise<Group | undefined> {
    if (!groupId) return
    const group = await this.groupRepository.findById(groupId)
    const newFinishedCount = group.groupMembersFinished + 1
    let newQiCoins = group.groupQiCoins + group.qiRewardAmount

    let newRewardCount = 0
    if (newQiCoins % group.qiForReward === 0) {
      newRewardCount = group.rewardCount + 1
      newQiCoins = 0
    } else {
      newRewardCount = group.rewardCount
    }

    const data: Partial<Group> = {
      groupMembersFinished: newFinishedCount,
      rewardCount: newRewardCount,
      groupQiCoins: newQiCoins,
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
