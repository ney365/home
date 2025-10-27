"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var referral_enum_1 = require("../referral/referral.enum");
var deposit_enum_1 = require("../deposit/deposit.enum");
var transfer_enum_1 = require("../transfer/transfer.enum");
var withdrawal_enum_1 = require("../withdrawal/withdrawal.enum");
var updateStatus = joi_1.default.object({
    transactionId: joi_1.default.string().required(),
    status: (_a = joi_1.default.string())
        .valid.apply(_a, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], Object.values(referral_enum_1.ReferralStatus), false), Object.values(deposit_enum_1.DepositStatus), false), Object.values(withdrawal_enum_1.WithdrawalStatus), false), Object.values(transfer_enum_1.TransferStatus), false)).required(),
});
var updateAmount = joi_1.default.object({
    transactionId: joi_1.default.string().required(),
    status: (_b = joi_1.default.string())
        .valid.apply(_b, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], Object.values(referral_enum_1.ReferralStatus), false), Object.values(deposit_enum_1.DepositStatus), false), Object.values(withdrawal_enum_1.WithdrawalStatus), false), Object.values(transfer_enum_1.TransferStatus), false)).required(),
    amount: joi_1.default.number().positive().required(),
});
exports.default = { updateStatus: updateStatus, updateAmount: updateAmount };
