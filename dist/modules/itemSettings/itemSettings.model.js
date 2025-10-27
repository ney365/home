"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ItemSettingsSchema = new mongoose_1.Schema({
    approval: {
        type: Boolean,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('ItemSettings', ItemSettingsSchema);
