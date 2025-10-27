"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var FailedTransactionSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
    },
    collectionName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('FailedTransaction', FailedTransactionSchema);
