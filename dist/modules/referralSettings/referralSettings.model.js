"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ReferralSettingsSchema = new mongoose_1.Schema({
    deposit: {
        type: Number,
        required: true,
    },
    stake: {
        type: Number,
        required: true,
    },
    winnings: {
        type: Number,
        required: true,
    },
    investment: {
        type: Number,
        required: true,
    },
    item: {
        type: Number,
        required: true,
    },
    completedPackageEarnings: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('ReferralSettings', ReferralSettingsSchema);
