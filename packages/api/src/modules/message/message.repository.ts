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

  findAllByCourseId(courseId: string): Promise<Message[]> {
    try {
      return Message.find({
        where: { courseId },
      })
    } catch {
      throw new UserInputError("No message found")
    }
  }

  findByOrderCourse(order: number, courseId: string): Promise<Message> {
    try {
      return Message.findOneOrFail({
        where: { order, courseId },
      })
    } catch {
      throw new UserInputError("No message found")
    }
  }

  async findNext(messageId: string): Promise<Message> {
    const message = await Message.findOneOrFail(messageId)
    return await this.findByOrderCourse(
      message.order + 1,
      message.courseId,
    ).catch(() => {
      try {
        return this.findByOrderCourse(1, message.courseId)
      } catch {
        throw new UserInputError("No message found")
      }
    })
  }
}
