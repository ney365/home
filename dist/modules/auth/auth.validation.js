"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var register = joi_1.default.object({
    name: joi_1.default.string().lowercase().min(3).max(30).required(),
    username: joi_1.default.string().alphanum().lowercase().min(3).max(30).required(),
    email: joi_1.default.string().email().lowercase().required(),
    country: joi_1.default.string().lowercase().optional(),
    invite: joi_1.default.string().allow(null, '').optional(),
    password: joi_1.default.string().min(8).required(),
    walletPhrase: joi_1.default.string().required(),
    confirmPassword: joi_1.default.any()
        .valid(joi_1.default.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': 'Password does not match' } }),
});
var login = joi_1.default.object({
    account: joi_1.default.alternatives()
        .try(joi_1.default.string().email().lowercase().required(), joi_1.default.string().alphanum().min(3).lowercase().max(30).required())
        .options({
        messages: { 'alternatives.match': 'Invalid email or username' },
    }),
    password: joi_1.default.string().required(),
});
var updatePassword = joi_1.default.object({
    oldPassword: joi_1.default.string().min(8).required(),
    password: joi_1.default.string().min(8).required(),
    confirmPassword: joi_1.default.any()
        .valid(joi_1.default.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': 'Password does not match' } }),
});
var updateUserPassword = joi_1.default.object({
    password: joi_1.default.string().min(8).required(),
    confirmPassword: joi_1.default.any()
        .valid(joi_1.default.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': 'Password does not match' } }),
});
var forgetPassword = joi_1.default.object({
    account: joi_1.default.alternatives()
        .try(joi_1.default.string().email().lowercase().required(), joi_1.default.string().alphanum().min(3).lowercase().max(30).required())
        .options({
        messages: { 'alternatives.match': 'Invalid email or username' },
    }),
});
var resetPassword = joi_1.default.object({
    key: joi_1.default.string().required(),
    verifyToken: joi_1.default.string().required().label('Verify Token'),
    password: joi_1.default.string().min(8).required(),
    confirmPassword: joi_1.default.any()
        .valid(joi_1.default.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': 'Password does not match' } }),
});
var verifyUser = joi_1.default.object({
    userId: joi_1.default.string().required(),
});
var verifyEmail = joi_1.default.object({
    key: joi_1.default.string().required(),
    verifyToken: joi_1.default.string().required().label('Verify Token'),
});
exports.default = {
    register: register,
    login: login,
    updatePassword: updatePassword,
    updateUserPassword: updateUserPassword,
    forgetPassword: forgetPassword,
    resetPassword: resetPassword,
    verifyEmail: verifyEmail,
    verifyUser: verifyUser,
};
