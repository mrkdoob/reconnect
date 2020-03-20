import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Authorized,
} from "type-graphql"

import { Inject } from "typedi"

import { UserResolver } from "../user/user.resolver"

import { UserDayRewardService } from "./userDayReward.service"
import { Loaders } from "../shared/context/loaders"
import { UserDayReward } from "./userDayReward.entity"
import { UserDayRewardRepository } from "./userDayReward.repository"
import { CourseDayReward } from "../courseDayReward/courseDayReward.entity"
import { CurrentUser } from "../shared/context/currentUser"
import { User } from "../user/user.entity"

@Resolver(() => UserDayReward)
export class UserDayRewardResolver {
  @Inject(() => UserDayRewardService)
  userDayRewardService: UserDayRewardService
  @Inject(() => UserDayRewardRepository)
  userDayRewardRepository: UserDayRewardRepository

  @Inject(() => UserResolver)
  UserResolver: UserResolver

  @Authorized()
  @Query(() => UserDayReward, { nullable: true })
  async myDayReward(@CurrentUser() currentUser: User): Promise<UserDayReward> {
    const reward = await this.userDayRewardRepository.findByUserId(
      currentUser.id,
    ) // After reading it updates to the next reward for the following day
    await this.userDayRewardService.updateToNextReward(reward.id)
    return reward
  }

  @Mutation(() => UserDayReward)
  createFirstUserDayReward(
    @CurrentUser() currentUser: User,
  ): Promise<UserDayReward> {
    return this.userDayRewardService.createFirstReward(currentUser.id)
  }

  // TODO: @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyUserDayReward(
    @Arg("userDayRewardId") userDayRewardId: string,
  ): Promise<boolean> {
    return this.userDayRewardService.destroy(userDayRewardId)
  }

  // FIELD RESOLVERS
  @FieldResolver(() => CourseDayReward, { nullable: true })
  courseDayReward(
    @Root() userDayReward: UserDayReward,
    @Loaders() { courseDayRewardLoader }: Loaders,
  ) {
    return courseDayRewardLoader.load(userDayReward.courseDayRewardId)
  }
}
