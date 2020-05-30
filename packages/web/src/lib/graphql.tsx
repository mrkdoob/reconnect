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
  rewardType?: Maybe<Scalars["String"]>
  petId?: Maybe<Scalars["String"]>
  mentorId?: Maybe<Scalars["String"]>
  levels?: Maybe<Array<Level>>
  groups?: Maybe<Array<Group>>
  courseDayRewards?: Maybe<Array<CourseDayReward>>
  mentor?: Maybe<User>
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
  cover?: Maybe<Scalars["String"]>
  endText?: Maybe<Scalars["String"]>
  rewardType?: Maybe<Scalars["String"]>
  petId?: Maybe<Scalars["String"]>
  mentorId?: Maybe<Scalars["String"]>
}

export type CreateCustomUserTaskInput = {
  description: Scalars["String"]
  fullDescription: Scalars["String"]
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
  cover?: Maybe<Scalars["String"]>
  rewardText: Scalars["String"]
  rewardDescription: Scalars["String"]
  videoUrl?: Maybe<Scalars["String"]>
  rewardUrl?: Maybe<Scalars["String"]>
  courseId: Scalars["String"]
  isLast: Scalars["Boolean"]
}

export type CreateLevelTaskInput = {
  order: Scalars["Float"]
  levelId: Scalars["String"]
}

export type CreateLevelTaskOptionInput = {
  order: Scalars["Float"]
  levelTaskId: Scalars["String"]
  optionId: Scalars["String"]
}

export type CreateMessageInput = {
  message: Scalars["String"]
  order: Scalars["Float"]
  pictureUrl?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
  fullHeightPic?: Maybe<Scalars["Boolean"]>
  courseId: Scalars["String"]
}

export type CreateOptionInput = {
  label: Scalars["String"]
  description: Scalars["String"]
  fullDescription: Scalars["String"]
  videoUrl?: Maybe<Scalars["String"]>
  createdByAdmin?: Maybe<Scalars["Boolean"]>
}

export type CreatePetInput = {
  name: Scalars["String"]
  description: Scalars["String"]
  levelNumber: Scalars["Float"]
  pictureUrl: Scalars["String"]
  avatarUrl: Scalars["String"]
}

export type CreateUserCourseInput = {
  courseId: Scalars["String"]
  isActive: Scalars["Boolean"]
  userId: Scalars["String"]
}

export type CreateUserGroupMessageInput = {
  groupMessageId: Scalars["String"]
  userId: Scalars["String"]
  messageId: Scalars["String"]
}

export type CreateUserLevelInput = {
  levelId: Scalars["String"]
  userId: Scalars["String"]
}

export type CreateUserPetInput = {
  userId: Scalars["String"]
  petId: Scalars["String"]
  challengeActive: Scalars["Boolean"]
}

export type CreateUserTaskInput = {
  levelTaskId: Scalars["String"]
  userId: Scalars["String"]
  order: Scalars["Float"]
}

export type EndMyCourseInput = {
  groupOrder?: Maybe<Scalars["Float"]>
  groupId?: Maybe<Scalars["String"]>
  hasFailed?: Maybe<Scalars["Boolean"]>
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
  description?: Maybe<Scalars["String"]>
  levelId?: Maybe<Scalars["String"]>
  options?: Maybe<Array<LevelTaskOption>>
}

export type LevelTaskOption = {
  __typename?: "LevelTaskOption"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  order: Scalars["Int"]
  levelTaskId?: Maybe<Scalars["String"]>
  optionId?: Maybe<Scalars["String"]>
  options?: Maybe<Array<LevelTaskOption>>
  option?: Maybe<Option>
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
  fullHeightPic: Scalars["Boolean"]
  courseId?: Maybe<Scalars["String"]>
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
  endCourseByUserId?: Maybe<User>
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
  createOption: Option
  updateOption?: Maybe<Option>
  destroyOption: Scalars["Boolean"]
  createPet: Pet
  updatePet?: Maybe<Pet>
  destroyPet?: Maybe<Scalars["Boolean"]>
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
  createUserPet: UserPet
  updateUserPet?: Maybe<UserPet>
  destroyUserPet: Scalars["Boolean"]
  createUserTask: UserTask
  createCustomUserTask: UserTask
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

export type MutationEndMyCourseArgs = {
  hasFailed: Scalars["Boolean"]
}

export type MutationEndCourseByUserIdArgs = {
  userId: Scalars["String"]
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
  levelTaskOptionId: Scalars["String"]
}

export type MutationDestroyLevelTaskOptionArgs = {
  levelTaskOptionId: Scalars["String"]
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

export type MutationCreateOptionArgs = {
  data: CreateOptionInput
}

export type MutationUpdateOptionArgs = {
  data: UpdateOptionInput
  optionId: Scalars["String"]
}

export type MutationDestroyOptionArgs = {
  optionId: Scalars["String"]
}

export type MutationCreatePetArgs = {
  data: CreatePetInput
}

export type MutationUpdatePetArgs = {
  data: UpdatePetInput
  petId: Scalars["String"]
}

export type MutationDestroyPetArgs = {
  petId: Scalars["String"]
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
  updateToNextMessage: Scalars["Boolean"]
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

export type MutationCreateUserPetArgs = {
  data: CreateUserPetInput
}

export type MutationUpdateUserPetArgs = {
  data: UpdateUserPetInput
  userPetId: Scalars["String"]
}

export type MutationDestroyUserPetArgs = {
  userPetId: Scalars["String"]
}

export type MutationCreateUserTaskArgs = {
  data: CreateUserTaskInput
}

export type MutationCreateCustomUserTaskArgs = {
  data: CreateCustomUserTaskInput
}

export type MutationUpdateUserTaskArgs = {
  data: UpdateUserTaskInput
  taskId: Scalars["String"]
}

export type MutationDestroyUserTaskArgs = {
  taskId: Scalars["String"]
}

export type Option = {
  __typename?: "Option"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  label: Scalars["String"]
  description: Scalars["String"]
  fullDescription?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
  createdByAdmin: Scalars["Boolean"]
}

export type Pet = {
  __typename?: "Pet"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  name: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  levelNumber: Scalars["Int"]
  pictureUrl: Scalars["String"]
  avatarUrl: Scalars["String"]
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
  dailyReset: Scalars["Boolean"]
  getUser?: Maybe<User>
  me?: Maybe<User>
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
  getOption: Option
  getAllOptions: Array<Option>
  getPet: Pet
  getUserCourse: UserCourse
  myDayReward?: Maybe<UserDayReward>
  getUserGroupMessage: UserGroupMessage
  allUserGroupMessages: Array<UserGroupMessage>
  getUserLevel: UserLevel
  getAllUserLevels: Array<UserLevel>
  getUserPet: UserPet
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

export type QueryDailyResetArgs = {
  repeatDaily: Scalars["Boolean"]
  delay: Scalars["Float"]
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

export type QueryGetOptionArgs = {
  optionId: Scalars["String"]
}

export type QueryGetPetArgs = {
  petId: Scalars["String"]
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

export type QueryGetUserPetArgs = {
  userPetId: Scalars["String"]
}

export type QueryGetUserTaskArgs = {
  taskId: Scalars["String"]
}

export type RegisterInput = {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
  timeZone: Scalars["String"]
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
  rewardType?: Maybe<Scalars["String"]>
  petId?: Maybe<Scalars["String"]>
  mentorId?: Maybe<Scalars["String"]>
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
  bio?: Maybe<Scalars["String"]>
  groupId?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  groupOrder?: Maybe<Scalars["Float"]>
  timeZone?: Maybe<Scalars["String"]>
  role?: Maybe<Scalars["String"]>
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
}

export type UpdateLevelTaskOptionInput = {
  order?: Maybe<Scalars["Float"]>
  videoUrl?: Maybe<Scalars["String"]>
  optionId?: Maybe<Scalars["String"]>
}

export type UpdateMessageInput = {
  message?: Maybe<Scalars["String"]>
  pictureUrl?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Float"]>
  fullHeightPic?: Maybe<Scalars["Boolean"]>
  courseId?: Maybe<Scalars["String"]>
}

export type UpdateOptionInput = {
  label?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  fullDescription?: Maybe<Scalars["String"]>
  videoUrl?: Maybe<Scalars["String"]>
  createdByAdmin?: Maybe<Scalars["Boolean"]>
}

export type UpdatePetInput = {
  name?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  levelNumber?: Maybe<Scalars["Float"]>
  pictureUrl?: Maybe<Scalars["String"]>
  avatarUrl?: Maybe<Scalars["String"]>
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
  messageId?: Maybe<Scalars["String"]>
}

export type UpdateUserLevelInput = {
  completed?: Maybe<Scalars["Boolean"]>
  progressDay?: Maybe<Scalars["Float"]>
  retriesRemaining?: Maybe<Scalars["Float"]>
  levelId?: Maybe<Scalars["String"]>
}

export type UpdateUserPetInput = {
  lifes?: Maybe<Scalars["Float"]>
  petId?: Maybe<Scalars["String"]>
  isActive?: Maybe<Scalars["Boolean"]>
  challengeActive?: Maybe<Scalars["Boolean"]>
}

export type UpdateUserTaskInput = {
  completed?: Maybe<Scalars["Boolean"]>
  levelTaskId?: Maybe<Scalars["String"]>
  levelTaskOptionId?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Float"]>
  description?: Maybe<Scalars["String"]>
  fullDescription?: Maybe<Scalars["String"]>
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
  bio?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  timeZone?: Maybe<Scalars["String"]>
  role?: Maybe<Scalars["String"]>
  groupOrder: Scalars["Int"]
  hasFailed: Scalars["Boolean"]
  groupId?: Maybe<Scalars["String"]>
  fullName?: Maybe<Scalars["String"]>
  url: Scalars["String"]
  tasks?: Maybe<Array<UserTask>>
  userCourse?: Maybe<Array<UserCourse>>
  userLevel?: Maybe<UserLevel>
  group?: Maybe<Group>
  userGroupMessage?: Maybe<UserGroupMessage>
  userDayReward?: Maybe<UserDayReward>
  userPet?: Maybe<UserPet>
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
  messageId?: Maybe<Scalars["String"]>
  userId: Scalars["String"]
  groupMessage?: Maybe<GroupMessage>
  message?: Maybe<Message>
}

export type UserLevel = {
  __typename?: "UserLevel"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  completed: Scalars["Boolean"]
  progressDay: Scalars["Int"]
  retriesRemaining: Scalars["Int"]
  levelId?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  level?: Maybe<Level>
}

export type UserPet = {
  __typename?: "UserPet"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  lifes: Scalars["Int"]
  isActive: Scalars["Boolean"]
  challengeActive: Scalars["Boolean"]
  petId?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  pet?: Maybe<Pet>
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
  description?: Maybe<Scalars["String"]>
  fullDescription?: Maybe<Scalars["String"]>
  levelTask?: Maybe<LevelTask>
  levelTaskOption?: Maybe<LevelTaskOption>
}

export type CreateCourseMutationVariables = {
  data: CreateCourseInput
}

export type CreateCourseMutation = { __typename?: "Mutation" } & {
  createCourse: { __typename?: "Course" } & CourseItemFragment
}

export type DestroyCourseMutationVariables = {
  id: Scalars["String"]
}

export type DestroyCourseMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyCourse"
>

export type UpdateCourseMutationVariables = {
  id: Scalars["String"]
  data: UpdateCourseInput
}

export type UpdateCourseMutation = { __typename?: "Mutation" } & {
  updateCourse?: Maybe<{ __typename?: "Course" } & CourseItemFragment>
}

export type MentorItemFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "fullName" | "avatar" | "bio"
>

export type CourseItemFragment = { __typename?: "Course" } & Pick<
  Course,
  | "id"
  | "name"
  | "cover"
  | "category"
  | "description"
  | "slug"
  | "fullDescription"
  | "duration"
  | "benefits"
  | "rewardType"
> & { mentor?: Maybe<{ __typename?: "User" } & MentorItemFragment> }

export type CreateLevelMutationVariables = {
  data: CreateLevelInput
}

export type CreateLevelMutation = { __typename?: "Mutation" } & {
  createLevel: { __typename?: "Level" } & CourseLevelFragment
}

export type UpdateLevelMutationVariables = {
  levelId: Scalars["String"]
  data: UpdateLevelInput
}

export type UpdateLevelMutation = { __typename?: "Mutation" } & {
  updateLevel?: Maybe<{ __typename?: "Level" } & CourseLevelFragment>
}

export type DestroyLevelMutationVariables = {
  levelId: Scalars["String"]
}

export type DestroyLevelMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyLevel"
>

export type CourseLevelFragment = { __typename?: "Level" } & Pick<
  Level,
  | "id"
  | "title"
  | "cover"
  | "levelNumber"
  | "maxProgressDays"
  | "isLast"
  | "rewardText"
  | "rewardDescription"
  | "videoUrl"
  | "rewardUrl"
  | "courseId"
>

export type CreateLevelTaskOptionMutationVariables = {
  data: CreateLevelTaskOptionInput
}

export type CreateLevelTaskOptionMutation = { __typename?: "Mutation" } & {
  createLevelTaskOption: {
    __typename?: "LevelTaskOption"
  } & LevelTaskOptionItemFragment
}

export type CreateOptionMutationVariables = {
  data: CreateOptionInput
}

export type CreateOptionMutation = { __typename?: "Mutation" } & {
  createOption: { __typename?: "Option" } & Pick<
    Option,
    "id" | "label" | "description" | "fullDescription" | "videoUrl"
  >
}

export type GetLevelTasksQueryVariables = {
  levelId: Scalars["String"]
}

export type GetLevelTasksQuery = { __typename?: "Query" } & {
  getLevel: { __typename?: "Level" } & Pick<Level, "id"> & {
      levelTasks?: Maybe<
        Array<{ __typename?: "LevelTask" } & LevelTaskItemFragment>
      >
    }
}

export type CreateLevelTaskMutationVariables = {
  data: CreateLevelTaskInput
}

export type CreateLevelTaskMutation = { __typename?: "Mutation" } & {
  createLevelTask: { __typename?: "LevelTask" } & LevelTaskItemFragment
}

export type OptionItemFragment = { __typename?: "Option" } & Pick<
  Option,
  | "id"
  | "label"
  | "description"
  | "fullDescription"
  | "videoUrl"
  | "createdByAdmin"
>

export type DestroyOptionMutationVariables = {
  optionId: Scalars["String"]
}

export type DestroyOptionMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyOption"
>

export type DestroyLevelTaskOptionMutationVariables = {
  levelTaskOptionId: Scalars["String"]
}

export type DestroyLevelTaskOptionMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyLevelTaskOption"
>

export type UpdateOptionMutationVariables = {
  optionId: Scalars["String"]
  data: UpdateOptionInput
}

export type UpdateOptionMutation = { __typename?: "Mutation" } & {
  updateOption?: Maybe<{ __typename?: "Option" } & OptionItemFragment>
}

export type GetOptionsQueryVariables = {}

export type GetOptionsQuery = { __typename?: "Query" } & {
  getAllOptions: Array<{ __typename?: "Option" } & OptionItemFragment>
}

export type UpdateLevelTaskOptionMutationVariables = {
  levelTaskOptionId: Scalars["String"]
  data: UpdateLevelTaskOptionInput
}

export type UpdateLevelTaskOptionMutation = { __typename?: "Mutation" } & {
  updateLevelTaskOption?: Maybe<
    { __typename?: "LevelTaskOption" } & LevelTaskOptionItemFragment
  >
}

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

export type ForgotPasswordMutationVariables = {
  email: Scalars["String"]
}

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>

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

export type CreateCustomUserTaskMutationVariables = {
  data: CreateCustomUserTaskInput
}

export type CreateCustomUserTaskMutation = { __typename?: "Mutation" } & {
  createCustomUserTask: { __typename?: "UserTask" } & Pick<
    UserTask,
    "id" | "description" | "fullDescription"
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

export type EndMyCourseMutationVariables = {
  hasFailed: Scalars["Boolean"]
}

export type EndMyCourseMutation = { __typename?: "Mutation" } & {
  endMyCourse?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "groupId">>
}

export type LevelTaskOptionItemFragment = {
  __typename?: "LevelTaskOption"
} & Pick<LevelTaskOption, "id" | "order"> & {
    option?: Maybe<{ __typename?: "Option" } & OptionItemFragment>
  }

export type LevelTaskItemFragment = { __typename?: "LevelTask" } & Pick<
  LevelTask,
  "id" | "order" | "description" | "levelId"
> & {
    options?: Maybe<
      Array<{ __typename?: "LevelTaskOption" } & LevelTaskOptionItemFragment>
    >
  }

export type GetSignedUrlMutationVariables = {
  data: S3SignedUrlInput
}

export type GetSignedUrlMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "getSignedS3Url"
>

export type DestroyUserTaskMutationVariables = {
  taskId: Scalars["String"]
}

export type DestroyUserTaskMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyUserTask"
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
  | "coinRewardAmount"
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
      >
    >
    message?: Maybe<
      { __typename?: "Message" } & Pick<
        Message,
        "id" | "message" | "videoUrl" | "pictureUrl" | "fullHeightPic" | "order"
      >
    >
  }

export type UpdateUserGroupMessageMutationVariables = {
  userGroupMessageId: Scalars["String"]
  data: UpdateUserGroupMessageInput
  updateToNextMessage: Scalars["Boolean"]
}

export type UpdateUserGroupMessageMutation = { __typename?: "Mutation" } & {
  updateUserGroupMessage?: Maybe<
    { __typename?: "UserGroupMessage" } & Pick<
      UserGroupMessage,
      "isRead" | "showOption"
    >
  >
}

export type PetItemFragment = { __typename?: "Pet" } & Pick<
  Pet,
  "id" | "description" | "name" | "levelNumber" | "pictureUrl" | "avatarUrl"
>

export type UserPetItemFragment = { __typename?: "UserPet" } & Pick<
  UserPet,
  "id" | "lifes" | "isActive"
> & { pet?: Maybe<{ __typename?: "Pet" } & PetItemFragment> }

export type UserTaskOptionItemFragment = {
  __typename?: "LevelTaskOption"
} & Pick<LevelTaskOption, "id" | "order"> & {
    options?: Maybe<
      Array<
        { __typename?: "LevelTaskOption" } & Pick<
          LevelTaskOption,
          "id" | "order"
        > & {
            option?: Maybe<
              { __typename?: "Option" } & Pick<
                Option,
                "id" | "label" | "description" | "fullDescription" | "videoUrl"
              >
            >
          }
      >
    >
    option?: Maybe<
      { __typename?: "Option" } & Pick<
        Option,
        "id" | "label" | "description" | "fullDescription" | "videoUrl"
      >
    >
  }

export type UserTaskItemFragment = { __typename?: "UserTask" } & Pick<
  UserTask,
  | "id"
  | "completed"
  | "levelTaskId"
  | "levelTaskOptionId"
  | "description"
  | "fullDescription"
> & {
    levelTaskOption?: Maybe<
      { __typename?: "LevelTaskOption" } & UserTaskOptionItemFragment
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
  "id" | "fullName" | "email" | "groupOrder" | "avatar" | "groupId" | "role"
> & {
    group?: Maybe<{ __typename?: "Group" } & UserGroupItemFragment>
    userLevel?: Maybe<{ __typename?: "UserLevel" } & Pick<UserLevel, "levelId">>
  }

export type MeQueryVariables = {}

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & MeFragment>
}

export type CourseFragment = { __typename?: "Course" } & {
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
        tasks?: Maybe<Array<{ __typename?: "UserTask" } & UserTaskItemFragment>>
      }
  >
}

export type UserLevelItemFragment = { __typename?: "UserLevel" } & Pick<
  UserLevel,
  "id" | "completed" | "progressDay"
> & { level?: Maybe<{ __typename?: "Level" } & LevelItemFragment> }

export type MyDashboardFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "groupOrder" | "hasFailed"
> & {
    tasks?: Maybe<Array<{ __typename?: "UserTask" } & UserTaskItemFragment>>
    group?: Maybe<{ __typename?: "Group" } & UserGroupItemFragment>
    userLevel?: Maybe<{ __typename?: "UserLevel" } & UserLevelItemFragment>
    userGroupMessage?: Maybe<
      { __typename?: "UserGroupMessage" } & UserGroupMessageFragment
    >
    userPet?: Maybe<{ __typename?: "UserPet" } & UserPetItemFragment>
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
      mentor?: Maybe<
        { __typename?: "User" } & Pick<User, "firstName"> & MentorItemFragment
      >
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

export type ResetPasswordMutationVariables = {
  data: ResetPasswordInput
}

export type ResetPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "resetPassword"
>

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
export const OptionItemFragmentDoc = gql`
  fragment OptionItem on Option {
    id
    label
    description
    fullDescription
    videoUrl
    createdByAdmin
  }
`
export const LevelTaskOptionItemFragmentDoc = gql`
  fragment LevelTaskOptionItem on LevelTaskOption {
    id
    order
    option {
      ...OptionItem
    }
  }
  ${OptionItemFragmentDoc}
`
export const LevelTaskItemFragmentDoc = gql`
  fragment LevelTaskItem on LevelTask {
    id
    order
    description
    levelId
    options {
      ...LevelTaskOptionItem
    }
  }
  ${LevelTaskOptionItemFragmentDoc}
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
    coinRewardAmount
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
    groupId
    role
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
    isLast
    rewardText
    rewardDescription
    videoUrl
    rewardUrl
    courseId
  }
`
export const MentorItemFragmentDoc = gql`
  fragment MentorItem on User {
    id
    fullName
    avatar
    bio
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
    fullDescription
    duration
    benefits
    rewardType
    mentor {
      ...MentorItem
    }
  }
  ${MentorItemFragmentDoc}
`
export const CourseFragmentDoc = gql`
  fragment Course on Course {
    levels {
      ...CourseLevel
    }
    ...CourseItem
  }
  ${CourseLevelFragmentDoc}
  ${CourseItemFragmentDoc}
`
export const UserTaskOptionItemFragmentDoc = gql`
  fragment UserTaskOptionItem on LevelTaskOption {
    id
    order
    options {
      id
      order
      option {
        id
        label
        description
        fullDescription
        videoUrl
      }
    }
    option {
      id
      label
      description
      fullDescription
      videoUrl
    }
  }
`
export const UserTaskItemFragmentDoc = gql`
  fragment UserTaskItem on UserTask {
    id
    completed
    levelTaskId
    levelTaskOptionId
    description
    fullDescription
    levelTaskOption {
      ...UserTaskOptionItem
    }
  }
  ${UserTaskOptionItemFragmentDoc}
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
    }
    message {
      id
      message
      videoUrl
      pictureUrl
      fullHeightPic
      order
    }
  }
`
export const PetItemFragmentDoc = gql`
  fragment PetItem on Pet {
    id
    description
    name
    levelNumber
    pictureUrl
    avatarUrl
  }
`
export const UserPetItemFragmentDoc = gql`
  fragment UserPetItem on UserPet {
    id
    lifes
    isActive
    pet {
      ...PetItem
    }
  }
  ${PetItemFragmentDoc}
`
export const MyDashboardFragmentDoc = gql`
  fragment MyDashboard on User {
    id
    groupOrder
    hasFailed
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
    userPet {
      ...UserPetItem
    }
  }
  ${UserTaskItemFragmentDoc}
  ${UserGroupItemFragmentDoc}
  ${UserLevelItemFragmentDoc}
  ${UserGroupMessageFragmentDoc}
  ${UserPetItemFragmentDoc}
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
export const CreateCourseDocument = gql`
  mutation CreateCourse($data: CreateCourseInput!) {
    createCourse(data: $data) {
      ...CourseItem
    }
  }
  ${CourseItemFragmentDoc}
`

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCourseMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateCourseMutation,
    CreateCourseMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateCourseMutation,
    CreateCourseMutationVariables
  >(CreateCourseDocument, baseOptions)
}
export type CreateCourseMutationHookResult = ReturnType<
  typeof useCreateCourseMutation
>
export type CreateCourseMutationResult = ApolloReactCommon.MutationResult<
  CreateCourseMutation
>
export type CreateCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCourseMutation,
  CreateCourseMutationVariables
>
export const DestroyCourseDocument = gql`
  mutation DestroyCourse($id: String!) {
    destroyCourse(id: $id)
  }
`

/**
 * __useDestroyCourseMutation__
 *
 * To run a mutation, you first call `useDestroyCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyCourseMutation, { data, loading, error }] = useDestroyCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyCourseMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyCourseMutation,
    DestroyCourseMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyCourseMutation,
    DestroyCourseMutationVariables
  >(DestroyCourseDocument, baseOptions)
}
export type DestroyCourseMutationHookResult = ReturnType<
  typeof useDestroyCourseMutation
>
export type DestroyCourseMutationResult = ApolloReactCommon.MutationResult<
  DestroyCourseMutation
>
export type DestroyCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyCourseMutation,
  DestroyCourseMutationVariables
>
export const UpdateCourseDocument = gql`
  mutation UpdateCourse($id: String!, $data: UpdateCourseInput!) {
    updateCourse(id: $id, data: $data) {
      ...CourseItem
    }
  }
  ${CourseItemFragmentDoc}
`

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCourseMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateCourseMutation,
    UpdateCourseMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateCourseMutation,
    UpdateCourseMutationVariables
  >(UpdateCourseDocument, baseOptions)
}
export type UpdateCourseMutationHookResult = ReturnType<
  typeof useUpdateCourseMutation
>
export type UpdateCourseMutationResult = ApolloReactCommon.MutationResult<
  UpdateCourseMutation
>
export type UpdateCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCourseMutation,
  UpdateCourseMutationVariables
>
export const CreateLevelDocument = gql`
  mutation CreateLevel($data: CreateLevelInput!) {
    createLevel(data: $data) {
      ...CourseLevel
    }
  }
  ${CourseLevelFragmentDoc}
`

/**
 * __useCreateLevelMutation__
 *
 * To run a mutation, you first call `useCreateLevelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLevelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLevelMutation, { data, loading, error }] = useCreateLevelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateLevelMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateLevelMutation,
    CreateLevelMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateLevelMutation,
    CreateLevelMutationVariables
  >(CreateLevelDocument, baseOptions)
}
export type CreateLevelMutationHookResult = ReturnType<
  typeof useCreateLevelMutation
>
export type CreateLevelMutationResult = ApolloReactCommon.MutationResult<
  CreateLevelMutation
>
export type CreateLevelMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateLevelMutation,
  CreateLevelMutationVariables
>
export const UpdateLevelDocument = gql`
  mutation UpdateLevel($levelId: String!, $data: UpdateLevelInput!) {
    updateLevel(levelId: $levelId, data: $data) {
      ...CourseLevel
    }
  }
  ${CourseLevelFragmentDoc}
`

/**
 * __useUpdateLevelMutation__
 *
 * To run a mutation, you first call `useUpdateLevelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLevelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLevelMutation, { data, loading, error }] = useUpdateLevelMutation({
 *   variables: {
 *      levelId: // value for 'levelId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateLevelMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateLevelMutation,
    UpdateLevelMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateLevelMutation,
    UpdateLevelMutationVariables
  >(UpdateLevelDocument, baseOptions)
}
export type UpdateLevelMutationHookResult = ReturnType<
  typeof useUpdateLevelMutation
>
export type UpdateLevelMutationResult = ApolloReactCommon.MutationResult<
  UpdateLevelMutation
>
export type UpdateLevelMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateLevelMutation,
  UpdateLevelMutationVariables
>
export const DestroyLevelDocument = gql`
  mutation DestroyLevel($levelId: String!) {
    destroyLevel(levelId: $levelId)
  }
`

/**
 * __useDestroyLevelMutation__
 *
 * To run a mutation, you first call `useDestroyLevelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyLevelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyLevelMutation, { data, loading, error }] = useDestroyLevelMutation({
 *   variables: {
 *      levelId: // value for 'levelId'
 *   },
 * });
 */
export function useDestroyLevelMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyLevelMutation,
    DestroyLevelMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyLevelMutation,
    DestroyLevelMutationVariables
  >(DestroyLevelDocument, baseOptions)
}
export type DestroyLevelMutationHookResult = ReturnType<
  typeof useDestroyLevelMutation
>
export type DestroyLevelMutationResult = ApolloReactCommon.MutationResult<
  DestroyLevelMutation
>
export type DestroyLevelMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyLevelMutation,
  DestroyLevelMutationVariables
>
export const CreateLevelTaskOptionDocument = gql`
  mutation CreateLevelTaskOption($data: CreateLevelTaskOptionInput!) {
    createLevelTaskOption(data: $data) {
      ...LevelTaskOptionItem
    }
  }
  ${LevelTaskOptionItemFragmentDoc}
`

/**
 * __useCreateLevelTaskOptionMutation__
 *
 * To run a mutation, you first call `useCreateLevelTaskOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLevelTaskOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLevelTaskOptionMutation, { data, loading, error }] = useCreateLevelTaskOptionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateLevelTaskOptionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateLevelTaskOptionMutation,
    CreateLevelTaskOptionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateLevelTaskOptionMutation,
    CreateLevelTaskOptionMutationVariables
  >(CreateLevelTaskOptionDocument, baseOptions)
}
export type CreateLevelTaskOptionMutationHookResult = ReturnType<
  typeof useCreateLevelTaskOptionMutation
>
export type CreateLevelTaskOptionMutationResult = ApolloReactCommon.MutationResult<
  CreateLevelTaskOptionMutation
>
export type CreateLevelTaskOptionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateLevelTaskOptionMutation,
  CreateLevelTaskOptionMutationVariables
>
export const CreateOptionDocument = gql`
  mutation CreateOption($data: CreateOptionInput!) {
    createOption(data: $data) {
      id
      label
      description
      fullDescription
      videoUrl
    }
  }
`

/**
 * __useCreateOptionMutation__
 *
 * To run a mutation, you first call `useCreateOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOptionMutation, { data, loading, error }] = useCreateOptionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOptionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateOptionMutation,
    CreateOptionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateOptionMutation,
    CreateOptionMutationVariables
  >(CreateOptionDocument, baseOptions)
}
export type CreateOptionMutationHookResult = ReturnType<
  typeof useCreateOptionMutation
>
export type CreateOptionMutationResult = ApolloReactCommon.MutationResult<
  CreateOptionMutation
>
export type CreateOptionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateOptionMutation,
  CreateOptionMutationVariables
>
export const GetLevelTasksDocument = gql`
  query GetLevelTasks($levelId: String!) {
    getLevel(levelId: $levelId) {
      id
      levelTasks {
        ...LevelTaskItem
      }
    }
  }
  ${LevelTaskItemFragmentDoc}
`

/**
 * __useGetLevelTasksQuery__
 *
 * To run a query within a React component, call `useGetLevelTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLevelTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLevelTasksQuery({
 *   variables: {
 *      levelId: // value for 'levelId'
 *   },
 * });
 */
export function useGetLevelTasksQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetLevelTasksQuery,
    GetLevelTasksQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetLevelTasksQuery,
    GetLevelTasksQueryVariables
  >(GetLevelTasksDocument, baseOptions)
}
export function useGetLevelTasksLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetLevelTasksQuery,
    GetLevelTasksQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetLevelTasksQuery,
    GetLevelTasksQueryVariables
  >(GetLevelTasksDocument, baseOptions)
}
export type GetLevelTasksQueryHookResult = ReturnType<
  typeof useGetLevelTasksQuery
>
export type GetLevelTasksLazyQueryHookResult = ReturnType<
  typeof useGetLevelTasksLazyQuery
>
export type GetLevelTasksQueryResult = ApolloReactCommon.QueryResult<
  GetLevelTasksQuery,
  GetLevelTasksQueryVariables
>
export const CreateLevelTaskDocument = gql`
  mutation CreateLevelTask($data: CreateLevelTaskInput!) {
    createLevelTask(data: $data) {
      ...LevelTaskItem
    }
  }
  ${LevelTaskItemFragmentDoc}
`

/**
 * __useCreateLevelTaskMutation__
 *
 * To run a mutation, you first call `useCreateLevelTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLevelTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLevelTaskMutation, { data, loading, error }] = useCreateLevelTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateLevelTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateLevelTaskMutation,
    CreateLevelTaskMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateLevelTaskMutation,
    CreateLevelTaskMutationVariables
  >(CreateLevelTaskDocument, baseOptions)
}
export type CreateLevelTaskMutationHookResult = ReturnType<
  typeof useCreateLevelTaskMutation
>
export type CreateLevelTaskMutationResult = ApolloReactCommon.MutationResult<
  CreateLevelTaskMutation
>
export type CreateLevelTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateLevelTaskMutation,
  CreateLevelTaskMutationVariables
>
export const DestroyOptionDocument = gql`
  mutation DestroyOption($optionId: String!) {
    destroyOption(optionId: $optionId)
  }
`

/**
 * __useDestroyOptionMutation__
 *
 * To run a mutation, you first call `useDestroyOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyOptionMutation, { data, loading, error }] = useDestroyOptionMutation({
 *   variables: {
 *      optionId: // value for 'optionId'
 *   },
 * });
 */
export function useDestroyOptionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyOptionMutation,
    DestroyOptionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyOptionMutation,
    DestroyOptionMutationVariables
  >(DestroyOptionDocument, baseOptions)
}
export type DestroyOptionMutationHookResult = ReturnType<
  typeof useDestroyOptionMutation
>
export type DestroyOptionMutationResult = ApolloReactCommon.MutationResult<
  DestroyOptionMutation
>
export type DestroyOptionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyOptionMutation,
  DestroyOptionMutationVariables
>
export const DestroyLevelTaskOptionDocument = gql`
  mutation DestroyLevelTaskOption($levelTaskOptionId: String!) {
    destroyLevelTaskOption(levelTaskOptionId: $levelTaskOptionId)
  }
`

/**
 * __useDestroyLevelTaskOptionMutation__
 *
 * To run a mutation, you first call `useDestroyLevelTaskOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyLevelTaskOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyLevelTaskOptionMutation, { data, loading, error }] = useDestroyLevelTaskOptionMutation({
 *   variables: {
 *      levelTaskOptionId: // value for 'levelTaskOptionId'
 *   },
 * });
 */
export function useDestroyLevelTaskOptionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyLevelTaskOptionMutation,
    DestroyLevelTaskOptionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyLevelTaskOptionMutation,
    DestroyLevelTaskOptionMutationVariables
  >(DestroyLevelTaskOptionDocument, baseOptions)
}
export type DestroyLevelTaskOptionMutationHookResult = ReturnType<
  typeof useDestroyLevelTaskOptionMutation
>
export type DestroyLevelTaskOptionMutationResult = ApolloReactCommon.MutationResult<
  DestroyLevelTaskOptionMutation
>
export type DestroyLevelTaskOptionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyLevelTaskOptionMutation,
  DestroyLevelTaskOptionMutationVariables
>
export const UpdateOptionDocument = gql`
  mutation UpdateOption($optionId: String!, $data: UpdateOptionInput!) {
    updateOption(optionId: $optionId, data: $data) {
      ...OptionItem
    }
  }
  ${OptionItemFragmentDoc}
`

/**
 * __useUpdateOptionMutation__
 *
 * To run a mutation, you first call `useUpdateOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOptionMutation, { data, loading, error }] = useUpdateOptionMutation({
 *   variables: {
 *      optionId: // value for 'optionId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOptionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateOptionMutation,
    UpdateOptionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateOptionMutation,
    UpdateOptionMutationVariables
  >(UpdateOptionDocument, baseOptions)
}
export type UpdateOptionMutationHookResult = ReturnType<
  typeof useUpdateOptionMutation
>
export type UpdateOptionMutationResult = ApolloReactCommon.MutationResult<
  UpdateOptionMutation
>
export type UpdateOptionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateOptionMutation,
  UpdateOptionMutationVariables
>
export const GetOptionsDocument = gql`
  query GetOptions {
    getAllOptions {
      ...OptionItem
    }
  }
  ${OptionItemFragmentDoc}
`

/**
 * __useGetOptionsQuery__
 *
 * To run a query within a React component, call `useGetOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOptionsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetOptionsQuery,
    GetOptionsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetOptionsQuery, GetOptionsQueryVariables>(
    GetOptionsDocument,
    baseOptions,
  )
}
export function useGetOptionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetOptionsQuery,
    GetOptionsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetOptionsQuery,
    GetOptionsQueryVariables
  >(GetOptionsDocument, baseOptions)
}
export type GetOptionsQueryHookResult = ReturnType<typeof useGetOptionsQuery>
export type GetOptionsLazyQueryHookResult = ReturnType<
  typeof useGetOptionsLazyQuery
>
export type GetOptionsQueryResult = ApolloReactCommon.QueryResult<
  GetOptionsQuery,
  GetOptionsQueryVariables
>
export const UpdateLevelTaskOptionDocument = gql`
  mutation UpdateLevelTaskOption(
    $levelTaskOptionId: String!
    $data: UpdateLevelTaskOptionInput!
  ) {
    updateLevelTaskOption(levelTaskOptionId: $levelTaskOptionId, data: $data) {
      ...LevelTaskOptionItem
    }
  }
  ${LevelTaskOptionItemFragmentDoc}
`

/**
 * __useUpdateLevelTaskOptionMutation__
 *
 * To run a mutation, you first call `useUpdateLevelTaskOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLevelTaskOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLevelTaskOptionMutation, { data, loading, error }] = useUpdateLevelTaskOptionMutation({
 *   variables: {
 *      levelTaskOptionId: // value for 'levelTaskOptionId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateLevelTaskOptionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateLevelTaskOptionMutation,
    UpdateLevelTaskOptionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateLevelTaskOptionMutation,
    UpdateLevelTaskOptionMutationVariables
  >(UpdateLevelTaskOptionDocument, baseOptions)
}
export type UpdateLevelTaskOptionMutationHookResult = ReturnType<
  typeof useUpdateLevelTaskOptionMutation
>
export type UpdateLevelTaskOptionMutationResult = ApolloReactCommon.MutationResult<
  UpdateLevelTaskOptionMutation
>
export type UpdateLevelTaskOptionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateLevelTaskOptionMutation,
  UpdateLevelTaskOptionMutationVariables
>
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
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, baseOptions)
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<
  ForgotPasswordMutation
>
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>
export const CreateCustomUserTaskDocument = gql`
  mutation CreateCustomUserTask($data: CreateCustomUserTaskInput!) {
    createCustomUserTask(data: $data) {
      id
      description
      fullDescription
    }
  }
`

/**
 * __useCreateCustomUserTaskMutation__
 *
 * To run a mutation, you first call `useCreateCustomUserTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomUserTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomUserTaskMutation, { data, loading, error }] = useCreateCustomUserTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCustomUserTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateCustomUserTaskMutation,
    CreateCustomUserTaskMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateCustomUserTaskMutation,
    CreateCustomUserTaskMutationVariables
  >(CreateCustomUserTaskDocument, baseOptions)
}
export type CreateCustomUserTaskMutationHookResult = ReturnType<
  typeof useCreateCustomUserTaskMutation
>
export type CreateCustomUserTaskMutationResult = ApolloReactCommon.MutationResult<
  CreateCustomUserTaskMutation
>
export type CreateCustomUserTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCustomUserTaskMutation,
  CreateCustomUserTaskMutationVariables
>
export const EndMyCourseDocument = gql`
  mutation EndMyCourse($hasFailed: Boolean!) {
    endMyCourse(hasFailed: $hasFailed) {
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
 *      hasFailed: // value for 'hasFailed'
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
export const DestroyUserTaskDocument = gql`
  mutation DestroyUserTask($taskId: String!) {
    destroyUserTask(taskId: $taskId)
  }
`

/**
 * __useDestroyUserTaskMutation__
 *
 * To run a mutation, you first call `useDestroyUserTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyUserTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyUserTaskMutation, { data, loading, error }] = useDestroyUserTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDestroyUserTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyUserTaskMutation,
    DestroyUserTaskMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyUserTaskMutation,
    DestroyUserTaskMutationVariables
  >(DestroyUserTaskDocument, baseOptions)
}
export type DestroyUserTaskMutationHookResult = ReturnType<
  typeof useDestroyUserTaskMutation
>
export type DestroyUserTaskMutationResult = ApolloReactCommon.MutationResult<
  DestroyUserTaskMutation
>
export type DestroyUserTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyUserTaskMutation,
  DestroyUserTaskMutationVariables
>
export const UpdateUserGroupMessageDocument = gql`
  mutation UpdateUserGroupMessage(
    $userGroupMessageId: String!
    $data: UpdateUserGroupMessageInput!
    $updateToNextMessage: Boolean!
  ) {
    updateUserGroupMessage(
      userGroupMessageId: $userGroupMessageId
      data: $data
      updateToNextMessage: $updateToNextMessage
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
 *      updateToNextMessage: // value for 'updateToNextMessage'
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
      tasks {
        ...UserTaskItem
      }
    }
  }
  ${LevelRewardFragmentDoc}
  ${UserTaskItemFragmentDoc}
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
      mentor {
        ...MentorItem
        firstName
      }
    }
  }
  ${GroupItemFragmentDoc}
  ${MentorItemFragmentDoc}
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
export const ResetPasswordDocument = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument, baseOptions)
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<
  ResetPasswordMutation
>
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
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
