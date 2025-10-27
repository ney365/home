"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var plan_enum_1 = require("@/modules/plan/plan.enum");
var mongoose_2 = require("mongoose");
var PlanSchema = new mongoose_1.Schema({
    status: {
        type: String,
        required: true,
        default: plan_enum_1.PlanStatus.ACTIVE,
    },
    icon: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    engine: {
        type: String,
        required: true,
    },
    minAmount: {
        type: Number,
        required: true,
    },
    maxAmount: {
        type: Number,
        required: true,
    },
    minPercentageProfit: {
        type: Number,
        required: true,
    },
    maxPercentageProfit: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    dailyForecasts: {
        type: Number,
        required: true,
    },
    gas: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assetType: {
        type: String,
        required: true,
    },
    assets: [
        {
            type: mongoose_2.Types.ObjectId,
            ref: 'Asset',
        },
    ],
    manualMode: {
        type: Boolean,
        required: true,
        default: false,
    },
    investors: [
        {
            type: mongoose_2.Types.ObjectId,
            ref: 'Investment',
        },
    ],
    dummyInvestors: {
        type: Number,
        required: true,
        default: 0,
    },
    runTime: {
        type: Number,
        required: true,
        default: 0,
    },
    forecastStatus: {
        type: String,
    },
    currentForecast: {
        type: mongoose_2.Types.ObjectId,
        ref: 'Forecast',
    },
    forecastTimeStamps: [
        {
            type: Number,
            required: true,
        },
    ],
    forecastStartTime: {
        type: Date,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Plan', PlanSchema);
