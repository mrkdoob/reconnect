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
  label: string

  @IsNotEmpty()
  @Field()
  description: string

  @Field()
  fullDescription: string

  @Field()
  videoUrl: string

  @IsNotEmpty()
  @Field()
  levelId: string
}
