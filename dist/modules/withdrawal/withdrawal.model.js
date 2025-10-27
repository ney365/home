"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var WithdrawalSchema = new mongoose_1.Schema({
    withdrawalMethod: {
        type: mongoose_1.Types.ObjectId,
        ref: 'WithdrawalMethod',
        required: true,
    },
    withdrawalMethodObject: {
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
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Withdrawal', WithdrawalSchema);
