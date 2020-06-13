import { Entity, OneToMany } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import {
  StringField,
  IntField,
  BooleanField,
  UuidField,
} from "../shared/fields"
import { UserGroupMessage } from "../userGroupMessage/userGroupMessage.entity"

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

  @BooleanField({ default: false })
  fullHeightPic: boolean

  @UuidField({ nullable: true })
  courseId: string

  // RELATIONS

  @OneToMany(
    () => UserGroupMessage,
    userMessage => userMessage.message,
  )
  userMessages: UserGroupMessage[]
}
