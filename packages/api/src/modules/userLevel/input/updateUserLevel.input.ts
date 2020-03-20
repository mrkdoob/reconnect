import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { UserLevel } from "../userLevel.entity"

@InputType()
export class UpdateUserLevelInput implements Partial<UserLevel> {
  @IsNotEmpty()
  @Field({ nullable: true })
  completed: boolean

  @IsNotEmpty()
  @Field({ nullable: true })
  progressDay: number

  @IsNotEmpty()
  @Field({ nullable: true })
  levelId: string
}
