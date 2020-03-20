import { Entity, OneToMany, OneToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { StringField, IntField, DateField } from "../shared/fields"
import { User } from "../user/user.entity"
import { GroupMessage } from "../groupMessage/groupMessage.entity"

@ObjectType()
@Entity()
export class Group extends BaseEntity<Group> {
  @StringField()
  name: string

  @IntField({ default: 0 })
  rewardCount: number // e.g. total number of trees

  @IntField({ default: 0 })
  oldRewardCount: number // from yesterday

  @IntField({ default: 0 })
  groupMembersFinished: number

  @IntField({ default: 10 })
  qiRewardAmount: number

  @IntField({ default: 50 })
  qiForReward: number

  @IntField({ default: 0 })
  groupQiCoins: number // Resets daily

  @DateField({ nullable: true })
  startDate: Date

  @DateField({ nullable: true })
  endDate: Date

  @IntField({ nullable: true }) //TODO: Remove nullable?
  groupSize: number // Max group size

  @StringField() //TODO: Maybe uuid?
  courseId: string

  // RELATIONS
  @OneToMany(
    () => User,
    user => user.group,
  )
  users: User[]

  @OneToOne(
    () => GroupMessage,
    groupMessage => groupMessage.groupId,
  )
  groupMessage: GroupMessage
}
