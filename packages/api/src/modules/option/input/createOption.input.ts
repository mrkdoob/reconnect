import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { Option } from "../option.entity"

@InputType()
export class CreateOptionInput implements Partial<Option> {
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
}
