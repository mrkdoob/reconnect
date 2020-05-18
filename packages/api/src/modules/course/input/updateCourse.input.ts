import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { Course } from "../course.entity"

@InputType()
export class UpdateCourseInput implements Partial<Course> {
  //TODO: Ask about nullable
  @IsNotEmpty()
  @Field({ nullable: true })
  name: string

  @IsNotEmpty()
  @Field({ nullable: true })
  category: string

  @IsNotEmpty()
  @Field({ nullable: true })
  description: string

  @IsNotEmpty()
  @Field({ nullable: true })
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
