"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var activity_enum_1 = require("@/modules/activity/activity.enum");
var ActivitySchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: activity_enum_1.ActivityStatus.VISIBLE,
    },
    forWho: {
        type: String,
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
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Activity', ActivitySchema);
