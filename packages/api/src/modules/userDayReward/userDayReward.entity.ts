import { Entity, OneToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { UuidField } from "../shared/fields"
import { User } from "../user/user.entity"

@ObjectType()
@Entity()
export class UserDayReward extends BaseEntity<UserDayReward> {
  @UuidField({ nullable: true })
  courseDayRewardId: string

  @UuidField()
  userId: string

  // RELATIONS

  @OneToOne(
    () => User,
    user => user.userDayReward,
  )
  user: User
}
