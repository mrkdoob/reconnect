import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { UserBooster } from "../userBooster.entity"

@InputType()
export class UpdateUserBoosterInput implements Partial<UserBooster> {
  @IsNotEmpty()
  @Field({ nullable: true })
  sponsorAmount: number

  @IsNotEmpty()
  @Field({ nullable: true })
  coinReward: number

  @IsNotEmpty()
  @Field({ nullable: true })
  treesEarned: number

  @IsNotEmpty()
  @Field({ nullable: true })
  mealsEarned: number

  @IsNotEmpty()
  @Field({ nullable: true })
  coinsEarned: number

  @IsNotEmpty()
  @Field({ nullable: true })
  boostDays: number

  @IsNotEmpty()
  @Field({ nullable: true })
  sponsorEmail: string

  @IsNotEmpty()
  @Field({ nullable: true })
  sponsorAccepted: boolean

  @IsNotEmpty()
  @Field({ nullable: true })
  userId: string

  @IsNotEmpty()
  @Field({ nullable: true })
  sponsorId: string
}
