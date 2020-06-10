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

  @Field({ nullable: true })
  startDate: Date

  @IsNotEmpty()
  @Field()
  coinsForReward: number

  @IsNotEmpty()
  @Field()
  endDate: Date

  @IsNotEmpty()
  @Field()
  courseId: string

  @IsNotEmpty()
  @Field()
  rewardType: string
}
