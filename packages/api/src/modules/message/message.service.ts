import { Service, Inject } from "typedi"
import { MessageRepository } from "./message.repository"
import { Message } from "./message.entity"

@Service()
export class MessageService {
  @Inject(() => MessageRepository)
  messageRepository: MessageRepository

  async create(data: Partial<Message>): Promise<Message> {
    const group = await Message.create(data).save()
    return group
  }

  async update(messageId: string, data: Partial<Message>): Promise<Message> {
    const group = await this.messageRepository.findById(messageId)
    return group.update(data)
  }

  async destroy(messageId: string): Promise<boolean> {
    const group = await this.messageRepository.findById(messageId)
    return group.destroy()
  }
}
