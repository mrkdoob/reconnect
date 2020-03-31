import { Entity, ManyToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { StringField, IntField, UuidField } from "../shared/fields"
import { LevelTask } from "../levelTask/levelTask.entity"

@ObjectType()
@Entity()
export class LevelTaskOption extends BaseEntity<LevelTaskOption> {
  @IntField()
  order: number

  @StringField()
  label: string

  @StringField()
  description: string

  @StringField({ nullable: true })
  fullDescription: string

  @StringField({ nullable: true })
  videoUrl: string

  //TODO: remove true
  @UuidField({ nullable: true })
  levelTaskId: string

  // RELATIONS
  @ManyToOne(
    () => LevelTask,
    // TODO: levelTask => levelTask.options,
  )
  levelTask: LevelTask
}
