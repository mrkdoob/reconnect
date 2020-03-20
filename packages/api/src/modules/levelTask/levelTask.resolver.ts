import { Resolver, Query, Mutation, Arg } from "type-graphql"

import { Inject } from "typedi"
import { LevelTask } from "./levelTask.entity"
import { LevelTaskService } from "./levelTask.service"
import { LevelTaskRepository } from "./levelTask.repository"
import { CreateLevelTaskInput } from "./input/createLevelTask.input"
import { UpdateLevelTaskInput } from "./input/updateLevelTask.input"

@Resolver(() => LevelTask)
export class LevelTaskResolver {
  @Inject(() => LevelTaskService)
  levelTaskService: LevelTaskService
  @Inject(() => LevelTaskRepository)
  levelTaskRepository: LevelTaskRepository

  @Query(() => LevelTask)
  getLevelTask(@Arg("levelTaskId") levelTaskId: string): Promise<LevelTask> {
    return this.levelTaskRepository.findById(levelTaskId)
  }

  //TODO: Remove?
  @Query(() => [LevelTask])
  getAllLevelTasks(): Promise<LevelTask[]> {
    return this.levelTaskRepository.findAll()
  }

  @Query(() => [LevelTask])
  getAllLevelTasksByLevelId(
    @Arg("levelId") levelId: string,
  ): Promise<LevelTask[]> {
    return this.levelTaskRepository.findAllByLevelId(levelId)
  }

  // TODO: @Authorized()
  @Mutation(() => LevelTask)
  createLevelTask(@Arg("data") data: CreateLevelTaskInput): Promise<LevelTask> {
    return this.levelTaskService.create(data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => LevelTask, { nullable: true })
  updateLevelTask(
    @Arg("levelTaskId") levelTaskId: string,
    @Arg("data") data: UpdateLevelTaskInput,
  ): Promise<LevelTask> {
    return this.levelTaskService.update(levelTaskId, data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => Boolean)
  destroyLevelTask(@Arg("levelTaskId") levelTaskId: string): Promise<boolean> {
    return this.levelTaskService.destroy(levelTaskId)
  }

  // FIELD RESOLVERS
}
