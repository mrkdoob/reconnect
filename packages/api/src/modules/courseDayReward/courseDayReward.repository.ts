import { UserInputError } from "apollo-server-express"
import { FindOneOptions, FindConditions } from "typeorm"
import { Service } from "typedi"
import { CourseDayReward } from "./courseDayReward.entity"

@Service()
export class CourseDayRewardRepository {
  findById(
    id: string,
    options?: FindOneOptions<CourseDayReward>,
  ): Promise<CourseDayReward> {
    try {
      return CourseDayReward.findOneOrFail(id, options)
    } catch {
      throw new UserInputError("Course reward not found")
    }
  }

  findByCourseId(courseId: string): Promise<CourseDayReward> {
    try {
      return CourseDayReward.findOneOrFail({
        where: { courseId },
      })
    } catch {
      throw new UserInputError("No course rewards found")
    }
  }

  async findNext(id: string): Promise<CourseDayReward> {
    try {
      const reward = await CourseDayReward.findOneOrFail(id)

      return await CourseDayReward.findOneOrFail({
        where: { courseId: reward.courseId, order: reward.order + 1 },
      }).catch(() => {
        return CourseDayReward.findOneOrFail({
          where: { courseId: reward.courseId, order: 1 }, // Reset to first
        })
      })
    } catch {
      throw new UserInputError("No course rewards found")
    }
  }

  findAll(where?: FindConditions<CourseDayReward>): Promise<CourseDayReward[]> {
    return CourseDayReward.find({ where })
  }
}
