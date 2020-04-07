import { Service, Inject } from "typedi"
import { OptionRepository } from "./option.repository"
import { Option } from "./option.entity"

@Service()
export class OptionService {
  @Inject(() => OptionRepository)
  optionRepository: OptionRepository

  async create(data: Partial<Option>): Promise<Option> {
    const level = await Option.create(data).save()
    return level
  }

  async update(optionId: string, data: Partial<Option>): Promise<Option> {
    const level = await this.optionRepository.findById(optionId)
    return level.update(data)
  }

  async destroy(optionId: string): Promise<boolean> {
    const level = await this.optionRepository.findById(optionId)
    return level.destroy()
  }
}
