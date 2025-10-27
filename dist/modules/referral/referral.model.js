"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ReferralSchema = new mongoose_1.Schema({
    rate: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    referrer: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    referrerObject: {
        type: Object,
        required: true,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userObject: {
        type: Object,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Referral', ReferralSchema);
