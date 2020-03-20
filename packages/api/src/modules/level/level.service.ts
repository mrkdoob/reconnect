import { Service, Inject } from "typedi"
import { LevelRepository } from "./level.repository"
import { Level } from "./level.entity"

@Service()
export class LevelService {
  @Inject(() => LevelRepository)
  levelRepository: LevelRepository

  async create(data: Partial<Level>): Promise<Level> {
    const level = await Level.create(data).save()
    return level
  }

  async update(levelId: string, data: Partial<Level>): Promise<Level> {
    const level = await this.levelRepository.findById(levelId)
    return level.update(data)
  }

  async destroy(levelId: string): Promise<boolean> {
    const level = await this.levelRepository.findById(levelId)
    return level.destroy()
  }
}
