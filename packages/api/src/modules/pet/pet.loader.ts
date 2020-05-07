import DataLoader from "dataloader"
import { Pet } from "./pet.entity"

// PET
export const petLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const petIds = [...keys]
    const pets = await Pet.getRepository().findByIds(petIds, {
      cache: true,
    })
    const map: { [key: string]: Pet } = {}
    pets.forEach(pet => (map[pet.id] = pet))
    return petIds.map(id => map[id])
  })
