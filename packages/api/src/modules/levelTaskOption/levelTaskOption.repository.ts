import { UserInputError } from "apollo-server-express"
import { FindOneOptions, FindConditions } from "typeorm"
import { Service } from "typedi"
import { LevelTaskOption } from "./levelTaskOption.entity"

@Service()
export class LevelTaskOptionRepository {
  findById(
    id: string,
    options?: FindOneOptions<LevelTaskOption>,
  ): Promise<LevelTaskOption> {
    try {
      return LevelTaskOption.findOneOrFail(id, options)
    } catch {
      throw new UserInputError("Level task not found")
    }
  }

  findAll(where?: FindConditions<LevelTaskOption>): Promise<LevelTaskOption[]> {
    const tasks = LevelTaskOption.find({ where })
    return tasks
  }

  findAllByLevelId(levelId: string): Promise<LevelTaskOption[]> {
    try {
      return LevelTaskOption.find({ where: { levelId } })
    } catch {
      throw new UserInputError("No level tasks found")
    }
  }
}
