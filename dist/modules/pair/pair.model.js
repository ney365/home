"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PairSchema = new mongoose_1.Schema({
    assetType: {
        type: String,
        required: true,
    },
    baseAsset: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Asset',
        required: true,
    },
    baseAssetObject: {
        type: Object,
        required: true,
    },
    quoteAsset: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Asset',
        required: true,
    },
    quoteAssetObject: {
        type: Object,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Pair', PairSchema);
