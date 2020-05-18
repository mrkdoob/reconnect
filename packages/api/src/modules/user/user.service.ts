import bcrypt from "bcryptjs"
import { User } from "./user.entity"
import { Service, Inject } from "typedi"
import { UserRepository } from "./user.repository"
import { createAuthToken } from "../../lib/jwt"
import { UserInputError } from "apollo-server-express"
import { UserMailer } from "./user.mailer"
import { UserPetService } from "../userPet/userPet.service"
import { GroupService } from "../group/group.service"
import { UserLevelService } from "../userLevel/userLevel.service"
import { UserDayRewardService } from "../userDayReward/userDayReward.service"
import { UserGroupMessageService } from "../userGroupMessage/userGroupMessage.service"
import { EndMyCourseInput } from "./user.input"
import { UserTaskService } from "../userTask/userTask.service"

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {} //TODO: Use inject?
  @Inject(() => UserTaskService)
  taskService: UserTaskService
  @Inject(() => UserMailer)
  userMailer: UserMailer
  @Inject(() => UserPetService)
  userPetService: UserPetService
  @Inject(() => GroupService)
  groupService: GroupService
  @Inject(() => UserLevelService)
  userLevelService: UserLevelService
  @Inject(() => UserDayRewardService)
  userDayRewardService: UserDayRewardService
  @Inject(() => UserGroupMessageService)
  userGroupMessageService: UserGroupMessageService

  async login(data: { email: string; password: string }): Promise<User> {
    const user = await this.userRepository.findByEmail(
      data.email.toLocaleLowerCase().trim(),
    )
    if (!user?.password) throw new UserInputError("Account not set up")
    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if (!isValidPassword)
      throw new UserInputError("Incorrect email or password")
    return user
  }

  createAuthToken(user: User): string {
    return createAuthToken({ id: user.id })
  }

  async create(data: Partial<User> & { email: string }): Promise<User> {
    const userExists = await this.userRepository.findByEmail(
      data.email.toLocaleLowerCase(),
    )
    if (userExists) throw new Error("user already exists")
    data = { ...data, email: data.email.toLocaleLowerCase().trim() }
    const user = await User.create(data).save()

    this.userMailer.sendWelcomeEmail(user)

    return user
  }

  async update(userId: string, data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (data.email && user.email !== data.email.toLowerCase().trim()) {
      await this.checkUserExists({ email: data.email })
    }
    return user.update(data)
  }

  async checkUserExists(field: Partial<User>) {
    const user = await User.find({ where: field })
    if (user.length > 0) {
      throw new UserInputError("User with these details already exists")
    }
  }

  async resetAllGroupOrdersAndSetPetLifes() {
    const users = await this.userRepository.findAllActive()
    users?.map(user => {
      if (user.groupOrder === 0 && user.groupId) {
        // Reduce pet life if user did not complete tasks
        this.userPetService.reduceLifeByUserId(user.id)
        user.update({ groupOrder: 0, hasFailed: true })
      } else {
        user.update({ groupOrder: 0, hasFailed: false })
      }
    })
  }

  async endCourseByUserId(
    userId: string,
    hasFailed: boolean,
  ): Promise<boolean> {
    const data: EndMyCourseInput = {
      groupOrder: 0,
      groupId: null,
      hasFailed: false,
    }
    await this.groupService.endOfCourseSetFinalTreeCount(userId, hasFailed)
    await this.userLevelService.destroyByUserId(userId)
    await this.userDayRewardService.destroyByUserId(userId)
    await this.userGroupMessageService.destroyByUserId(userId)
    await this.userPetService.setInactiveByUserId(userId, hasFailed)
    await this.taskService.destroyAllTasks(userId)
    await this.update(userId, data)
    return true
  }
}
