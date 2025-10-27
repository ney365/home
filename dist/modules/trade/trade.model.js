"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var forecast_enum_1 = require("@/modules/forecast/forecast.enum");
var TradeSchema = new mongoose_1.Schema({
    investment: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Investment',
        required: true,
    },
    investmentObject: {
        type: Object,
        required: true,
    },
    forecast: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Forecast',
        required: true,
    },
    forecastObject: {
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
    pair: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Pair',
        required: true,
    },
    pairObject: {
        type: Object,
        required: true,
    },
    market: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: forecast_enum_1.ForecastStatus.PREPARING,
    },
    move: {
        type: String,
    },
    stake: {
        type: Number,
        required: true,
    },
    outcome: {
        type: Number,
        required: true,
    },
    profit: {
        type: Number,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    investmentPercentage: {
        type: Number,
        required: true,
    },
    openingPrice: {
        type: Number,
    },
    closingPrice: {
        type: Number,
    },
    runTime: {
        type: Number,
        required: true,
        default: 0,
    },
    timeStamps: [
        {
            type: Number,
            required: true,
        },
    ],
    startTime: {
        type: Date,
    },
    environment: {
        type: String,
        required: true,
    },
    manualUpdateAmount: {
        type: Boolean,
        required: true,
        default: false,
    },
    manualMode: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Trade', TradeSchema);
