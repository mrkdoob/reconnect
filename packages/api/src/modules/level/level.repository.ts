import { UserInputError } from "apollo-server-express"
import { FindOneOptions, FindConditions } from "typeorm"
import { Service } from "typedi"
import { Level } from "./level.entity"

@Service()
export class LevelRepository {
  findById(id: string, options?: FindOneOptions<Level>): Promise<Level> {
    try {
      return Level.findOneOrFail(id, options)
    } catch {
      throw new UserInputError("Level not found")
    }
  }

  findAll(where?: FindConditions<Level>): Promise<Level[]> {
    return Level.find({ where })
  }

  async findFirst(courseId: string): Promise<Level> {
    try {
      return await Level.findOneOrFail({
        where: { courseId, levelNumber: 1 },
      })
    } catch {
      throw new UserInputError("No level found")
    }
  }

  async findNext(id: string): Promise<Level> {
    try {
      const level = await Level.findOneOrFail(id)

      return await Level.findOneOrFail({
        where: { courseId: level.courseId, levelNumber: level.levelNumber + 1 },
      }) //TODO: REMOVE?
        .catch(() => {
          return Level.findOneOrFail({
            where: { courseId: level.courseId, levelNumber: 1 }, // Reset to first
          })
        })
    } catch {
      throw new UserInputError("No level found")
    }
  }
}
