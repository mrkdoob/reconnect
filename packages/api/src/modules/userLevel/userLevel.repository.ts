import { UserInputError } from "apollo-server-express"
import { FindOneOptions, FindConditions } from "typeorm"
import { Service } from "typedi"
import { UserLevel } from "./userLevel.entity"

@Service()
export class UserLevelRepository {
  findById(
    id: string,
    options?: FindOneOptions<UserLevel>,
  ): Promise<UserLevel> {
    try {
      return UserLevel.findOneOrFail(id, options)
    } catch {
      throw new UserInputError("Level not found")
    }
  }

  findAll(where?: FindConditions<UserLevel>): Promise<UserLevel[]> {
    return UserLevel.find({ where })
  }

  findByUserId(userId: string): Promise<UserLevel> {
    try {
      return UserLevel.findOneOrFail({
        where: { userId },
      })
    } catch {
      throw new UserInputError("No UserLevel found")
    }
  }
}
