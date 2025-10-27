"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastMove = exports.ForecastStatus = void 0;
var ForecastStatus;
(function (ForecastStatus) {
    ForecastStatus["PREPARING"] = "preparing";
    ForecastStatus["RUNNING"] = "running";
    ForecastStatus["ON_HOLD"] = "on hold";
    ForecastStatus["MARKET_CLOSED"] = "market closed";
    ForecastStatus["SETTLED"] = "settled";
})(ForecastStatus = exports.ForecastStatus || (exports.ForecastStatus = {}));
var ForecastMove;
(function (ForecastMove) {
    ForecastMove["LONG"] = "long";
    ForecastMove["SHORT"] = "short";
})(ForecastMove = exports.ForecastMove || (exports.ForecastMove = {}));
