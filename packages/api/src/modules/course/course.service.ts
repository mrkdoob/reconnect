import { Service, Inject } from "typedi"
import { CourseRepository } from "./course.repository"
import { Course } from "./course.entity"

@Service()
export class CourseService {
  @Inject(() => CourseRepository)
  courseRepository: CourseRepository

  async create(data: Partial<Course>): Promise<Course> {
    const course = await Course.create(data).save()
    return course
  }

  async update(courseId: string, data: Partial<Course>): Promise<Course> {
    const course = await this.courseRepository.findById(courseId)
    return course.update(data)
  }

  async destroy(courseId: string): Promise<boolean> {
    const course = await this.courseRepository.findById(courseId)
    return course.destroy()
  }
}
