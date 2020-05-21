import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Authorized,
} from "type-graphql"

import { Inject } from "typedi"

import { UserResolver } from "../user/user.resolver"
import { UserTask } from "./userTask.entity"
import { UserTaskRepository } from "./userTask.repository"
import {
  CreateUserTaskInput,
  CreateCustomUserTaskInput,
} from "./input/createUserTask.input"
import { UpdateUserTaskInput } from "./input/updateUserTask.input"
import { UserTaskService } from "./userTask.service"
import { LevelTask } from "../levelTask/levelTask.entity"
import { Loaders } from "../shared/context/loaders"
import { LevelTaskOptionRepository } from "../levelTaskOption/levelTaskOption.repository"
import { LevelTaskOption } from "../levelTaskOption/levelTaskOption.entity"
import { CurrentUser } from "../shared/context/currentUser"
import { User } from "../user/user.entity"

@Resolver(() => UserTask)
export class UserTaskResolver {
  @Inject(() => UserTaskService)
  taskService: UserTaskService
  @Inject(() => UserTaskRepository)
  taskRepository: UserTaskRepository
  @Inject(() => LevelTaskOptionRepository)
  levelTaskOptionRepository: LevelTaskOptionRepository

  @Inject(() => UserResolver)
  UserResolver: UserResolver

  @Authorized()
  @Query(() => UserTask)
  getUserTask(@Arg("taskId") taskId: string): Promise<UserTask> {
    return this.taskRepository.findById(taskId)
  }

  @Authorized()
  @Query(() => [UserTask])
  allUserTasks(): Promise<UserTask[]> {
    return this.taskRepository.findAll()
  }

  @Authorized()
  @Mutation(() => UserTask)
  createUserTask(@Arg("data") data: CreateUserTaskInput): Promise<UserTask> {
    return this.taskService.create(data)
  }

  @Authorized()
  @Mutation(() => UserTask)
  createCustomUserTask(
    @Arg("data") data: CreateCustomUserTaskInput,
    @CurrentUser() currentUser: User,
  ): Promise<UserTask> {
    const finalData = { ...data, userId: currentUser.id }
    return this.taskService.create(finalData)
  }

  @Authorized()
  @Mutation(() => UserTask, { nullable: true })
  updateUserTask(
    @Arg("taskId") taskId: string,
    @Arg("data") data: UpdateUserTaskInput,
  ): Promise<UserTask> {
    return this.taskService.update(taskId, data)
  }

  @Authorized()
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

  @FieldResolver(() => LevelTaskOption, { nullable: true })
  levelTaskOption(@Root() userTask: UserTask): Promise<LevelTaskOption> {
    return this.levelTaskOptionRepository.findById(userTask.levelTaskOptionId)
  }
}
