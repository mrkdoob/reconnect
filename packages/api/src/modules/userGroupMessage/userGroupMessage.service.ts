import { Service, Inject } from "typedi"
import { UserGroupMessageRepository } from "./userGroupMessage.repository"
import { UserGroupMessage } from "./userGroupMessage.entity"
import { GroupMessageRepository } from "../groupMessage/groupMessage.repository"

@Service()
export class UserGroupMessageService {
  @Inject(() => UserGroupMessageRepository)
  userGroupMessageRepository: UserGroupMessageRepository
  @Inject(() => GroupMessageRepository)
  groupMessageRepository: GroupMessageRepository

  async create(data: Partial<UserGroupMessage>): Promise<UserGroupMessage> {
    const group = await UserGroupMessage.create(data).save()
    return group
  }

  async createFirst(
    userId: string,
    groupId: string,
  ): Promise<UserGroupMessage> {
    const groupMessage = await this.groupMessageRepository.findByGroupId(
      groupId,
    )
    return await UserGroupMessage.create({
      userId,
      groupMessageId: groupMessage.id,
    }).save()
  }

  async update(
    userGroupMessageId: string,
    data: Partial<UserGroupMessage>,
  ): Promise<UserGroupMessage> {
    const group = await this.userGroupMessageRepository.findById(
      userGroupMessageId,
    )
    return group.update(data)
  }

  async destroy(userGroupMessageId: string): Promise<boolean> {
    const group = await this.userGroupMessageRepository.findById(
      userGroupMessageId,
    )
    return group.destroy()
  }

  async destroyByUserId(userId: string): Promise<boolean> {
    const group = await this.userGroupMessageRepository.findByUserId(userId)
    return group.destroy()
  }

  async resetAllUserGroupMessages() {
    const messages = await this.userGroupMessageRepository.findAll()
    messages.map(message => message.update({ isRead: false }))
  }
}
