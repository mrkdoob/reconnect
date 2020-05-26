import { InputType, Field } from "type-graphql"
import { User } from "./user.entity"
import { MinLength } from "class-validator"

@InputType()
export class UpdateInput implements Partial<User> {
  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @MinLength(5)
  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  bio: string

  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  avatar: string

  @Field({ nullable: true })
  groupOrder: number

  @Field({ nullable: true })
  timeZone: string

  @Field({ nullable: true })
  role: string
}

@InputType()
export class CompleteMeInput implements Partial<User> {
  @Field({ nullable: true })
  groupOrder: number
}

@InputType()
export class EndMyCourseInput implements Partial<User> {
  @Field({ nullable: true })
  groupOrder: number

  @Field(() => String, { nullable: true })
  groupId?: string | null

  @Field({ nullable: true })
  hasFailed: boolean
}

@InputType()
export class StartMyCourseInput implements Partial<User> {
  @Field({ nullable: true })
  groupOrder: number

  @Field({ nullable: true })
  groupId?: string
}

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @MinLength(5)
  @Field()
  email: string

  @Field()
  password: string

  @Field()
  timeZone: string
}

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  password: string
}
