"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var transfer_enum_1 = require("@/modules/transfer/transfer.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var create = joi_1.default.object({
    toUserUsername: joi_1.default.string().alphanum().lowercase().min(3).max(30).required(),
    account: joi_1.default.string()
        .valid(user_enum_1.UserAccount.MAIN_BALANCE, user_enum_1.UserAccount.REFERRAL_BALANCE)
        .required(),
    amount: joi_1.default.number().positive().required(),
});
var updateStatus = joi_1.default.object({
    transferId: joi_1.default.string().required(),
    status: joi_1.default.string()
        .valid(transfer_enum_1.TransferStatus.SUCCESSFUL, transfer_enum_1.TransferStatus.REVERSED)
        .required(),
});
exports.default = { create: create, updateStatus: updateStatus };
