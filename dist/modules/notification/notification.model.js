"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var NotificationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
    userObject: {
        type: Object,
    },
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
    categoryName: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    categoryObject: {
        type: Object,
        required: true,
    },
    forWho: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    environment: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Notification', NotificationSchema);
