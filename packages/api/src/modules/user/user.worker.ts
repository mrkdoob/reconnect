import { Service, Inject } from "typedi"
import { UserService } from "./user.service"
import { Worker } from "../../lib/worker"
import { UserTaskService } from "../userTask/userTask.service"
import { GroupService } from "../group/group.service"
import { UserGroupMessageService } from "../userGroupMessage/userGroupMessage.service"
import { GroupMessageService } from "../groupMessage/groupMessage.service"

export type resetGroupUserTasks = {
  name: "resetGroupUserTasks"
  data: {}
}

export type resetMembersFinished = {
  name: "resetMembersFinished"
  data: {}
}

export type resetAllGroupOrders = {
  name: "resetAllGroupOrders"
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

export type JobType =
  | resetGroupUserTasks
  | resetAllGroupOrders
  | resetMembersFinished
  | resetAllUserGroupMessages
  | updateDailyMessage

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
        case "resetAllGroupOrders":
          this.userService.resetAllGroupOrders()
          return
        case "updateDailyMessage":
          this.groupMessageService.updateDailyMessage()
          return
        default:
          return
      }
    })
  }
}
