"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TransactionSchema = new mongoose_1.Schema({
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
    category: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    categoryObject: {
        type: Object,
        required: true,
    },
    environment: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    stake: {
        type: Number,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Transaction', TransactionSchema);
