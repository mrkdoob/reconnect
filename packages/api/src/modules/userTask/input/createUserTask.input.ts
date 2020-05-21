import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { UserTask } from "../userTask.entity"

@InputType()
export class CreateUserTaskInput implements Partial<UserTask> {
  @IsNotEmpty()
  @Field()
  levelTaskId: string

  @IsNotEmpty()
  @Field()
  userId: string

  @IsNotEmpty()
  @Field()
  order: number
}

@InputType()
export class CreateCustomUserTaskInput implements Partial<UserTask> {
  @IsNotEmpty()
  @Field()
  description: string

  @IsNotEmpty()
  @Field()
  fullDescription: string
}
