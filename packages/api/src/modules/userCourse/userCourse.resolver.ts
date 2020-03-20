import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql"

import { Inject } from "typedi"

import { UserCourse } from "./userCourse.entity"
import { UserCourseService } from "./userCourse.service"
import { UserCourseRepository } from "./userCourse.repository"
import { CreateUserCourseInput } from "./input/createUserCourse.input"
import { UpdateUserCourseInput } from "./input/updateUserCourse.input"
import { Loaders } from "../shared/context/loaders"
import { Course } from "../course/course.entity"
import { UserDayRewardService } from "../userDayReward/userDayReward.service"

@Resolver(() => UserCourse)
export class UserCourseResolver {
  @Inject(() => UserCourseService)
  userCourseService: UserCourseService
  @Inject(() => UserDayRewardService)
  userDayRewardService: UserDayRewardService
  @Inject(() => UserCourseRepository)
  userCourseRepository: UserCourseRepository

  @Query(() => UserCourse)
  getUserCourse(
    @Arg("userProgressId") userProgressId: string,
  ): Promise<UserCourse> {
    return this.userCourseRepository.findById(userProgressId)
  }

  // TODO: @Authorized()
  // TODO: Use ME ?
  @Mutation(() => UserCourse)
  async createUserCourse(
    @Arg("data") data: CreateUserCourseInput,
  ): Promise<UserCourse> {
    await this.userDayRewardService.createFirstReward(data.userId)
    const userCourse = await this.userCourseService.create(data)
    return userCourse
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => UserCourse, { nullable: true })
  updateUserCourse(
    @Arg("id") id: string,
    @Arg("data") data: UpdateUserCourseInput,
  ): Promise<UserCourse> {
    return this.userCourseService.update(id, data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => Boolean)
  destroyUserCourse(@Arg("id") id: string): Promise<boolean> {
    return this.userCourseService.destroy(id)
  }

  // FIELD RESOLVERS
  @FieldResolver(() => Course, { nullable: true })
  course(@Root() userCourse: UserCourse, @Loaders() { courseLoader }: Loaders) {
    return courseLoader.load(userCourse.courseId)
  }
}
