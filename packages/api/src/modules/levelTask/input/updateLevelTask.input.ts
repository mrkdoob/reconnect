import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { LevelTask } from "../levelTask.entity"

@InputType()
export class UpdateLevelTaskInput implements Partial<LevelTask> {
  @IsNotEmpty()
  @Field({ nullable: true })
  order: number

  @IsNotEmpty()
  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  fullDescription: string

  @Field({ nullable: true })
  videoUrl: string
}
