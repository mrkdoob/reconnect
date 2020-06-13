import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { UserGroupMessage } from "../userGroupMessage.entity"

@InputType()
export class CreateUserGroupMessageInput implements Partial<UserGroupMessage> {
  @IsNotEmpty()
  @Field()
  userId: string

  @IsNotEmpty()
  @Field()
  messageId: string
}
