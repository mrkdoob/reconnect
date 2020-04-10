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
    const levelTasks = await this.levelTaskRepository.findAllByLevelId(
      levelId,
      {
        relations: ["levelTaskOptions"],
      },
    )
    levelTasks.map(task => {
      const levelTaskOptionId = task.levelTaskOptions.find(
        option => option.order === 1,
      )
        ? task.levelTaskOptions.find(option => option.order === 1)
        : task.levelTaskOptions[0]

      this.create({
        levelTaskId: task.id,
        userId,
        order: task.order,
        levelTaskOptionId: levelTaskOptionId?.id, // TODO: Select 1st or prev
      })
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
      {
        relations: ["levelTaskOptions"],
      },
    )

    // const userTasks = await this.userTaskRepository.findUserTasks(userId)
    await this.destroyAllTasks(userId)

    nextLevelTasks.map(task => {
      const data = {
        levelTaskId: task.id,
        order: task.order,
        completed: true,
        userId,
        levelTaskOptionId: task.levelTaskOptions[0].id, // TODO: Select prev selected?
      }
      this.create(data)
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
