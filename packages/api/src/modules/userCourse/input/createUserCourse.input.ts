import { InputType, Field } from "type-graphql"

import { IsNotEmpty } from "class-validator"
import { UserCourse } from "../userCourse.entity"

@InputType()
export class CreateUserCourseInput implements Partial<UserCourse> {
  @IsNotEmpty()
  @Field()
  courseId: string

  @IsNotEmpty()
  @Field()
  isActive: boolean

  @IsNotEmpty()
  @Field()
  userId: string
}
