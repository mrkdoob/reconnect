import { Resolver, Query, Mutation, Arg } from "type-graphql"

import { Inject } from "typedi"

import { UserBoosterService } from "./userBooster.service"
import { UserBoosterRepository } from "./userBooster.repository"
import { UserBooster } from "./userBooster.entity"
import { CreateUserBoosterInput } from "./input/createUserBooster.input"
import { UpdateUserBoosterInput } from "./input/updateUserBooster.input"
import { UserTaskService } from "../userTask/userTask.service"

@Resolver(() => UserBooster)
export class UserBoosterResolver {
  @Inject(() => UserBoosterService)
  userBoosterService: UserBoosterService
  @Inject(() => UserTaskService)
  userTaskService: UserTaskService
  @Inject(() => UserBoosterRepository)
  userBoosterRepository: UserBoosterRepository

  @Query(() => UserBooster)
  getUserBooster(
    @Arg("userBoosterId") userBoosterId: string,
  ): Promise<UserBooster> {
    return this.userBoosterRepository.findById(userBoosterId)
  }

  // @Authorized()
  @Mutation(() => UserBooster)
  createUserBooster(
    @Arg("data") data: CreateUserBoosterInput,
  ): Promise<UserBooster> {
    return this.userBoosterService.create(data)
  }

  // @Authorized()
  @Mutation(() => UserBooster, { nullable: true })
  updateUserBooster(
    @Arg("userBoosterId") userBoosterId: string,
    @Arg("data") data: UpdateUserBoosterInput,
  ): Promise<UserBooster> {
    return this.userBoosterService.update(userBoosterId, data)
  }

  // @Authorized(["admin"])
  @Mutation(() => Boolean)
  destroyUserBooster(
    @Arg("userBoosterId") userBoosterId: string,
  ): Promise<boolean> {
    return this.userBoosterService.destroy(userBoosterId)
  }

  // FIELD RESOLVERS
  // @FieldResolver(() => Pet, { nullable: true })
  // pet(
  //   @Root() userBooster: UserBooster,
  //   @Loaders() { petLoader }: Loaders,
  // ): Promise<Pet | null> {
  //   if (userBooster.petId == null) {
  //     return Promise.resolve(null)
  //   } else return petLoader.load(userBooster.petId)
  // }
}
