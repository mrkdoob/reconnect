import { Service, Inject } from "typedi"
import { UserTaskRepository } from "./userTask.repository"
import { UserTask } from "./userTask.entity"
import { LevelTaskRepository } from "../levelTask/levelTask.repository"

@Service()
export class UserTaskService {
  @Inject(() => UserTaskRepository)
  userTaskRepository: UserTaskRepository
  @Inject(() => LevelTaskRepository)
  levelTaskRepository: LevelTaskRepository

  async create(data: Partial<UserTask>): Promise<UserTask> {
    const task = await UserTask.create(data).save()
    return task
  }

  async update(taskId: string, data: Partial<UserTask>): Promise<UserTask> {
    const task = await this.userTaskRepository.findById(taskId)
    return task.update(data)
  }

  async destroy(taskId: string): Promise<boolean> {
    const task = await this.userTaskRepository.findById(taskId)
    return task.destroy()
  }

  async resetUserTasks(userId: string) {
    const tasks = await this.userTaskRepository.findUserTasks(userId)
    tasks.map(task => task.update({ completed: false }))
    return tasks
  }

  async createFirstTasks(levelId: string, userId: string) {
    const levelTasks = await this.levelTaskRepository.findAllByLevelId(levelId)
    levelTasks.map(task => {
      this.create({ levelTaskId: task.id, userId, order: task.order })
    })
    return levelTasks
  }

  async resetAllUserTasks() {
    const tasks = await this.userTaskRepository.findAll()
    tasks.map(task => task.update({ completed: false }))
  }

  async updateAllToNextTasks(levelId: string, userId: string) {
    const nextLevelTasks = await this.levelTaskRepository.findAllByLevelId(
      levelId,
    )
    const userTasks = await this.userTaskRepository.findUserTasks(userId)

    nextLevelTasks.map((task, index) => {
      const data = { levelTaskId: task.id, order: task.order }
      userTasks[index].update(data)
      // TODO: Create new userTask if nextLevelTasks > userTasks
    })
  }

  async destroyAllTasks(userId: string) {
    const userTasks = await this.userTaskRepository.findUserTasks(userId)
    userTasks.map(task => {
      task.destroy()
    })
    return true
  }
}
