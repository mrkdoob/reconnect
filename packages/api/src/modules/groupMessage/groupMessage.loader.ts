import DataLoader from "dataloader"
import { Message } from "../message/message.entity"

// MESSAGE
export const messageLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const messageIds = [...keys]
    const messages = await Message.getRepository().findByIds(messageIds, {
      cache: true,
    })
    const map: { [key: string]: Message } = {}
    messages.forEach(message => (map[message.id] = message))
    return messageIds.map(id => map[id])
  })
