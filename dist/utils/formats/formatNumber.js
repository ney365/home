"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormatNumber = /** @class */ (function () {
    function FormatNumber() {
    }
    FormatNumber.toDollar = function (num) {
        return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };
    return FormatNumber;
}());
exports.default = FormatNumber;
