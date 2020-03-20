import "reflect-metadata"
import Container, { Service, Inject } from "typedi"
import { UserWorker } from "./modules/user/user.worker"
import { createDbConnection } from "./db"

@Service()
class Workers {
  @Inject(() => UserWorker)
  userWorker: UserWorker

  async work() {
    await createDbConnection()
    await this.userWorker.work()
  }
}

Container.get(Workers)
  .work()
  .then(() => console.log("Workers running 🏃"))
  .catch(err => console.log(err.message))
