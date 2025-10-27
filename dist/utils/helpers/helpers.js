"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.deepClone = function (data) {
        return data ? JSON.parse(JSON.stringify(data)) : undefined;
    };
    Helpers.randomPickFromArray = function (arrValues) {
        var arrValueIndex = Math.floor(Math.random() * arrValues.length);
        return arrValues[arrValueIndex];
    };
    Helpers.getRandomValue = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    return Helpers;
}());
exports.default = Helpers;
