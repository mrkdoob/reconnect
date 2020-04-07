import { UserInputError } from "apollo-server-express"
import { FindOneOptions, FindConditions } from "typeorm"
import { Service } from "typedi"
import { Option } from "./option.entity"

@Service()
export class OptionRepository {
  findById(id: string, options?: FindOneOptions<Option>): Promise<Option> {
    try {
      return Option.findOneOrFail(id, options)
    } catch {
      throw new UserInputError("Level task not found")
    }
  }

  findAll(where?: FindConditions<Option>): Promise<Option[]> {
    const options = Option.find({ where })
    return options
  }
}
