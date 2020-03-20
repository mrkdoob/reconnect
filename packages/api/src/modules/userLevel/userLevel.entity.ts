import { Entity, OneToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { UuidField, BooleanField, IntField } from "../shared/fields"
import { User } from "../user/user.entity"
import { Level } from "../level/level.entity"

@ObjectType()
@Entity()
export class UserLevel extends BaseEntity<UserLevel> {
  @BooleanField({ default: false })
  completed: boolean

  @IntField({ default: 0 })
  progressDay: number

  //TODO: Remove nullable?
  @UuidField({ nullable: true })
  levelId: string

  @UuidField({ nullable: true })
  userId: string

  // RELATIONS
  @OneToOne(
    () => User,
    User => User,
  )
  user: User

  @OneToOne(
    () => Level,
    Level => Level,
  )
  level: Level
}
