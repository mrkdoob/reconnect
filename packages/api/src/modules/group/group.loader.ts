import DataLoader from "dataloader"
import { In } from "typeorm"
import { User } from "../user/user.entity"

// GROUP MEMBERS
export const groupMembersLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const groupIds = [...keys]
    const groupMembers = await User.getRepository().find({
      where: {
        groupId: In(groupIds),
      },
      order: {
        groupOrder: "ASC",
      },
    })

    const map: { [key: string]: User[] } = {}
    groupMembers.forEach(member => {
      if (member.groupId)
        if (member.groupId in map) {
          map[member.groupId].push(member)
        } else {
          map[member.groupId] = [member]
        }
    })
    return groupIds.map(groupId => map[groupId] || [])
  })
