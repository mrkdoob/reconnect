import { Service, Inject } from "typedi"
import { UserPetRepository } from "./userPet.repository"
import { UserPet } from "./userPet.entity"
import { LevelRepository } from "../level/level.repository"
import { UserTaskService } from "../userTask/userTask.service"
import { CourseRepository } from "../course/course.repository"
import { MAX_LIFES } from "../../lib/globalVars"
import { UserLevelService } from "../userLevel/userLevel.service"
import { PetRepository } from "../pet/pet.repository"

@Service()
export class UserPetService {
  @Inject(() => UserPetRepository)
  userPetRepository: UserPetRepository
  @Inject(() => PetRepository)
  petRepository: PetRepository
  @Inject(() => CourseRepository)
  courseRepository: CourseRepository
  @Inject(() => LevelRepository)
  levelRepository: LevelRepository
  @Inject(() => UserTaskService)
  userTaskService: UserTaskService
  @Inject(() => UserLevelService)
  userLevelService: UserLevelService

  async create(data: Partial<UserPet>): Promise<UserPet> {
    const userPet = await UserPet.create(data).save()
    return userPet
  }

  async createFirst(userId: string, courseId: string): Promise<UserPet> {
    const course = await this.courseRepository.findById(courseId)
    return await UserPet.create({ userId, petId: course.petId }).save()
  }

  async update(userPetId: string, data: Partial<UserPet>): Promise<UserPet> {
    const userPet = await this.userPetRepository.findById(userPetId)
    return userPet.update(data)
  }

  async destroy(userPetId: string): Promise<boolean> {
    const userPet = await this.userPetRepository.findById(userPetId)
    return userPet.destroy()
  }

  async setInactiveByUserId(
    userId: string,
    hasFailed: boolean,
  ): Promise<UserPet | boolean> {
    const userPet = await this.userPetRepository.findByUserId(userId)
    return hasFailed ? userPet.destroy() : userPet.update({ isActive: false })
  }

  async resetHealthByUserId(userId: string): Promise<UserPet> {
    const userPet = await this.userPetRepository.findByUserId(userId)
    const data = { lifes: MAX_LIFES }
    return userPet.update(data)
  }

  async levelUpPetByUserId(userId: string): Promise<UserPet> {
    const userPet = await this.userPetRepository.findByUserId(userId, {
      relations: ["pet"],
    })

    const nextLevelPet =
      userPet.pet && (await this.petRepository.findNextLevelById(userPet.pet))
    const data = nextLevelPet
      ? {
          lifes: MAX_LIFES,
          petId: nextLevelPet.id,
        }
      : {
          lifes: MAX_LIFES,
        }
    return userPet.update(data)
  }

  async reduceLifeByUserId(userId: string): Promise<UserPet | null> {
    const userPet = await this.userPetRepository
      .findByUserId(userId, { where: { isActive: true } })
      .catch(e => {
        console.log("Error in reduceLifeByUserId: " + e)
        return null
      })
    if (!userPet) return null
    if (userPet.lifes - 1 === 0) {
      // Lose progress
      await this.userLevelService.decrementDayProgress(userId)
      return null
    } else {
      const data = { lifes: userPet.lifes - 1 }
      return userPet.update(data)
    }
  }
}
