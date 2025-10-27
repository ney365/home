"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var WithdrawalMethodSchema = new mongoose_1.Schema({
    currency: {
        type: mongoose_1.Types.ObjectId,
        ref: 'currency',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    network: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    minWithdrawal: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('WithdrawalMethod', WithdrawalMethodSchema);
