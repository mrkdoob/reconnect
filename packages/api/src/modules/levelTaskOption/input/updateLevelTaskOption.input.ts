import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { LevelTaskOption } from "../levelTaskOption.entity"

@InputType()
export class UpdateLevelTaskOptionInput implements Partial<LevelTaskOption> {
  @IsNotEmpty()
  @Field({ nullable: true })
  order: number

  @Field({ nullable: true })
  videoUrl: string

  @Field({ nullable: true })
  optionId: string
}
