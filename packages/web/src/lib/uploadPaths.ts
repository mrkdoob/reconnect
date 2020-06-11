export const UPLOAD_PATHS = {
  pets: `pets`,
  companyDocument: (companyId: string) => `company/${companyId}/documents`,
  companyUpdate: (companyId: string) => `company/${companyId}/updates`,
}

export const amzUrl = "https://reconnectapp-dev.s3.eu-central-1.amazonaws.com/"
