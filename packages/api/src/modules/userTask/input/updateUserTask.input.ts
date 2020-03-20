import { InputType, Field } from "type-graphql"

import { UserTask } from "../userTask.entity"

@InputType()
export class UpdateUserTaskInput implements Partial<UserTask> {
  @Field({ nullable: true })
  completed: boolean // Resets daily

  @Field({ nullable: true })
  levelTaskId: string

  @Field({ nullable: true })
  order: number
}
