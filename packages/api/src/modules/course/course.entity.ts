import { Entity, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { StringField, UuidField } from "../shared/fields"
import { Level } from "../level/level.entity"
import slug from "limax"
import { Group } from "../group/group.entity"
import { CourseDayReward } from "../courseDayReward/courseDayReward.entity"

@ObjectType()
@Entity()
export class Course extends BaseEntity<Course> {
  @StringField()
  name: string

  //TODO: Remove nullable?
  @StringField({ nullable: true })
  slug: string

  @StringField()
  category: string

  @StringField()
  description: string

  @StringField({ nullable: true })
  fullDescription: string

  @StringField({ nullable: true })
  duration: string

  @StringField({ nullable: true })
  benefits: string

  //TODO: Remove nullable?
  @StringField({ nullable: true })
  cover: string

  @StringField({ nullable: true })
  rewardType: string

  @UuidField({ nullable: true })
  petId: string

  // RELATIONS
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
