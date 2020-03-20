import { InputType, Field } from "type-graphql"
import { Message } from "../message.entity"

@InputType()
export class UpdateMessageInput implements Partial<Message> {
  @Field({ nullable: true })
  message: string

  @Field({ nullable: true })
  pictureUrl: string

  @Field({ nullable: true })
  videoUrl: string

  @Field({ nullable: true })
  order: number
}
