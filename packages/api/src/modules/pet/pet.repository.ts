import { UserInputError } from "apollo-server-express"
import { FindOneOptions } from "typeorm"
import { Service } from "typedi"
import { Pet } from "./pet.entity"

@Service()
export class PetRepository {
  findById(petId: string, options?: FindOneOptions<Pet>): Promise<Pet> {
    try {
      return Pet.findOneOrFail(petId, options)
    } catch {
      throw new UserInputError("Pet not found")
    }
  }

  findAll(): Promise<Pet[]> {
    return Pet.find()
  }

  findNextLevelById(pet: Pet): Promise<Pet> {
    try {
      return Pet.findOneOrFail({
        where: { name: pet.name, levelNumber: pet.levelNumber + 1 },
      }).catch(() => {
        return Pet.findOneOrFail({
          where: { name: pet.name, levelNumber: 1 },
        })
      })
    } catch {
      throw new UserInputError("No UserPet found")
    }
  }
}
