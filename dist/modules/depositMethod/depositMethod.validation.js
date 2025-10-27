"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var depositMethod_enum_1 = require("@/modules/depositMethod/depositMethod.enum");
var create = joi_1.default.object({
    currencyId: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    network: joi_1.default.string().required().lowercase(),
    fee: joi_1.default.number().min(0).required(),
    minDeposit: joi_1.default.number().positive().required(),
});
var update = joi_1.default.object({
    depositMethodId: joi_1.default.string().required(),
    currencyId: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    network: joi_1.default.string().required().lowercase(),
    fee: joi_1.default.number().min(0).required(),
    minDeposit: joi_1.default.number().positive().required(),
});
var updateStatus = joi_1.default.object({
    depositMethodId: joi_1.default.string().required(),
    status: (_a = joi_1.default.string())
        .valid.apply(_a, Object.values(depositMethod_enum_1.DepositMethodStatus)).required(),
});
var updatePrice = joi_1.default.object({
    depositMethodId: joi_1.default.string().required(),
    price: joi_1.default.number().positive().required(),
});
var updateMode = joi_1.default.object({
    depositMethodId: joi_1.default.string().required(),
    autoUpdate: joi_1.default.boolean().required(),
});
exports.default = { create: create, update: update, updateStatus: updateStatus, updateMode: updateMode, updatePrice: updatePrice };
