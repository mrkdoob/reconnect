import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { GroupMessage } from "../groupMessage.entity"

@InputType()
export class CreateGroupMessageInput implements Partial<GroupMessage> {
  @IsNotEmpty()
  @Field()
  groupId: string

  @IsNotEmpty()
  @Field({ nullable: true })
  messageId: string
}
