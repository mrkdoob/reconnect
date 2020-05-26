import { InputType, Field } from "type-graphql"

import { IsNotEmpty } from "class-validator"
import { Course } from "../course.entity"

@InputType()
export class CreateCourseInput implements Partial<Course> {
  @IsNotEmpty()
  @Field()
  name: string

  @IsNotEmpty()
  @Field()
  category: string

  @IsNotEmpty()
  @Field()
  description: string

  @IsNotEmpty()
  @Field()
  fullDescription: string

  @IsNotEmpty()
  @Field({ nullable: true })
  duration: string

  @IsNotEmpty()
  @Field({ nullable: true })
  benefits: string

  @IsNotEmpty()
  @Field({ nullable: true })
  cover: string

  @IsNotEmpty()
  @Field({ nullable: true })
  endText: string

  @IsNotEmpty()
  @Field({ nullable: true })
  rewardType: string

  @IsNotEmpty()
  @Field({ nullable: true })
  petId: string

  @IsNotEmpty()
  @Field({ nullable: true })
  mentorId: string
}
