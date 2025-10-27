"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentStatus = void 0;
var InvestmentStatus;
(function (InvestmentStatus) {
    InvestmentStatus["RUNNING"] = "running";
    InvestmentStatus["AWAITING_TRADE"] = "awaiting trade";
    InvestmentStatus["PROCESSING_TRADE"] = "preparing new trade";
    InvestmentStatus["SUSPENDED"] = "suspended";
    InvestmentStatus["INSUFFICIENT_GAS"] = "out of gas";
    InvestmentStatus["REFILLING"] = "refilling";
    InvestmentStatus["ON_MAINTAINACE"] = "on maintainace";
    InvestmentStatus["FINALIZING"] = "finalizing";
    InvestmentStatus["COMPLETED"] = "completed";
})(InvestmentStatus = exports.InvestmentStatus || (exports.InvestmentStatus = {}));
