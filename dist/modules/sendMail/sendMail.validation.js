"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var sendEmail = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().required(),
    subject: joi_1.default.string().required(),
    heading: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
});
exports.default = {
    sendEmail: sendEmail,
};
