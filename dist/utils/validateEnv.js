"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envalid_1 = require("envalid");
var validateEnv = function () {
    (0, envalid_1.cleanEnv)(process.env, {
        NODE_ENV: (0, envalid_1.str)({
            choices: ['development', 'production', 'test'],
        }),
        DEVELOPER_EMAIL: (0, envalid_1.str)(),
        MONGO_PATH: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)({ default: 3000 }),
        JWT_SECRET: (0, envalid_1.str)(),
        CSRF_SECRET: (0, envalid_1.str)(),
        SITE_PROTOCOOL: (0, envalid_1.str)(),
        SITE_NAME: (0, envalid_1.str)(),
        SITE_DOMAIN: (0, envalid_1.str)(),
        FRONTEND_LINK: (0, envalid_1.str)(),
        SITE_ADDRESS: (0, envalid_1.str)(),
        SITE_PHONE: (0, envalid_1.str)(),
        IMAGE_FOLDER_AS_TEMP: (0, envalid_1.bool)(),
        EXTERNAL_IMAGE_HOST: (0, envalid_1.bool)(),
        IMAGE_HOST: (0, envalid_1.str)(),
        CLOUDINARY_PROJECT: (0, envalid_1.str)(),
        CLOUDINARY_URL: (0, envalid_1.str)(),
        CLOUDINARY_NAME: (0, envalid_1.str)(),
        CLOUDINARY_KEY: (0, envalid_1.str)(),
        CLOUDINARY_SECRET: (0, envalid_1.str)(),
        SMTP_HOST: (0, envalid_1.str)(),
        SMTP_PORT: (0, envalid_1.num)(),
        SMTP_TLS: (0, envalid_1.bool)(),
        SMTP_SECURE: (0, envalid_1.bool)(),
        SMTP_USERNAME: (0, envalid_1.str)(),
        SMTP_PASSWORD: (0, envalid_1.str)(),
        CRYPTO_KEY: (0, envalid_1.str)(),
        CRYPTO_IV: (0, envalid_1.str)(),
        CRYPTO_METHOD: (0, envalid_1.str)(),
        LIVE_CHAT_API: (0, envalid_1.str)(),
    });
};
exports.default = validateEnv;
