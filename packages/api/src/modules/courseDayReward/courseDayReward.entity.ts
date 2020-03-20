import { Entity, ManyToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { StringField, IntField, UuidField } from "../shared/fields"
import { Course } from "../course/course.entity"

@ObjectType()
@Entity()
export class CourseDayReward extends BaseEntity<CourseDayReward> {
  @IntField()
  order: number

  @StringField()
  description: string

  @StringField({ nullable: true })
  pictureUrl: string

  @StringField({ nullable: true })
  videoUrl: string

  //TODO: true
  @UuidField({ nullable: true })
  courseId: string

  // RELATIONS
  @ManyToOne(
    () => Course,
    course => course.courseDayRewards,
  )
  course: Course
}
