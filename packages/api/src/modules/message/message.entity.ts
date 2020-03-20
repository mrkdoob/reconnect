import { Entity, OneToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { StringField, IntField } from "../shared/fields"
import { GroupMessage } from "../groupMessage/groupMessage.entity"

@ObjectType()
@Entity()
export class Message extends BaseEntity<Message> {
  @StringField()
  message: string

  @IntField()
  order: number

  @StringField({ nullable: true })
  pictureUrl: string

  @StringField({ nullable: true })
  videoUrl: string

  // RELATIONS TODO:
  @OneToOne(
    () => GroupMessage,
    // group => group.groupMessage,
  )
  groupMessage: GroupMessage
}
