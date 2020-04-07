import { Resolver, Query, Mutation, Arg } from "type-graphql"

import { Inject } from "typedi"
import { Option } from "./option.entity"
import { OptionService } from "./option.service"
import { OptionRepository } from "./option.repository"
import { CreateOptionInput } from "./input/createOption.input"
import { UpdateOptionInput } from "./input/updateOption.input"

@Resolver(() => Option)
export class OptionResolver {
  @Inject(() => OptionService)
  optionService: OptionService
  @Inject(() => OptionRepository)
  optionRepository: OptionRepository

  @Query(() => Option)
  getOption(@Arg("optionId") optionId: string): Promise<Option> {
    return this.optionRepository.findById(optionId)
  }

  @Query(() => [Option])
  getAllOptions(): Promise<Option[]> {
    return this.optionRepository.findAll()
  }

  // TODO: @Authorized()
  @Mutation(() => Option)
  createOption(@Arg("data") data: CreateOptionInput): Promise<Option> {
    return this.optionService.create(data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => Option, { nullable: true })
  updateOption(
    @Arg("optionId") optionId: string,
    @Arg("data") data: UpdateOptionInput,
  ): Promise<Option> {
    return this.optionService.update(optionId, data)
  }

  // TODO: @Authorized(["admin"])
  @Mutation(() => Boolean)
  destroyOption(@Arg("optionId") optionId: string): Promise<boolean> {
    return this.optionService.destroy(optionId)
  }
}
