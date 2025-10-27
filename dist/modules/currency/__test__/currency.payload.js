"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyC = exports.currencyC_id = exports.currencyB = exports.currencyB_id = exports.currencyA = exports.currencyA_id = void 0;
var mongoose_1 = require("mongoose");
exports.currencyA_id = new mongoose_1.Types.ObjectId('6145de5d5b1f5b3a5c1b539a');
exports.currencyA = {
    name: 'bitcoin',
    symbol: 'btc',
    logo: 'btc.svg',
};
exports.currencyB_id = new mongoose_1.Types.ObjectId('6145de5d5b1f5b3a5c1b539b');
exports.currencyB = {
    name: 'ethereum',
    symbol: 'eth',
    logo: 'eth.svg',
};
exports.currencyC_id = new mongoose_1.Types.ObjectId('6145de5d5b1f5b3a5c1b539c');
exports.currencyC = {
    name: 'litecoin',
    symbol: 'ltc',
    logo: 'ltc.svg',
};
