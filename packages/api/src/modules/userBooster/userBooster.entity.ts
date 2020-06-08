import { Entity, ManyToOne, OneToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import {
  UuidField,
  IntField,
  BooleanField,
  StringField,
} from "../shared/fields"
import { User } from "../user/user.entity"
import {
  DEFAULT_SPONSOR_AMOUNT,
  DEFAULT_COIN_MULTIPLIER,
  DEFAULT_BOOST_DAYS,
} from "../../lib/globalVars"

@ObjectType()
@Entity()
export class UserBooster extends BaseEntity<UserBooster> {
  @IntField({ default: DEFAULT_SPONSOR_AMOUNT })
  sponsorAmount: number

  @IntField({ default: DEFAULT_COIN_MULTIPLIER })
  coinMultiplier: number

  @IntField({ default: DEFAULT_BOOST_DAYS })
  boostDays: number

  @IntField({ default: 0 })
  rewardsEarned: number

  @IntField({ default: 0 })
  coinsEarned: number

  @BooleanField({ default: false })
  isActive: boolean

  @StringField({ nullable: true }) // Invite a friend email. If email then no sponsorId
  sponsorEmail: boolean

  @UuidField({ nullable: true })
  userId: string

  @UuidField({ nullable: true })
  sponsorId: string

  // RELATIONS
  @OneToOne(
    () => User,
    user => user.userBooster,
  )
  user: User

  @ManyToOne(
    () => User,
    user => user.userBoostSponsor,
  )
  sponsor: User
}
