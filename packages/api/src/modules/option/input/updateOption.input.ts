import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { Option } from "../option.entity"

@InputType()
export class UpdateOptionInput implements Partial<Option> {
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
