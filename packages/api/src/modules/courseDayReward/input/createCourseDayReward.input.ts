import { InputType, Field } from "type-graphql"

import { IsNotEmpty } from "class-validator"
import { CourseDayReward } from "../courseDayReward.entity"

@InputType()
export class CreateCourseDayRewardInput implements Partial<CourseDayReward> {
  @IsNotEmpty()
  @Field()
  order: number

  @IsNotEmpty()
  @Field()
  description: string

  @Field({ nullable: true })
  videoUrl: string

  @Field({ nullable: true })
  pictureUrl: string

  @IsNotEmpty()
  @Field()
  courseId: string
}
