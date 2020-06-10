import { createParamDecorator } from "type-graphql"

import { groupMembersLoader } from "../../group/group.loader"
import {
  userTasksLoader,
  userGroupsLoader,
  userCourseLoader,
  userLevelLoader,
  userGroupMessageLoader,
  userDayRewardLoader,
  userLoader,
  activeUserCourseLoader,
  userBoosterLoader,
} from "../../user/user.loader"
import {
  levelsLoader,
  groupsLoader,
  courseDayRewardsLoader,
  mentorLoader,
} from "../../course/course.loader"
import { levelTasksLoader } from "../../level/level.loader"
import { courseLoader } from "../../userCourse/userCourse.loader"
import { levelLoader } from "../../userLevel/userLevel.loader"
import { levelTaskLoader } from "../../userTask/userTask.loader"
import { groupMessageLoader } from "../../userGroupMessage/userGroupMessage.loader"
import { courseDayRewardLoader } from "../../userDayReward/userDayReward.loader"
import { levelTaskOptionsLoader } from "../../levelTask/levelTask.loader"
import { optionLoader } from "../../levelTaskOption/levelTaskOption.loader"
import { messageLoader } from "../../message/message.loader"
import { petLoader } from "../../pet/pet.loader"
import { activeUserPetLoader } from "../../userPet/userPet.loader"

export interface Loaders {
  userLoader: ReturnType<typeof userLoader>
  groupMembersLoader: ReturnType<typeof groupMembersLoader>
  userTasksLoader: ReturnType<typeof userTasksLoader>
  userGroupsLoader: ReturnType<typeof userGroupsLoader>
  userCourseLoader: ReturnType<typeof userCourseLoader>
  activeUserCourseLoader: ReturnType<typeof activeUserCourseLoader>
  userBoosterLoader: ReturnType<typeof userBoosterLoader>
  userLevelLoader: ReturnType<typeof userLevelLoader>
  userDayRewardLoader: ReturnType<typeof userDayRewardLoader>
  activeUserPetLoader: ReturnType<typeof activeUserPetLoader>

  courseLoader: ReturnType<typeof courseLoader>
  groupsLoader: ReturnType<typeof groupsLoader>

  levelLoader: ReturnType<typeof levelLoader>
  levelsLoader: ReturnType<typeof levelsLoader>
  levelTasksLoader: ReturnType<typeof levelTasksLoader>
  levelTaskLoader: ReturnType<typeof levelTaskLoader>
  levelTaskOptionsLoader: ReturnType<typeof levelTaskOptionsLoader>
  optionLoader: ReturnType<typeof optionLoader>

  courseDayRewardLoader: ReturnType<typeof courseDayRewardLoader>
  courseDayRewardsLoader: ReturnType<typeof courseDayRewardsLoader>
  mentorLoader: ReturnType<typeof mentorLoader>

  groupMessageLoader: ReturnType<typeof groupMessageLoader>
  userGroupMessageLoader: ReturnType<typeof userGroupMessageLoader>
  messageLoader: ReturnType<typeof messageLoader>

  petLoader: ReturnType<typeof petLoader>
}

export function Loaders() {
  return createParamDecorator<{ loaders: Loaders }>(async ({ context }) => {
    return context.loaders
  })
}
