import { InputType, Field } from "type-graphql"
import { User } from "../user.entity"
import { IsNotEmpty } from "class-validator"

@InputType()
export class RegisterInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  firstName: string

  @IsNotEmpty()
  @Field()
  lastName: string

  @IsNotEmpty()
  @Field()
  email: string

  @IsNotEmpty()
  @Field()
  password: string
}
