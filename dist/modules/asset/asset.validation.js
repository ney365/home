"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var create = joi_1.default.object({
    name: joi_1.default.string().required(),
    symbol: joi_1.default.string().required(),
    logo: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
});
var update = joi_1.default.object({
    assetId: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    symbol: joi_1.default.string().required(),
    logo: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
});
exports.default = { create: create, update: update };
