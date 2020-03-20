import { UserInputError } from "apollo-server-express"
import { FindOneOptions } from "typeorm"
import { Service } from "typedi"
import { Group } from "./group.entity"

@Service()
export class GroupRepository {
  findById(groupId: string, options?: FindOneOptions<Group>): Promise<Group> {
    try {
      return Group.findOneOrFail(groupId, options)
    } catch {
      throw new UserInputError("Group not found")
    }
  }

  findAll(): Promise<Group[]> {
    return Group.find()
  }
}
