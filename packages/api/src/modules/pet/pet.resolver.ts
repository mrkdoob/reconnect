import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql"

import { Inject } from "typedi"

import { UserResolver } from "../user/user.resolver"

import { CreatePetInput } from "./input/createPet.input"
import { UpdatePetInput } from "./input/updatePet.input"
import { PetService } from "./pet.service"
import { Pet } from "./pet.entity"
import { PetRepository } from "./pet.repository"
import { CurrentUser } from "../shared/context/currentUser"
import { User } from "../user/user.entity"

@Resolver(() => Pet)
export class PetResolver {
  @Inject(() => PetService)
  petService: PetService
  @Inject(() => PetRepository)
  petRepository: PetRepository

  @Inject(() => UserResolver)
  UserResolver: UserResolver

  @Query(() => Pet)
  getPet(@Arg("petId") petId: string): Promise<Pet> {
    return this.petRepository.findById(petId)
  }

  @Authorized()
  @Query(() => [Pet])
  getAllPets(): Promise<Pet[]> {
    return this.petRepository.findAll()
  }

  @Authorized()
  @Mutation(() => Pet)
  createPet(
    @Arg("data") data: CreatePetInput,
    @CurrentUser() currentUser: User,
  ): Promise<Pet> {
    return this.petService.create({ ...data, createdBy: currentUser.id })
  }

  @Authorized()
  @Mutation(() => Pet, { nullable: true })
  updatePet(
    @Arg("petId") petId: string,
    @Arg("data") data: UpdatePetInput,
  ): Promise<Pet> {
    return this.petService.update(petId, data)
  }

  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyPet(@Arg("petId") petId: string): Promise<boolean> {
    return this.petService.destroy(petId)
  }
}
