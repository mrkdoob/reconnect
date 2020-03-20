import { UserInputError } from "apollo-server-express"
import { FindOneOptions, FindConditions } from "typeorm"
import { Service } from "typedi"
import { Course } from "./course.entity"

@Service()
export class CourseRepository {
  findById(id: string, options?: FindOneOptions<Course>): Promise<Course> {
    try {
      return Course.findOneOrFail(id, options)
    } catch {
      throw new UserInputError("Course not found")
    }
  }

  findAll(where?: FindConditions<Course>): Promise<Course[]> {
    return Course.find({ where })
  }

  async findBy(options?: FindOneOptions<Course>): Promise<Course> {
    try {
      return Course.findOneOrFail(options)
    } catch {
      throw new UserInputError("Course not found")
    }
  }
}
