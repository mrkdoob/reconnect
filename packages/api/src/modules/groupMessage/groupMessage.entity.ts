import { Entity, OneToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { UuidField, IntField } from "../shared/fields"
import { Group } from "../group/group.entity"
import { Message } from "../message/message.entity"

@ObjectType()
@Entity()
export class GroupMessage extends BaseEntity<GroupMessage> {
  @IntField({ default: 0 })
  rewardCount: number

  @IntField({ default: 0 })
  leftCoinsCount: number

  @UuidField()
  groupId: string

  @UuidField({ nullable: true })
  messageId: string

  // RELATIONS
  // TODO: Or One to Many?
  @OneToOne(
    () => Message,
    message => message.groupMessage,
  )
  message: Message

  @OneToOne(
    () => Group,
    group => group.groupMessage,
  )
  group: Group
}
