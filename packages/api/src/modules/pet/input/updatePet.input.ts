import { InputType, Field } from "type-graphql"
import { Pet } from "../pet.entity"

@InputType()
export class UpdatePetInput implements Partial<Pet> {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  levelNumber: number

  @Field({ nullable: true })
  pictureUrl: string

  @Field({ nullable: true })
  avatarUrl: string
}
