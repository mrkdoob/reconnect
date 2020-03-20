import { UserInputError } from "apollo-server-express"
import { FindOneOptions } from "typeorm"
import { Service } from "typedi"
import { GroupMessage } from "./groupMessage.entity"

@Service()
export class GroupMessageRepository {
  findById(
    groupMessageId: string,
    options?: FindOneOptions<GroupMessage>,
  ): Promise<GroupMessage> {
    try {
      return GroupMessage.findOneOrFail(groupMessageId, options)
    } catch {
      throw new UserInputError("GroupMessage not found")
    }
  }

  findAll(): Promise<GroupMessage[]> {
    return GroupMessage.find()
  }

  findByGroupId(groupId: string): Promise<GroupMessage> {
    try {
      return GroupMessage.findOneOrFail({
        where: { groupId },
      })
    } catch {
      throw new UserInputError("No group message found")
    }
  }
}
