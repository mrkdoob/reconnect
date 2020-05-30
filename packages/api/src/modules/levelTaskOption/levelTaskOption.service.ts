import { Service, Inject } from "typedi"
import { LevelTaskOptionRepository } from "./levelTaskOption.repository"
import { LevelTaskOption } from "./levelTaskOption.entity"

@Service()
export class LevelTaskOptionService {
  @Inject(() => LevelTaskOptionRepository)
  levelRepository: LevelTaskOptionRepository

  async create(data: Partial<LevelTaskOption>): Promise<LevelTaskOption> {
    const level = await LevelTaskOption.create(data).save()
    return level
  }

  async update(
    levelTaskOptionId: string,
    data: Partial<LevelTaskOption>,
  ): Promise<LevelTaskOption> {
    const level = await this.levelRepository.findById(levelTaskOptionId)
    return level.update(data)
  }

  async destroy(levelTaskOptionId: string): Promise<boolean> {
    const level = await this.levelRepository.findById(levelTaskOptionId)
    return level.destroy()
  }
}
