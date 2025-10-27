"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var create = joi_1.default.object({
    assetType: joi_1.default.string().required(),
    baseAssetId: joi_1.default.string().required(),
    quoteAssetId: joi_1.default.string().required(),
});
var update = joi_1.default.object({
    pairId: joi_1.default.string().required(),
    assetType: joi_1.default.string().required(),
    baseAssetId: joi_1.default.string().required(),
    quoteAssetId: joi_1.default.string().required(),
});
exports.default = { create: create, update: update };
