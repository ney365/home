"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    ErrorCode[ErrorCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ErrorCode[ErrorCode["REQUEST_CONFLICT"] = 409] = "REQUEST_CONFLICT";
    ErrorCode[ErrorCode["SEVER_ERROR"] = 500] = "SEVER_ERROR";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
