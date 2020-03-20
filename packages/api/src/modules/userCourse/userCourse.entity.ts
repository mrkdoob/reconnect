import { Entity, OneToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { StringField, BooleanField, IntField } from "../shared/fields"
import { User } from "../user/user.entity"
import { Course } from "../course/course.entity"

@ObjectType()
@Entity()
export class UserCourse extends BaseEntity<UserCourse> {
  @StringField({ nullable: true })
  courseId: string

  @BooleanField({ default: false })
  isActive: boolean

  @IntField({ nullable: true })
  finishedRewardCount: number

  //TODO: Remove nullable?
  @StringField()
  userId: string

  // RELATIONS
  @OneToOne(
    () => User,
    user => user.userCourse,
  )
  user: User

  //TODO: Course relationship
  @OneToOne(() => Course)
  course: Course
}
