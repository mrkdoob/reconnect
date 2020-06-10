import { UserInputError } from "apollo-server-express"
import { FindOneOptions, FindConditions } from "typeorm"
import { Service } from "typedi"
import { UserBooster } from "./userBooster.entity"

@Service()
export class UserBoosterRepository {
  findById(
    id: string,
    options?: FindOneOptions<UserBooster>,
  ): Promise<UserBooster> {
    try {
      return UserBooster.findOneOrFail(id, options)
    } catch {
      throw new UserInputError("Level not found")
    }
  }

  findAll(where?: FindConditions<UserBooster>): Promise<UserBooster[]> {
    return UserBooster.find({ where })
  }

  findByUserId(userId: string): Promise<UserBooster> {
    try {
      return UserBooster.findOneOrFail({
        where: { userId },
      })
    } catch {
      throw new UserInputError("No UserBooster found")
    }
  }
}
