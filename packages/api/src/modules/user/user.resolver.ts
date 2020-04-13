import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Authorized,
  FieldResolver,
  Root,
} from "type-graphql"

import { createToken, decryptToken } from "../../lib/jwt"

import { User } from "./user.entity"
import { UserService } from "./user.service"

import { ResetPasswordInput } from "./inputs/resetPassword.input"
import { UserRepository } from "./user.repository"

import { Loaders } from "../shared/context/loaders"
import { UserCourse } from "../userCourse/userCourse.entity"
import { Group } from "../group/group.entity"
import { Inject } from "typedi"
import {
  UpdateInput,
  CompleteMeInput,
  EndMyCourseInput,
  StartMyCourseInput,
  RegisterInput,
} from "./user.input"
import { LoginInput } from "./user.input"
import { AuthResponse } from "./responses/auth.response"
import { CurrentUser } from "../shared/context/currentUser"
import { UserLevel } from "../userLevel/userLevel.entity"
import { UserTask } from "../userTask/userTask.entity"
import { UserWorker } from "./user.worker"
import { UserGroupMessage } from "../userGroupMessage/userGroupMessage.entity"
import { UserDayReward } from "../userDayReward/userDayReward.entity"
import { GroupService } from "../group/group.service"
import { UserLevelService } from "../userLevel/userLevel.service"
import { UserDayRewardService } from "../userDayReward/userDayReward.service"
import { UserGroupMessageService } from "../userGroupMessage/userGroupMessage.service"
import { UserCourseService } from "../userCourse/userCourse.service"

@Resolver(() => User)
export class UserResolver {
  @Inject(() => UserService)
  userService: UserService
  @Inject(() => GroupService)
  groupService: GroupService
  @Inject(() => UserLevelService)
  userLevelService: UserLevelService
  @Inject(() => UserDayRewardService)
  userDayRewardService: UserDayRewardService
  @Inject(() => UserGroupMessageService)
  userGroupMessageService: UserGroupMessageService
  @Inject(() => UserCourseService)
  userCourseService: UserCourseService
  @Inject(() => UserRepository)
  userRepository: UserRepository
  @Inject(() => UserWorker)
  userWorker: UserWorker

  @Query(() => Boolean)
  async dailyReset(
    @Arg("delay") delay: number,
    @Arg("repeatDaily") repeatDaily?: boolean,
  ) {
    console.log("Daily reset delay: " + delay)
    this.userWorker.addJob({ name: "resetGroupUserTasks", data: {} }, { delay })
    this.userWorker.addJob(
      { name: "resetMembersFinished", data: {} },
      { delay },
    )
    this.userWorker.addJob({ name: "resetAllGroupOrders", data: {} }, { delay })
    this.userWorker.addJob(
      { name: "resetAllUserGroupMessages", data: {} },
      { delay },
    )
    this.userWorker.addJob({ name: "updateDailyMessage", data: {} }, { delay })

    repeatDaily &&
      this.userWorker.addJob({ name: "repeatDaily", data: {} }, { delay })

    return true
  }

  // TODO:  @Authorized()
  @Query(() => User, { nullable: true })
  async getUser(@Arg("userId") userId: string): Promise<User> {
    return this.userRepository.findById(userId)
  }

  // ME
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@CurrentUser() currentUser: User): Promise<User> {
    await this.userRepository.findById(currentUser.id)
    return currentUser
  }

  // UPDATE ME
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async updateMe(
    @CurrentUser() currentUser: User,
    @Arg("data") data: UpdateInput,
  ): Promise<User> {
    return this.userService.update(currentUser.id, data)
  }

  @Mutation(() => AuthResponse)
  async login(@Arg("data") data: LoginInput): Promise<AuthResponse> {
    const user = await this.userService.login(data)
    const token = this.userService.createAuthToken(user)
    return { user, token }
  }

  @Mutation(() => AuthResponse)
  async register(@Arg("data") data: RegisterInput): Promise<AuthResponse> {
    const user = await this.userService.create(data)
    const token = this.userService.createAuthToken(user)
    return { user, token }
  }

  // LOGOUT
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  logout(): boolean {
    return true
  }

  // FORGOT PASSWORD
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email)
    if (user) {
      // const token = createToken({ id: user.id })

      createToken({ id: user.id })
      // TODO:
      // this.userMailer.sendResetPasswordLink(user, token)
    }
    return true
  }

  // RESET PASSWORD
  @Mutation(() => Boolean)
  async resetPassword(@Arg("data") data: ResetPasswordInput): Promise<boolean> {
    const payload = decryptToken<{ id: string }>(data.token)
    /// TODO: catch error and handle error message
    await this.userService.update(payload.id, { password: data.password })
    return true
  }

  // COMPLETED DAILY TASKS
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async completeMe(@CurrentUser() currentUser: User): Promise<User> {
    let group
    // userLevelService returns boolean true if last level
    const userLevel = await this.userLevelService.updateDayProgress(
      currentUser.id,
    )
    if (!userLevel.level.isLast) {
      group = await this.groupService.completeMember(currentUser.groupId) // Don't update group score if last level
    }
    const data: CompleteMeInput = {
      groupOrder: group?.groupMembersFinished || 0,
    }
    return this.userService.update(currentUser.id, data)
  }

  // LEAVE GROUP
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async leaveGroup(@CurrentUser() currentUser: User): Promise<User> {
    const data: EndMyCourseInput = { groupOrder: 0, groupId: null }
    return await this.userService.update(currentUser.id, data)
  }

  // END COURSE
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async endMyCourse(@CurrentUser() currentUser: User) {
    const data: EndMyCourseInput = { groupOrder: 0, groupId: null }
    await this.groupService.endOfCourseSetFinalTreeCount(
      currentUser.groupId,
      currentUser.id,
    )
    await this.userLevelService.destroyByUserId(currentUser.id)
    await this.userDayRewardService.destroyByUserId(currentUser.id)
    await this.userGroupMessageService.destroyByUserId(currentUser.id)
    return await this.userService.update(currentUser.id, data)
  }

  // START COURSE
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async startMyCourse(
    @Arg("groupId") groupId: string,
    @Arg("courseId") courseId: string,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    const data: StartMyCourseInput = { groupId, groupOrder: 0 }
    const userId = currentUser.id
    await this.userCourseService.create({
      userId,
      courseId,
      isActive: true,
    })
    await this.userLevelService.createFirst(userId, courseId)
    await this.userDayRewardService.createFirstReward(userId)
    await this.userGroupMessageService.createFirst(userId, groupId, courseId)
    return this.userService.update(currentUser.id, data)
  }

  // FIELD RESOLVERS
  @FieldResolver(() => [UserTask], { nullable: true })
  tasks(@Root() task: UserTask, @Loaders() { userTasksLoader }: Loaders) {
    return userTasksLoader.load(task.id)
  }

  @FieldResolver(() => [UserCourse], { nullable: true })
  userCourse(@Root() user: User, @Loaders() { userCourseLoader }: Loaders) {
    // if (!userCourseLoader.load(user.id)) return null
    return userCourseLoader.load(user.id)
  }

  @FieldResolver(() => UserLevel, { nullable: true })
  userLevel(
    @Root() user: User,
    @Loaders() { userLevelLoader }: Loaders,
  ): Promise<UserLevel> {
    return userLevelLoader.load(user.id)
  }

  @FieldResolver(() => Group, { nullable: true })
  group(@Root() user: User, @Loaders() { userGroupsLoader }: Loaders) {
    if (!user.groupId) return null
    return userGroupsLoader.load(user.groupId)
  }

  @FieldResolver(() => UserGroupMessage, { nullable: true })
  async userGroupMessage(
    @Root() user: User,
    @Loaders() { userGroupMessageLoader }: Loaders,
  ) {
    return await userGroupMessageLoader.load(user.id)
  }

  @FieldResolver(() => UserDayReward, { nullable: true })
  userDayReward(
    @Root() user: User,
    @Loaders() { userDayRewardLoader }: Loaders,
  ) {
    return userDayRewardLoader.load(user.id)
  }
}
