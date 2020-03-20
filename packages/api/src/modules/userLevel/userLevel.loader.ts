import DataLoader from "dataloader"
import { Level } from "../level/level.entity"

// LEVEL
export const levelLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const levelIds = [...keys]
    const levels = await Level.getRepository().findByIds(levelIds, {
      cache: true,
    })
    const map: { [key: string]: Level } = {}
    levels.forEach(level => (map[level.id] = level))
    return levelIds.map(id => map[id])
  })
