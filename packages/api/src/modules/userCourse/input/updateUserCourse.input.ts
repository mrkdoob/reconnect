import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { UserCourse } from "../userCourse.entity"

@InputType()
export class UpdateUserCourseInput implements Partial<UserCourse> {
  @IsNotEmpty()
  @Field({ nullable: true })
  courseId: string

  @IsNotEmpty()
  @Field({ nullable: true })
  isActive: boolean

  @IsNotEmpty()
  @Field({ nullable: true })
  finishedRewardCount: number
}
