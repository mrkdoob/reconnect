import { Service, Inject } from "typedi"
import { CourseDayReward } from "./courseDayReward.entity"
import { CourseDayRewardRepository } from "./courseDayReward.repository"

@Service()
export class CourseDayRewardService {
  @Inject(() => CourseDayRewardRepository)
  courseDayRewardRepository: CourseDayRewardRepository

  async create(data: Partial<CourseDayReward>): Promise<CourseDayReward> {
    const level = await CourseDayReward.create(data).save()
    return level
  }

  async update(
    courseRewardId: string,
    data: Partial<CourseDayReward>,
  ): Promise<CourseDayReward> {
    const level = await this.courseDayRewardRepository.findById(courseRewardId)
    return level.update(data)
  }

  async destroy(courseRewardId: string): Promise<boolean> {
    const level = await this.courseDayRewardRepository.findById(courseRewardId)
    return level.destroy()
  }
}
