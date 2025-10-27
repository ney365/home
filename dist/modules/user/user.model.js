"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    walletPhrase: {
        type: String,
        default: "--"
    },
    bio: {
        type: String,
    },
    profile: {
        type: String,
    },
    cover: {
        type: String,
    },
    country: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    verifield: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
    },
    referred: {
        type: mongoose_1.Types.ObjectId,
    },
    refer: {
        type: String,
        required: true,
        unique: true,
    },
    mainBalance: {
        type: Number,
        required: true,
    },
    bonusBalance: {
        type: Number,
        required: true,
    },
    referralBalance: {
        type: Number,
        required: true,
    },
    demoBalance: {
        type: Number,
        required: true,
    },
    items: [{ type: mongoose_1.Types.ObjectId, ref: 'Item' }],
    totalItems: {
        type: Number,
        required: true,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
