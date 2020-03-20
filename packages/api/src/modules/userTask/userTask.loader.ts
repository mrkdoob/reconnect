import DataLoader from "dataloader"
import { LevelTask } from "../levelTask/levelTask.entity"

// LEVEL TASKS
export const levelTaskLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const taskIds = [...keys]
    const tasks = await LevelTask.getRepository().findByIds(taskIds, {
      cache: true,
      order: { order: "ASC" },
    })
    const map: { [key: string]: LevelTask } = {}
    tasks.forEach(task => {
      if (!task.hasId) return null
      map[task.id] = task
    })
    return taskIds.map(id => map[id]) || {}
  })
