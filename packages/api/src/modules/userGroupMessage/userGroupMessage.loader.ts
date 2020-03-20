import DataLoader from "dataloader"
import { GroupMessage } from "../groupMessage/groupMessage.entity"

// GROUP MESSAGE
export const groupMessageLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const groupMessageIds = [...keys]
    const messages = await GroupMessage.getRepository().findByIds(
      groupMessageIds,
      {
        cache: true,
      },
    )
    const map: { [key: string]: GroupMessage } = {}
    messages.forEach(message => (map[message.id] = message))
    return groupMessageIds.map(id => map[id])
  })
