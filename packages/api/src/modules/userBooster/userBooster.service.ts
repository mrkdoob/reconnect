import { Service, Inject } from "typedi"
import { UserBoosterRepository } from "./userBooster.repository"
import { UserBooster } from "./userBooster.entity"
import { UserRepository } from "../user/user.repository"
import { UserCourseRepository } from "../userCourse/userCourse.repository"
import { CourseRepository } from "../course/course.repository"
import { UserMailer } from "../user/user.mailer"

@Service()
export class UserBoosterService {
  @Inject(() => UserBoosterRepository)
  userBoosterRepository: UserBoosterRepository
  @Inject(() => UserRepository)
  userRepository: UserRepository
  @Inject(() => UserCourseRepository)
  userCourseRepository: UserCourseRepository
  @Inject(() => CourseRepository)
  courseRepository: CourseRepository
  @Inject(() => UserMailer)
  userMailer: UserMailer

  async create(data: Partial<UserBooster>): Promise<UserBooster> {
    const userBooster = await UserBooster.create(data).save()
    return userBooster
  }

  async update(
    userBoosterId: string,
    data: Partial<UserBooster>,
  ): Promise<UserBooster> {
    const userBooster = await this.userBoosterRepository.findById(userBoosterId)
    return userBooster.update(data)
  }

  async updateByUserId(
    userId: string,
    data: Partial<UserBooster>,
    sendSponsorInviteEmail: boolean,
  ): Promise<UserBooster> {
    const userBooster = await this.userBoosterRepository.findByUserId(userId)

    if (data.sponsorEmail && sendSponsorInviteEmail)
      this.userMailer.sendSponsorInviteEmail(userBooster.id)

    return userBooster.update(data)
  }

  async useBoosterByUserId(
    userId: string,
    rewardsEarned: number,
  ): Promise<UserBooster> {
    const userBooster = await this.userBoosterRepository.findByUserId(userId)
    const userCourse = await this.userCourseRepository.findByUserId(userId)
    const course = await this.courseRepository.findById(userCourse.courseId)
    const treesEarned =
      userBooster.treesEarned +
      (course.rewardType === "tree" ? rewardsEarned : 0)
    const mealsEarned =
      userBooster.mealsEarned +
      (course.rewardType === "meal" ? rewardsEarned : 0)

    let boostDays = userBooster.boostDays
    let coinReward = userBooster.coinReward
    let sponsorAmount = userBooster.sponsorAmount

    if (userBooster.boostDays === 0) {
      coinReward = 1
      sponsorAmount = 0
      userBooster.sponsorEmail &&
        this.userMailer.sendSponsorCompleteEmail(userBooster.id)
    } else {
      boostDays = userBooster.boostDays - 1
    }

    const data = {
      coinsEarned: coinReward + userBooster.coinsEarned,
      boostDays,
      coinReward,
      treesEarned,
      mealsEarned,
      sponsorAmount,
    }
    return userBooster.update(data)
  }

  async destroy(userBoosterId: string): Promise<boolean> {
    const userBooster = await this.userBoosterRepository.findById(userBoosterId)
    return userBooster.destroy()
  }
}
