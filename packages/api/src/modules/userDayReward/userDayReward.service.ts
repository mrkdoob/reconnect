import { Service, Inject } from "typedi"
import { UserDayRewardRepository } from "./userDayReward.repository"
import { UserDayReward } from "./userDayReward.entity"
import { CourseDayRewardRepository } from "../courseDayReward/courseDayReward.repository"
import { UserCourseRepository } from "../userCourse/userCourse.repository"

@Service()
export class UserDayRewardService {
  @Inject(() => UserDayRewardRepository)
  userGroupMessageRepository: UserDayRewardRepository
  @Inject(() => CourseDayRewardRepository)
  courseDayRewardRepository: CourseDayRewardRepository
  @Inject(() => UserCourseRepository)
  userCourseRepository: UserCourseRepository

  async create(data: Partial<UserDayReward>): Promise<UserDayReward> {
    const reward = await UserDayReward.create(data).save()
    return reward
  }

  async createFirstReward(userId: string): Promise<UserDayReward> {
    // TODO: Put into one query
    const userCourse = await this.userCourseRepository.findByUserId(userId)
    const courseReward = await this.courseDayRewardRepository.findByCourseId(
      userCourse.courseId,
    )
    const data = { userId, courseDayRewardId: courseReward.id }
    const reward = await UserDayReward.create(data).save()
    return reward
  }

  async update(
    userDayRewardId: string,
    data: Partial<UserDayReward>,
  ): Promise<UserDayReward> {
    const reward = await this.userGroupMessageRepository.findById(
      userDayRewardId,
    )
    return reward.update(data)
  }

  async updateToNextReward(userDayRewardId: string): Promise<UserDayReward> {
    const reward = await this.userGroupMessageRepository.findById(
      userDayRewardId,
    )
    const newReward = await this.courseDayRewardRepository.findNext(
      reward.courseDayRewardId,
    )

    const data = { courseDayRewardId: newReward.id }
    return reward.update(data)
  }

  async destroy(userDayRewardId: string): Promise<boolean> {
    const reward = await this.userGroupMessageRepository.findById(
      userDayRewardId,
    )
    return reward.destroy()
  }

  async destroyByUserId(userId: string): Promise<boolean> {
    const reward = await this.userGroupMessageRepository.findByUserId(userId)
    return reward.destroy()
  }
}
