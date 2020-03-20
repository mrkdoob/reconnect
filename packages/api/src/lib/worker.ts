import { Queue, Worker as BWorker, JobsOptions } from "bullmq"
import { redis } from "./redis"

export class Worker<T extends { name: string; data: any }> {
  protected key: string
  protected queue: Queue
  constructor(key: string) {
    this.key = key
    this.queue = new Queue(key, { connection: redis })
  }

  protected async runJob(processor: (job: any) => Promise<any>) {
    new BWorker(this.key, async job => {
      try {
        console.info("Processing job:", job.name)
        processor(job)
      } catch (error) {
        // TODO: Sentry
        console.log(error)
        console.info("JOB NAME:", job.name)
        console.info("JOB DATA:", job.data)
      }
    })
  }

  async addJob(job: T, opts: JobsOptions) {
    this.queue.add(job.name, job.data, opts)
  }
}
