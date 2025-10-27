"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var serviceToken_1 = __importDefault(require("../../utils/enums/serviceToken"));
var MathService = /** @class */ (function () {
    function MathService(mathUtility) {
        this.mathUtility = mathUtility;
    }
    /**
     * Get A Random array of numbers that meets a condition
     * @param {number} averageValueOne An Average Range Values to use as a reference
     * @param {number} averageValueTwo An Average Range Values to use as a reference
     * @param {number} spread How far should the lowest value go in relative to zero, 1 will be the length for the lowest value to be zero
     * @param {number} breakpoint How many sub values will be generated to get to the last value
     * @returns {number} An array of Random number that meets a condition
     */
    MathService.prototype._getValues = function (averageValueOne, averageValueTwo, spread, breakpoint) {
        // sanitizing inputs
        breakpoint = Math.abs(Math.ceil(breakpoint)) || 1;
        spread = Math.abs(spread);
        averageValueOne = Math.abs(averageValueOne);
        averageValueTwo = Math.abs(averageValueTwo);
        var minAverageRange = Math.min(averageValueOne, averageValueTwo);
        var maxAverageRange = Math.max(averageValueOne, averageValueTwo);
        // constants
        var difference = Math.abs(minAverageRange * spread);
        var unit = difference / breakpoint;
        // get the smallest and largest possible value
        var min = minAverageRange - difference;
        var max = maxAverageRange + difference;
        // min/max values
        var minAverageRanges = [];
        var maxAverageRanges = [];
        for (var x = 0; x < breakpoint && spread > 0; x++) {
            var minAverageRange_1 = min + unit * x;
            var maxAverageRange_1 = max - unit * (breakpoint - (x + 1));
            minAverageRanges.push(minAverageRange_1);
            maxAverageRanges.push(maxAverageRange_1);
        }
        // values array
        var values = __spreadArray(__spreadArray(__spreadArray([], minAverageRanges, true), [
            minAverageRange,
            maxAverageRange
        ], false), maxAverageRanges, true);
        // console.log('Values: ', values)
        return values;
    };
    /**
     * Get half of the remaining values probability
     * @param {number} spread How far should the lowest value go in relative to zero, 1 will be the length for the lowest value to be zero
     * @param {number} breakpoint How many sub values will be generated to get to the last value
     * @param {number} probability It should only be an auguement between 0.5 to 1
     * @returns {number} half of the remaining values probability
     */
    MathService.prototype._getValuesProbability = function (spread, breakpoint, probability) {
        // sanitizing inputs
        breakpoint = Math.abs(Math.ceil(breakpoint)) || 1;
        spread = Math.abs(spread);
        probability = probability > 1 ? 1 : probability < 0.5 ? 0.5 : probability;
        // values propability
        var valuesProbability = [];
        var remainingProbability = (1 - probability) / 2;
        var probSum = 0;
        for (var x = 0; x < breakpoint; x++) {
            var prob = probability * Math.pow((probability + 1), x);
            valuesProbability.push(prob);
            probSum += prob;
        }
        // console.log('valuesProbability: ', valuesProbability)
        var probUnit = 1 / probSum;
        // set values probability
        for (var i = 0; i < breakpoint; i++) {
            valuesProbability[i] =
                remainingProbability * (probUnit * valuesProbability[i]);
        }
        // console.log('valuesProbability: ', valuesProbability)
        return valuesProbability;
    };
    /**
     * Get The Negative Unit value
     * @param {number} averageValueOne Should be a positive number
     * @param {number} averageValueTwo Should be a positive number
     * @param {number} spread How far should the lowest value go in relative to zero, 1 will be the length for the lowest value to be zero
     * @param {number} breakpoint How many unit will be generted to get to the last value
     * @returns {number} The Sum Of Negative Unit value that meets approximatly at zero
     */
    MathService.prototype._getNegativeUnit = function (averageValueOne, averageValueTwo, spread, breakpoint) {
        var negativeUnit = 0;
        var values = this._getValues(averageValueOne, averageValueTwo, spread, breakpoint);
        var valuesCommonDifference = spread / breakpoint;
        var currNegativeValue, nextNegativeValue, inbetweenNegativeValue, lowInbetweenNegativeValue, highInbetweenNegativeValue, loopRan = 0;
        for (var x = 0; x < values.length; x++) {
            currNegativeValue = values[x];
            nextNegativeValue = values[x + 1];
            if (currNegativeValue < 0 &&
                (!nextNegativeValue || nextNegativeValue < 0)) {
                negativeUnit += 1;
            }
            else if (currNegativeValue < 0 &&
                nextNegativeValue &&
                nextNegativeValue === 0) {
                negativeUnit += 1;
            }
            else if (currNegativeValue < 0 &&
                nextNegativeValue &&
                nextNegativeValue > 0) {
                // Using binary search to find zero in the values so as to set the correct inbetweenNegativeValue
                lowInbetweenNegativeValue = currNegativeValue;
                highInbetweenNegativeValue = nextNegativeValue;
                inbetweenNegativeValue =
                    0.5 * valuesCommonDifference + currNegativeValue;
                // console.log('lowInbetweenNegativeValue: ', lowInbetweenNegativeValue)
                // console.log('highInbetweenNegativeValue: ', highInbetweenNegativeValue)
                // console.log('inbetweenNegativeValue: ', inbetweenNegativeValue)
                while (true) {
                    loopRan++;
                    if (inbetweenNegativeValue === 0 ||
                        (inbetweenNegativeValue < 0.000001 &&
                            inbetweenNegativeValue > -0.000001)) {
                        // value is just right
                        negativeUnit +=
                            (inbetweenNegativeValue - lowInbetweenNegativeValue) /
                                valuesCommonDifference;
                        break;
                    }
                    else if (inbetweenNegativeValue > 0) {
                        // value is higher
                        highInbetweenNegativeValue = inbetweenNegativeValue;
                        inbetweenNegativeValue =
                            inbetweenNegativeValue -
                                (inbetweenNegativeValue - lowInbetweenNegativeValue) * 0.5;
                    }
                    else {
                        // value is lower
                        lowInbetweenNegativeValue = inbetweenNegativeValue;
                        inbetweenNegativeValue =
                            inbetweenNegativeValue +
                                (highInbetweenNegativeValue - inbetweenNegativeValue) * 0.5;
                    }
                    if (loopRan >= 30)
                        break;
                }
            }
            else
                break;
        }
        // console.log('getNegativeUnit loopRan: ', loopRan)
        return negativeUnit;
    };
    /**
     * Get The Probability value for the provided averageValueOne and averageValueTwo params
     * @param {number} averageValueOne Should be a positive number
     * @param {number} averageValueTwo Should be a positive number
     * @param {number} spread How far should the lowest value go in relative to zero, 1 will be the length for the lowest value to be zero
     * @param {number} breakpoint How many sub values will be generated to get to the last value
     * @param {number} winProbability It should only be an auguement between 0.5 to 1
     * @returns {number} The Probability value for the provided averageValueOne and averageValueTwo params
     */
    MathService.prototype._getMainProbability = function (averageValueOne, averageValueTwo, spread, breakpoint, winProbability) {
        // sanitizing inputs
        winProbability =
            winProbability < 0.5 ? 0.5 : winProbability > 1 ? 1 : winProbability;
        var negativeProbability = 1 - winProbability;
        var negativeUnit = this._getNegativeUnit(averageValueOne, averageValueTwo, spread, breakpoint);
        // console.log('negativeUnit: ', negativeUnit)
        var lowNegativeUnit = Math.floor(negativeUnit);
        var highNegativeUnit = Math.ceil(negativeUnit);
        var lowProbability = 0;
        var probability = 0.5;
        var highProbability = 1;
        var negativeUnitProbability = 0;
        var valuesProbability;
        var loopRan = 0;
        // Using binary search to find the right probability to that we make the "negativeUnitProbability" = "negativeProbability"
        while (true) {
            loopRan++;
            // value is just right
            if (negativeUnitProbability === negativeProbability ||
                (negativeUnitProbability > negativeProbability * 0.99999 &&
                    negativeUnitProbability < negativeProbability * 1.00001))
                break;
            else if (negativeUnitProbability > negativeProbability) {
                // value is higher
                lowProbability = probability;
                probability = probability + (highProbability - probability) * 0.5;
            }
            else {
                // value is lower
                highProbability = probability;
                probability = probability - (probability - lowProbability) * 0.5;
            }
            if (loopRan >= 30)
                break;
            negativeUnitProbability = 0;
            // Get A new values probability after updating the probability variable
            valuesProbability = this._getValuesProbability(spread, breakpoint, probability);
            for (var x = 0; x < lowNegativeUnit; x++) {
                negativeUnitProbability += valuesProbability[x];
            }
            if (highNegativeUnit > lowNegativeUnit) {
                negativeUnitProbability +=
                    valuesProbability[highNegativeUnit - 1] *
                        (negativeUnit - lowNegativeUnit);
            }
        }
        // console.log('getMainProbability loopRan: ', loopRan)
        return probability;
    };
    /**
     * Get A Random number that meets the condition
     * @param {number} averageValueOne An Average Range Value to use as a reference
     * @param {number} averageValueTwo An Average Range Value to use as a reference
     * @param {number} spread How far should the lowest value go in relative to zero, 1 will be the length for the lowest value to be zero
     * @param {number} breakpoint How many sub values will be generated to get to the last value
     * @param {number} probability The Probability value for the provided averageValueOne and averageValueTwo params
     * @returns {number} A Random number that meets the condition
     */
    MathService.prototype._dynamicRange = function (averageValueOne, averageValueTwo, spread, breakpoint, probability) {
        var values = this._getValues(averageValueOne, averageValueTwo, spread, breakpoint);
        var valuesProbability = this._getValuesProbability(spread, breakpoint, probability);
        // get random values
        var randomValues = this.mathUtility.getRandomNumbersFromArray(values);
        // console.log('randomValues: ', randomValues)
        var remainder = 1 -
            probability -
            valuesProbability.reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0) *
                2;
        // console.log('remainder: ', remainder)
        var accumulatedProbability = 0;
        var finalValuesProbability = __spreadArray(__spreadArray(__spreadArray([], valuesProbability, true), [
            probability + remainder
        ], false), __spreadArray([], valuesProbability, true).reverse(), true).map(function (currentProbability) {
            accumulatedProbability += currentProbability;
            return accumulatedProbability;
        });
        var probabilityPicked = Math.random();
        var probabilityIndex = finalValuesProbability.findIndex(function (currentProbability, i, arr) {
            var prevProbability = arr[i - 1] !== undefined ? arr[i - 1] : 0;
            return (prevProbability < probabilityPicked &&
                probabilityPicked <= currentProbability);
        });
        return randomValues[probabilityIndex];
    };
    /**
     * Get A Random number that meets the condition
     * @param {number} averageValueOne a positive number as An Average Range Value to use as a reference
     * @param {number} averageValueTwo a positive number as An Average Range Value to use as a reference
     * @param {number} positiveValueProbability The probability of getting a positive number, It should be a number between 0.55 to 0.99
     * @returns {number} A Random number that meets the condition
     */
    MathService.prototype.probabilityValue = function (averageValueOne, averageValueTwo, positiveValueProbability) {
        // sanitizing inputs
        positiveValueProbability =
            positiveValueProbability < 0.55
                ? 0.55
                : positiveValueProbability > 0.99
                    ? 0.99
                    : positiveValueProbability;
        var spread = 10;
        var breakpoint = 100;
        var probability = this._getMainProbability(averageValueOne, averageValueTwo, spread, breakpoint, positiveValueProbability);
        var randomValue = this._dynamicRange(averageValueOne, averageValueTwo, spread, breakpoint, probability);
        return randomValue;
    };
    MathService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.MATH_UTILITY)),
        __metadata("design:paramtypes", [Object])
    ], MathService);
    return MathService;
}());
exports.default = MathService;
////////////////////////////
///////////////////////////
// EXPERIMENTAL TESTING
////////////////////////////
///////////////////////////
// import MathUtility from './math.utility'
// const mathService = new MathService(new MathUtility())
// console.log('values: ', mathService._getValues(1, 2, 3, 2))
// console.log('value: ', mathService._getNegativeUnit(1, 2, 3, 2))
// const run = 10000
// const negativeValues = []
// const positiveValues = []
// let sum = 0
// const startTime = new Date().getTime()
// for (let x = 0; x < run; x++) {
//   const curr = mathService.probabilityValue(1, 2, 0.55)
//   sum += curr
//   if (curr > 0) {
//     positiveValues.push(curr)
//   }
//   if (curr < 0) {
//     negativeValues.push(curr)
//   }
// }
// const average = sum / run
// console.log('=====================')
// console.log('negative: ', negativeValues.filter((val) => val < 0).length / run)
// console.log('Average: ', average)
// console.log('=====================')
// console.log('max: ', Math.max(...positiveValues))
// console.log('min: ', Math.min(...negativeValues))
// console.log('=====================')
// console.log('Time: ', (new Date().getTime() - startTime) / 1000)
////////////////////////////////////
///////////////////////////////////
// RUN npx ts-node .\math.service.ts
////////////////////////////////////
///////////////////////////////////
