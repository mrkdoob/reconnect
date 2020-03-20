import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { CourseDayReward } from "../courseDayReward.entity"

@InputType()
export class UpdateCourseDayRewardInput implements Partial<CourseDayReward> {
  @IsNotEmpty()
  @Field({ nullable: true })
  order: number

  @IsNotEmpty()
  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  pictureUrl: string

  @Field({ nullable: true })
  videoUrl: string
}
