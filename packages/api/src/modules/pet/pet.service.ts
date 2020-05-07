import { Service, Inject } from "typedi"
import { PetRepository } from "./pet.repository"
import { Pet } from "./pet.entity"

@Service()
export class PetService {
  @Inject(() => PetRepository)
  petRepository: PetRepository

  async create(data: Partial<Pet>): Promise<Pet> {
    const group = await Pet.create(data).save()
    return group
  }

  async update(petId: string, data: Partial<Pet>): Promise<Pet> {
    const group = await this.petRepository.findById(petId)
    return group.update(data)
  }

  async destroy(petId: string): Promise<boolean> {
    const group = await this.petRepository.findById(petId)
    return group.destroy()
  }
}
