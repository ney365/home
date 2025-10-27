"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var DepositSchema = new mongoose_1.Schema({
    depositMethod: {
        type: mongoose_1.Types.ObjectId,
        ref: 'DepositMethod',
        required: true,
    },
    depositMethodObject: {
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
exports.default = (0, mongoose_1.model)('Deposit', DepositSchema);
