import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Authorized,
  FieldResolver,
  Root,
} from "type-graphql"

import { Inject } from "typedi"

import { UserBoosterService } from "./userBooster.service"
import { UserBoosterRepository } from "./userBooster.repository"
import { UserBooster } from "./userBooster.entity"
import { CreateUserBoosterInput } from "./input/createUserBooster.input"
import { UpdateUserBoosterInput } from "./input/updateUserBooster.input"
import { UserTaskService } from "../userTask/userTask.service"
import { CurrentUser } from "../shared/context/currentUser"
import { User } from "../user/user.entity"
import { UserMailer } from "../user/user.mailer"
import { Loaders } from "../shared/context/loaders"

@Resolver(() => UserBooster)
export class UserBoosterResolver {
  @Inject(() => UserBoosterService)
  userBoosterService: UserBoosterService
  @Inject(() => UserTaskService)
  userTaskService: UserTaskService
  @Inject(() => UserBoosterRepository)
  userBoosterRepository: UserBoosterRepository
  @Inject(() => UserMailer)
  userMailer: UserMailer

  @Query(() => UserBooster)
  getUserBooster(
    @Arg("userBoosterId") userBoosterId: string,
  ): Promise<UserBooster> {
    return this.userBoosterRepository.findById(userBoosterId)
  }

  @Authorized()
  @Mutation(() => UserBooster)
  async createUserBooster(
    @Arg("data") data: CreateUserBoosterInput,
    @CurrentUser() currentUser: User,
  ): Promise<UserBooster> {
    const booster = await this.userBoosterService.create({
      ...data,
      userId: currentUser.id,
    })
    if (data.sponsorEmail)
      this.userMailer.sendSponsorInviteEmail(currentUser, booster)
    return booster
  }

  @Authorized()
  @Mutation(() => UserBooster, { nullable: true })
  updateUserBooster(
    @Arg("userBoosterId") userBoosterId: string,
    @Arg("data") data: UpdateUserBoosterInput,
  ): Promise<UserBooster> {
    return this.userBoosterService.update(userBoosterId, data)
  }

  @Authorized()
  @Mutation(() => UserBooster, { nullable: true })
  updateCurrentUserBooster(
    @CurrentUser() currentUser: User,
    @Arg("data") data: UpdateUserBoosterInput,
  ): Promise<UserBooster> {
    return this.userBoosterService.updateByUserId(currentUser.id, data)
  }

  @Authorized(["admin"])
  @Mutation(() => Boolean)
  destroyUserBooster(
    @Arg("userBoosterId") userBoosterId: string,
  ): Promise<boolean> {
    return this.userBoosterService.destroy(userBoosterId)
  }

  // FIELD RESOLVERS
  @FieldResolver(() => User, { nullable: true })
  user(
    @Root() userBooster: UserBooster,
    @Loaders() { userLoader }: Loaders,
  ): Promise<User | null> {
    if (userBooster.userId == null) {
      return Promise.resolve(null)
    } else return userLoader.load(userBooster.userId)
  }
}
