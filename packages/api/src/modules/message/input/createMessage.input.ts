import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { Message } from "../message.entity"

@InputType()
export class CreateMessageInput implements Partial<Message> {
  @IsNotEmpty()
  @Field()
  message: string

  @IsNotEmpty()
  @Field()
  order: number

  @Field({ nullable: true })
  pictureUrl: string

  @Field({ nullable: true })
  videoUrl: string
}
