import DataLoader from "dataloader"

import { In } from "typeorm"
import { UserPet } from "./userPet.entity"

// USER PETS
export const userPetsLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const userIds = [...keys]
    const userPets = await UserPet.getRepository().find({
      where: {
        userId: In(userIds),
      },
    })
    const map: { [key: string]: UserPet[] } = {}
    userPets.forEach(userPet => {
      if (userPet.userId in map) {
        map[userPet.userId].push(userPet)
      } else {
        map[userPet.userId] = [userPet]
      }
    })
    return userIds.map(userId => map[userId] || [])
  })

// ACTIVE PET
export const activeUserPetLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const userIds = [...keys]
    const userPets = await UserPet.getRepository().find({
      where: {
        userId: In(userIds),
        isActive: true,
      },
      cache: true,
    })
    const map: { [key: string]: UserPet } = {}
    userPets.forEach(userPet => {
      if (!userPet.userId) return null
      map[userPet.userId] = userPet
    })
    return userIds.map(id => map[id]) || {}
  })
