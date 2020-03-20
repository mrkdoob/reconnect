import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { UserDayReward } from "../userDayReward.entity"

@InputType()
export class CreateUserDayRewardInput implements Partial<UserDayReward> {
  @IsNotEmpty()
  @Field()
  courseDayRewardId: string

  @IsNotEmpty()
  @Field()
  userId: string
}
