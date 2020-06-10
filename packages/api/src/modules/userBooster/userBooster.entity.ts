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

@ObjectType()
@Entity()
export class UserBooster extends BaseEntity<UserBooster> {
  @IntField({ default: 0 })
  sponsorAmount: number

  @IntField({ default: 0 })
  coinReward: number

  @IntField({ default: 0 })
  boostDays: number

  @IntField({ default: 0 })
  treesEarned: number

  @IntField({ default: 0 })
  mealsEarned: number

  @IntField({ default: 0 })
  coinsEarned: number

  @BooleanField({ default: false })
  sponsorAccepted: boolean

  @StringField({ nullable: true }) // Invite a friend email. If email then no sponsorId
  sponsorEmail: string

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
