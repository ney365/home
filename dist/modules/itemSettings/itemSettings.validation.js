"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var create = joi_1.default.object({
    approval: joi_1.default.boolean().required(),
    fee: joi_1.default.number().positive().required(),
});
var update = joi_1.default.object({
    approval: joi_1.default.boolean().default(true),
    fee: joi_1.default.number().positive().required(),
});
exports.default = { create: create, update: update };
