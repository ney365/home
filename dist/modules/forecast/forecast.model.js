"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var forecast_enum_1 = require("@/modules/forecast/forecast.enum");
var ForecastSchema = new mongoose_1.Schema({
    plan: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Plan',
        required: true,
    },
    planObject: {
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
    percentageProfit: {
        type: Number,
        required: true,
    },
    stakeRate: {
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
    timeStamps: {
        type: [Number],
        required: true,
    },
    startTime: {
        type: Date,
    },
    manualMode: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Forecast', ForecastSchema);
