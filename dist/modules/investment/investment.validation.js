"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var investment_enum_1 = require("@/modules/investment/investment.enum");
var user_enum_1 = require("../user/user.enum");
var create = joi_1.default.object({
    planId: joi_1.default.string().required(),
    amount: joi_1.default.number().positive().required(),
    account: joi_1.default.string().valid(user_enum_1.UserAccount.MAIN_BALANCE, user_enum_1.UserAccount.REFERRAL_BALANCE, user_enum_1.UserAccount.BONUS_BALANCE),
});
var createDemo = joi_1.default.object({
    planId: joi_1.default.string().required(),
    amount: joi_1.default.number().positive().required(),
    account: joi_1.default.string().valid(user_enum_1.UserAccount.DEMO_BALANCE),
});
var updateStatus = joi_1.default.object({
    investmentId: joi_1.default.string().required(),
    status: (_a = joi_1.default.string())
        .valid.apply(_a, Object.values(investment_enum_1.InvestmentStatus)).required(),
});
var fund = joi_1.default.object({
    investmentId: joi_1.default.string().required(),
    amount: joi_1.default.number().positive().required(),
});
exports.default = { create: create, updateStatus: updateStatus, fund: fund, createDemo: createDemo };
