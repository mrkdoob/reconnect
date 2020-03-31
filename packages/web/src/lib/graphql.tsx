import gql from "graphql-tag.macro"
import * as ApolloReactCommon from "@apollo/client"
import * as ApolloReactHooks from "@apollo/client"
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export type AuthResponse = {
  __typename?: "AuthResponse"
  user: User
  token: Scalars["String"]
}

export type BaseEntity = {
  __typename?: "BaseEntity"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type BulkSignedResponse = {
  __typename?: "BulkSignedResponse"
  url: Scalars["String"]
  key: Scalars["String"]
}

export type CompleteMeInput = {
  groupOrder?: Maybe<Scalars["Float"]>
}

export type Course = {
  __typename?: "Course"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  name: Scalars["String"]
  slug?: Maybe<Scalars["String"]>
  category: Scalars["String"]
  description: Scalars["String"]
  fullDescription?: Maybe<Scalars["String"]>
  duration?: Maybe<Scalars["String"]>
  benefits?: Maybe<Scalars["String"]>
  cover?: Maybe<Scalars["String"]>
  levels?: Maybe<Array<Level>>
  groups?: Maybe<Array<Group>>
  courseDayRewards?: Maybe<Array<CourseDayReward>>
}

export type CourseDayReward = {
  __typename?: "CourseDayReward"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  order: Scalars["Int"]
  description: Scalars["String"]
  pictureUrl?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
  courseId?: Maybe<Scalars["String"]>
}

export type CreateCourseDayRewardInput = {
  order: Scalars["Float"]
  description: Scalars["String"]
  videoUrl?: Maybe<Scalars["String"]>
  pictureUrl?: Maybe<Scalars["String"]>
  courseId: Scalars["String"]
}

export type CreateCourseInput = {
  name: Scalars["String"]
  category: Scalars["String"]
  description: Scalars["String"]
  fullDescription: Scalars["String"]
  duration?: Maybe<Scalars["String"]>
  benefits?: Maybe<Scalars["String"]>
  cover: Scalars["String"]
  endText?: Maybe<Scalars["String"]>
}

export type CreateGroupInput = {
  name: Scalars["String"]
  rewardCount: Scalars["Float"]
  startDate?: Maybe<Scalars["DateTime"]>
  coinsForReward: Scalars["Float"]
  coinRewardAmount: Scalars["Float"]
  endDate: Scalars["DateTime"]
  courseId: Scalars["String"]
  rewardType: Scalars["String"]
}

export type CreateGroupMessageInput = {
  groupId: Scalars["String"]
  messageId?: Maybe<Scalars["String"]>
}

export type CreateLevelInput = {
  levelNumber: Scalars["Float"]
  maxProgressDays: Scalars["Float"]
  title: Scalars["String"]
  cover: Scalars["String"]
  rewardText: Scalars["String"]
  rewardDescription: Scalars["String"]
  videoUrl?: Maybe<Scalars["String"]>
  rewardUrl?: Maybe<Scalars["String"]>
  courseId: Scalars["String"]
  isLast: Scalars["Boolean"]
}

export type CreateLevelTaskInput = {
  order: Scalars["Float"]
  description: Scalars["String"]
  fullDescription: Scalars["String"]
  videoUrl: Scalars["String"]
  levelId: Scalars["String"]
}

export type CreateLevelTaskOptionInput = {
  order: Scalars["Float"]
  label: Scalars["String"]
  description: Scalars["String"]
  fullDescription: Scalars["String"]
  videoUrl: Scalars["String"]
  levelId: Scalars["String"]
}

export type CreateMessageInput = {
  message: Scalars["String"]
  order: Scalars["Float"]
  pictureUrl?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
}

export type CreateUserCourseInput = {
  courseId: Scalars["String"]
  isActive: Scalars["Boolean"]
  userId: Scalars["String"]
}

export type CreateUserGroupMessageInput = {
  groupMessageId: Scalars["String"]
  userId: Scalars["String"]
}

export type CreateUserLevelInput = {
  levelId: Scalars["String"]
  userId: Scalars["String"]
}

export type CreateUserTaskInput = {
  levelTaskId: Scalars["String"]
  userId: Scalars["String"]
  order: Scalars["Float"]
}

export type EndMyCourseInput = {
  groupOrder?: Maybe<Scalars["Float"]>
  groupId?: Maybe<Scalars["String"]>
}

export type Group = {
  __typename?: "Group"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  name: Scalars["String"]
  rewardCount: Scalars["Int"]
  oldRewardCount: Scalars["Int"]
  groupMembersFinished: Scalars["Int"]
  coinRewardAmount: Scalars["Int"]
  coinsForReward: Scalars["Int"]
  groupCoins: Scalars["Int"]
  rewardType: Scalars["String"]
  startDate?: Maybe<Scalars["DateTime"]>
  endDate?: Maybe<Scalars["DateTime"]>
  groupSize?: Maybe<Scalars["Int"]>
  courseId: Scalars["String"]
  users?: Maybe<Array<User>>
}

export type GroupMessage = {
  __typename?: "GroupMessage"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  rewardCount: Scalars["Int"]
  leftCoinsCount: Scalars["Int"]
  groupId: Scalars["String"]
  messageId?: Maybe<Scalars["String"]>
  message?: Maybe<Message>
}

export type Level = {
  __typename?: "Level"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  levelNumber: Scalars["Int"]
  maxProgressDays: Scalars["Int"]
  title: Scalars["String"]
  cover?: Maybe<Scalars["String"]>
  rewardText: Scalars["String"]
  rewardDescription: Scalars["String"]
  videoUrl?: Maybe<Scalars["String"]>
  rewardUrl?: Maybe<Scalars["String"]>
  isLast: Scalars["Boolean"]
  courseId?: Maybe<Scalars["String"]>
  levelTasks?: Maybe<Array<LevelTask>>
}

export type LevelTask = {
  __typename?: "LevelTask"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  order: Scalars["Int"]
  description: Scalars["String"]
  fullDescription?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
  levelId?: Maybe<Scalars["String"]>
  options?: Maybe<Array<LevelTaskOption>>
}

export type LevelTaskOption = {
  __typename?: "LevelTaskOption"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  order: Scalars["Int"]
  label: Scalars["String"]
  description: Scalars["String"]
  fullDescription?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
  levelTaskId?: Maybe<Scalars["String"]>
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Message = {
  __typename?: "Message"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  message: Scalars["String"]
  order: Scalars["Int"]
  pictureUrl?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
}

export type Mutation = {
  __typename?: "Mutation"
  createCourse: Course
  updateCourse?: Maybe<Course>
  destroyCourse: Scalars["Boolean"]
  createCourseDayReward: CourseDayReward
  updateCourseDayReward?: Maybe<CourseDayReward>
  destroyCourseDayReward: Scalars["Boolean"]
  createGroup: Group
  updateGroup?: Maybe<Group>
  destroyGroup?: Maybe<Scalars["Boolean"]>
  updateMe?: Maybe<User>
  login: AuthResponse
  register: AuthResponse
  logout?: Maybe<Scalars["Boolean"]>
  forgotPassword: Scalars["Boolean"]
  resetPassword: Scalars["Boolean"]
  completeMe?: Maybe<User>
  leaveGroup?: Maybe<User>
  endMyCourse?: Maybe<User>
  startMyCourse?: Maybe<User>
  createGroupMessage: GroupMessage
  updateGroupMessage?: Maybe<GroupMessage>
  destroyGroupMessage?: Maybe<Scalars["Boolean"]>
  createLevel: Level
  updateLevel?: Maybe<Level>
  destroyLevel: Scalars["Boolean"]
  createLevelTask: LevelTask
  updateLevelTask?: Maybe<LevelTask>
  destroyLevelTask: Scalars["Boolean"]
  createLevelTaskOption: LevelTaskOption
  updateLevelTaskOption?: Maybe<LevelTaskOption>
  destroyLevelTaskOption: Scalars["Boolean"]
  createMessage: Message
  updateMessage?: Maybe<Message>
  destroyMessage?: Maybe<Scalars["Boolean"]>
  getSignedS3Url?: Maybe<Scalars["String"]>
  getBulkSignedS3Url?: Maybe<Array<BulkSignedResponse>>
  createUserCourse: UserCourse
  updateUserCourse?: Maybe<UserCourse>
  destroyUserCourse: Scalars["Boolean"]
  createFirstUserDayReward: UserDayReward
  destroyUserDayReward?: Maybe<Scalars["Boolean"]>
  createUserGroupMessage: UserGroupMessage
  updateUserGroupMessage?: Maybe<UserGroupMessage>
  destroyUserGroupMessage?: Maybe<Scalars["Boolean"]>
  createUserLevel: UserLevel
  updateUserLevel?: Maybe<UserLevel>
  destroyUserLevel: Scalars["Boolean"]
  createUserTask: UserTask
  updateUserTask?: Maybe<UserTask>
  destroyUserTask?: Maybe<Scalars["Boolean"]>
}

export type MutationCreateCourseArgs = {
  data: CreateCourseInput
}

export type MutationUpdateCourseArgs = {
  data: UpdateCourseInput
  id: Scalars["String"]
}

export type MutationDestroyCourseArgs = {
  id: Scalars["String"]
}

export type MutationCreateCourseDayRewardArgs = {
  data: CreateCourseDayRewardInput
}

export type MutationUpdateCourseDayRewardArgs = {
  data: UpdateCourseDayRewardInput
  courseDayRewardId: Scalars["String"]
}

export type MutationDestroyCourseDayRewardArgs = {
  courseDayRewardId: Scalars["String"]
}

export type MutationCreateGroupArgs = {
  data: CreateGroupInput
}

export type MutationUpdateGroupArgs = {
  data: UpdateGroupInput
  groupId: Scalars["String"]
}

export type MutationDestroyGroupArgs = {
  groupId: Scalars["String"]
}

export type MutationUpdateMeArgs = {
  data: UpdateInput
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationRegisterArgs = {
  data: RegisterInput
}

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]
}

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput
}

export type MutationStartMyCourseArgs = {
  courseId: Scalars["String"]
  groupId: Scalars["String"]
}

export type MutationCreateGroupMessageArgs = {
  data: CreateGroupMessageInput
}

export type MutationUpdateGroupMessageArgs = {
  data: UpdateGroupMessageInput
  groupMessageId: Scalars["String"]
}

export type MutationDestroyGroupMessageArgs = {
  groupMessageId: Scalars["String"]
}

export type MutationCreateLevelArgs = {
  data: CreateLevelInput
}

export type MutationUpdateLevelArgs = {
  data: UpdateLevelInput
  levelId: Scalars["String"]
}

export type MutationDestroyLevelArgs = {
  levelId: Scalars["String"]
}

export type MutationCreateLevelTaskArgs = {
  data: CreateLevelTaskInput
}

export type MutationUpdateLevelTaskArgs = {
  data: UpdateLevelTaskInput
  levelTaskId: Scalars["String"]
}

export type MutationDestroyLevelTaskArgs = {
  levelTaskId: Scalars["String"]
}

export type MutationCreateLevelTaskOptionArgs = {
  data: CreateLevelTaskOptionInput
}

export type MutationUpdateLevelTaskOptionArgs = {
  data: UpdateLevelTaskOptionInput
  levelTaskId: Scalars["String"]
}

export type MutationDestroyLevelTaskOptionArgs = {
  levelTaskId: Scalars["String"]
}

export type MutationCreateMessageArgs = {
  data: CreateMessageInput
}

export type MutationUpdateMessageArgs = {
  data: UpdateMessageInput
  messageId: Scalars["String"]
}

export type MutationDestroyMessageArgs = {
  messageId: Scalars["String"]
}

export type MutationGetSignedS3UrlArgs = {
  data: S3SignedUrlInput
}

export type MutationGetBulkSignedS3UrlArgs = {
  data: S3BulkSignedUrlInput
}

export type MutationCreateUserCourseArgs = {
  data: CreateUserCourseInput
}

export type MutationUpdateUserCourseArgs = {
  data: UpdateUserCourseInput
  id: Scalars["String"]
}

export type MutationDestroyUserCourseArgs = {
  id: Scalars["String"]
}

export type MutationDestroyUserDayRewardArgs = {
  userDayRewardId: Scalars["String"]
}

export type MutationCreateUserGroupMessageArgs = {
  data: CreateUserGroupMessageInput
}

export type MutationUpdateUserGroupMessageArgs = {
  data: UpdateUserGroupMessageInput
  userGroupMessageId: Scalars["String"]
}

export type MutationDestroyUserGroupMessageArgs = {
  userGroupMessageId: Scalars["String"]
}

export type MutationCreateUserLevelArgs = {
  data: CreateUserLevelInput
}

export type MutationUpdateUserLevelArgs = {
  data: UpdateUserLevelInput
  userLevelId: Scalars["String"]
}

export type MutationDestroyUserLevelArgs = {
  userLevelId: Scalars["String"]
}

export type MutationCreateUserTaskArgs = {
  data: CreateUserTaskInput
}

export type MutationUpdateUserTaskArgs = {
  data: UpdateUserTaskInput
  taskId: Scalars["String"]
}

export type MutationDestroyUserTaskArgs = {
  taskId: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  getCourse: Course
  getAllCourses: Array<Course>
  courseBySlug: Course
  getCourseDayReward: CourseDayReward
  getAllCourseDayRewards: Array<CourseDayReward>
  group: Group
  groups: Array<Group>
  testAllTasksReset: Scalars["Boolean"]
  getUser?: Maybe<User>
  me?: Maybe<User>
  testUpdateDailyMessage: Scalars["Boolean"]
  getGroupMessage: GroupMessage
  allGroupMessages: Array<GroupMessage>
  getLevel: Level
  getAllLevels: Array<Level>
  getLevelTask: LevelTask
  getAllLevelTasks: Array<LevelTask>
  getAllLevelTasksByLevelId: Array<LevelTask>
  getLevelTaskOption: LevelTaskOption
  getAllLevelTaskOptions: Array<LevelTaskOption>
  getAllLevelTaskOptionsByLevelId: Array<LevelTaskOption>
  getMessage: Message
  allMessages: Array<Message>
  getUserCourse: UserCourse
  myDayReward?: Maybe<UserDayReward>
  testAllMessageReset: Scalars["Boolean"]
  getUserGroupMessage: UserGroupMessage
  allUserGroupMessages: Array<UserGroupMessage>
  getUserLevel: UserLevel
  getAllUserLevels: Array<UserLevel>
  getUserTask: UserTask
  allUserTasks: Array<UserTask>
}

export type QueryGetCourseArgs = {
  courseId: Scalars["String"]
}

export type QueryCourseBySlugArgs = {
  slug: Scalars["String"]
}

export type QueryGetCourseDayRewardArgs = {
  courseDayRewardId: Scalars["String"]
}

export type QueryGroupArgs = {
  groupId: Scalars["String"]
}

export type QueryGetUserArgs = {
  userId: Scalars["String"]
}

export type QueryGetGroupMessageArgs = {
  groupMessageId: Scalars["String"]
}

export type QueryGetLevelArgs = {
  levelId: Scalars["String"]
}

export type QueryGetLevelTaskArgs = {
  levelTaskId: Scalars["String"]
}

export type QueryGetAllLevelTasksByLevelIdArgs = {
  levelId: Scalars["String"]
}

export type QueryGetLevelTaskOptionArgs = {
  levelTaskId: Scalars["String"]
}

export type QueryGetAllLevelTaskOptionsByLevelIdArgs = {
  levelId: Scalars["String"]
}

export type QueryGetMessageArgs = {
  messageId: Scalars["String"]
}

export type QueryGetUserCourseArgs = {
  userProgressId: Scalars["String"]
}

export type QueryGetUserGroupMessageArgs = {
  userGroupMessageId: Scalars["String"]
}

export type QueryGetUserLevelArgs = {
  userLevelId: Scalars["String"]
}

export type QueryGetUserTaskArgs = {
  taskId: Scalars["String"]
}

export type RegisterInput = {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type ResetPasswordInput = {
  password: Scalars["String"]
  token: Scalars["String"]
}

export type S3BulkSignedUrlInput = {
  files: Array<S3SignedUrlInput>
}

export type S3SignedUrlInput = {
  key: Scalars["String"]
  fileType: Scalars["String"]
}

export type StartMyCourseInput = {
  groupOrder?: Maybe<Scalars["Float"]>
  groupId?: Maybe<Scalars["String"]>
}

export type UpdateCourseDayRewardInput = {
  order?: Maybe<Scalars["Float"]>
  description?: Maybe<Scalars["String"]>
  pictureUrl?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
}

export type UpdateCourseInput = {
  name?: Maybe<Scalars["String"]>
  category?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  fullDescription?: Maybe<Scalars["String"]>
  duration?: Maybe<Scalars["String"]>
  benefits?: Maybe<Scalars["String"]>
  cover?: Maybe<Scalars["String"]>
  endText?: Maybe<Scalars["String"]>
}

export type UpdateGroupInput = {
  rewardCount?: Maybe<Scalars["Float"]>
  oldRewardCount?: Maybe<Scalars["Float"]>
  courseId?: Maybe<Scalars["String"]>
  groupsSize?: Maybe<Scalars["Float"]>
  groupMembersFinished?: Maybe<Scalars["Float"]>
  qiForReward?: Maybe<Scalars["Float"]>
  qiRewardAmount?: Maybe<Scalars["Float"]>
  groupCoins?: Maybe<Scalars["Float"]>
  rewardType?: Maybe<Scalars["String"]>
}

export type UpdateGroupMessageInput = {
  messageId?: Maybe<Scalars["String"]>
  leftCoinsCount?: Maybe<Scalars["Float"]>
  rewardCount?: Maybe<Scalars["Float"]>
}

export type UpdateInput = {
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  groupId?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  groupOrder?: Maybe<Scalars["Float"]>
}

export type UpdateLevelInput = {
  levelNumber?: Maybe<Scalars["Float"]>
  maxProgressDays?: Maybe<Scalars["Float"]>
  title?: Maybe<Scalars["String"]>
  cover?: Maybe<Scalars["String"]>
  rewardText?: Maybe<Scalars["String"]>
  rewardDescription?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
  rewardUrl?: Maybe<Scalars["String"]>
  isLast?: Maybe<Scalars["Boolean"]>
}

export type UpdateLevelTaskInput = {
  order?: Maybe<Scalars["Float"]>
  description?: Maybe<Scalars["String"]>
  fullDescription?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
}

export type UpdateLevelTaskOptionInput = {
  order?: Maybe<Scalars["Float"]>
  label?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  fullDescription?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
}

export type UpdateMessageInput = {
  message?: Maybe<Scalars["String"]>
  pictureUrl?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Float"]>
}

export type UpdateUserCourseInput = {
  courseId?: Maybe<Scalars["String"]>
  isActive?: Maybe<Scalars["Boolean"]>
  finishedRewardCount?: Maybe<Scalars["Float"]>
}

export type UpdateUserGroupMessageInput = {
  groupMessageId?: Maybe<Scalars["String"]>
  isRead?: Maybe<Scalars["Boolean"]>
  showOption?: Maybe<Scalars["Boolean"]>
}

export type UpdateUserLevelInput = {
  completed?: Maybe<Scalars["Boolean"]>
  progressDay?: Maybe<Scalars["Float"]>
  levelId?: Maybe<Scalars["String"]>
}

export type UpdateUserTaskInput = {
  completed?: Maybe<Scalars["Boolean"]>
  levelTaskId?: Maybe<Scalars["String"]>
  levelTaskOptionId?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Float"]>
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  email: Scalars["String"]
  password: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  avatar?: Maybe<Scalars["String"]>
  groupOrder: Scalars["Int"]
  groupId?: Maybe<Scalars["String"]>
  fullName?: Maybe<Scalars["String"]>
  url: Scalars["String"]
  tasks?: Maybe<Array<UserTask>>
  userCourse?: Maybe<Array<UserCourse>>
  userLevel?: Maybe<UserLevel>
  group?: Maybe<Group>
  userGroupMessage?: Maybe<UserGroupMessage>
  userDayReward?: Maybe<UserDayReward>
}

export type UserCourse = {
  __typename?: "UserCourse"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  courseId?: Maybe<Scalars["String"]>
  isActive: Scalars["Boolean"]
  finishedRewardCount?: Maybe<Scalars["Int"]>
  userId: Scalars["String"]
  course?: Maybe<Course>
}

export type UserDayReward = {
  __typename?: "UserDayReward"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  courseDayRewardId?: Maybe<Scalars["String"]>
  userId: Scalars["String"]
  courseDayReward?: Maybe<CourseDayReward>
}

export type UserGroupMessage = {
  __typename?: "UserGroupMessage"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  isRead: Scalars["Boolean"]
  showOption: Scalars["Boolean"]
  groupMessageId?: Maybe<Scalars["String"]>
  userId: Scalars["String"]
  groupMessage?: Maybe<GroupMessage>
}

export type UserLevel = {
  __typename?: "UserLevel"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  completed: Scalars["Boolean"]
  progressDay: Scalars["Int"]
  levelId?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  level?: Maybe<Level>
}

export type UserTask = {
  __typename?: "UserTask"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  completed: Scalars["Boolean"]
  levelTaskId?: Maybe<Scalars["String"]>
  levelTaskOptionId?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Int"]>
  userId: Scalars["String"]
  levelTask?: Maybe<LevelTask>
}

export type CourseItemFragment = { __typename?: "Course" } & Pick<
  Course,
  "id" | "name" | "cover" | "category" | "description" | "slug"
>

export type CourseLevelFragment = { __typename?: "Level" } & Pick<
  Level,
  "id" | "title" | "cover" | "levelNumber" | "maxProgressDays"
>

export type MyDailyRewardFragment = { __typename?: "UserDayReward" } & Pick<
  UserDayReward,
  "id"
> & {
    courseDayReward?: Maybe<
      { __typename?: "CourseDayReward" } & Pick<
        CourseDayReward,
        "id" | "description" | "pictureUrl" | "videoUrl"
      >
    >
  }

export type MyDayRewardQueryVariables = {}

export type MyDayRewardQuery = { __typename?: "Query" } & {
  myDayReward?: Maybe<{ __typename?: "UserDayReward" } & MyDailyRewardFragment>
}

export type GroupItemFragment = { __typename?: "Group" } & Pick<
  Group,
  "id" | "name" | "startDate" | "endDate" | "groupSize"
> & {
    users?: Maybe<
      Array<{ __typename?: "User" } & Pick<User, "id" | "fullName">>
    >
  }

export type LevelRewardFragment = { __typename?: "Level" } & Pick<
  Level,
  "id" | "title" | "cover" | "levelNumber" | "rewardText" | "rewardDescription"
> & {
    levelTasks?: Maybe<
      Array<{ __typename?: "LevelTask" } & LevelTaskItemFragment>
    >
  }

export type LevelItemFragment = { __typename?: "Level" } & Pick<
  Level,
  | "id"
  | "levelNumber"
  | "maxProgressDays"
  | "rewardUrl"
  | "rewardDescription"
  | "isLast"
>

export type EndMyCourseMutationVariables = {}

export type EndMyCourseMutation = { __typename?: "Mutation" } & {
  endMyCourse?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "groupId">>
}

export type LevelTaskOptionItemFragment = {
  __typename?: "LevelTaskOption"
} & Pick<
  LevelTaskOption,
  "id" | "order" | "label" | "description" | "fullDescription" | "videoUrl"
>

export type LevelTaskItemFragment = { __typename?: "LevelTask" } & Pick<
  LevelTask,
  "id" | "order" | "description" | "fullDescription" | "videoUrl"
> & {
    options?: Maybe<
      Array<
        { __typename?: "LevelTaskOption" } & Pick<
          LevelTaskOption,
          | "id"
          | "order"
          | "label"
          | "description"
          | "fullDescription"
          | "videoUrl"
        >
      >
    >
  }

export type GetSignedUrlMutationVariables = {
  data: S3SignedUrlInput
}

export type GetSignedUrlMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "getSignedS3Url"
>

export type UserGroupItemFragment = { __typename?: "Group" } & Pick<
  Group,
  | "id"
  | "name"
  | "rewardCount"
  | "oldRewardCount"
  | "groupMembersFinished"
  | "groupSize"
  | "coinsForReward"
  | "groupCoins"
  | "rewardType"
> & {
    users?: Maybe<Array<{ __typename?: "User" } & GroupUserTaskItemFragment>>
  }

export type GroupUserTaskItemFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "avatar" | "groupOrder"
>

export type UserInfoFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "email" | "firstName" | "lastName"
>

export type UserItemFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "email"
>

export type UserGroupMessageFragment = {
  __typename?: "UserGroupMessage"
} & Pick<UserGroupMessage, "id" | "isRead" | "showOption"> & {
    groupMessage?: Maybe<
      { __typename?: "GroupMessage" } & Pick<
        GroupMessage,
        "id" | "rewardCount" | "leftCoinsCount"
      > & {
          message?: Maybe<
            { __typename?: "Message" } & Pick<
              Message,
              "id" | "message" | "videoUrl" | "pictureUrl"
            >
          >
        }
    >
  }

export type UpdateUserGroupMessageMutationVariables = {
  userGroupMessageId: Scalars["String"]
  data: UpdateUserGroupMessageInput
}

export type UpdateUserGroupMessageMutation = { __typename?: "Mutation" } & {
  updateUserGroupMessage?: Maybe<
    { __typename?: "UserGroupMessage" } & Pick<
      UserGroupMessage,
      "isRead" | "showOption"
    >
  >
}

export type UserTaskItemFragment = { __typename?: "UserTask" } & Pick<
  UserTask,
  "id" | "completed" | "levelTaskId"
> & {
    levelTask?: Maybe<
      { __typename?: "LevelTask" } & Pick<
        LevelTask,
        "id" | "order" | "description" | "fullDescription" | "videoUrl"
      >
    >
  }

export type UpdateUserTaskMutationVariables = {
  taskId: Scalars["String"]
  data: UpdateUserTaskInput
}

export type UpdateUserTaskMutation = { __typename?: "Mutation" } & {
  updateUserTask?: Maybe<{ __typename?: "UserTask" } & UserTaskItemFragment>
}

export type MeFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "fullName" | "email" | "groupOrder" | "avatar"
> & {
    group?: Maybe<{ __typename?: "Group" } & UserGroupItemFragment>
    userLevel?: Maybe<{ __typename?: "UserLevel" } & Pick<UserLevel, "levelId">>
  }

export type MeQueryVariables = {}

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & MeFragment>
}

export type CourseFragment = { __typename?: "Course" } & Pick<
  Course,
  "fullDescription" | "duration" | "benefits"
> & {
    levels?: Maybe<Array<{ __typename?: "Level" } & CourseLevelFragment>>
  } & CourseItemFragment

export type GetCourseQueryVariables = {
  slug: Scalars["String"]
}

export type GetCourseQuery = { __typename?: "Query" } & {
  courseBySlug: { __typename?: "Course" } & CourseFragment
}

export type GetAllCoursesQueryVariables = {}

export type GetAllCoursesQuery = { __typename?: "Query" } & {
  getAllCourses: Array<{ __typename?: "Course" } & CourseItemFragment>
}

export type GetCurrentLevelRewardQueryVariables = {}

export type GetCurrentLevelRewardQuery = { __typename?: "Query" } & {
  me?: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        userLevel?: Maybe<
          { __typename?: "UserLevel" } & Pick<UserLevel, "id"> & {
              level?: Maybe<{ __typename?: "Level" } & LevelRewardFragment>
            }
        >
      }
  >
}

export type UserLevelItemFragment = { __typename?: "UserLevel" } & Pick<
  UserLevel,
  "id" | "completed" | "progressDay"
> & { level?: Maybe<{ __typename?: "Level" } & LevelItemFragment> }

export type MyDashboardFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "groupOrder"
> & {
    tasks?: Maybe<Array<{ __typename?: "UserTask" } & UserTaskItemFragment>>
    group?: Maybe<{ __typename?: "Group" } & UserGroupItemFragment>
    userLevel?: Maybe<{ __typename?: "UserLevel" } & UserLevelItemFragment>
    userGroupMessage?: Maybe<
      { __typename?: "UserGroupMessage" } & UserGroupMessageFragment
    >
  }

export type MyDashboardQueryVariables = {}

export type MyDashboardQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & MyDashboardFragment>
}

export type CompleteMeMutationVariables = {}

export type CompleteMeMutation = { __typename?: "Mutation" } & {
  completeMe?: Maybe<{ __typename?: "User" } & MyDashboardFragment>
}

export type GetCourseGroupsQueryVariables = {
  slug: Scalars["String"]
}

export type GetCourseGroupsQuery = { __typename?: "Query" } & {
  courseBySlug: { __typename?: "Course" } & Pick<Course, "id"> & {
      groups?: Maybe<Array<{ __typename?: "Group" } & GroupItemFragment>>
    }
}

export type StartMyCourseMutationVariables = {
  courseId: Scalars["String"]
  groupId: Scalars["String"]
}

export type StartMyCourseMutation = { __typename?: "Mutation" } & {
  startMyCourse?: Maybe<{ __typename?: "User" } & MyDashboardFragment>
}

export type GetLevelRewardQueryVariables = {
  levelId: Scalars["String"]
}

export type GetLevelRewardQuery = { __typename?: "Query" } & {
  getLevel: { __typename?: "Level" } & LevelRewardFragment
}

export type LoginMutationVariables = {
  data: LoginInput
}

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export type MyProgressFragment = { __typename?: "User" } & Pick<User, "id"> & {
    userLevel?: Maybe<{ __typename?: "UserLevel" } & MyLevelProgressFragment>
    userCourse?: Maybe<
      Array<
        { __typename?: "UserCourse" } & Pick<UserCourse, "id" | "isActive"> & {
            course?: Maybe<{ __typename?: "Course" } & MyCourseProgressFragment>
          }
      >
    >
  }

export type MyCourseProgressFragment = { __typename?: "Course" } & Pick<
  Course,
  "id"
> & { levels?: Maybe<Array<{ __typename?: "Level" } & CourseLevelFragment>> }

export type MyLevelProgressFragment = { __typename?: "UserLevel" } & Pick<
  UserLevel,
  "id" | "progressDay" | "completed"
> & {
    level?: Maybe<{ __typename?: "Level" } & Pick<Level, "id" | "levelNumber">>
  }

export type MyProgressQueryVariables = {}

export type MyProgressQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & MyProgressFragment>
}

export type RegisterMutationVariables = {
  data: RegisterInput
}

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export type MySettingsFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "lastName" | "email" | "avatar" | "groupId"
> & {
    userGroupMessage?: Maybe<
      { __typename?: "UserGroupMessage" } & Pick<
        UserGroupMessage,
        "id" | "showOption"
      >
    >
  }

export type MySettingsQueryVariables = {}

export type MySettingsQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & MySettingsFragment>
}

export type UpdateSettingsMutationVariables = {
  data: UpdateInput
}

export type UpdateSettingsMutation = { __typename?: "Mutation" } & {
  updateMe?: Maybe<{ __typename?: "User" } & MySettingsFragment>
}

export const MyDailyRewardFragmentDoc = gql`
  fragment MyDailyReward on UserDayReward {
    id
    courseDayReward {
      id
      description
      pictureUrl
      videoUrl
    }
  }
`
export const GroupItemFragmentDoc = gql`
  fragment GroupItem on Group {
    id
    name
    startDate
    endDate
    groupSize
    users {
      id
      fullName
    }
  }
`
export const LevelTaskItemFragmentDoc = gql`
  fragment LevelTaskItem on LevelTask {
    id
    order
    description
    fullDescription
    videoUrl
    options {
      id
      order
      label
      description
      fullDescription
      videoUrl
    }
  }
`
export const LevelRewardFragmentDoc = gql`
  fragment LevelReward on Level {
    id
    title
    cover
    levelNumber
    rewardText
    rewardDescription
    levelTasks {
      ...LevelTaskItem
    }
  }
  ${LevelTaskItemFragmentDoc}
`
export const LevelTaskOptionItemFragmentDoc = gql`
  fragment LevelTaskOptionItem on LevelTaskOption {
    id
    order
    label
    description
    fullDescription
    videoUrl
  }
`
export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    email
    firstName
    lastName
  }
`
export const UserItemFragmentDoc = gql`
  fragment UserItem on User {
    id
    firstName
    email
  }
`
export const GroupUserTaskItemFragmentDoc = gql`
  fragment GroupUserTaskItem on User {
    id
    firstName
    avatar
    groupOrder
  }
`
export const UserGroupItemFragmentDoc = gql`
  fragment UserGroupItem on Group {
    id
    name
    rewardCount
    oldRewardCount
    groupMembersFinished
    groupSize
    coinsForReward
    groupCoins
    rewardType
    users {
      ...GroupUserTaskItem
    }
  }
  ${GroupUserTaskItemFragmentDoc}
`
export const MeFragmentDoc = gql`
  fragment Me on User {
    id
    fullName
    email
    groupOrder
    avatar
    group {
      ...UserGroupItem
    }
    userLevel {
      levelId
    }
  }
  ${UserGroupItemFragmentDoc}
`
export const CourseLevelFragmentDoc = gql`
  fragment CourseLevel on Level {
    id
    title
    cover
    levelNumber
    maxProgressDays
  }
`
export const CourseItemFragmentDoc = gql`
  fragment CourseItem on Course {
    id
    name
    cover
    category
    description
    slug
  }
`
export const CourseFragmentDoc = gql`
  fragment Course on Course {
    levels {
      ...CourseLevel
    }
    fullDescription
    duration
    benefits
    ...CourseItem
  }
  ${CourseLevelFragmentDoc}
  ${CourseItemFragmentDoc}
`
export const UserTaskItemFragmentDoc = gql`
  fragment UserTaskItem on UserTask {
    id
    completed
    levelTaskId
    levelTask {
      id
      order
      description
      fullDescription
      videoUrl
      order
    }
  }
`
export const LevelItemFragmentDoc = gql`
  fragment LevelItem on Level {
    id
    levelNumber
    maxProgressDays
    rewardUrl
    rewardDescription
    isLast
  }
`
export const UserLevelItemFragmentDoc = gql`
  fragment UserLevelItem on UserLevel {
    id
    completed
    progressDay
    level {
      ...LevelItem
    }
  }
  ${LevelItemFragmentDoc}
`
export const UserGroupMessageFragmentDoc = gql`
  fragment UserGroupMessage on UserGroupMessage {
    id
    isRead
    showOption
    groupMessage {
      id
      rewardCount
      leftCoinsCount
      message {
        id
        message
        videoUrl
        pictureUrl
      }
    }
  }
`
export const MyDashboardFragmentDoc = gql`
  fragment MyDashboard on User {
    id
    groupOrder
    tasks {
      ...UserTaskItem
    }
    group {
      ...UserGroupItem
    }
    userLevel {
      ...UserLevelItem
    }
    userGroupMessage {
      ...UserGroupMessage
    }
  }
  ${UserTaskItemFragmentDoc}
  ${UserGroupItemFragmentDoc}
  ${UserLevelItemFragmentDoc}
  ${UserGroupMessageFragmentDoc}
`
export const MyLevelProgressFragmentDoc = gql`
  fragment MyLevelProgress on UserLevel {
    id
    progressDay
    completed
    level {
      id
      levelNumber
    }
  }
`
export const MyCourseProgressFragmentDoc = gql`
  fragment MyCourseProgress on Course {
    id
    levels {
      ...CourseLevel
    }
  }
  ${CourseLevelFragmentDoc}
`
export const MyProgressFragmentDoc = gql`
  fragment MyProgress on User {
    id
    userLevel {
      ...MyLevelProgress
    }
    userCourse {
      id
      isActive
      course {
        ...MyCourseProgress
      }
    }
  }
  ${MyLevelProgressFragmentDoc}
  ${MyCourseProgressFragmentDoc}
`
export const MySettingsFragmentDoc = gql`
  fragment MySettings on User {
    id
    firstName
    lastName
    email
    avatar
    groupId
    userGroupMessage {
      id
      showOption
    }
  }
`
export const MyDayRewardDocument = gql`
  query MyDayReward {
    myDayReward {
      ...MyDailyReward
    }
  }
  ${MyDailyRewardFragmentDoc}
`

/**
 * __useMyDayRewardQuery__
 *
 * To run a query within a React component, call `useMyDayRewardQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyDayRewardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyDayRewardQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyDayRewardQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MyDayRewardQuery,
    MyDayRewardQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<MyDayRewardQuery, MyDayRewardQueryVariables>(
    MyDayRewardDocument,
    baseOptions,
  )
}
export function useMyDayRewardLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MyDayRewardQuery,
    MyDayRewardQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    MyDayRewardQuery,
    MyDayRewardQueryVariables
  >(MyDayRewardDocument, baseOptions)
}
export type MyDayRewardQueryHookResult = ReturnType<typeof useMyDayRewardQuery>
export type MyDayRewardLazyQueryHookResult = ReturnType<
  typeof useMyDayRewardLazyQuery
>
export type MyDayRewardQueryResult = ApolloReactCommon.QueryResult<
  MyDayRewardQuery,
  MyDayRewardQueryVariables
>
export const EndMyCourseDocument = gql`
  mutation EndMyCourse {
    endMyCourse {
      id
      groupId
    }
  }
`

/**
 * __useEndMyCourseMutation__
 *
 * To run a mutation, you first call `useEndMyCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndMyCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endMyCourseMutation, { data, loading, error }] = useEndMyCourseMutation({
 *   variables: {
 *   },
 * });
 */
export function useEndMyCourseMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EndMyCourseMutation,
    EndMyCourseMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EndMyCourseMutation,
    EndMyCourseMutationVariables
  >(EndMyCourseDocument, baseOptions)
}
export type EndMyCourseMutationHookResult = ReturnType<
  typeof useEndMyCourseMutation
>
export type EndMyCourseMutationResult = ApolloReactCommon.MutationResult<
  EndMyCourseMutation
>
export type EndMyCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EndMyCourseMutation,
  EndMyCourseMutationVariables
>
export const GetSignedUrlDocument = gql`
  mutation GetSignedUrl($data: S3SignedUrlInput!) {
    getSignedS3Url(data: $data)
  }
`

/**
 * __useGetSignedUrlMutation__
 *
 * To run a mutation, you first call `useGetSignedUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetSignedUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getSignedUrlMutation, { data, loading, error }] = useGetSignedUrlMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetSignedUrlMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GetSignedUrlMutation,
    GetSignedUrlMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    GetSignedUrlMutation,
    GetSignedUrlMutationVariables
  >(GetSignedUrlDocument, baseOptions)
}
export type GetSignedUrlMutationHookResult = ReturnType<
  typeof useGetSignedUrlMutation
>
export type GetSignedUrlMutationResult = ApolloReactCommon.MutationResult<
  GetSignedUrlMutation
>
export type GetSignedUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GetSignedUrlMutation,
  GetSignedUrlMutationVariables
>
export const UpdateUserGroupMessageDocument = gql`
  mutation UpdateUserGroupMessage(
    $userGroupMessageId: String!
    $data: UpdateUserGroupMessageInput!
  ) {
    updateUserGroupMessage(
      userGroupMessageId: $userGroupMessageId
      data: $data
    ) {
      isRead
      showOption
    }
  }
`

/**
 * __useUpdateUserGroupMessageMutation__
 *
 * To run a mutation, you first call `useUpdateUserGroupMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserGroupMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserGroupMessageMutation, { data, loading, error }] = useUpdateUserGroupMessageMutation({
 *   variables: {
 *      userGroupMessageId: // value for 'userGroupMessageId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserGroupMessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserGroupMessageMutation,
    UpdateUserGroupMessageMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateUserGroupMessageMutation,
    UpdateUserGroupMessageMutationVariables
  >(UpdateUserGroupMessageDocument, baseOptions)
}
export type UpdateUserGroupMessageMutationHookResult = ReturnType<
  typeof useUpdateUserGroupMessageMutation
>
export type UpdateUserGroupMessageMutationResult = ApolloReactCommon.MutationResult<
  UpdateUserGroupMessageMutation
>
export type UpdateUserGroupMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserGroupMessageMutation,
  UpdateUserGroupMessageMutationVariables
>
export const UpdateUserTaskDocument = gql`
  mutation UpdateUserTask($taskId: String!, $data: UpdateUserTaskInput!) {
    updateUserTask(taskId: $taskId, data: $data) {
      ...UserTaskItem
    }
  }
  ${UserTaskItemFragmentDoc}
`

/**
 * __useUpdateUserTaskMutation__
 *
 * To run a mutation, you first call `useUpdateUserTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserTaskMutation, { data, loading, error }] = useUpdateUserTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserTaskMutation,
    UpdateUserTaskMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateUserTaskMutation,
    UpdateUserTaskMutationVariables
  >(UpdateUserTaskDocument, baseOptions)
}
export type UpdateUserTaskMutationHookResult = ReturnType<
  typeof useUpdateUserTaskMutation
>
export type UpdateUserTaskMutationResult = ApolloReactCommon.MutationResult<
  UpdateUserTaskMutation
>
export type UpdateUserTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserTaskMutation,
  UpdateUserTaskMutationVariables
>
export const MeDocument = gql`
  query Me {
    me {
      ...Me
    }
  }
  ${MeFragmentDoc}
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MeQuery,
    MeQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>
export const GetCourseDocument = gql`
  query GetCourse($slug: String!) {
    courseBySlug(slug: $slug) {
      ...Course
    }
  }
  ${CourseFragmentDoc}
`

/**
 * __useGetCourseQuery__
 *
 * To run a query within a React component, call `useGetCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetCourseQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCourseQuery,
    GetCourseQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetCourseQuery, GetCourseQueryVariables>(
    GetCourseDocument,
    baseOptions,
  )
}
export function useGetCourseLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCourseQuery,
    GetCourseQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetCourseQuery, GetCourseQueryVariables>(
    GetCourseDocument,
    baseOptions,
  )
}
export type GetCourseQueryHookResult = ReturnType<typeof useGetCourseQuery>
export type GetCourseLazyQueryHookResult = ReturnType<
  typeof useGetCourseLazyQuery
>
export type GetCourseQueryResult = ApolloReactCommon.QueryResult<
  GetCourseQuery,
  GetCourseQueryVariables
>
export const GetAllCoursesDocument = gql`
  query GetAllCourses {
    getAllCourses {
      ...CourseItem
    }
  }
  ${CourseItemFragmentDoc}
`

/**
 * __useGetAllCoursesQuery__
 *
 * To run a query within a React component, call `useGetAllCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCoursesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAllCoursesQuery,
    GetAllCoursesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetAllCoursesQuery,
    GetAllCoursesQueryVariables
  >(GetAllCoursesDocument, baseOptions)
}
export function useGetAllCoursesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAllCoursesQuery,
    GetAllCoursesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetAllCoursesQuery,
    GetAllCoursesQueryVariables
  >(GetAllCoursesDocument, baseOptions)
}
export type GetAllCoursesQueryHookResult = ReturnType<
  typeof useGetAllCoursesQuery
>
export type GetAllCoursesLazyQueryHookResult = ReturnType<
  typeof useGetAllCoursesLazyQuery
>
export type GetAllCoursesQueryResult = ApolloReactCommon.QueryResult<
  GetAllCoursesQuery,
  GetAllCoursesQueryVariables
>
export const GetCurrentLevelRewardDocument = gql`
  query GetCurrentLevelReward {
    me {
      id
      userLevel {
        id
        level {
          ...LevelReward
        }
      }
    }
  }
  ${LevelRewardFragmentDoc}
`

/**
 * __useGetCurrentLevelRewardQuery__
 *
 * To run a query within a React component, call `useGetCurrentLevelRewardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentLevelRewardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentLevelRewardQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentLevelRewardQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCurrentLevelRewardQuery,
    GetCurrentLevelRewardQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCurrentLevelRewardQuery,
    GetCurrentLevelRewardQueryVariables
  >(GetCurrentLevelRewardDocument, baseOptions)
}
export function useGetCurrentLevelRewardLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCurrentLevelRewardQuery,
    GetCurrentLevelRewardQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCurrentLevelRewardQuery,
    GetCurrentLevelRewardQueryVariables
  >(GetCurrentLevelRewardDocument, baseOptions)
}
export type GetCurrentLevelRewardQueryHookResult = ReturnType<
  typeof useGetCurrentLevelRewardQuery
>
export type GetCurrentLevelRewardLazyQueryHookResult = ReturnType<
  typeof useGetCurrentLevelRewardLazyQuery
>
export type GetCurrentLevelRewardQueryResult = ApolloReactCommon.QueryResult<
  GetCurrentLevelRewardQuery,
  GetCurrentLevelRewardQueryVariables
>
export const MyDashboardDocument = gql`
  query MyDashboard {
    me {
      ...MyDashboard
    }
  }
  ${MyDashboardFragmentDoc}
`

/**
 * __useMyDashboardQuery__
 *
 * To run a query within a React component, call `useMyDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyDashboardQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MyDashboardQuery,
    MyDashboardQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<MyDashboardQuery, MyDashboardQueryVariables>(
    MyDashboardDocument,
    baseOptions,
  )
}
export function useMyDashboardLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MyDashboardQuery,
    MyDashboardQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    MyDashboardQuery,
    MyDashboardQueryVariables
  >(MyDashboardDocument, baseOptions)
}
export type MyDashboardQueryHookResult = ReturnType<typeof useMyDashboardQuery>
export type MyDashboardLazyQueryHookResult = ReturnType<
  typeof useMyDashboardLazyQuery
>
export type MyDashboardQueryResult = ApolloReactCommon.QueryResult<
  MyDashboardQuery,
  MyDashboardQueryVariables
>
export const CompleteMeDocument = gql`
  mutation CompleteMe {
    completeMe {
      ...MyDashboard
    }
  }
  ${MyDashboardFragmentDoc}
`

/**
 * __useCompleteMeMutation__
 *
 * To run a mutation, you first call `useCompleteMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeMeMutation, { data, loading, error }] = useCompleteMeMutation({
 *   variables: {
 *   },
 * });
 */
export function useCompleteMeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CompleteMeMutation,
    CompleteMeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CompleteMeMutation,
    CompleteMeMutationVariables
  >(CompleteMeDocument, baseOptions)
}
export type CompleteMeMutationHookResult = ReturnType<
  typeof useCompleteMeMutation
>
export type CompleteMeMutationResult = ApolloReactCommon.MutationResult<
  CompleteMeMutation
>
export type CompleteMeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CompleteMeMutation,
  CompleteMeMutationVariables
>
export const GetCourseGroupsDocument = gql`
  query GetCourseGroups($slug: String!) {
    courseBySlug(slug: $slug) {
      id
      groups {
        ...GroupItem
      }
    }
  }
  ${GroupItemFragmentDoc}
`

/**
 * __useGetCourseGroupsQuery__
 *
 * To run a query within a React component, call `useGetCourseGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseGroupsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetCourseGroupsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCourseGroupsQuery,
    GetCourseGroupsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCourseGroupsQuery,
    GetCourseGroupsQueryVariables
  >(GetCourseGroupsDocument, baseOptions)
}
export function useGetCourseGroupsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCourseGroupsQuery,
    GetCourseGroupsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCourseGroupsQuery,
    GetCourseGroupsQueryVariables
  >(GetCourseGroupsDocument, baseOptions)
}
export type GetCourseGroupsQueryHookResult = ReturnType<
  typeof useGetCourseGroupsQuery
>
export type GetCourseGroupsLazyQueryHookResult = ReturnType<
  typeof useGetCourseGroupsLazyQuery
>
export type GetCourseGroupsQueryResult = ApolloReactCommon.QueryResult<
  GetCourseGroupsQuery,
  GetCourseGroupsQueryVariables
>
export const StartMyCourseDocument = gql`
  mutation StartMyCourse($courseId: String!, $groupId: String!) {
    startMyCourse(courseId: $courseId, groupId: $groupId) {
      ...MyDashboard
    }
  }
  ${MyDashboardFragmentDoc}
`

/**
 * __useStartMyCourseMutation__
 *
 * To run a mutation, you first call `useStartMyCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartMyCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startMyCourseMutation, { data, loading, error }] = useStartMyCourseMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useStartMyCourseMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    StartMyCourseMutation,
    StartMyCourseMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    StartMyCourseMutation,
    StartMyCourseMutationVariables
  >(StartMyCourseDocument, baseOptions)
}
export type StartMyCourseMutationHookResult = ReturnType<
  typeof useStartMyCourseMutation
>
export type StartMyCourseMutationResult = ApolloReactCommon.MutationResult<
  StartMyCourseMutation
>
export type StartMyCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  StartMyCourseMutation,
  StartMyCourseMutationVariables
>
export const GetLevelRewardDocument = gql`
  query GetLevelReward($levelId: String!) {
    getLevel(levelId: $levelId) {
      ...LevelReward
    }
  }
  ${LevelRewardFragmentDoc}
`

/**
 * __useGetLevelRewardQuery__
 *
 * To run a query within a React component, call `useGetLevelRewardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLevelRewardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLevelRewardQuery({
 *   variables: {
 *      levelId: // value for 'levelId'
 *   },
 * });
 */
export function useGetLevelRewardQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetLevelRewardQuery,
    GetLevelRewardQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetLevelRewardQuery,
    GetLevelRewardQueryVariables
  >(GetLevelRewardDocument, baseOptions)
}
export function useGetLevelRewardLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetLevelRewardQuery,
    GetLevelRewardQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetLevelRewardQuery,
    GetLevelRewardQueryVariables
  >(GetLevelRewardDocument, baseOptions)
}
export type GetLevelRewardQueryHookResult = ReturnType<
  typeof useGetLevelRewardQuery
>
export type GetLevelRewardLazyQueryHookResult = ReturnType<
  typeof useGetLevelRewardLazyQuery
>
export type GetLevelRewardQueryResult = ApolloReactCommon.QueryResult<
  GetLevelRewardQuery,
  GetLevelRewardQueryVariables
>
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const MyProgressDocument = gql`
  query MyProgress {
    me {
      ...MyProgress
    }
  }
  ${MyProgressFragmentDoc}
`

/**
 * __useMyProgressQuery__
 *
 * To run a query within a React component, call `useMyProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProgressQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProgressQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MyProgressQuery,
    MyProgressQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<MyProgressQuery, MyProgressQueryVariables>(
    MyProgressDocument,
    baseOptions,
  )
}
export function useMyProgressLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MyProgressQuery,
    MyProgressQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    MyProgressQuery,
    MyProgressQueryVariables
  >(MyProgressDocument, baseOptions)
}
export type MyProgressQueryHookResult = ReturnType<typeof useMyProgressQuery>
export type MyProgressLazyQueryHookResult = ReturnType<
  typeof useMyProgressLazyQuery
>
export type MyProgressQueryResult = ApolloReactCommon.QueryResult<
  MyProgressQuery,
  MyProgressQueryVariables
>
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const MySettingsDocument = gql`
  query MySettings {
    me {
      ...MySettings
    }
  }
  ${MySettingsFragmentDoc}
`

/**
 * __useMySettingsQuery__
 *
 * To run a query within a React component, call `useMySettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMySettingsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MySettingsQuery,
    MySettingsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<MySettingsQuery, MySettingsQueryVariables>(
    MySettingsDocument,
    baseOptions,
  )
}
export function useMySettingsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MySettingsQuery,
    MySettingsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    MySettingsQuery,
    MySettingsQueryVariables
  >(MySettingsDocument, baseOptions)
}
export type MySettingsQueryHookResult = ReturnType<typeof useMySettingsQuery>
export type MySettingsLazyQueryHookResult = ReturnType<
  typeof useMySettingsLazyQuery
>
export type MySettingsQueryResult = ApolloReactCommon.QueryResult<
  MySettingsQuery,
  MySettingsQueryVariables
>
export const UpdateSettingsDocument = gql`
  mutation UpdateSettings($data: UpdateInput!) {
    updateMe(data: $data) {
      ...MySettings
    }
  }
  ${MySettingsFragmentDoc}
`

/**
 * __useUpdateSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingsMutation, { data, loading, error }] = useUpdateSettingsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSettingsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateSettingsMutation,
    UpdateSettingsMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateSettingsMutation,
    UpdateSettingsMutationVariables
  >(UpdateSettingsDocument, baseOptions)
}
export type UpdateSettingsMutationHookResult = ReturnType<
  typeof useUpdateSettingsMutation
>
export type UpdateSettingsMutationResult = ApolloReactCommon.MutationResult<
  UpdateSettingsMutation
>
export type UpdateSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateSettingsMutation,
  UpdateSettingsMutationVariables
>
