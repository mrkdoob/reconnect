import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql"

import { Group } from "./group.entity"

import { Loaders } from "../shared/context/loaders"
import { Inject } from "typedi"

import { User } from "../user/user.entity"
import { GroupService } from "./group.service"
import { GroupRepository } from "./group.repository"
import { CreateGroupInput } from "./input/createGroup.input"
import { UpdateGroupInput } from "./input/updateGroup.input"

@Resolver(() => Group)
export class GroupResolver {
  @Inject(() => GroupService)
  groupService: GroupService
  @Inject(() => GroupRepository)
  groupRepository: GroupRepository

  @Query(() => Group)
  group(@Arg("groupId") groupId: string): Promise<Group> {
    return this.groupRepository.findById(groupId)
  }

  @Query(() => [Group])
  groups(): Promise<Group[]> {
    return this.groupRepository.findAll()
  }

  // @Authorized()  TODO: Authorized admin
  @Mutation(() => Group)
  createGroup(@Arg("data") data: CreateGroupInput): Promise<Group> {
    return this.groupService.create(data)
  }

  // @Authorized(["admin"])
  @Mutation(() => Group, { nullable: true })
  updateGroup(
    @Arg("groupId") groupId: string,
    @Arg("data") data: UpdateGroupInput,
  ): Promise<Group> {
    return this.groupService.update(groupId, data)
  }

  // @Authorized(["admin"])
  @Mutation(() => Boolean, { nullable: true })
  destroyGroup(@Arg("groupId") groupId: string): Promise<boolean> {
    return this.groupService.destroy(groupId)
  }

  // FIELD RESOLVERS

  @FieldResolver(() => [User], { nullable: true })
  users(@Root() group: Group, @Loaders() { groupMembersLoader }: Loaders) {
    return groupMembersLoader.load(group.id)
  }
}
