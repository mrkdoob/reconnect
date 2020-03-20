import { Entity, OneToMany, ManyToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import {
  StringField,
  IntField,
  UuidField,
  BooleanField,
} from "../shared/fields"
import { LevelTask } from "../levelTask/levelTask.entity"
import { Course } from "../course/course.entity"

@ObjectType()
@Entity()
export class Level extends BaseEntity<Level> {
  @IntField()
  levelNumber: number

  @IntField()
  maxProgressDays: number

  @StringField()
  title: string

  @StringField({ nullable: true })
  cover: string

  @StringField()
  rewardText: string

  @StringField()
  rewardDescription: string

  @StringField({ nullable: true })
  videoUrl: string

  @StringField({ nullable: true })
  rewardUrl: string

  @BooleanField({ default: false })
  isLast: boolean

  //TODO: Remove nullable?
  @UuidField({ nullable: true })
  courseId: string

  // RELATIONS
  @OneToMany(
    () => LevelTask,
    levelTask => levelTask.levelId,
  )
  levelTasks: LevelTask[]

  @ManyToOne(
    () => Course,
    course => course.levels,
  )
  course: Course
}
