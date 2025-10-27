"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawalMethodC = exports.withdrawalMethodC_id = exports.withdrawalMethodB = exports.withdrawalMethodB_id = exports.withdrawalMethodA = exports.withdrawalMethodA_id = exports.withdrawalMethodUpdated = void 0;
var mongoose_1 = require("mongoose");
var withdrawalMethod_enum_1 = require("../../../modules/withdrawalMethod/withdrawalMethod.enum");
var currency_payload_1 = require("../../currency/__test__/currency.payload");
exports.withdrawalMethodUpdated = {
    network: '--updated wallet network--',
    fee: 10,
    minWithdrawal: 70,
};
exports.withdrawalMethodA_id = new mongoose_1.Types.ObjectId('6245de5d5b1f5b3a5c1b539a');
exports.withdrawalMethodA = {
    currency: currency_payload_1.currencyA_id,
    name: 'bitcoin',
    symbol: 'btc',
    logo: 'btc.svg',
    network: '--a wallet network--',
    fee: 5,
    minWithdrawal: 40,
    status: withdrawalMethod_enum_1.WithdrawalMethodStatus.ENABLED,
};
exports.withdrawalMethodB_id = new mongoose_1.Types.ObjectId('6245de5d5b1f5b3a5c1b539b');
exports.withdrawalMethodB = {
    currency: currency_payload_1.currencyB_id,
    name: 'ethereum',
    symbol: 'eth',
    logo: 'eth.svg',
    network: '--b wallet network--',
    fee: 10,
    minWithdrawal: 30,
    status: withdrawalMethod_enum_1.WithdrawalMethodStatus.ENABLED,
};
exports.withdrawalMethodC_id = new mongoose_1.Types.ObjectId('6245de5d5b1f5b3a5c1b539c');
exports.withdrawalMethodC = {
    currency: currency_payload_1.currencyC_id,
    name: 'litecoin',
    symbol: 'ltc',
    logo: 'ltc.svg',
    network: '--c wallet network--',
    fee: 15,
    minWithdrawal: 50,
    status: withdrawalMethod_enum_1.WithdrawalMethodStatus.ENABLED,
};
