import { Entity, ManyToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { StringField, IntField, UuidField } from "../shared/fields"
import { Level } from "../level/level.entity"

@ObjectType()
@Entity()
export class LevelTask extends BaseEntity<LevelTask> {
  @IntField()
  order: number

  @StringField()
  description: string

  @StringField({ nullable: true })
  fullDescription: string

  @StringField({ nullable: true })
  videoUrl: string

  //TODO: true
  @UuidField({ nullable: true })
  levelId: string

  // RELATIONS
  // TODO: Remove?
  @ManyToOne(
    () => Level,
    level => level.levelTasks,
  )
  level: Level
}
