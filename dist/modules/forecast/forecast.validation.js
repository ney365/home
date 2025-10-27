"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var forecast_enum_1 = require("./forecast.enum");
var create = joi_1.default.object({
    planId: joi_1.default.string().required(),
    pairId: joi_1.default.string().required(),
    percentageProfit: joi_1.default.number().required(),
    stakeRate: joi_1.default.number().positive().required(),
});
var update = joi_1.default.object({
    forecastId: joi_1.default.string().required(),
    pairId: joi_1.default.string().required(),
    move: (_a = joi_1.default.string())
        .valid.apply(_a, Object.values(forecast_enum_1.ForecastMove)).required(),
    stakeRate: joi_1.default.number().positive().required(),
    profit: joi_1.default.number().required(),
    openingPrice: joi_1.default.number().positive(),
    closingPrice: joi_1.default.number().positive(),
});
var updateStatus = joi_1.default.object({
    forecastId: joi_1.default.string().required(),
    status: (_b = joi_1.default.string())
        .valid.apply(_b, Object.values(forecast_enum_1.ForecastStatus)).required(),
});
exports.default = { create: create, updateStatus: updateStatus, update: update };
