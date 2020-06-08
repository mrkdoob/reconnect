import { Service, Inject } from "typedi"
import { UserBoosterRepository } from "./userBooster.repository"
import { UserBooster } from "./userBooster.entity"
import { LevelRepository } from "../level/level.repository"
import { UserTaskService } from "../userTask/userTask.service"
import { CourseRepository } from "../course/course.repository"
import { UserLevelService } from "../userLevel/userLevel.service"
import { PetRepository } from "../pet/pet.repository"
import { UserMailer } from "../user/user.mailer"
import { UserRepository } from "../user/user.repository"

@Service()
export class UserBoosterService {
  @Inject(() => UserBoosterRepository)
  userBoosterRepository: UserBoosterRepository
  @Inject(() => PetRepository)
  petRepository: PetRepository
  @Inject(() => CourseRepository)
  courseRepository: CourseRepository
  @Inject(() => LevelRepository)
  levelRepository: LevelRepository
  @Inject(() => UserRepository)
  userRepository: UserRepository
  @Inject(() => UserTaskService)
  userTaskService: UserTaskService
  @Inject(() => UserLevelService)
  userLevelService: UserLevelService
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

  async destroy(userBoosterId: string): Promise<boolean> {
    const userBooster = await this.userBoosterRepository.findById(userBoosterId)
    return userBooster.destroy()
  }

  async setInactiveByUserId(
    userId: string,
    hasFailed: boolean,
  ): Promise<UserBooster | boolean> {
    const userBooster = await this.userBoosterRepository.findByUserId(userId)
    return hasFailed
      ? userBooster.destroy()
      : userBooster.update({ isActive: false })
  }
}
