"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ItemSchema = new mongoose_1.Schema({
    firstOne: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Item',
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
    seller: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sellerObject: {
        type: Object,
        required: true,
    },
    buyer: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    buyerObject: {
        type: Object,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    ownership: {
        type: String,
        required: true,
    },
    gasFee: {
        type: Number,
        required: true,
    },
    purchasedAmount: {
        type: Number,
        required: true,
        default: 1,
    },
    amount: {
        type: Number,
        required: true,
    },
    dateOwned: {
        type: Date,
        required: true,
        default: new Date(),
    },
    featured: {
        type: Boolean,
        required: true,
        default: false,
    },
    dateFeatured: {
        type: Date,
    },
    recommended: {
        type: Boolean,
        required: true,
        default: false,
    },
    dateRecommended: {
        type: Date,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Item', ItemSchema);
