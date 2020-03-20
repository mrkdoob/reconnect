import { UserInputError } from "apollo-server-express"
import { FindOneOptions } from "typeorm"
import { Service } from "typedi"
import { UserCourse } from "./userCourse.entity"

@Service()
export class UserCourseRepository {
  findById(
    userProgressId: string,
    options?: FindOneOptions<UserCourse>,
  ): Promise<UserCourse> {
    try {
      return UserCourse.findOneOrFail(userProgressId, options)
    } catch {
      throw new UserInputError("UserCourse not found")
    }
  }

  findByUserId(userId: string): Promise<UserCourse> {
    try {
      return UserCourse.findOneOrFail({
        where: { userId },
      })
    } catch {
      throw new UserInputError("No user course found")
    }
  }
}
