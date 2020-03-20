import DataLoader from "dataloader"
import { CourseDayReward } from "../courseDayReward/courseDayReward.entity"

// GROUP MESSAGE
export const courseDayRewardLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const courseDayRewardIds = [...keys]
    const rewards = await CourseDayReward.getRepository().findByIds(
      courseDayRewardIds,
      {
        cache: true,
      },
    )
    const map: { [key: string]: CourseDayReward } = {}
    rewards.forEach(reward => (map[reward.id] = reward))
    return courseDayRewardIds.map(id => map[id])
  })
