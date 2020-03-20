import { Resolver, Query, Mutation, Arg } from "type-graphql"

import { Inject } from "typedi"

import { UserResolver } from "../user/user.resolver"

import { CreateMessageInput } from "./input/createMessage.input"
import { UpdateMessageInput } from "./input/updateMessage.input"
import { MessageService } from "./message.service"
import { Message } from "./message.entity"
import { MessageRepository } from "./message.repository"

@Resolver(() => Message)
export class MessageResolver {
  @Inject(() => MessageService)
  messageService: MessageService
  @Inject(() => MessageRepository)
  messageRepository: MessageRepository

  @Inject(() => UserResolver)
  UserResolver: UserResolver

  @Query(() => Message)
  getMessage(@Arg("messageId") messageId: string): Promise<Message> {
    return this.messageRepository.findById(messageId)
  }

  //TODO: Remove
  @Query(() => [Message])
  allMessages(): Promise<Message[]> {
    return this.messageRepository.findAll()
  }

  // @Authorized()  TODO: Authorized
  @Mutation(() => Message)
  createMessage(@Arg("data") data: CreateMessageInput): Promise<Message> {
    return this.messageService.create(data)
  }

  // TODO: @Authorized()
  @Mutation(() => Message, { nullable: true })
  updateMessage(
    @Arg("messageId") messageId: string,
    @Arg("data") data: UpdateMessageInput,
  ): Promise<Message> {
    return this.messageService.update(messageId, data)
  }

  // TODO: @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyMessage(@Arg("messageId") messageId: string): Promise<boolean> {
    return this.messageService.destroy(messageId)
  }
}
