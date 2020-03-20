import { createParamDecorator } from "type-graphql"

import {
  spaceImagesLoader,
  spaceBookingsLoader,
  spaceLoader,
  spaceCoverLoader,
  spaceAmenitiesLoader,
  spaceContactsLoader,
} from "../../space/space.loader"
import {
  userBookingsLoader,
  userAllBookingsLoader,
} from "../../user/user.loader"
import { membershipLoader } from "../../membership/membership.loader"

export interface Loaders {
  spaceImagesLoader: ReturnType<typeof spaceImagesLoader>
  spaceAmenitiesLoader: ReturnType<typeof spaceAmenitiesLoader>
  spaceBookingsLoader: ReturnType<typeof spaceBookingsLoader>
  spaceLoader: ReturnType<typeof spaceLoader>
  spaceCoverLoader: ReturnType<typeof spaceCoverLoader>
  spaceContactsLoader: ReturnType<typeof spaceContactsLoader>

  userBookingsLoader: ReturnType<typeof userBookingsLoader>
  userAllBookingsLoader: ReturnType<typeof userAllBookingsLoader>

  membershipLoader: ReturnType<typeof membershipLoader>
}

export function Loaders() {
  return createParamDecorator<{ loaders: Loaders }>(async ({ context }) => {
    return context.loaders
  })
}
