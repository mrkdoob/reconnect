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
  slug: Scalars["String"]
  category: Scalars["String"]
  description: Scalars["String"]
  fullDescription?: Maybe<Scalars["String"]>
  duration?: Maybe<Scalars["Int"]>
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
  duration?: Maybe<Scalars["Float"]>
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
  endDate?: Maybe<Scalars["DateTime"]>
  courseId: Scalars["String"]
  rewardType: Scalars["String"]
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
  avatarUrl?: Maybe<Scalars["String"]>
}

export type CreateUserBoosterInput = {
  sponsorAmount?: Maybe<Scalars["Float"]>
  coinReward?: Maybe<Scalars["Float"]>
  rewardsEarned?: Maybe<Scalars["Float"]>
  coinsEarned?: Maybe<Scalars["Float"]>
  isActive?: Maybe<Scalars["Boolean"]>
  sponsorEmail?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  sponsorId?: Maybe<Scalars["String"]>
}

export type CreateUserCourseInput = {
  courseId: Scalars["String"]
  isActive: Scalars["Boolean"]
  userId: Scalars["String"]
}

export type CreateUserGroupMessageInput = {
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
  coinsForReward: Scalars["Int"]
  groupCoins: Scalars["Int"]
  rewardType: Scalars["String"]
  startDate?: Maybe<Scalars["DateTime"]>
  endDate?: Maybe<Scalars["DateTime"]>
  groupSize?: Maybe<Scalars["Int"]>
  courseId: Scalars["String"]
  users?: Maybe<Array<User>>
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
  createLevel: Level
  updateLevel?: Maybe<Level>
  destroyLevel: Scalars["Boolean"]
  createLevelTask: LevelTask
  updateLevelTask?: Maybe<LevelTask>
  destroyLevelTask: Scalars["Boolean"]
  createLevelTaskOption: LevelTaskOption
  updateLevelTaskOption?: Maybe<LevelTaskOption>
  destroyLevelTaskOption: Scalars["Boolean"]
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
  createUserBooster: UserBooster
  updateUserBooster?: Maybe<UserBooster>
  updateCurrentUserBooster?: Maybe<UserBooster>
  destroyUserBooster: Scalars["Boolean"]
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

export type MutationCreateUserBoosterArgs = {
  data: CreateUserBoosterInput
}

export type MutationUpdateUserBoosterArgs = {
  data: UpdateUserBoosterInput
  userBoosterId: Scalars["String"]
}

export type MutationUpdateCurrentUserBoosterArgs = {
  sendSponsorInviteEmail: Scalars["Boolean"]
  data: UpdateUserBoosterInput
}

export type MutationDestroyUserBoosterArgs = {
  userBoosterId: Scalars["String"]
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
  avatarUrl: Scalars["String"]
  createdBy?: Maybe<Scalars["String"]>
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
  getLevel: Level
  getAllLevels: Array<Level>
  getLevelTask: LevelTask
  getAllLevelTasks: Array<LevelTask>
  getAllLevelTasksByLevelId: Array<LevelTask>
  getLevelTaskOption: LevelTaskOption
  getAllLevelTaskOptions: Array<LevelTaskOption>
  getAllLevelTaskOptionsByLevelId: Array<LevelTaskOption>
  dailyReset: Scalars["Boolean"]
  getAllUsers: Array<User>
  getUser?: Maybe<User>
  me?: Maybe<User>
  getMessage: Message
  getCourseMessages: Array<Message>
  getOption: Option
  getAllOptions: Array<Option>
  getPet: Pet
  getAllPets: Array<Pet>
  getUserBooster: UserBooster
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

export type QueryDailyResetArgs = {
  repeatDaily: Scalars["Boolean"]
  delay: Scalars["Float"]
}

export type QueryGetUserArgs = {
  userId: Scalars["String"]
}

export type QueryGetMessageArgs = {
  messageId: Scalars["String"]
}

export type QueryGetCourseMessagesArgs = {
  courseId: Scalars["String"]
}

export type QueryGetOptionArgs = {
  optionId: Scalars["String"]
}

export type QueryGetPetArgs = {
  petId: Scalars["String"]
}

export type QueryGetUserBoosterArgs = {
  userBoosterId: Scalars["String"]
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
  duration?: Maybe<Scalars["Float"]>
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
  coinsForReward?: Maybe<Scalars["Float"]>
  groupCoins?: Maybe<Scalars["Float"]>
  rewardType?: Maybe<Scalars["String"]>
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
  avatarUrl?: Maybe<Scalars["String"]>
}

export type UpdateUserBoosterInput = {
  sponsorAmount?: Maybe<Scalars["Float"]>
  coinReward?: Maybe<Scalars["Float"]>
  treesEarned?: Maybe<Scalars["Float"]>
  mealsEarned?: Maybe<Scalars["Float"]>
  coinsEarned?: Maybe<Scalars["Float"]>
  boostDays?: Maybe<Scalars["Float"]>
  sponsorEmail?: Maybe<Scalars["String"]>
  sponsorAccepted?: Maybe<Scalars["Boolean"]>
  userId?: Maybe<Scalars["String"]>
  sponsorId?: Maybe<Scalars["String"]>
}

export type UpdateUserCourseInput = {
  courseId?: Maybe<Scalars["String"]>
  isActive?: Maybe<Scalars["Boolean"]>
  finishedRewardCount?: Maybe<Scalars["Float"]>
}

export type UpdateUserGroupMessageInput = {
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
  activeUserCourse?: Maybe<UserCourse>
  userLevel?: Maybe<UserLevel>
  group?: Maybe<Group>
  userGroupMessage?: Maybe<UserGroupMessage>
  userDayReward?: Maybe<UserDayReward>
  userPet?: Maybe<UserPet>
  userBooster?: Maybe<UserBooster>
}

export type UserBooster = {
  __typename?: "UserBooster"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  sponsorAmount: Scalars["Int"]
  coinReward: Scalars["Int"]
  boostDays: Scalars["Int"]
  treesEarned: Scalars["Int"]
  mealsEarned: Scalars["Int"]
  coinsEarned: Scalars["Int"]
  sponsorAccepted: Scalars["Boolean"]
  sponsorEmail?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  sponsorId?: Maybe<Scalars["String"]>
  user?: Maybe<User>
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
  messageId?: Maybe<Scalars["String"]>
  userId: Scalars["String"]
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

export type CreateMessageMutationVariables = {
  data: CreateMessageInput
}

export type CreateMessageMutation = { __typename?: "Mutation" } & {
  createMessage: { __typename?: "Message" } & MessageFragment
}

export type UpdateMessageMutationVariables = {
  messageId: Scalars["String"]
  data: UpdateMessageInput
}

export type UpdateMessageMutation = { __typename?: "Mutation" } & {
  updateMessage?: Maybe<{ __typename?: "Message" } & MessageFragment>
}

export type MessageFragment = { __typename?: "Message" } & Pick<
  Message,
  | "id"
  | "message"
  | "order"
  | "pictureUrl"
  | "videoUrl"
  | "fullHeightPic"
  | "courseId"
>

export type DestroyMessageMutationVariables = {
  messageId: Scalars["String"]
}

export type DestroyMessageMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyMessage"
>

export type GetAdminCourseMessagesQueryVariables = {
  courseId: Scalars["String"]
}

export type GetAdminCourseMessagesQuery = { __typename?: "Query" } & {
  getCourseMessages: Array<{ __typename?: "Message" } & MessageFragment>
}

export type GetPetsQueryVariables = {}

export type GetPetsQuery = { __typename?: "Query" } & {
  getAllPets: Array<{ __typename?: "Pet" } & PetItemFragment>
}

export type CreatePetMutationVariables = {
  data: CreatePetInput
}

export type CreatePetMutation = { __typename?: "Mutation" } & {
  createPet: { __typename?: "Pet" } & PetItemFragment
}

export type DestroyPetMutationVariables = {
  petId: Scalars["String"]
}

export type DestroyPetMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyPet"
>

export type UpdatePetMutationVariables = {
  petId: Scalars["String"]
  data: UpdatePetInput
}

export type UpdatePetMutation = { __typename?: "Mutation" } & {
  updatePet?: Maybe<{ __typename?: "Pet" } & PetItemFragment>
}

export type CreateCourseMutationVariables = {
  data: CreateCourseInput
}

export type CreateCourseMutation = { __typename?: "Mutation" } & {
  createCourse: { __typename?: "Course" } & CourseItemFragment
}

export type CreateCourseDayRewardMutationVariables = {
  data: CreateCourseDayRewardInput
}

export type CreateCourseDayRewardMutation = { __typename?: "Mutation" } & {
  createCourseDayReward: {
    __typename?: "CourseDayReward"
  } & CourseDayRewardFragment
}

export type UpdateCourseDayRewardMutationVariables = {
  courseDayRewardId: Scalars["String"]
  data: UpdateCourseDayRewardInput
}

export type UpdateCourseDayRewardMutation = { __typename?: "Mutation" } & {
  updateCourseDayReward?: Maybe<
    { __typename?: "CourseDayReward" } & CourseDayRewardFragment
  >
}

export type CourseDayRewardFragment = { __typename?: "CourseDayReward" } & Pick<
  CourseDayReward,
  "id" | "order" | "description" | "pictureUrl" | "videoUrl" | "courseId"
>

export type DestroyRewardMutationVariables = {
  courseDayRewardId: Scalars["String"]
}

export type DestroyRewardMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyCourseDayReward"
>

export type GetCourseRewardsQueryVariables = {
  courseId: Scalars["String"]
}

export type GetCourseRewardsQuery = { __typename?: "Query" } & {
  getCourse: { __typename?: "Course" } & Pick<Course, "id"> & {
      courseDayRewards?: Maybe<
        Array<{ __typename?: "CourseDayReward" } & CourseDayRewardFragment>
      >
    }
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
  | "petId"
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

export type DestroyLevelTaskMutationVariables = {
  levelTaskId: Scalars["String"]
}

export type DestroyLevelTaskMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyLevelTask"
>

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

export type UserDayRewardItemFragment = { __typename?: "UserDayReward" } & Pick<
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

export type UserBoosterItemFragment = { __typename?: "UserBooster" } & Pick<
  UserBooster,
  | "id"
  | "sponsorAmount"
  | "coinReward"
  | "treesEarned"
  | "mealsEarned"
  | "coinsEarned"
  | "sponsorEmail"
  | "sponsorId"
  | "sponsorAccepted"
>

export type UpdateMyBoosterMutationVariables = {
  data: UpdateUserBoosterInput
  sendSponsorInviteEmail: Scalars["Boolean"]
}

export type UpdateMyBoosterMutation = { __typename?: "Mutation" } & {
  updateCurrentUserBooster?: Maybe<
    { __typename?: "UserBooster" } & UserBoosterItemFragment
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
  | "groupCoins"
  | "rewardType"
> & {
    users?: Maybe<Array<{ __typename?: "User" } & GroupUserTaskItemFragment>>
  }

export type GroupUserTaskItemFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "avatar" | "groupOrder"
> & {
    userBooster?: Maybe<
      { __typename?: "UserBooster" } & Pick<
        UserBooster,
        "id" | "coinReward" | "treesEarned" | "mealsEarned"
      >
    >
  }

export type GetUsersQueryVariables = {}

export type GetUsersQuery = { __typename?: "Query" } & {
  getAllUsers: Array<{ __typename?: "User" } & GroupUserTaskItemFragment>
}

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
  "id" | "description" | "name" | "levelNumber" | "avatarUrl" | "createdBy"
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
                | "id"
                | "label"
                | "description"
                | "fullDescription"
                | "videoUrl"
                | "createdByAdmin"
              >
            >
          }
      >
    >
    option?: Maybe<
      { __typename?: "Option" } & Pick<
        Option,
        | "id"
        | "label"
        | "description"
        | "fullDescription"
        | "videoUrl"
        | "createdByAdmin"
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
    userBooster?: Maybe<
      { __typename?: "UserBooster" } & UserBoosterItemFragment
    >
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
    userDayReward?: Maybe<
      { __typename?: "UserDayReward" } & UserDayRewardItemFragment
    >
    userBooster?: Maybe<
      { __typename?: "UserBooster" } & UserBoosterItemFragment
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
  courseBySlug: { __typename?: "Course" } & Pick<Course, "id" | "duration"> & {
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
  "id" | "slug"
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
  "id" | "firstName" | "lastName" | "email" | "avatar" | "groupId" | "bio"
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

export type UserBoosterSponsorItemFragment = {
  __typename?: "UserBooster"
} & Pick<UserBooster, "id" | "sponsorAmount"> & {
    user?: Maybe<
      { __typename?: "User" } & Pick<
        User,
        "id" | "fullName" | "firstName" | "avatar"
      > & {
          activeUserCourse?: Maybe<
            { __typename?: "UserCourse" } & Pick<UserCourse, "id"> & {
                course?: Maybe<
                  { __typename?: "Course" } & Pick<
                    Course,
                    "id" | "slug" | "name"
                  >
                >
              }
          >
        }
    >
  }

export type UpdateBoosterMutationVariables = {
  userBoosterId: Scalars["String"]
  data: UpdateUserBoosterInput
}

export type UpdateBoosterMutation = { __typename?: "Mutation" } & {
  updateUserBooster?: Maybe<
    { __typename?: "UserBooster" } & UserBoosterItemFragment
  >
}

export type GetBoosterQueryVariables = {
  userBoosterId: Scalars["String"]
}

export type GetBoosterQuery = { __typename?: "Query" } & {
  getUserBooster: {
    __typename?: "UserBooster"
  } & UserBoosterSponsorItemFragment
}

export const MessageFragmentDoc = gql`
  fragment Message on Message {
    id
    message
    order
    pictureUrl
    videoUrl
    fullHeightPic
    courseId
  }
`
export const CourseDayRewardFragmentDoc = gql`
  fragment CourseDayReward on CourseDayReward {
    id
    order
    description
    pictureUrl
    videoUrl
    courseId
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
    userBooster {
      id
      coinReward
      treesEarned
      mealsEarned
    }
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
export const UserBoosterItemFragmentDoc = gql`
  fragment UserBoosterItem on UserBooster {
    id
    sponsorAmount
    coinReward
    treesEarned
    mealsEarned
    coinsEarned
    sponsorEmail
    sponsorId
    sponsorAccepted
  }
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
    userBooster {
      ...UserBoosterItem
    }
  }
  ${UserGroupItemFragmentDoc}
  ${UserBoosterItemFragmentDoc}
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
    petId
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
        createdByAdmin
      }
    }
    option {
      id
      label
      description
      fullDescription
      videoUrl
      createdByAdmin
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
    avatarUrl
    createdBy
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
export const UserDayRewardItemFragmentDoc = gql`
  fragment UserDayRewardItem on UserDayReward {
    id
    courseDayReward {
      id
      description
      pictureUrl
      videoUrl
    }
  }
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
    userDayReward {
      ...UserDayRewardItem
    }
    userBooster {
      ...UserBoosterItem
    }
  }
  ${UserTaskItemFragmentDoc}
  ${UserGroupItemFragmentDoc}
  ${UserLevelItemFragmentDoc}
  ${UserGroupMessageFragmentDoc}
  ${UserPetItemFragmentDoc}
  ${UserDayRewardItemFragmentDoc}
  ${UserBoosterItemFragmentDoc}
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
    slug
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
    bio
    userGroupMessage {
      id
      showOption
    }
  }
`
export const UserBoosterSponsorItemFragmentDoc = gql`
  fragment UserBoosterSponsorItem on UserBooster {
    id
    sponsorAmount
    user {
      id
      fullName
      firstName
      avatar
      activeUserCourse {
        id
        course {
          id
          slug
          name
        }
      }
    }
  }
`
export const CreateMessageDocument = gql`
  mutation CreateMessage($data: CreateMessageInput!) {
    createMessage(data: $data) {
      ...Message
    }
  }
  ${MessageFragmentDoc}
`

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(CreateMessageDocument, baseOptions)
}
export type CreateMessageMutationHookResult = ReturnType<
  typeof useCreateMessageMutation
>
export type CreateMessageMutationResult = ApolloReactCommon.MutationResult<
  CreateMessageMutation
>
export type CreateMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateMessageMutation,
  CreateMessageMutationVariables
>
export const UpdateMessageDocument = gql`
  mutation UpdateMessage($messageId: String!, $data: UpdateMessageInput!) {
    updateMessage(messageId: $messageId, data: $data) {
      ...Message
    }
  }
  ${MessageFragmentDoc}
`

/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateMessageMutation,
    UpdateMessageMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateMessageMutation,
    UpdateMessageMutationVariables
  >(UpdateMessageDocument, baseOptions)
}
export type UpdateMessageMutationHookResult = ReturnType<
  typeof useUpdateMessageMutation
>
export type UpdateMessageMutationResult = ApolloReactCommon.MutationResult<
  UpdateMessageMutation
>
export type UpdateMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateMessageMutation,
  UpdateMessageMutationVariables
>
export const DestroyMessageDocument = gql`
  mutation DestroyMessage($messageId: String!) {
    destroyMessage(messageId: $messageId)
  }
`

/**
 * __useDestroyMessageMutation__
 *
 * To run a mutation, you first call `useDestroyMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyMessageMutation, { data, loading, error }] = useDestroyMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDestroyMessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyMessageMutation,
    DestroyMessageMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyMessageMutation,
    DestroyMessageMutationVariables
  >(DestroyMessageDocument, baseOptions)
}
export type DestroyMessageMutationHookResult = ReturnType<
  typeof useDestroyMessageMutation
>
export type DestroyMessageMutationResult = ApolloReactCommon.MutationResult<
  DestroyMessageMutation
>
export type DestroyMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyMessageMutation,
  DestroyMessageMutationVariables
>
export const GetAdminCourseMessagesDocument = gql`
  query GetAdminCourseMessages($courseId: String!) {
    getCourseMessages(courseId: $courseId) {
      ...Message
    }
  }
  ${MessageFragmentDoc}
`

/**
 * __useGetAdminCourseMessagesQuery__
 *
 * To run a query within a React component, call `useGetAdminCourseMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminCourseMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminCourseMessagesQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useGetAdminCourseMessagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAdminCourseMessagesQuery,
    GetAdminCourseMessagesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetAdminCourseMessagesQuery,
    GetAdminCourseMessagesQueryVariables
  >(GetAdminCourseMessagesDocument, baseOptions)
}
export function useGetAdminCourseMessagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAdminCourseMessagesQuery,
    GetAdminCourseMessagesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetAdminCourseMessagesQuery,
    GetAdminCourseMessagesQueryVariables
  >(GetAdminCourseMessagesDocument, baseOptions)
}
export type GetAdminCourseMessagesQueryHookResult = ReturnType<
  typeof useGetAdminCourseMessagesQuery
>
export type GetAdminCourseMessagesLazyQueryHookResult = ReturnType<
  typeof useGetAdminCourseMessagesLazyQuery
>
export type GetAdminCourseMessagesQueryResult = ApolloReactCommon.QueryResult<
  GetAdminCourseMessagesQuery,
  GetAdminCourseMessagesQueryVariables
>
export const GetPetsDocument = gql`
  query GetPets {
    getAllPets {
      ...PetItem
    }
  }
  ${PetItemFragmentDoc}
`

/**
 * __useGetPetsQuery__
 *
 * To run a query within a React component, call `useGetPetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPetsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPetsQuery,
    GetPetsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetPetsQuery, GetPetsQueryVariables>(
    GetPetsDocument,
    baseOptions,
  )
}
export function useGetPetsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPetsQuery,
    GetPetsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetPetsQuery, GetPetsQueryVariables>(
    GetPetsDocument,
    baseOptions,
  )
}
export type GetPetsQueryHookResult = ReturnType<typeof useGetPetsQuery>
export type GetPetsLazyQueryHookResult = ReturnType<typeof useGetPetsLazyQuery>
export type GetPetsQueryResult = ApolloReactCommon.QueryResult<
  GetPetsQuery,
  GetPetsQueryVariables
>
export const CreatePetDocument = gql`
  mutation CreatePet($data: CreatePetInput!) {
    createPet(data: $data) {
      ...PetItem
    }
  }
  ${PetItemFragmentDoc}
`

/**
 * __useCreatePetMutation__
 *
 * To run a mutation, you first call `useCreatePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPetMutation, { data, loading, error }] = useCreatePetMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePetMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePetMutation,
    CreatePetMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreatePetMutation,
    CreatePetMutationVariables
  >(CreatePetDocument, baseOptions)
}
export type CreatePetMutationHookResult = ReturnType<
  typeof useCreatePetMutation
>
export type CreatePetMutationResult = ApolloReactCommon.MutationResult<
  CreatePetMutation
>
export type CreatePetMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePetMutation,
  CreatePetMutationVariables
>
export const DestroyPetDocument = gql`
  mutation DestroyPet($petId: String!) {
    destroyPet(petId: $petId)
  }
`

/**
 * __useDestroyPetMutation__
 *
 * To run a mutation, you first call `useDestroyPetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyPetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyPetMutation, { data, loading, error }] = useDestroyPetMutation({
 *   variables: {
 *      petId: // value for 'petId'
 *   },
 * });
 */
export function useDestroyPetMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyPetMutation,
    DestroyPetMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyPetMutation,
    DestroyPetMutationVariables
  >(DestroyPetDocument, baseOptions)
}
export type DestroyPetMutationHookResult = ReturnType<
  typeof useDestroyPetMutation
>
export type DestroyPetMutationResult = ApolloReactCommon.MutationResult<
  DestroyPetMutation
>
export type DestroyPetMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyPetMutation,
  DestroyPetMutationVariables
>
export const UpdatePetDocument = gql`
  mutation UpdatePet($petId: String!, $data: UpdatePetInput!) {
    updatePet(petId: $petId, data: $data) {
      ...PetItem
    }
  }
  ${PetItemFragmentDoc}
`

/**
 * __useUpdatePetMutation__
 *
 * To run a mutation, you first call `useUpdatePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePetMutation, { data, loading, error }] = useUpdatePetMutation({
 *   variables: {
 *      petId: // value for 'petId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePetMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdatePetMutation,
    UpdatePetMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdatePetMutation,
    UpdatePetMutationVariables
  >(UpdatePetDocument, baseOptions)
}
export type UpdatePetMutationHookResult = ReturnType<
  typeof useUpdatePetMutation
>
export type UpdatePetMutationResult = ApolloReactCommon.MutationResult<
  UpdatePetMutation
>
export type UpdatePetMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePetMutation,
  UpdatePetMutationVariables
>
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
export const CreateCourseDayRewardDocument = gql`
  mutation CreateCourseDayReward($data: CreateCourseDayRewardInput!) {
    createCourseDayReward(data: $data) {
      ...CourseDayReward
    }
  }
  ${CourseDayRewardFragmentDoc}
`

/**
 * __useCreateCourseDayRewardMutation__
 *
 * To run a mutation, you first call `useCreateCourseDayRewardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseDayRewardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseDayRewardMutation, { data, loading, error }] = useCreateCourseDayRewardMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCourseDayRewardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateCourseDayRewardMutation,
    CreateCourseDayRewardMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateCourseDayRewardMutation,
    CreateCourseDayRewardMutationVariables
  >(CreateCourseDayRewardDocument, baseOptions)
}
export type CreateCourseDayRewardMutationHookResult = ReturnType<
  typeof useCreateCourseDayRewardMutation
>
export type CreateCourseDayRewardMutationResult = ApolloReactCommon.MutationResult<
  CreateCourseDayRewardMutation
>
export type CreateCourseDayRewardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCourseDayRewardMutation,
  CreateCourseDayRewardMutationVariables
>
export const UpdateCourseDayRewardDocument = gql`
  mutation UpdateCourseDayReward(
    $courseDayRewardId: String!
    $data: UpdateCourseDayRewardInput!
  ) {
    updateCourseDayReward(courseDayRewardId: $courseDayRewardId, data: $data) {
      ...CourseDayReward
    }
  }
  ${CourseDayRewardFragmentDoc}
`

/**
 * __useUpdateCourseDayRewardMutation__
 *
 * To run a mutation, you first call `useUpdateCourseDayRewardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseDayRewardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseDayRewardMutation, { data, loading, error }] = useUpdateCourseDayRewardMutation({
 *   variables: {
 *      courseDayRewardId: // value for 'courseDayRewardId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCourseDayRewardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateCourseDayRewardMutation,
    UpdateCourseDayRewardMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateCourseDayRewardMutation,
    UpdateCourseDayRewardMutationVariables
  >(UpdateCourseDayRewardDocument, baseOptions)
}
export type UpdateCourseDayRewardMutationHookResult = ReturnType<
  typeof useUpdateCourseDayRewardMutation
>
export type UpdateCourseDayRewardMutationResult = ApolloReactCommon.MutationResult<
  UpdateCourseDayRewardMutation
>
export type UpdateCourseDayRewardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCourseDayRewardMutation,
  UpdateCourseDayRewardMutationVariables
>
export const DestroyRewardDocument = gql`
  mutation DestroyReward($courseDayRewardId: String!) {
    destroyCourseDayReward(courseDayRewardId: $courseDayRewardId)
  }
`

/**
 * __useDestroyRewardMutation__
 *
 * To run a mutation, you first call `useDestroyRewardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyRewardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyRewardMutation, { data, loading, error }] = useDestroyRewardMutation({
 *   variables: {
 *      courseDayRewardId: // value for 'courseDayRewardId'
 *   },
 * });
 */
export function useDestroyRewardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyRewardMutation,
    DestroyRewardMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyRewardMutation,
    DestroyRewardMutationVariables
  >(DestroyRewardDocument, baseOptions)
}
export type DestroyRewardMutationHookResult = ReturnType<
  typeof useDestroyRewardMutation
>
export type DestroyRewardMutationResult = ApolloReactCommon.MutationResult<
  DestroyRewardMutation
>
export type DestroyRewardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyRewardMutation,
  DestroyRewardMutationVariables
>
export const GetCourseRewardsDocument = gql`
  query GetCourseRewards($courseId: String!) {
    getCourse(courseId: $courseId) {
      id
      courseDayRewards {
        ...CourseDayReward
      }
    }
  }
  ${CourseDayRewardFragmentDoc}
`

/**
 * __useGetCourseRewardsQuery__
 *
 * To run a query within a React component, call `useGetCourseRewardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseRewardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseRewardsQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useGetCourseRewardsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCourseRewardsQuery,
    GetCourseRewardsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCourseRewardsQuery,
    GetCourseRewardsQueryVariables
  >(GetCourseRewardsDocument, baseOptions)
}
export function useGetCourseRewardsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCourseRewardsQuery,
    GetCourseRewardsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCourseRewardsQuery,
    GetCourseRewardsQueryVariables
  >(GetCourseRewardsDocument, baseOptions)
}
export type GetCourseRewardsQueryHookResult = ReturnType<
  typeof useGetCourseRewardsQuery
>
export type GetCourseRewardsLazyQueryHookResult = ReturnType<
  typeof useGetCourseRewardsLazyQuery
>
export type GetCourseRewardsQueryResult = ApolloReactCommon.QueryResult<
  GetCourseRewardsQuery,
  GetCourseRewardsQueryVariables
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
export const DestroyLevelTaskDocument = gql`
  mutation DestroyLevelTask($levelTaskId: String!) {
    destroyLevelTask(levelTaskId: $levelTaskId)
  }
`

/**
 * __useDestroyLevelTaskMutation__
 *
 * To run a mutation, you first call `useDestroyLevelTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyLevelTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyLevelTaskMutation, { data, loading, error }] = useDestroyLevelTaskMutation({
 *   variables: {
 *      levelTaskId: // value for 'levelTaskId'
 *   },
 * });
 */
export function useDestroyLevelTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyLevelTaskMutation,
    DestroyLevelTaskMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyLevelTaskMutation,
    DestroyLevelTaskMutationVariables
  >(DestroyLevelTaskDocument, baseOptions)
}
export type DestroyLevelTaskMutationHookResult = ReturnType<
  typeof useDestroyLevelTaskMutation
>
export type DestroyLevelTaskMutationResult = ApolloReactCommon.MutationResult<
  DestroyLevelTaskMutation
>
export type DestroyLevelTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyLevelTaskMutation,
  DestroyLevelTaskMutationVariables
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
export const UpdateMyBoosterDocument = gql`
  mutation UpdateMyBooster(
    $data: UpdateUserBoosterInput!
    $sendSponsorInviteEmail: Boolean!
  ) {
    updateCurrentUserBooster(
      data: $data
      sendSponsorInviteEmail: $sendSponsorInviteEmail
    ) {
      ...UserBoosterItem
    }
  }
  ${UserBoosterItemFragmentDoc}
`

/**
 * __useUpdateMyBoosterMutation__
 *
 * To run a mutation, you first call `useUpdateMyBoosterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMyBoosterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMyBoosterMutation, { data, loading, error }] = useUpdateMyBoosterMutation({
 *   variables: {
 *      data: // value for 'data'
 *      sendSponsorInviteEmail: // value for 'sendSponsorInviteEmail'
 *   },
 * });
 */
export function useUpdateMyBoosterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateMyBoosterMutation,
    UpdateMyBoosterMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateMyBoosterMutation,
    UpdateMyBoosterMutationVariables
  >(UpdateMyBoosterDocument, baseOptions)
}
export type UpdateMyBoosterMutationHookResult = ReturnType<
  typeof useUpdateMyBoosterMutation
>
export type UpdateMyBoosterMutationResult = ApolloReactCommon.MutationResult<
  UpdateMyBoosterMutation
>
export type UpdateMyBoosterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateMyBoosterMutation,
  UpdateMyBoosterMutationVariables
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
export const GetUsersDocument = gql`
  query GetUsers {
    getAllUsers {
      ...GroupUserTaskItem
    }
  }
  ${GroupUserTaskItemFragmentDoc}
`

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    baseOptions,
  )
}
export function useGetUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    baseOptions,
  )
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
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
      duration
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
export const UpdateBoosterDocument = gql`
  mutation UpdateBooster(
    $userBoosterId: String!
    $data: UpdateUserBoosterInput!
  ) {
    updateUserBooster(userBoosterId: $userBoosterId, data: $data) {
      ...UserBoosterItem
    }
  }
  ${UserBoosterItemFragmentDoc}
`

/**
 * __useUpdateBoosterMutation__
 *
 * To run a mutation, you first call `useUpdateBoosterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoosterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoosterMutation, { data, loading, error }] = useUpdateBoosterMutation({
 *   variables: {
 *      userBoosterId: // value for 'userBoosterId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBoosterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateBoosterMutation,
    UpdateBoosterMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateBoosterMutation,
    UpdateBoosterMutationVariables
  >(UpdateBoosterDocument, baseOptions)
}
export type UpdateBoosterMutationHookResult = ReturnType<
  typeof useUpdateBoosterMutation
>
export type UpdateBoosterMutationResult = ApolloReactCommon.MutationResult<
  UpdateBoosterMutation
>
export type UpdateBoosterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateBoosterMutation,
  UpdateBoosterMutationVariables
>
export const GetBoosterDocument = gql`
  query GetBooster($userBoosterId: String!) {
    getUserBooster(userBoosterId: $userBoosterId) {
      ...UserBoosterSponsorItem
    }
  }
  ${UserBoosterSponsorItemFragmentDoc}
`

/**
 * __useGetBoosterQuery__
 *
 * To run a query within a React component, call `useGetBoosterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoosterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoosterQuery({
 *   variables: {
 *      userBoosterId: // value for 'userBoosterId'
 *   },
 * });
 */
export function useGetBoosterQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetBoosterQuery,
    GetBoosterQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetBoosterQuery, GetBoosterQueryVariables>(
    GetBoosterDocument,
    baseOptions,
  )
}
export function useGetBoosterLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetBoosterQuery,
    GetBoosterQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetBoosterQuery,
    GetBoosterQueryVariables
  >(GetBoosterDocument, baseOptions)
}
export type GetBoosterQueryHookResult = ReturnType<typeof useGetBoosterQuery>
export type GetBoosterLazyQueryHookResult = ReturnType<
  typeof useGetBoosterLazyQuery
>
export type GetBoosterQueryResult = ApolloReactCommon.QueryResult<
  GetBoosterQuery,
  GetBoosterQueryVariables
>
