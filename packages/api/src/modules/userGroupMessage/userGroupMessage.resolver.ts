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

import { CreateUserGroupMessageInput } from "./input/createUserGroupMessage.input"
import { UpdateUserGroupMessageInput } from "./input/updateUserGroupMessage.input"
import { UserGroupMessageService } from "./userGroupMessage.service"
import { Loaders } from "../shared/context/loaders"
import { UserGroupMessage } from "./userGroupMessage.entity"
import { UserGroupMessageRepository } from "./userGroupMessage.repository"
import { GroupMessage } from "../groupMessage/groupMessage.entity"
import { Message } from "../message/message.entity"
import { MessageRepository } from "../message/message.repository"

@Resolver(() => UserGroupMessage)
export class UserGroupMessageResolver {
  @Inject(() => UserGroupMessageService)
  userGroupMessageService: UserGroupMessageService
  @Inject(() => UserGroupMessageRepository)
  userGroupMessageRepository: UserGroupMessageRepository
  @Inject(() => MessageRepository)
  messageRepository: MessageRepository

  @Inject(() => UserResolver)
  UserResolver: UserResolver

  // TODO: Remove
  @Query(() => Boolean)
  async testAllMessageReset() {
    this.userGroupMessageService.resetAllUserGroupMessages()
    return true
  }

  @Query(() => UserGroupMessage)
  getUserGroupMessage(
    @Arg("userGroupMessageId") userGroupMessageId: string,
  ): Promise<UserGroupMessage> {
    return this.userGroupMessageRepository.findById(userGroupMessageId)
  }

  //TODO: Remove
  @Query(() => [UserGroupMessage])
  allUserGroupMessages(): Promise<UserGroupMessage[]> {
    return this.userGroupMessageRepository.findAll()
  }

  // @Authorized()  TODO: Authorized
  @Mutation(() => UserGroupMessage)
  createUserGroupMessage(
    @Arg("data") data: CreateUserGroupMessageInput,
  ): Promise<UserGroupMessage> {
    return this.userGroupMessageService.create(data)
  }

  // TODO: @Authorized()
  @Mutation(() => UserGroupMessage, { nullable: true })
  async updateUserGroupMessage(
    @Arg("userGroupMessageId") userGroupMessageId: string,
    @Arg("data") data: UpdateUserGroupMessageInput,
  ): Promise<UserGroupMessage> {
    return this.userGroupMessageService.update(userGroupMessageId, data)
  }

  // TODO: @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyUserGroupMessage(
    @Arg("userGroupMessageId") userGroupMessageId: string,
  ): Promise<boolean> {
    return this.userGroupMessageService.destroy(userGroupMessageId)
  }

  // FIELD RESOLVERS
  @FieldResolver(() => GroupMessage, { nullable: true })
  groupMessage(
    @Root() userGroupMessage: UserGroupMessage,
    @Loaders() { groupMessageLoader }: Loaders,
  ) {
    return groupMessageLoader.load(userGroupMessage.groupMessageId)
  }

  @FieldResolver(() => Message, { nullable: true })
  message(
    @Root() groupMessage: GroupMessage,
    @Loaders() { messageLoader }: Loaders,
  ) {
    return messageLoader.load(groupMessage.messageId)
  }
}
