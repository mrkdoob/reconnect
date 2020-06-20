import { UserInputError } from "apollo-server-express"
import { FindOneOptions, FindConditions } from "typeorm"
import { Service } from "typedi"
import { UserPet } from "./userPet.entity"

@Service()
export class UserPetRepository {
  findById(id: string, options?: FindOneOptions<UserPet>): Promise<UserPet> {
    try {
      return UserPet.findOneOrFail(id, options)
    } catch {
      throw new UserInputError("Level not found")
    }
  }

  findAll(where?: FindConditions<UserPet>): Promise<UserPet[]> {
    return UserPet.find({ where })
  }

  findByUserId(
    userId: string,
    options?: FindOneOptions<UserPet>,
  ): Promise<UserPet> {
    try {
      return UserPet.findOneOrFail({
        where: { userId },
        ...options,
      })
    } catch {
      throw new UserInputError("No UserPet found")
    }
  }

  findActiveByUserId(
    userId: string,
    options?: FindOneOptions<UserPet>,
  ): Promise<UserPet> {
    try {
      return UserPet.findOneOrFail({
        where: { userId, isActive: true },
        ...options,
      })
    } catch {
      throw new UserInputError("No UserPet found")
    }
  }
}
