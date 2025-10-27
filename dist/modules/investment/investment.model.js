"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var InvestmentSchema = new mongoose_1.Schema({
    plan: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Plan',
        required: true,
    },
    planObject: {
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
    account: {
        type: String,
        required: true,
    },
    environment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    minRunTime: {
        type: Number,
        required: true,
    },
    gas: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    manualMode: {
        type: Boolean,
        required: true,
        default: false,
    },
    runTime: {
        type: Number,
        required: true,
        default: 0,
    },
    tradeStatus: {
        type: String,
    },
    currentTrade: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Trade',
    },
    tradeTimeStamps: [
        {
            type: Number,
            required: true,
        },
    ],
    tradeStartTime: {
        type: Date,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Investment', InvestmentSchema);
