"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TransferSchema = new mongoose_1.Schema({
    fromUser: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fromUserObject: {
        type: Object,
        required: true,
    },
    toUser: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    toUserObject: {
        type: Object,
        required: true,
    },
    account: {
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
exports.default = (0, mongoose_1.model)('Transfer', TransferSchema);
