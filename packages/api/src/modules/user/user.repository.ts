import { Service } from "typedi"
import { User } from "./user.entity"
import { FindOneOptions } from "typeorm"
import { UserInputError } from "apollo-server-express"

@Service()
export class UserRepository {
  async findById(
    userId: string,
    options?: FindOneOptions<User>,
  ): Promise<User> {
    try {
      return User.findOneOrFail(userId, options)
    } catch {
      throw new UserInputError("User not found")
    }
  }

  findByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } })
  }

  findByGroupId(groupId: string): Promise<User[] | undefined> {
    return User.find({ where: { groupId } })
  }

  userCountByGroupId(groupId: string): Promise<number> {
    return User.find({ where: { groupId } }).then(res => res.length)
  }

  findAllActive(): Promise<User[] | undefined> {
    return User.find()
    // TODO: Make more efficient
    // return User.find({ where: { groupId: !null } })
  }
}
