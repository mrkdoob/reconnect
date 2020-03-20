import { Service } from "typedi"
import { s3 } from "../../lib/s3"
import { AWS_S3_BUCKET } from "../../lib/config"
import { S3SignedUrlInput } from "./inputs/s3SignedUrl.input"
import { S3BulkSignedUrlInput } from "./inputs/s3BulkSignedUrl.input"
import { BulkSignedResponse } from "./response/bulkSigned.response"

@Service()
export class S3Service {
  private readonly bucket: string
  constructor() {
    this.bucket = AWS_S3_BUCKET
  }

  async getSignedUrl(data: S3SignedUrlInput): Promise<string> {
    const s3Params = {
      Bucket: this.bucket,
      Key: data.key,
      Expires: 60,
      ContentType: data.fileType,
      ACL: "public-read",
    }
    return s3.getSignedUrl("putObject", s3Params)
  }

  async getBulkSignedUrl(
    data: S3BulkSignedUrlInput,
  ): Promise<BulkSignedResponse[]> {
    const urls = data.files.map(file => {
      const s3Params = {
        Bucket: this.bucket,
        Key: file.key,
        Expires: 60,
        ContentType: file.fileType,
        ACL: "public-read",
      }
      return { url: s3.getSignedUrl("putObject", s3Params), key: file.key }
    })
    return urls
  }

  async bulkDestroy(keys: string[]): Promise<boolean> {
    if (keys.length === 0) return true
    const objects = keys.map(key => ({ Key: key }))
    try {
      await s3
        .deleteObjects({ Bucket: this.bucket, Delete: { Objects: objects } })
        .promise()
    } catch (err) {
      // sentry.captureException(err)
      console.log(err)
    } finally {
      return true
    }
  }

  async destroy(key: string): Promise<boolean> {
    try {
      s3.deleteObject({ Bucket: this.bucket, Key: key }).promise()
    } catch (err) {
      // sentry.captureException(err)
      console.log(err)
    } finally {
      return true
    }
  }
}
