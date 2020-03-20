import { Service, Inject } from "typedi"
import { LevelTaskRepository } from "./levelTask.repository"
import { LevelTask } from "./levelTask.entity"

@Service()
export class LevelTaskService {
  @Inject(() => LevelTaskRepository)
  levelRepository: LevelTaskRepository

  async create(data: Partial<LevelTask>): Promise<LevelTask> {
    const level = await LevelTask.create(data).save()
    return level
  }

  async update(levelId: string, data: Partial<LevelTask>): Promise<LevelTask> {
    const level = await this.levelRepository.findById(levelId)
    return level.update(data)
  }

  async destroy(levelId: string): Promise<boolean> {
    const level = await this.levelRepository.findById(levelId)
    return level.destroy()
  }
}
