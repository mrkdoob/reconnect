import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { UserPet } from "../userPet.entity"

@InputType()
export class CreateUserPetInput implements Partial<UserPet> {
  @IsNotEmpty()
  @Field()
  userId: string

  @IsNotEmpty()
  @Field()
  petId: string
}
