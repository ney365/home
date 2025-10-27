"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var DepositMethodSchema = new mongoose_1.Schema({
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
    price: {
        type: Number,
        required: true,
    },
    address: {
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
    minDeposit: {
        type: Number,
        required: true,
    },
    autoUpdate: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('DepositMethod', DepositMethodSchema);
