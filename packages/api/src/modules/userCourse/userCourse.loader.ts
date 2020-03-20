import DataLoader from "dataloader"
import { Course } from "../course/course.entity"

export const courseLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const courseIds = [...keys]
    const groups = await Course.getRepository().findByIds(courseIds, {
      cache: true,
    })
    const map: { [key: string]: Course } = {}
    groups.forEach(group => (map[group.id] = group))
    return courseIds.map(id => map[id])
  })
