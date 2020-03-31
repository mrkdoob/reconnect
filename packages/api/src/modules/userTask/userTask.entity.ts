import { Entity, ManyToOne, OneToOne } from "typeorm"
import { ObjectType } from "type-graphql"
import { BaseEntity } from "../shared/base.entity"
import { BooleanField, UuidField, IntField } from "../shared/fields"
import { User } from "../user/user.entity"
import { LevelTask } from "../levelTask/levelTask.entity"

@ObjectType()
@Entity()
export class UserTask extends BaseEntity<UserTask> {
  @BooleanField({ default: false })
  completed: boolean // Resets daily

  @UuidField({ nullable: true })
  levelTaskId: string

  @UuidField({ nullable: true })
  levelTaskOptionId: string

  @IntField({ nullable: true })
  order: number

  @UuidField()
  userId: string

  // RELATIONS
  @ManyToOne(
    () => User,
    user => user.tasks,
  )
  user: User

  @OneToOne(() => LevelTask)
  levelTask: LevelTask
}
