"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var ThrowError = /** @class */ (function () {
    function ThrowError() {
    }
    ThrowError.isNotValidEnum = function (enumObject, value, errorMessage, errorCode) {
        if (errorCode === void 0) { errorCode = 400; }
        if (!Object.values(enumObject).includes(value))
            throw new http_exception_1.default(errorCode, errorMessage);
    };
    return ThrowError;
}());
exports.default = ThrowError;
