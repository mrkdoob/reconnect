import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql"

import { Inject } from "typedi"

import { UserResolver } from "../user/user.resolver"
import { UserTask } from "./userTask.entity"
import { UserTaskRepository } from "./userTask.repository"
import { CreateUserTaskInput } from "./input/createUserTask.input"
import { UpdateUserTaskInput } from "./input/updateUserTask.input"
import { UserTaskService } from "./userTask.service"
import { LevelTask } from "../levelTask/levelTask.entity"
import { Loaders } from "../shared/context/loaders"

@Resolver(() => UserTask)
export class UserTaskResolver {
  @Inject(() => UserTaskService)
  taskService: UserTaskService
  @Inject(() => UserTaskRepository)
  taskRepository: UserTaskRepository

  @Inject(() => UserResolver)
  UserResolver: UserResolver

  @Query(() => UserTask)
  getUserTask(@Arg("taskId") taskId: string): Promise<UserTask> {
    return this.taskRepository.findById(taskId)
  }

  @Query(() => [UserTask])
  allUserTasks(): Promise<UserTask[]> {
    return this.taskRepository.findAll()
  }

  // @Authorized()  TODO: Authorized
  @Mutation(() => UserTask)
  createUserTask(@Arg("data") data: CreateUserTaskInput): Promise<UserTask> {
    return this.taskService.create(data)
  }

  // TODO: @Authorized()
  @Mutation(() => UserTask, { nullable: true })
  updateUserTask(
    @Arg("taskId") taskId: string,
    @Arg("data") data: UpdateUserTaskInput,
  ): Promise<UserTask> {
    return this.taskService.update(taskId, data)
  }

  // TODO: @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyUserTask(@Arg("taskId") taskId: string): Promise<boolean> {
    return this.taskService.destroy(taskId)
  }

  // RESOLVER
  @FieldResolver(() => LevelTask, { nullable: true })
  levelTask(
    @Root() userTask: UserTask,
    @Loaders() { levelTaskLoader }: Loaders,
  ): Promise<LevelTask> {
    return levelTaskLoader.load(userTask.levelTaskId)
  }
}
