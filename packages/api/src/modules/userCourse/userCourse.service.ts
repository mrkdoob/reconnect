import { Service, Inject } from "typedi"
import { UserCourseRepository } from "./userCourse.repository"
import { UserCourse } from "./userCourse.entity"

@Service()
export class UserCourseService {
  @Inject(() => UserCourseRepository)
  userCourseRepository: UserCourseRepository

  async create(data: Partial<UserCourse>): Promise<UserCourse> {
    const userCourse = await UserCourse.create(data).save()
    return userCourse
  }

  async update(
    userCourseId: string,
    data: Partial<UserCourse>,
  ): Promise<UserCourse> {
    const userCourse = await this.userCourseRepository.findById(userCourseId)
    return userCourse.update(data)
  }

  async destroy(userCourseId: string): Promise<boolean> {
    const userCourse = await this.userCourseRepository.findById(userCourseId)
    return userCourse.destroy()
  }
}
