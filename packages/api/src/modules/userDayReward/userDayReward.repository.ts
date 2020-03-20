import { UserInputError } from "apollo-server-express"
import { FindOneOptions } from "typeorm"
import { Service } from "typedi"
import { UserDayReward } from "./userDayReward.entity"

@Service()
export class UserDayRewardRepository {
  findById(
    userDayRewardId: string,
    options?: FindOneOptions<UserDayReward>,
  ): Promise<UserDayReward> {
    try {
      return UserDayReward.findOneOrFail(userDayRewardId, options)
    } catch {
      throw new UserInputError("User rewards not found")
    }
  }

  findByUserId(userId: string): Promise<UserDayReward> {
    try {
      return UserDayReward.findOneOrFail({
        where: { userId },
      })
    } catch {
      throw new UserInputError("No user rewards found")
    }
  }
}
