import { Service, Inject } from "typedi"
import { UserLevelRepository } from "./userLevel.repository"
import { UserLevel } from "./userLevel.entity"
import { LevelRepository } from "../level/level.repository"
import { UserTaskService } from "../userTask/userTask.service"
import { UserMailer } from "../user/user.mailer"
import { UserRepository } from "../user/user.repository"
import { UserPetService } from "../userPet/userPet.service"
import { UserService } from "../user/user.service"

@Service()
export class UserLevelService {
  @Inject(() => UserLevelRepository)
  userLevelRepository: UserLevelRepository
  @Inject(() => LevelRepository)
  levelRepository: LevelRepository
  @Inject(() => UserTaskService)
  userTaskService: UserTaskService
  @Inject(() => UserMailer)
  userMailer: UserMailer
  @Inject(() => UserRepository)
  userRepository: UserRepository
  @Inject(() => UserPetService)
  userPetService: UserPetService
  @Inject(() => UserService)
  userService: UserService

  async create(data: Partial<UserLevel>): Promise<UserLevel> {
    const userLevel = await UserLevel.create(data).save()
    return userLevel
  }

  async createFirst(userId: string, courseId: string): Promise<UserLevel> {
    const level = await this.levelRepository.findFirst(courseId)
    await this.userTaskService.createFirstTasks(level.id, userId)
    return await UserLevel.create({ userId, levelId: level.id }).save()
  }

  async update(
    userLevelId: string,
    data: Partial<UserLevel>,
  ): Promise<UserLevel> {
    const userLevel = await this.userLevelRepository.findById(userLevelId)
    return userLevel.update(data)
  }

  async destroy(userLevelId: string): Promise<boolean> {
    const userLevel = await this.userLevelRepository.findById(userLevelId)
    return userLevel.destroy()
  }

  async destroyByUserId(userId: string): Promise<boolean> {
    const userLevel = await this.userLevelRepository.findByUserId(userId)
    return userLevel.destroy()
  }

  async incrementDayProgress(userId: string): Promise<UserLevel> {
    const userLevel = await this.userLevelRepository.findByUserId(userId, {
      relations: ["level"],
    })

    if (userLevel.progressDay + 1 === userLevel.level.maxProgressDays) {
      await this.userPetService.levelUpPetByUserId(userId)
      const nextUserLevel = await this.updateToNextLevel(userLevel)
      return nextUserLevel
    } else {
      userLevel.update({
        completed: false,
        progressDay: userLevel.progressDay + 1,
      })
      return userLevel
    }
  }

  async decrementDayProgress(userId: string): Promise<UserLevel | null> {
    const userLevel = await this.userLevelRepository
      .findByUserId(userId, {
        relations: ["level"], // TODO: Somehow adding user relation is not working
      })
      .catch(e => {
        console.log("Error in decrementDayProgress: " + e)
        return null
      })
    const user = await this.userRepository.findById(userId)
    if (!userLevel || !user) return null
    if (userLevel.retriesRemaining === 0) {
      // End course
      this.userService.endCourseByUserId(userId, true)
      this.userMailer.sendEndOfCourseByFailureEmail(user)
      return null
    } else {
      await this.userPetService.resetHealthByUserId(userId)
      userLevel.update({
        completed: false,
        progressDay: 0,
        retriesRemaining: userLevel.retriesRemaining - 1,
      })
      return userLevel
    }
  }

  async updateToNextLevel(userLevel: UserLevel): Promise<UserLevel> {
    const nextLevel = await this.levelRepository.findNext(userLevel.levelId)
    if (!nextLevel.isLast) {
      await this.userTaskService.updateAllToNextTasks(
        nextLevel.id,
        userLevel.userId,
      )
    }
    const data = {
      levelId: nextLevel.id,
      completed: false,
      progressDay: 0,
      level: nextLevel,
    }
    return await userLevel.update(data)
  }
}
