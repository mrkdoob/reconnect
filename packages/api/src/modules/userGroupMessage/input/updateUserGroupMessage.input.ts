import { InputType, Field } from "type-graphql"

import { UserGroupMessage } from "../userGroupMessage.entity"

@InputType()
export class UpdateUserGroupMessageInput implements Partial<UserGroupMessage> {
  @Field({ nullable: true })
  groupMessageId: string

  @Field({ nullable: true })
  isRead: boolean

  @Field({ nullable: true })
  showOption: boolean
}
