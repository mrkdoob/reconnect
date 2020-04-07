import { Entity, OneToMany } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"
import { LevelTaskOption } from "../levelTaskOption/levelTaskOption.entity"

@ObjectType()
@Entity()
export class Option extends BaseEntity<Option> {
  @StringField()
  label: string

  @StringField()
  description: string

  @StringField({ nullable: true })
  fullDescription: string

  @StringField({ nullable: true })
  videoUrl: string

  // RELATIONS
  @OneToMany(
    () => LevelTaskOption,
    levelTaskOption => levelTaskOption.option,
  )
  levelTaskOption: [LevelTaskOption]
}
