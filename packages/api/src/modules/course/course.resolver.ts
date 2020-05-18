import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql"

import { Inject } from "typedi"
import { Course } from "./course.entity"
import { CourseService } from "./course.service"
import { CourseRepository } from "./course.repository"
import { CreateCourseInput } from "./input/createCourse.input"
import { UpdateCourseInput } from "./input/updateCourse.input"
import { Level } from "../level/level.entity"
import { Loaders } from "../shared/context/loaders"
import { Group } from "../group/group.entity"
import { CourseDayReward } from "../courseDayReward/courseDayReward.entity"
import { User } from "../user/user.entity"

@Resolver(() => Course)
export class CourseResolver {
  @Inject(() => CourseService)
  courseService: CourseService
  @Inject(() => CourseRepository)
  courseRepository: CourseRepository

  @Query(() => Course)
  getCourse(@Arg("courseId") courseId: string): Promise<Course> {
    return this.courseRepository.findById(courseId)
  }

  @Query(() => [Course])
  getAllCourses(): Promise<Course[]> {
    return this.courseRepository.findAll()
  }

  @Query(() => Course)
  courseBySlug(@Arg("slug") slug: string): Promise<Course> {
    return this.courseRepository.findBy({ where: { slug } })
  }

  // TODO: @Authorized()
  @Mutation(() => Course)
  createCourse(@Arg("data") data: CreateCourseInput): Promise<Course> {
    return this.courseService.create(data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => Course, { nullable: true })
  updateCourse(
    @Arg("id") id: string,
    @Arg("data") data: UpdateCourseInput,
  ): Promise<Course> {
    return this.courseService.update(id, data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => Boolean)
  destroyCourse(@Arg("id") id: string): Promise<boolean> {
    return this.courseService.destroy(id)
  }

  // FIELD RESOLVERS
  @FieldResolver(() => [Level], { nullable: true })
  levels(@Root() course: Course, @Loaders() { levelsLoader }: Loaders) {
    return levelsLoader.load(course.id)
  }

  @FieldResolver(() => [Group], { nullable: true })
  groups(@Root() course: Course, @Loaders() { groupsLoader }: Loaders) {
    return groupsLoader.load(course.id)
  }

  @FieldResolver(() => [CourseDayReward], { nullable: true })
  courseDayRewards(
    @Root() level: Level,
    @Loaders() { courseDayRewardsLoader }: Loaders,
  ) {
    return courseDayRewardsLoader.load(level.id)
  }

  @FieldResolver(() => User, { nullable: true })
  mentor(@Root() course: Course, @Loaders() { mentorLoader }: Loaders) {
    if (!course.mentorId) return null
    return mentorLoader.load(course.mentorId)
  }
}
