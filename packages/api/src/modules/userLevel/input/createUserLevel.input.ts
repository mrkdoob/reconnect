import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { UserLevel } from "../userLevel.entity"

@InputType()
export class CreateUserLevelInput implements Partial<UserLevel> {
  @IsNotEmpty()
  @Field()
  levelId: string

  @IsNotEmpty()
  @Field()
  userId: string
}
