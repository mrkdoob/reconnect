import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { Pet } from "../pet.entity"

@InputType()
export class CreatePetInput implements Partial<Pet> {
  @IsNotEmpty()
  @Field()
  name: string

  @IsNotEmpty()
  @Field()
  description: string

  @IsNotEmpty()
  @Field()
  levelNumber: number

  @Field({ nullable: true })
  avatarUrl: string
}
