import { UserInputError } from "apollo-server-express"
import { FindOneOptions } from "typeorm"
import { Service } from "typedi"
import { UserGroupMessage } from "./userGroupMessage.entity"

@Service()
export class UserGroupMessageRepository {
  findById(
    userGroupMessageId: string,
    options?: FindOneOptions<UserGroupMessage>,
  ): Promise<UserGroupMessage> {
    try {
      return UserGroupMessage.findOneOrFail(userGroupMessageId, options)
    } catch {
      throw new UserInputError("Task not found")
    }
  }

  findAll(
    options?: FindOneOptions<UserGroupMessage>,
  ): Promise<UserGroupMessage[]> {
    return UserGroupMessage.find(options)
  }

  findByUserId(
    userId: string,
    options?: FindOneOptions<UserGroupMessage>,
  ): Promise<UserGroupMessage> {
    try {
      return UserGroupMessage.findOneOrFail({
        where: { userId },
        ...options,
      })
    } catch {
      throw new UserInputError("No tasks found")
    }
  }

  findByGroupMessageId(groupMessageId: string): Promise<UserGroupMessage> {
    try {
      return UserGroupMessage.findOneOrFail({
        where: { groupMessageId },
      })
    } catch {
      throw new UserInputError("No tasks found")
    }
  }
}
