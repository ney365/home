import { doubleCsrfProtection } from '@/utils/csrf'
import { Request } from 'express'
import user from '@/modules/user/user.interface'

declare global {
  namespace Express {
    export interface Request {
      user: User
      file: any // or replace 'any' with the type of 'file'
    }
  }
  namespace NodeJS {
    export interface ProcessEnv {
      DEVELOPER_EMAIL: string
      NODE_ENV: 'development' | 'production' | 'test'
      MONGO_PATH: string
      PORT: number
      JWT_SECRET: string
      CSRF_SECRET: string
      SITE_PROTOCOOL: string
      SITE_NAME: string
      SITE_DOMAIN: string
      FRONTEND_LINK: string
      SITE_ADDRESS: string
      SITE_PHONE: string
      IMAGE_FOLDER_AS_TEMP: string
      EXTERNAL_IMAGE_HOST: string
      IMAGE_HOST: string
      CLOUDINARY_PROJECT: string
      CLOUDINARY_URL: string
      CLOUDINARY_NAME: string
      CLOUDINARY_KEY: string
      CLOUDINARY_SECRET: string
      SMTP_HOST: string
      SMTP_PORT: string
      SMTP_TLS: string
      SMTP_SECURE: string
      SMTP_USERNAME: string
      SMTP_PASSWORD: string
      CRYPTO_KEY: string
      CRYPTO_IV: string
      CRYPTO_METHOD: string
      LIVE_CHAT_API: string
    }
  }
}
