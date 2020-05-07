import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql"

import { Inject } from "typedi"

import { UserPetService } from "./userPet.service"
import { UserPetRepository } from "./userPet.repository"
import { UserPet } from "./userPet.entity"
import { CreateUserPetInput } from "./input/createUserPet.input"
import { UpdateUserPetInput } from "./input/updateUserPet.input"
import { UserTaskService } from "../userTask/userTask.service"
import { Pet } from "../pet/pet.entity"
import { Loaders } from "../shared/context/loaders"

@Resolver(() => UserPet)
export class UserPetResolver {
  @Inject(() => UserPetService)
  userPetService: UserPetService
  @Inject(() => UserTaskService)
  userTaskService: UserTaskService
  @Inject(() => UserPetRepository)
  userPetRepository: UserPetRepository

  @Query(() => UserPet)
  getUserPet(@Arg("userPetId") userPetId: string): Promise<UserPet> {
    return this.userPetRepository.findById(userPetId)
  }

  // @Authorized()
  @Mutation(() => UserPet)
  createUserPet(@Arg("data") data: CreateUserPetInput): Promise<UserPet> {
    return this.userPetService.create(data)
  }

  // @Authorized()
  @Mutation(() => UserPet, { nullable: true })
  updateUserPet(
    @Arg("userPetId") userPetId: string,
    @Arg("data") data: UpdateUserPetInput,
  ): Promise<UserPet> {
    return this.userPetService.update(userPetId, data)
  }

  // @Authorized(["admin"])
  @Mutation(() => Boolean)
  destroyUserPet(@Arg("userPetId") userPetId: string): Promise<boolean> {
    return this.userPetService.destroy(userPetId)
  }

  // FIELD RESOLVERS
  @FieldResolver(() => Pet, { nullable: true })
  pet(
    @Root() userPet: UserPet,
    @Loaders() { petLoader }: Loaders,
  ): Promise<Pet | null> {
    if (userPet.petId == null) {
      return Promise.resolve(null)
    } else return petLoader.load(userPet.petId)
  }
}
