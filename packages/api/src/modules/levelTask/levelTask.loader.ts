import DataLoader from "dataloader"
import { In } from "typeorm"
import { LevelTaskOption } from "../levelTaskOption/levelTaskOption.entity"

//TODO:
export const levelTaskOptionsLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const levelTaskIds = [...keys]
    const levelTaskOptions = await LevelTaskOption.getRepository().find({
      where: {
        levelTaskId: In(levelTaskIds),
      },
      order: {
        order: "ASC",
      },
    })

    const map: { [key: string]: LevelTaskOption[] } = {}
    levelTaskOptions.forEach(option => {
      if (option.levelTaskId in map) {
        map[option.levelTaskId].push(option)
      } else {
        map[option.levelTaskId] = [option]
      }
    })
    return levelTaskIds.map(levelTaskId => map[levelTaskId] || [])
  })
