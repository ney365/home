"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormatString = /** @class */ (function () {
    function FormatString() {
    }
    FormatString.fromCamelToTitleCase = function (input) {
        var words = input.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
        return words.map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
    };
    FormatString.mask = function (str, startChars, endChars) {
        if (startChars === void 0) { startChars = 1; }
        if (endChars === void 0) { endChars = 1; }
        var firstChars = str.slice(0, startChars);
        var lastChars = str.slice(-endChars);
        var maskedChars = '*'.repeat(str.length - startChars - endChars);
        return "".concat(firstChars).concat(maskedChars).concat(lastChars);
    };
    FormatString.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (word) { return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(); });
    };
    return FormatString;
}());
exports.default = FormatString;
