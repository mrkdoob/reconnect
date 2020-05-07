import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { UserPet } from "../userPet.entity"

@InputType()
export class UpdateUserPetInput implements Partial<UserPet> {
  @IsNotEmpty()
  @Field({ nullable: true })
  lifes: number

  @IsNotEmpty()
  @Field({ nullable: true })
  petId: string

  @IsNotEmpty()
  @Field({ nullable: true })
  isActive: boolean
}
