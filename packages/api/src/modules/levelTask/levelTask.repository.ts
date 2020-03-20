import { UserInputError } from "apollo-server-express"
import { FindOneOptions, FindConditions } from "typeorm"
import { Service } from "typedi"
import { LevelTask } from "./levelTask.entity"

@Service()
export class LevelTaskRepository {
  findById(
    id: string,
    options?: FindOneOptions<LevelTask>,
  ): Promise<LevelTask> {
    try {
      return LevelTask.findOneOrFail(id, options)
    } catch {
      throw new UserInputError("Level task not found")
    }
  }

  findAll(where?: FindConditions<LevelTask>): Promise<LevelTask[]> {
    const tasks = LevelTask.find({ where })
    console.log("tasks" + tasks)

    return tasks
  }

  findAllByLevelId(levelId: string): Promise<LevelTask[]> {
    try {
      return LevelTask.find({ where: { levelId } })
    } catch {
      throw new UserInputError("No level tasks found")
    }
  }
}
