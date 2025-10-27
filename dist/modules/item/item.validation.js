"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var item_enum_1 = require("@/modules/item/item.enum");
var create = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    amount: joi_1.default.number().positive().required(),
});
var masterCreate = joi_1.default.object({
    userId: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    amount: joi_1.default.number().positive().required(),
});
var update = joi_1.default.object({
    itemId: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    amount: joi_1.default.number().positive().required(),
});
var purchase = joi_1.default.object({
    itemId: joi_1.default.string().required(),
});
var sell = joi_1.default.object({
    itemId: joi_1.default.string().required(),
    amount: joi_1.default.number().positive().required(),
});
var updateStatus = joi_1.default.object({
    itemId: joi_1.default.string().required(),
    status: (_a = joi_1.default.string())
        .valid.apply(_a, Object.values(item_enum_1.ItemStatus)).required(),
});
var feature = joi_1.default.object({
    itemId: joi_1.default.string().required(),
    featured: joi_1.default.boolean().required(),
});
var recommend = joi_1.default.object({
    itemId: joi_1.default.string().required(),
    recommended: joi_1.default.boolean().required(),
});
exports.default = {
    create: create,
    update: update,
    purchase: purchase,
    sell: sell,
    updateStatus: updateStatus,
    masterCreate: masterCreate,
    feature: feature,
    recommend: recommend,
};
