import { cleanEnv, str, port, bool, num } from 'envalid'

const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production', 'test'],
    }),
    DEVELOPER_EMAIL: str(),
    MONGO_PATH: str(),
    PORT: port({ default: 3000 }),
    JWT_SECRET: str(),
    CSRF_SECRET: str(),
    SITE_PROTOCOOL: str(),
    SITE_NAME: str(),
    SITE_DOMAIN: str(),
    FRONTEND_LINK: str(),
    SITE_ADDRESS: str(),
    SITE_PHONE: str(),
    IMAGE_FOLDER_AS_TEMP: bool(),
    EXTERNAL_IMAGE_HOST: bool(),
    IMAGE_HOST: str(),
    CLOUDINARY_PROJECT: str(),
    CLOUDINARY_URL: str(),
    CLOUDINARY_NAME: str(),
    CLOUDINARY_KEY: str(),
    CLOUDINARY_SECRET: str(),
    SMTP_HOST: str(),
    SMTP_PORT: num(),
    SMTP_TLS: bool(),
    SMTP_SECURE: bool(),
    SMTP_USERNAME: str(),
    SMTP_PASSWORD: str(),
    CRYPTO_KEY: str(),
    CRYPTO_IV: str(),
    CRYPTO_METHOD: str(),
    LIVE_CHAT_API: str(),
  })
}

export default validateEnv
