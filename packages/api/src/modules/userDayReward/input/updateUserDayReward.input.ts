import { InputType, Field } from "type-graphql"
import { UserDayReward } from "../userDayReward.entity"

@InputType()
export class UpdateUserDayRewardInput implements Partial<UserDayReward> {
  @Field()
  courseDayRewardId: string
}
