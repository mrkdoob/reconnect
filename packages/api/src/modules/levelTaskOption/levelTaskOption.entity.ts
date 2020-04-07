import { Entity, ManyToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { StringField, IntField, UuidField } from "../shared/fields"
import { LevelTask } from "../levelTask/levelTask.entity"
import { Option } from "../option/option.entity"

@ObjectType()
@Entity()
export class LevelTaskOption extends BaseEntity<LevelTaskOption> {
  @IntField()
  order: number

  @StringField({ nullable: true })
  label: string

  @StringField({ nullable: true })
  description: string

  @StringField({ nullable: true })
  fullDescription: string

  @StringField({ nullable: true })
  videoUrl: string

  //TODO: remove true
  @UuidField({ nullable: true })
  levelTaskId: string

  @UuidField({ nullable: true })
  optionId: string

  // RELATIONS
  @ManyToOne(
    () => LevelTask,
    levelTask => levelTask.levelTaskOptions,
  )
  levelTask: LevelTask

  @ManyToOne(
    () => Option,
    option => option.levelTaskOption,
  )
  option: Option
}
