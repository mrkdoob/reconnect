import { InputType, Field } from "type-graphql"

import { IsNotEmpty } from "class-validator"
import { Level } from "../level.entity"

@InputType()
export class CreateLevelInput implements Partial<Level> {
  @IsNotEmpty()
  @Field()
  levelNumber: number

  @IsNotEmpty()
  @Field()
  maxProgressDays: number

  @IsNotEmpty()
  @Field()
  title: string

  @IsNotEmpty()
  @Field()
  cover: string

  @Field()
  rewardText: string

  @Field()
  rewardDescription: string

  @Field({ nullable: true })
  videoUrl: string

  @Field({ nullable: true })
  rewardUrl: string

  @IsNotEmpty()
  @Field()
  courseId: string

  @Field()
  isLast: boolean
}
