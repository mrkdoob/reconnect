import DataLoader from "dataloader"
import { In } from "typeorm"
import { LevelTask } from "../levelTask/levelTask.entity"

//TODO:
export const levelTasksLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const levelIds = [...keys]
    const levelTasks = await LevelTask.getRepository().find({
      where: {
        levelId: In(levelIds),
      },
      // order: {
      //   order: "ASC",
      // },
    })

    const map: { [key: string]: LevelTask[] } = {}
    levelTasks.forEach(task => {
      if (task.levelId in map) {
        map[task.levelId].push(task)
      } else {
        map[task.levelId] = [task]
      }
    })
    return levelIds.map(levelId => map[levelId] || [])
  })
