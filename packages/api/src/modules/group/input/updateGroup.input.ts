import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"

import { Group } from "../group.entity"

@InputType()
export class UpdateGroupInput implements Partial<Group> {
  @IsNotEmpty()
  @Field({ nullable: true })
  rewardCount: number

  @IsNotEmpty()
  @Field({ nullable: true })
  oldRewardCount: number

  @Field({ nullable: true })
  courseId: string

  @Field({ nullable: true })
  groupsSize: number

  @Field({ nullable: true })
  groupMembersFinished: number

  @Field({ nullable: true })
  qiForReward: number

  @Field({ nullable: true })
  qiRewardAmount: number

  @Field({ nullable: true })
  groupQiCoins: number

  @Field({ nullable: true })
  rewardType: string
}
