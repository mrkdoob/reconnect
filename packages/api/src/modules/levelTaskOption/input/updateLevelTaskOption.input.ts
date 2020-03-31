import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { LevelTaskOption } from "../levelTaskOption.entity"

@InputType()
export class UpdateLevelTaskOptionInput implements Partial<LevelTaskOption> {
  @IsNotEmpty()
  @Field({ nullable: true })
  order: number

  @IsNotEmpty()
  @Field({ nullable: true })
  label: string

  @IsNotEmpty()
  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  fullDescription: string

  @Field({ nullable: true })
  videoUrl: string
}
