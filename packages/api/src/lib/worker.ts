import BQueue, { Queue, JobOptions } from "bull"
import { REDIS_URL } from "./config"

export class Worker<T extends { name: string; data: any }> {
  protected key: string
  protected queue: Queue
  constructor(key: string) {
    this.queue = new BQueue(key, REDIS_URL)
  }

  protected async runJob(processor: (job: any) => Promise<any>) {
    this.queue.process(async job => {
      try {
        console.info("Processing job:", job.data)
        processor(job.data)
      } catch (error) {
        // sentry.captureException(error)
        console.log(error)
        console.info("JOB NAME:", job.data.name)
        console.info("JOB DATA:", job.data.data)
      }
    })
  }

  async addJob(job: T, opts: JobOptions) {
    this.queue.add({ name: job.name, data: job.data }, opts)
  }
}
