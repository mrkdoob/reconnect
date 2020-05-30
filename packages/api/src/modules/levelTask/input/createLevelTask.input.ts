import { InputType, Field } from "type-graphql"

import { IsNotEmpty } from "class-validator"
import { LevelTask } from "../levelTask.entity"

@InputType()
export class CreateLevelTaskInput implements Partial<LevelTask> {
  @IsNotEmpty()
  @Field()
  order: number

  @IsNotEmpty()
  @Field()
  levelId: string
}
