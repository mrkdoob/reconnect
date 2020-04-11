import { Service, Inject } from "typedi"
import { UserLevelRepository } from "./userLevel.repository"
import { UserLevel } from "./userLevel.entity"
import { LevelRepository } from "../level/level.repository"
import { UserTaskService } from "../userTask/userTask.service"

@Service()
export class UserLevelService {
  @Inject(() => UserLevelRepository)
  userLevelRepository: UserLevelRepository
  @Inject(() => LevelRepository)
  levelRepository: LevelRepository
  @Inject(() => UserTaskService)
  userTaskService: UserTaskService

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

  // TODO:
  async updateDayProgress(userId: string): Promise<UserLevel> {
    // Return boolean true if next is last level
    const userLevel = await this.userLevelRepository.findByUserId(userId, {
      relations: ["level"],
    })

    // TODO: use relations: {"level"}
    const level = await this.levelRepository.findById(userLevel.levelId)
    if (userLevel.progressDay + 1 === level.maxProgressDays) {
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

  async updateToNextLevel(userLevel: UserLevel): Promise<UserLevel> {
    const nextLevel = await this.levelRepository.findNext(userLevel.levelId)
    if (nextLevel.isLast) {
      await this.userTaskService.destroyAllTasks(userLevel.userId)
    } else {
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
