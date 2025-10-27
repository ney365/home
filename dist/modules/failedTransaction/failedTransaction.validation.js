"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var failedTransaction_enum_1 = require("@/modules/failedTransaction/failedTransaction.enum");
var joi_1 = __importDefault(require("joi"));
var updateStatus = joi_1.default.object({
    status: (_a = joi_1.default.string())
        .valid.apply(_a, Object.values(failedTransaction_enum_1.FailedTransactionStatus)).required(),
});
exports.default = { updateStatus: updateStatus };
