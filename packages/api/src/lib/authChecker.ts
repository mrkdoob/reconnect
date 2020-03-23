import { AuthChecker } from "type-graphql"
import { ResolverContext } from "../modules/shared/context/resolver"
import { User } from "../modules/user/user.entity"

// NEEDTHIS

export const authChecker: AuthChecker<ResolverContext> = async (
  { context: { req } },
  roles,
) => {
  if (req?.user?.id) {
    if (roles.length === 0) return true
    const currentUser = await User.createQueryBuilder()
      .where({ id: req.user.id })
      .cache(true)
      .getOne()
    if (currentUser /* TODO: && roles.includes(currentUser.role)*/) return true
    return false
  } else {
    return false
  }
}
