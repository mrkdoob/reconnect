import { InputType, Field } from "type-graphql"

import { GroupMessage } from "../groupMessage.entity"

@InputType()
export class UpdateGroupMessageInput implements Partial<GroupMessage> {
  @Field({ nullable: true })
  messageId: string

  @Field({ nullable: true })
  leftCoinsCount: number

  @Field({ nullable: true })
  rewardCount: number
}
