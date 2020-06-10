import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { UserBooster } from "../userBooster.entity"

@InputType()
export class CreateUserBoosterInput implements Partial<UserBooster> {
  @IsNotEmpty()
  @Field({ nullable: true })
  sponsorAmount: number

  @IsNotEmpty()
  @Field({ nullable: true })
  coinReward: number

  @IsNotEmpty()
  @Field({ nullable: true })
  rewardsEarned: number

  @IsNotEmpty()
  @Field({ nullable: true })
  coinsEarned: number

  @IsNotEmpty()
  @Field({ nullable: true })
  isActive: boolean

  @IsNotEmpty()
  @Field({ nullable: true })
  sponsorEmail: string

  @IsNotEmpty()
  @Field({ nullable: true })
  userId: string

  @IsNotEmpty()
  @Field({ nullable: true })
  sponsorId: string
}
