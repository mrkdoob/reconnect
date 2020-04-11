import { InputType, Field } from "type-graphql"

import { IsNotEmpty } from "class-validator"
import { LevelTaskOption } from "../levelTaskOption.entity"

@InputType()
export class CreateLevelTaskOptionInput implements Partial<LevelTaskOption> {
  @IsNotEmpty()
  @Field()
  order: number

  @IsNotEmpty()
  @Field()
  levelId: string

  @IsNotEmpty()
  @Field()
  optionId: string
}
