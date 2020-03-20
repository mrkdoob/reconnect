import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql"

import { Inject } from "typedi"

import { Loaders } from "../shared/context/loaders"
import { UserLevelService } from "./userLevel.service"
import { UserLevelRepository } from "./userLevel.repository"
import { UserLevel } from "./userLevel.entity"
import { CreateUserLevelInput } from "./input/createUserLevel.input"
import { UpdateUserLevelInput } from "./input/updateUserLevel.input"
import { Level } from "../level/level.entity"
import { UserTaskService } from "../userTask/userTask.service"

@Resolver(() => UserLevel)
export class UserLevelResolver {
  @Inject(() => UserLevelService)
  userLevelService: UserLevelService
  @Inject(() => UserTaskService)
  userTaskService: UserTaskService
  @Inject(() => UserLevelRepository)
  userLevelRepository: UserLevelRepository

  @Query(() => UserLevel)
  getUserLevel(@Arg("userLevelId") userLevelId: string): Promise<UserLevel> {
    return this.userLevelRepository.findById(userLevelId)
  }

  //TODO: Remove?
  @Query(() => [UserLevel])
  getAllUserLevels(): Promise<UserLevel[]> {
    return this.userLevelRepository.findAll()
  }

  // TODO: @Authorized()
  @Mutation(() => UserLevel)
  createUserLevel(@Arg("data") data: CreateUserLevelInput): Promise<UserLevel> {
    return this.userLevelService.create(data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => UserLevel, { nullable: true })
  updateUserLevel(
    @Arg("userLevelId") userLevelId: string,
    @Arg("data") data: UpdateUserLevelInput,
  ): Promise<UserLevel> {
    return this.userLevelService.update(userLevelId, data)
  }

  // TODO: Remove?
  // @Mutation(() => UserLevel, { nullable: true })
  // async updateToNextUserLevel(
  //   // TODO: Remove need for userLevelId?
  //   @Arg("userLevelId") userLevelId: string,
  //   @CurrentUser() currentUser: User,
  // ): Promise<UserLevel> {
  //   const nextLevel = await this.userLevelService.updateToNextLevel(userLevelId)
  //   await this.userTaskService.updateAllToNextTasks(
  //     nextLevel.levelId,
  //     currentUser.id,
  //   )
  //   return nextLevel
  // }

  // TODO: @Authorized(["admin"])
  @Mutation(() => Boolean)
  destroyUserLevel(@Arg("userLevelId") userLevelId: string): Promise<boolean> {
    return this.userLevelService.destroy(userLevelId)
  }

  // FIELD RESOLVERS
  @FieldResolver(() => Level, { nullable: true })
  level(
    @Root() userLevel: UserLevel,
    @Loaders() { levelLoader }: Loaders,
  ): Promise<Level | null> {
    // TODO: FIX SOMETHING SO IT CAN BE NULL?
    if (userLevel.levelId == null) {
      return Promise.resolve(null)
    } else return levelLoader.load(userLevel.levelId)
  }
}
