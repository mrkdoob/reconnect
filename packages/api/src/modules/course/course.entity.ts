import {
  Entity,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToOne,
} from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import {
  StringField,
  UuidField,
  IntField,
  BooleanField,
} from "../shared/fields"
import { Level } from "../level/level.entity"
import slug from "limax"
import { Group } from "../group/group.entity"
import { CourseDayReward } from "../courseDayReward/courseDayReward.entity"
import { User } from "../user/user.entity"
import { UserCourse } from "../userCourse/userCourse.entity"

@ObjectType()
@Entity()
export class Course extends BaseEntity<Course> {
  @StringField()
  name: string

  @StringField()
  slug: string

  @StringField()
  category: string

  @StringField()
  description: string

  @StringField({ nullable: true })
  fullDescription: string

  @IntField({ nullable: true })
  duration: number

  @StringField({ nullable: true })
  benefits: string

  //TODO: Remove nullable?
  @StringField({ nullable: true })
  cover: string

  @StringField({ nullable: true })
  rewardType: string

  @BooleanField({ default: false })
  isPublished: boolean

  @UuidField({ nullable: true })
  petId: string

  @UuidField({ nullable: true })
  mentorId: string

  // RELATIONS
  @ManyToOne(
    () => User,
    mentor => mentor.coursesTaught,
  )
  mentor: User

  @OneToOne(
    () => UserCourse,
    userCourse => userCourse.course,
  )
  userCourse: UserCourse

  @OneToMany(
    () => Level,
    level => level.courseId,
  )
  levels: Level[]

  @OneToMany(
    () => Group,
    group => group.courseId,
  )
  groups: Group[]

  @OneToMany(
    () => CourseDayReward,
    courseDayRewards => courseDayRewards.courseId,
  )
  courseDayRewards: CourseDayReward[]

  // HOOKS
  @BeforeInsert()
  @BeforeUpdate()
  slugifyName() {
    if (this.name) {
      this.slug = slug(this.name, { custom: { "|": "" } })
    }
  }
}
