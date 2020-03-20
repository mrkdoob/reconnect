import bcrypt from "bcryptjs"
import { User } from "./user.entity"
import { Service, Inject } from "typedi"
import { UserRepository } from "./user.repository"
import { createAuthToken } from "../../lib/jwt"
import { UserInputError } from "apollo-server-express"
import { UserTaskService } from "../userTask/userTask.service"

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {} //TODO: Use inject?
  @Inject(() => UserTaskService)
  taskService: UserTaskService

  async login(data: { email: string; password: string }): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email)
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
    const userExists = await this.userRepository.findByEmail(data.email)
    if (userExists) throw new Error("user already exists")
    const user = await User.create(data).save()
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

  async resetAllGroupOrders() {
    const users = await this.userRepository.findAllActive()
    users?.map(user => user.update({ groupOrder: 0 }))
  }
}
