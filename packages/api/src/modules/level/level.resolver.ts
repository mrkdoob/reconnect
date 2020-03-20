import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql"

import { Inject } from "typedi"
import { Level } from "./level.entity"
import { LevelService } from "./level.service"
import { LevelRepository } from "./level.repository"
import { CreateLevelInput } from "./input/createLevel.input"
import { UpdateLevelInput } from "./input/updateLevel.input"
import { LevelTask } from "../levelTask/levelTask.entity"
import { Loaders } from "../shared/context/loaders"

@Resolver(() => Level)
export class LevelResolver {
  @Inject(() => LevelService)
  levelService: LevelService
  @Inject(() => LevelRepository)
  levelRepository: LevelRepository

  @Query(() => Level)
  getLevel(@Arg("levelId") levelId: string): Promise<Level> {
    return this.levelRepository.findById(levelId)
  }

  //TODO: Remove?
  @Query(() => [Level])
  getAllLevels(): Promise<Level[]> {
    return this.levelRepository.findAll()
  }

  // TODO: @Authorized()
  @Mutation(() => Level)
  createLevel(@Arg("data") data: CreateLevelInput): Promise<Level> {
    return this.levelService.create(data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => Level, { nullable: true })
  updateLevel(
    @Arg("levelId") levelId: string,
    @Arg("data") data: UpdateLevelInput,
  ): Promise<Level> {
    return this.levelService.update(levelId, data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => Boolean)
  destroyLevel(@Arg("levelId") levelId: string): Promise<boolean> {
    return this.levelService.destroy(levelId)
  }

  // FIELD RESOLVERS
  @FieldResolver(() => [LevelTask], { nullable: true })
  levelTasks(@Root() level: Level, @Loaders() { levelTasksLoader }: Loaders) {
    return levelTasksLoader.load(level.id)
  }
}
