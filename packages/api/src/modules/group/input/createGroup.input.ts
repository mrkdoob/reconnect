import { InputType, Field } from "type-graphql"

import { IsNotEmpty } from "class-validator"
import { Group } from "../group.entity"

@InputType()
export class CreateGroupInput implements Partial<Group> {
  @IsNotEmpty()
  @Field()
  name: string

  @IsNotEmpty()
  @Field()
  rewardCount: number

  @IsNotEmpty()
  @Field()
  startDate: Date

  @IsNotEmpty()
  @Field()
  qiForReward: number

  @IsNotEmpty()
  @Field()
  qiRewardAmount: number

  @IsNotEmpty()
  @Field()
  endDate: Date

  @IsNotEmpty()
  @Field()
  courseId: string
}
