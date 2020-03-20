import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { Level } from "../level.entity"

@InputType()
export class UpdateLevelInput implements Partial<Level> {
  @IsNotEmpty()
  @Field({ nullable: true })
  levelNumber: number

  @IsNotEmpty()
  @Field({ nullable: true })
  maxProgressDays: number

  @IsNotEmpty()
  @Field({ nullable: true })
  title: string

  @IsNotEmpty()
  @Field({ nullable: true })
  cover: string

  @IsNotEmpty()
  @Field({ nullable: true })
  rewardText: string

  @IsNotEmpty()
  @Field({ nullable: true })
  rewardDescription: string

  @IsNotEmpty()
  @Field({ nullable: true })
  videoUrl: string

  @IsNotEmpty()
  @Field({ nullable: true })
  rewardUrl: string

  @IsNotEmpty()
  @Field({ nullable: true })
  isLast: boolean
}
