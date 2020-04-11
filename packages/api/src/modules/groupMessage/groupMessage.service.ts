import { Service, Inject } from "typedi"
import { GroupMessageRepository } from "./groupMessage.repository"
import { GroupMessage } from "./groupMessage.entity"
import { MessageRepository } from "../message/message.repository"
import { GroupRepository } from "../group/group.repository"

@Service()
export class GroupMessageService {
  @Inject(() => GroupMessageRepository)
  groupMessageRepository: GroupMessageRepository
  @Inject(() => MessageRepository)
  messageRepository: MessageRepository
  @Inject(() => GroupRepository)
  groupRepository: GroupRepository

  async create(data: Partial<GroupMessage>): Promise<GroupMessage> {
    const group = await GroupMessage.create(data).save()
    return group
  }

  async update(
    groupMessageId: string,
    data: Partial<GroupMessage>,
  ): Promise<GroupMessage> {
    const group = await this.groupMessageRepository.findById(groupMessageId)
    return group.update(data)
  }

  async destroy(groupMessageId: string): Promise<boolean> {
    const group = await this.groupMessageRepository.findById(groupMessageId)
    return group.destroy()
  }

  async updateDailyMessage() {
    const groupMessages = await this.groupMessageRepository.findAll()
    if (groupMessages.length === 0) return

    // TODO: Can be used for non-courses or continious programs
    // const message = await this.messageRepository.findById(
    //   groupMessages[0].messageId,
    // )

    // const newOrder = message.order + 1
    // const newMessage = await this.messageRepository
    //   .findByOrder(newOrder)
    //   .catch(() => {
    //     return this.messageRepository.findByOrder(1) // Restart to first message
    //   })

    // Calculate reward count
    groupMessages.map(groupMessage => {
      let dayRewardCount = 0
      const group = this.groupRepository.findById(groupMessage.groupId)
      group.then(res => {
        dayRewardCount = res.rewardCount - res.oldRewardCount
        res.update({ oldRewardCount: res.rewardCount }).then(() => {
          groupMessage.update({
            // messageId: newMessage.id,
            rewardCount: dayRewardCount,
            leftCoinsCount: res.groupCoins,
          })
        })
      })
    })
  }
}
