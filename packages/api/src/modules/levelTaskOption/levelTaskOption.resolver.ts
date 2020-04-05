import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql"

import { Inject } from "typedi"
import { LevelTaskOption } from "./levelTaskOption.entity"
import { LevelTaskOptionService } from "./levelTaskOption.service"
import { LevelTaskOptionRepository } from "./levelTaskOption.repository"
import { CreateLevelTaskOptionInput } from "./input/createLevelTaskOption.input"
import { UpdateLevelTaskOptionInput } from "./input/updateLevelTaskOption.input"
import { Loaders } from "../shared/context/loaders"

@Resolver(() => LevelTaskOption)
export class LevelTaskOptionResolver {
  @Inject(() => LevelTaskOptionService)
  levelTaskService: LevelTaskOptionService
  @Inject(() => LevelTaskOptionRepository)
  levelTaskRepository: LevelTaskOptionRepository

  @Query(() => LevelTaskOption)
  getLevelTaskOption(
    @Arg("levelTaskId") levelTaskId: string,
  ): Promise<LevelTaskOption> {
    return this.levelTaskRepository.findById(levelTaskId)
  }

  //TODO: Remove?
  @Query(() => [LevelTaskOption])
  getAllLevelTaskOptions(): Promise<LevelTaskOption[]> {
    return this.levelTaskRepository.findAll()
  }

  @Query(() => [LevelTaskOption])
  getAllLevelTaskOptionsByLevelId(
    @Arg("levelId") levelId: string,
  ): Promise<LevelTaskOption[]> {
    return this.levelTaskRepository.findAllByLevelId(levelId)
  }

  // TODO: @Authorized()
  @Mutation(() => LevelTaskOption)
  createLevelTaskOption(
    @Arg("data") data: CreateLevelTaskOptionInput,
  ): Promise<LevelTaskOption> {
    return this.levelTaskService.create(data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => LevelTaskOption, { nullable: true })
  updateLevelTaskOption(
    @Arg("levelTaskId") levelTaskId: string,
    @Arg("data") data: UpdateLevelTaskOptionInput,
  ): Promise<LevelTaskOption> {
    return this.levelTaskService.update(levelTaskId, data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => Boolean)
  destroyLevelTaskOption(
    @Arg("levelTaskId") levelTaskId: string,
  ): Promise<boolean> {
    return this.levelTaskService.destroy(levelTaskId)
  }

  // FIELD RESOLVERS
  @FieldResolver(() => [LevelTaskOption], { nullable: true })
  options(
    @Root() levelTaskOption: LevelTaskOption,
    @Loaders() { levelTaskOptionsLoader }: Loaders,
  ) {
    const options = levelTaskOptionsLoader.load(levelTaskOption.levelTaskId)
    // Return remaining options
    return options.then(res =>
      res.filter(task => task.id !== levelTaskOption.id),
    )
  }
}
