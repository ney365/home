"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var trade_model_1 = __importDefault(require("@/modules/trade/trade.model"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var forecast_enum_1 = require("@/modules/forecast/forecast.enum");
var transaction_enum_1 = require("@/modules/transaction/transaction.enum");
var notification_enum_1 = require("@/modules/notification/notification.enum");
var http_type_1 = require("@/modules/http/http.type");
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_enum_1 = require("@/modules/http/http.enum");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var transactionManager_type_1 = require("@/modules/transactionManager/transactionManager.type");
var TradeService = /** @class */ (function () {
    function TradeService(userService, investmentService, transactionService, notificationService) {
        this.userService = userService;
        this.investmentService = investmentService;
        this.transactionService = transactionService;
        this.notificationService = notificationService;
        this.tradeModel = trade_model_1.default;
    }
    TradeService.prototype.find = function (tradeId, fromAllAccounts, userId) {
        if (fromAllAccounts === void 0) { fromAllAccounts = true; }
        return __awaiter(this, void 0, void 0, function () {
            var trade;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fromAllAccounts) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tradeModel.findById(tradeId)];
                    case 1:
                        trade = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.tradeModel.findOne({ _id: tradeId, user: userId })];
                    case 3:
                        trade = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!trade)
                            throw new http_exception_1.default(404, 'Trade not found');
                        return [2 /*return*/, trade];
                }
            });
        });
    };
    TradeService.prototype._createTransaction = function (user, investment, forecast, stake, outcome, profit, percentage, environment, manualMode) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var trade;
            var _this = this;
            return __generator(this, function (_a) {
                trade = new this.tradeModel({
                    investment: investment._id,
                    investmentObject: investment,
                    user: user._id,
                    userObject: user,
                    forecast: forecast._id,
                    forecastObject: forecast,
                    pair: forecast.pair,
                    pairObject: forecast.pairObject,
                    market: forecast.market,
                    stake: stake,
                    outcome: outcome,
                    profit: profit,
                    percentage: percentage,
                    percentageProfit: forecast.percentageProfit,
                    environment: environment,
                    manualMode: manualMode,
                });
                return [2 /*return*/, {
                        object: trade.toObject({ getters: true }),
                        instance: {
                            model: trade,
                            onFailed: "Delete the trade with an id of (".concat(trade._id, ")"),
                            callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.tradeModel.deleteOne({ _id: trade._id })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                        },
                    }];
            });
        });
    };
    TradeService.prototype._updateTransaction = function (investment, forecast, stake, outcome, profit, percentage) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var trade, oldPair, oldPairObject, oldMarket, oldMove, oldPercentageProfit, oldOpeningPrice, oldClosingPrice, oldStake, oldOutcome, oldProfit, oldPercentage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeModel.findOne({
                            investment: investment._id,
                            forecast: forecast._id,
                        })];
                    case 1:
                        trade = _a.sent();
                        if (!trade)
                            throw new http_exception_1.default(400, "The trade with a forecast of (".concat(forecast._id, ") and investment of (").concat(investment._id, ") could not be found"));
                        oldPair = trade.pair;
                        oldPairObject = trade.pairObject;
                        oldMarket = trade.market;
                        oldMove = trade.move;
                        oldPercentageProfit = trade.percentageProfit;
                        oldOpeningPrice = trade.openingPrice;
                        oldClosingPrice = trade.closingPrice;
                        oldStake = trade.stake;
                        oldOutcome = trade.outcome;
                        oldProfit = trade.profit;
                        oldPercentage = trade.percentage;
                        trade.pair = forecast.pair._id;
                        trade.pairObject = forecast.pair;
                        trade.market = forecast.market;
                        trade.move = forecast.move;
                        trade.percentageProfit = forecast.percentageProfit;
                        trade.openingPrice = forecast.openingPrice;
                        trade.closingPrice = forecast.closingPrice;
                        trade.stake = stake;
                        trade.outcome = outcome;
                        trade.profit = profit;
                        trade.percentage = percentage;
                        return [2 /*return*/, {
                                object: trade.toObject({ getters: true }),
                                instance: {
                                    model: trade,
                                    onFailed: "Set the trade with an id of (".concat(trade._id, ") to the following:\n        \n pair = (").concat(oldPair, "),\n        \n pairObject = (").concat(oldPairObject, "),\n        \n market = (").concat(oldMarket, "),\n        \n move = (").concat(oldMove, "),\n        \n percentageProfit = (").concat(oldPercentageProfit, "),\n        \n openingPrice = (").concat(oldOpeningPrice, "),\n        \n closingPrice = (").concat(oldClosingPrice, "),\n        \n stake = (").concat(oldStake, "),\n        \n outcome = (").concat(oldOutcome, "),\n        \n profit = (").concat(oldProfit, "),\n        \n percentage = (").concat(oldPercentage, "),\n        "),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    trade.pair = oldPair;
                                                    trade.pairObject = oldPairObject;
                                                    trade.market = oldMarket;
                                                    trade.move = oldMove;
                                                    trade.percentageProfit = oldPercentageProfit;
                                                    trade.openingPrice = oldOpeningPrice;
                                                    trade.closingPrice = oldClosingPrice;
                                                    trade.stake = oldStake;
                                                    trade.outcome = oldOutcome;
                                                    trade.profit = oldProfit;
                                                    trade.percentage = oldPercentage;
                                                    return [4 /*yield*/, trade.save()];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                            }];
                }
            });
        });
    };
    TradeService.prototype._updateStatusTransaction = function (investment, forecast) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var trade, oldStatus, oldStartTime, oldTimeStamps, oldRuntime, oldMove;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeModel.findOne({
                            investment: investment._id,
                            forecast: forecast._id,
                        })];
                    case 1:
                        trade = _a.sent();
                        if (!trade)
                            throw new http_exception_1.default(400, "The trade with a forecast of (".concat(forecast._id, ") and investment of (").concat(investment._id, ") could not be found"));
                        oldStatus = trade.status;
                        oldStartTime = trade.startTime;
                        oldTimeStamps = trade.timeStamps.slice();
                        oldRuntime = trade.runTime;
                        oldMove = trade.move;
                        if (oldStatus === forecast_enum_1.ForecastStatus.SETTLED)
                            throw new http_exception_1.default(400, 'This trade has already been settled');
                        trade.status = forecast.status;
                        trade.startTime = forecast.startTime;
                        trade.timeStamps = forecast.timeStamps.slice();
                        trade.runTime = forecast.runTime;
                        trade.move = forecast.move;
                        return [2 /*return*/, {
                                object: trade.toObject({ getters: true }),
                                instance: {
                                    model: trade,
                                    onFailed: "Set the status of the trade with an id of (".concat(trade._id, ") to (").concat(oldStatus, ") and startTime to (").concat(oldStartTime, ") and timeStamps to (").concat(JSON.stringify(oldTimeStamps), ") and move to (").concat(oldMove, ") and runtime to (").concat(oldRuntime, ")"),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    trade.status = oldStatus;
                                                    trade.startTime = oldStartTime;
                                                    trade.timeStamps = oldTimeStamps;
                                                    trade.move = oldMove;
                                                    trade.runTime = oldRuntime;
                                                    return [4 /*yield*/, trade.save()];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                            }];
                }
            });
        });
    };
    TradeService.prototype.create = function (userId, investment, forecast) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionInstances, userObject, amount, stake, profit, outcome, percentage, _a, tradeTransactionInstance, tradeObject, investmentTransactionInstance, transactionInstance, userNotificationInstance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionInstances = [];
                        return [4 /*yield*/, this.userService.get(userId)];
                    case 1:
                        userObject = _b.sent();
                        amount = investment.amount;
                        stake = forecast.stakeRate * amount;
                        profit = (forecast.percentageProfit / 100) * amount;
                        outcome = stake + profit;
                        percentage = (profit * 100) / stake;
                        return [4 /*yield*/, this._createTransaction(userObject, investment, forecast, stake, outcome, profit, percentage, investment.environment, investment.manualMode)];
                    case 2:
                        _a = _b.sent(), tradeTransactionInstance = _a.instance, tradeObject = _a.object;
                        transactionInstances.push(tradeTransactionInstance);
                        return [4 /*yield*/, this.investmentService.updateTradeDetails(tradeObject.investment, tradeObject)];
                    case 3:
                        investmentTransactionInstance = _b.sent();
                        transactionInstances.push(investmentTransactionInstance);
                        return [4 /*yield*/, this.transactionService.create(userObject, tradeObject.status, transaction_enum_1.TransactionCategory.TRADE, tradeObject, stake, tradeObject.environment, stake)];
                    case 4:
                        transactionInstance = _b.sent();
                        transactionInstances.push(transactionInstance);
                        return [4 /*yield*/, this.notificationService.create("Your ".concat(tradeObject.investmentObject.planObject.name, " investment plan now has a pending trade to be placed"), notification_enum_1.NotificationCategory.TRADE, tradeObject, notification_enum_1.NotificationForWho.USER, tradeObject.status, tradeObject.environment, userObject)];
                    case 5:
                        userNotificationInstance = _b.sent();
                        transactionInstances.push(userNotificationInstance);
                        return [2 /*return*/, transactionInstances];
                }
            });
        });
    };
    TradeService.prototype.update = function (investment, forecast) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionInstances, amount, stake, profit, outcome, percentage, _a, tradeTransactionInstance, tradeObject, investmentTransactionInstance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionInstances = [];
                        amount = investment.amount;
                        stake = forecast.stakeRate * amount;
                        profit = (forecast.percentageProfit / 100) * amount;
                        outcome = stake + profit;
                        percentage = (profit * 100) / stake;
                        return [4 /*yield*/, this._updateTransaction(investment, forecast, stake, outcome, profit, percentage)];
                    case 1:
                        _a = _b.sent(), tradeTransactionInstance = _a.instance, tradeObject = _a.object;
                        transactionInstances.push(tradeTransactionInstance);
                        return [4 /*yield*/, this.investmentService.updateTradeDetails(tradeObject.investment, tradeObject)];
                    case 2:
                        investmentTransactionInstance = _b.sent();
                        transactionInstances.push(investmentTransactionInstance);
                        return [2 /*return*/, transactionInstances];
                }
            });
        });
    };
    TradeService.prototype.updateStatus = function (investment, forecast) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionInstances, _a, tradeObject, tradeInstance, user, investmentTransactionInstance, transactionInstance, notificationMessage, notificationInstance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionInstances = [];
                        return [4 /*yield*/, this._updateStatusTransaction(investment, forecast)];
                    case 1:
                        _a = _b.sent(), tradeObject = _a.object, tradeInstance = _a.instance;
                        transactionInstances.push(tradeInstance);
                        return [4 /*yield*/, this.userService.get(tradeObject.user)
                            // Investment Transaction Instance
                        ];
                    case 2:
                        user = _b.sent();
                        return [4 /*yield*/, this.investmentService.updateTradeDetails(tradeObject.investment, tradeObject)];
                    case 3:
                        investmentTransactionInstance = _b.sent();
                        transactionInstances.push(investmentTransactionInstance);
                        if (!(tradeObject.status === forecast_enum_1.ForecastStatus.SETTLED)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.transactionService.updateAmount(tradeObject._id, tradeObject.status, tradeObject.outcome)];
                    case 4:
                        transactionInstance = _b.sent();
                        transactionInstances.push(transactionInstance);
                        _b.label = 5;
                    case 5:
                        switch (tradeObject.status) {
                            case forecast_enum_1.ForecastStatus.RUNNING:
                                notificationMessage = 'is now running';
                                break;
                            case forecast_enum_1.ForecastStatus.MARKET_CLOSED:
                                notificationMessage = 'market has closed';
                                break;
                            case forecast_enum_1.ForecastStatus.ON_HOLD:
                                notificationMessage = 'is currently on hold';
                                break;
                            case forecast_enum_1.ForecastStatus.SETTLED:
                                notificationMessage = 'has been settled';
                                break;
                        }
                        if (!notificationMessage) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.notificationService.create("Your ".concat(tradeObject.investmentObject.planObject.name, " investment plan current trade ").concat(notificationMessage), notification_enum_1.NotificationCategory.TRADE, tradeObject, notification_enum_1.NotificationForWho.USER, tradeObject.status, tradeObject.environment, user)];
                    case 6:
                        notificationInstance = _b.sent();
                        transactionInstances.push(notificationInstance);
                        _b.label = 7;
                    case 7: return [2 /*return*/, transactionInstances];
                }
            });
        });
    };
    TradeService.prototype.delete = function (tradeId) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var trade, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(tradeId)];
                    case 1:
                        trade = _a.sent();
                        if (trade.status !== forecast_enum_1.ForecastStatus.SETTLED)
                            throw new http_exception_1.default(400, 'Trade has not been settled yet');
                        return [4 /*yield*/, trade.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Trade deleted successfully',
                                data: { trade: trade },
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, 'Failed to delete this trade, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TradeService.prototype.fetchAll = function (all, environment, userId) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var trades, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        trades = void 0;
                        if (!all) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tradeModel
                                .find({ environment: environment })
                                .select('-investmentObject -userObject -pair')
                                .populate('investment', 'name icon')
                                .populate('user', 'username isDeleted')];
                    case 1:
                        trades = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.tradeModel
                            .find({ environment: environment, user: userId })
                            .select('-investmentObject -userObject -pair')
                            .populate('investment', 'name icon')];
                    case 3:
                        trades = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Trade history fetched successfully',
                            data: { trades: trades },
                        }];
                    case 5:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Failed to fetch trade history, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TradeService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.INVESTMENT_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], TradeService);
    return TradeService;
}());
exports.default = TradeService;
