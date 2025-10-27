"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var user_enum_1 = require("@/modules/user/user.enum");
var updateProfile = joi_1.default.object({
    name: joi_1.default.string().lowercase().min(3).max(30).required(),
    username: joi_1.default.string().alphanum().lowercase().min(3).max(30).required(),
    bio: joi_1.default.string(),
});
var updateEmail = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().required(),
});
var updateStatus = joi_1.default.object({
    status: (_a = joi_1.default.string())
        .valid.apply(_a, Object.values(user_enum_1.UserStatus)).required(),
});
var sendEmail = joi_1.default.object({
    subject: joi_1.default.string().required(),
    heading: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
});
var fundUser = joi_1.default.object({
    amount: joi_1.default.number().required(),
    account: (_b = joi_1.default.string())
        .valid.apply(_b, Object.values(user_enum_1.UserAccount)).required(),
});
exports.default = {
    updateProfile: updateProfile,
    updateEmail: updateEmail,
    updateStatus: updateStatus,
    sendEmail: sendEmail,
    fundUser: fundUser,
};
