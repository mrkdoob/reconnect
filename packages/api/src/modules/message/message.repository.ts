import { UserInputError } from "apollo-server-express"
import { FindOneOptions } from "typeorm"
import { Service } from "typedi"
import { Message } from "./message.entity"

@Service()
export class MessageRepository {
  findById(
    messageId: string,
    options?: FindOneOptions<Message>,
  ): Promise<Message> {
    try {
      return Message.findOneOrFail(messageId, options)
    } catch {
      throw new UserInputError("Message not found")
    }
  }

  findAll(): Promise<Message[]> {
    return Message.find()
  }

  findByOrder(order: number): Promise<Message> {
    try {
      return Message.findOneOrFail({
        where: { order },
      })
    } catch {
      throw new UserInputError("No message found")
    }
  }
}
