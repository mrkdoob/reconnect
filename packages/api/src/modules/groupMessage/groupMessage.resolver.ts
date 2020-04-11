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

import { CreateGroupMessageInput } from "./input/createGroupMessage.input"
import { UpdateGroupMessageInput } from "./input/updateGroupMessage.input"
import { GroupMessageService } from "./groupMessage.service"
import { GroupMessage } from "./groupMessage.entity"
import { GroupMessageRepository } from "./groupMessage.repository"
import { Message } from "../message/message.entity"
import { Loaders } from "../shared/context/loaders"

@Resolver(() => GroupMessage)
export class GroupMessageResolver {
  @Inject(() => GroupMessageService)
  groupMessageService: GroupMessageService
  @Inject(() => GroupMessageRepository)
  groupMessageRepository: GroupMessageRepository

  @Inject(() => UserResolver)
  UserResolver: UserResolver

  @Query(() => Boolean)
  async testUpdateDailyMessage() {
    this.groupMessageService.updateDailyMessage()
    return true
  }

  @Query(() => GroupMessage)
  getGroupMessage(
    @Arg("groupMessageId") groupMessageId: string,
  ): Promise<GroupMessage> {
    return this.groupMessageRepository.findById(groupMessageId)
  }

  //TODO: Remove
  @Query(() => [GroupMessage])
  allGroupMessages(): Promise<GroupMessage[]> {
    return this.groupMessageRepository.findAll()
  }

  // @Authorized()  TODO: Authorized
  @Mutation(() => GroupMessage)
  createGroupMessage(
    @Arg("data") data: CreateGroupMessageInput,
  ): Promise<GroupMessage> {
    return this.groupMessageService.create(data)
  }

  // TODO: @Authorized()
  @Mutation(() => GroupMessage, { nullable: true })
  updateGroupMessage(
    @Arg("groupMessageId") groupMessageId: string,
    @Arg("data") data: UpdateGroupMessageInput,
  ): Promise<GroupMessage> {
    return this.groupMessageService.update(groupMessageId, data)
  }

  // TODO: @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyGroupMessage(
    @Arg("groupMessageId") groupMessageId: string,
  ): Promise<boolean> {
    return this.groupMessageService.destroy(groupMessageId)
  }

  // TODO: Use for continues programs or something. Far future feat
  // @FieldResolver(() => Message, { nullable: true })
  // message(
  //   @Root() groupMessage: GroupMessage,
  //   @Loaders() { messageLoader }: Loaders,
  // ) {
  //   return messageLoader.load(groupMessage.messageId)
  // }
}
