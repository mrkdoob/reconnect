import { Resolver, Query, Mutation, Arg } from "type-graphql"

import { Inject } from "typedi"
import { CourseDayReward } from "./courseDayReward.entity"
import { CourseDayRewardService } from "./courseDayReward.service"
import { CourseDayRewardRepository } from "./courseDayReward.repository"
import { CreateCourseDayRewardInput } from "./input/createCourseDayReward.input"
import { UpdateCourseDayRewardInput } from "./input/updateCourseDayReward.input"

@Resolver(() => CourseDayReward)
export class CourseDayRewardResolver {
  @Inject(() => CourseDayRewardService)
  courseDayRewardService: CourseDayRewardService
  @Inject(() => CourseDayRewardRepository)
  courseDayRewardRepository: CourseDayRewardRepository

  @Query(() => CourseDayReward)
  getCourseDayReward(
    @Arg("courseDayRewardId") courseDayRewardId: string,
  ): Promise<CourseDayReward> {
    return this.courseDayRewardRepository.findById(courseDayRewardId)
  }

  //TODO: Remove?
  @Query(() => [CourseDayReward])
  getAllCourseDayRewards(): Promise<CourseDayReward[]> {
    return this.courseDayRewardRepository.findAll()
  }

  // TODO: @Authorized()
  @Mutation(() => CourseDayReward)
  createCourseDayReward(
    @Arg("data") data: CreateCourseDayRewardInput,
  ): Promise<CourseDayReward> {
    return this.courseDayRewardService.create(data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => CourseDayReward, { nullable: true })
  updateCourseDayReward(
    @Arg("courseDayRewardId") courseDayRewardId: string,
    @Arg("data") data: UpdateCourseDayRewardInput,
  ): Promise<CourseDayReward> {
    return this.courseDayRewardService.update(courseDayRewardId, data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => Boolean)
  destroyCourseDayReward(
    @Arg("courseDayRewardId") courseDayRewardId: string,
  ): Promise<boolean> {
    return this.courseDayRewardService.destroy(courseDayRewardId)
  }
}
