import { UserInputError } from "apollo-server-express"
import { FindOneOptions } from "typeorm"
import { Service } from "typedi"
import { UserTask } from "./userTask.entity"

@Service()
export class UserTaskRepository {
  findById(
    taskId: string,
    options?: FindOneOptions<UserTask>,
  ): Promise<UserTask> {
    try {
      return UserTask.findOneOrFail(taskId, options)
    } catch {
      throw new UserInputError("Task not found")
    }
  }

  findAll(options?: FindOneOptions<UserTask>): Promise<UserTask[]> {
    return UserTask.find(options)
  }

  findUserTasks(userId: string): Promise<UserTask[]> {
    try {
      return UserTask.find({
        where: { userId },
      })
    } catch {
      throw new UserInputError("No tasks found")
    }
  }
}
