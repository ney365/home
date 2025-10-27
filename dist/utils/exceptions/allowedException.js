"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AllowedException = /** @class */ (function () {
    function AllowedException(err) {
        this.err = err;
        this.allow = true;
        console.log(err);
    }
    return AllowedException;
}());
exports.default = AllowedException;
