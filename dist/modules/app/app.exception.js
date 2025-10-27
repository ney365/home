"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var AppException = /** @class */ (function (_super) {
    __extends(AppException, _super);
    function AppException(err, defaultMessage) {
        var _this = this;
        console.log(err);
        var status = err.status || 500;
        var message = err.status ? err.message : defaultMessage;
        _this = _super.call(this, status, message, err.statusStrength) || this;
        _this.err = err;
        _this.defaultMessage = defaultMessage;
        return _this;
    }
    return AppException;
}(http_exception_1.default));
exports.default = AppException;
