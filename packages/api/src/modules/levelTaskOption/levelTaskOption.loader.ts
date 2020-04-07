import DataLoader from "dataloader"
import { In } from "typeorm"
import { LevelTaskOption } from "./levelTaskOption.entity"
import { Option } from "../option/option.entity"

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

export const optionLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const optionIds = [...keys]
    const options = await Option.getRepository().findByIds(optionIds, {
      cache: true,
    })
    const map: { [key: string]: Option } = {}
    options.forEach(option => (map[option.id] = option))
    return optionIds.map(id => map[id])
  })
