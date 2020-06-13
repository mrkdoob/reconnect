import { Entity, ManyToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { BooleanField, UuidField } from "../shared/fields"
import { User } from "../user/user.entity"
import { Message } from "../message/message.entity"

@ObjectType()
@Entity()
export class UserGroupMessage extends BaseEntity<UserGroupMessage> {
  @BooleanField({ default: false })
  isRead: boolean // Resets daily

  @BooleanField({ default: true })
  showOption: boolean

  @UuidField({ nullable: true })
  messageId: string

  @UuidField()
  userId: string

  // RELATIONS TODO:
  @ManyToOne(
    () => User,
    // user => user.groupMessage,
  )
  user: User

  @ManyToOne(
    () => Message,
    message => message.userMessages,
  )
  message: Message
}
