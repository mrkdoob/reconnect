import { Entity, BeforeInsert, OneToMany, OneToOne, ManyToOne } from "typeorm"
import { ObjectType, Field } from "type-graphql"
import bcrypt from "bcryptjs"
import {
  StringField,
  UuidField,
  IntField,
  BooleanField,
} from "../shared/fields"
import { BaseEntity } from "../shared/base.entity"
import { Group } from "../group/group.entity"
import { UserTask } from "../userTask/userTask.entity"
import { UserCourse } from "../userCourse/userCourse.entity"
import { UserDayReward } from "../userDayReward/userDayReward.entity"
import { S3_URL } from "../../lib/config"
import { UserPet } from "../userPet/userPet.entity"
import { UserLevel } from "../userLevel/userLevel.entity"
import { Course } from "../course/course.entity"
import { UserBooster } from "../userBooster/userBooster.entity"

@ObjectType()
@Entity()
export class User extends BaseEntity<User> {
  @StringField({ unique: true })
  email: string

  @StringField()
  password: string

  @StringField()
  firstName: string

  @StringField()
  lastName: string

  @StringField({ nullable: true })
  bio: string

  @StringField({
    default:
      "https://pbs.twimg.com/profile_images/529214699041067008/fqPBAr5s_400x400.jpeg",
    nullable: true,
  })
  avatar: string

  @StringField({ nullable: true })
  timeZone: string

  @StringField({ nullable: true })
  role: string

  @IntField({ default: 0 })
  groupOrder: number

  @BooleanField({ default: false })
  hasFailed: boolean

  @UuidField({ nullable: true })
  groupId: string | null

  // Relations
  @OneToMany(
    () => Course,
    courses => courses.mentorId,
  )
  coursesTaught: Course[]

  @ManyToOne(
    () => Group,
    group => group.users,
    { nullable: true },
  )
  group: Group

  @OneToMany(
    () => UserTask,
    userTask => userTask.user,
  )
  tasks: UserTask[]

  @OneToOne(
    () => UserCourse,
    userCourse => userCourse.user,
  )
  userCourse: UserCourse

  @OneToMany(
    () => UserPet,
    userPet => userPet.user,
  )
  userPets: UserPet[]

  @OneToMany(
    () => UserBooster,
    userBooster => userBooster.sponsor,
  )
  userBoostSponsor: UserBooster[]

  @OneToOne(
    () => UserBooster,
    userBooster => userBooster.user,
  )
  userBooster: UserBooster

  @OneToOne(
    () => UserLevel,
    userLevel => userLevel.user,
  )
  userLevel: UserLevel

  @OneToOne(
    () => UserDayReward,
    userDayReward => userDayReward.userId,
  )
  userDayReward: UserDayReward

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  @Field(() => String, { nullable: true })
  fullName() {
    if (!this.firstName && this.lastName) return null
    return (this.firstName + " " + this.lastName).trim()
  }

  @Field(() => String)
  url() {
    return S3_URL + this.avatar
  }

  // INSTANCE METHODS
  async update(data: Partial<User>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }
    if (data.email) {
      data.email = data.email.trim().toLowerCase()
    }
    Object.assign(this, data)
    return this.save()
  }
}
