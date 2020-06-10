import { Service, Inject } from "typedi"
import { UserService } from "./user.service"
import { Worker } from "../../lib/worker"
import { UserTaskService } from "../userTask/userTask.service"
import { GroupService } from "../group/group.service"
import { UserGroupMessageService } from "../userGroupMessage/userGroupMessage.service"
import { GroupMessageService } from "../groupMessage/groupMessage.service"
import { UserResolver } from "./user.resolver"
import { ONE_DAY } from "../../lib/times"
import { UserBoosterService } from "../userBooster/userBooster.service"

export type resetGroupUserTasks = {
  name: "resetGroupUserTasks"
  data: {}
}

export type resetMembersFinished = {
  name: "resetMembersFinished"
  data: {}
}

export type resetAllGroupOrdersAndSetPetLifes = {
  name: "resetAllGroupOrdersAndSetPetLifes"
  data: {}
}

export type resetAllUserGroupMessages = {
  name: "resetAllUserGroupMessages"
  data: {}
}

export type updateDailyMessage = {
  name: "updateDailyMessage"
  data: {}
}

export type repeatDaily = {
  name: "repeatDaily"
  data: {}
}

export type giveAllBoosters = {
  name: "giveAllBoosters"
  data: {}
}

export type JobType =
  | resetGroupUserTasks
  | resetAllGroupOrdersAndSetPetLifes
  | resetMembersFinished
  | resetAllUserGroupMessages
  | updateDailyMessage
  | repeatDaily
  | giveAllBoosters

const QUEUE = "USER"
// new QueueScheduler(QUEUE, { connection: redis })
@Service()
export class UserWorker extends Worker<JobType> {
  constructor() {
    super(QUEUE)
  }
  @Inject(() => UserService)
  userService: UserService
  @Inject(() => UserTaskService)
  userTaskService: UserTaskService
  @Inject(() => GroupService)
  groupService: GroupService
  @Inject(() => UserGroupMessageService)
  userGroupMessageService: UserGroupMessageService
  @Inject(() => GroupMessageService)
  groupMessageService: GroupMessageService
  @Inject(() => UserResolver)
  userResolver: UserResolver
  @Inject(() => UserBoosterService)
  userBoosterService: UserBoosterService

  async work() {
    this.runJob(async (job: JobType) => {
      switch (job.name) {
        case "resetGroupUserTasks":
          this.userTaskService.resetAllUserTasks()
          return
        case "resetMembersFinished":
          this.groupService.resetMembersFinished()
          return
        case "resetAllUserGroupMessages":
          this.userGroupMessageService.resetAllUserGroupMessages()
          return
        case "resetAllGroupOrdersAndSetPetLifes":
          this.userService.resetAllGroupOrdersAndSetPetLifes()
          return
        case "updateDailyMessage":
          this.groupMessageService.updateDailyMessage()
          return
        case "repeatDaily":
          this.userResolver.dailyReset(ONE_DAY, true)
          return
        case "giveAllBoosters":
          this.userBoosterService.giveAllBoosters()
          return
        default:
          return
      }
    })
  }
}
