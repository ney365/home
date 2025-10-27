"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var plan_enum_1 = require("@/modules/plan/plan.enum");
var asset_enum_1 = require("@/modules/asset/asset.enum");
var create = joi_1.default.object({
    name: joi_1.default.string().required(),
    engine: joi_1.default.string().required(),
    minAmount: joi_1.default.number().positive().required(),
    maxAmount: joi_1.default.number().positive().required(),
    minPercentageProfit: joi_1.default.number().positive().required(),
    maxPercentageProfit: joi_1.default.number().positive().required(),
    duration: joi_1.default.number().positive().required(),
    dailyForecasts: joi_1.default.number().positive().required(),
    gas: joi_1.default.number().positive().required(),
    description: joi_1.default.string().required(),
    assetType: (_a = joi_1.default.string())
        .valid.apply(_a, Object.values(asset_enum_1.AssetType)).required(),
    assets: joi_1.default.array().items(joi_1.default.string()).min(1).unique(),
});
var update = joi_1.default.object({
    planId: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    engine: joi_1.default.string().required(),
    minAmount: joi_1.default.number().positive().required(),
    maxAmount: joi_1.default.number().positive().required(),
    minPercentageProfit: joi_1.default.number().positive().required(),
    maxPercentageProfit: joi_1.default.number().positive().required(),
    duration: joi_1.default.number().positive().required(),
    dailyForecasts: joi_1.default.number().positive().required(),
    gas: joi_1.default.number().positive().required(),
    description: joi_1.default.string().required(),
    assetType: (_b = joi_1.default.string())
        .valid.apply(_b, Object.values(asset_enum_1.AssetType)).required(),
    assets: joi_1.default.array().items(joi_1.default.string()).min(1).unique(),
});
var updateStatus = joi_1.default.object({
    planId: joi_1.default.string().required(),
    status: (_c = joi_1.default.string())
        .valid.apply(_c, Object.values(plan_enum_1.PlanStatus)).required(),
});
exports.default = { create: create, update: update, updateStatus: updateStatus };
