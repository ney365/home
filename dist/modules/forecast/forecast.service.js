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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var forecast_model_1 = __importDefault(require("@/modules/forecast/forecast.model"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var forecast_enum_1 = require("@/modules/forecast/forecast.enum");
var http_type_1 = require("@/modules/http/http.type");
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_enum_1 = require("@/modules/http/http.enum");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var transactionManager_type_1 = require("@/modules/transactionManager/transactionManager.type");
var helpers_1 = __importDefault(require("@/utils/helpers/helpers"));
var errorCodes_enum_1 = require("@/utils/enums/errorCodes.enum");
var investment_service_1 = __importDefault(require("../investment/investment.service"));
var ForecastService = /** @class */ (function () {
    function ForecastService(planService, pairService, mathService, investmentService, tradeService, transactionManagerService, SendMailService) {
        this.planService = planService;
        this.pairService = pairService;
        this.mathService = mathService;
        this.investmentService = investmentService;
        this.tradeService = tradeService;
        this.transactionManagerService = transactionManagerService;
        this.SendMailService = SendMailService;
        this.forecastModel = forecast_model_1.default;
    }
    ForecastService_1 = ForecastService;
    ForecastService.prototype.find = function (forecastId) {
        return __awaiter(this, void 0, void 0, function () {
            var forecast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.forecastModel.findById(forecastId)];
                    case 1:
                        forecast = _a.sent();
                        if (!forecast)
                            throw new http_exception_1.default(404, 'Forecast not found');
                        return [2 /*return*/, forecast];
                }
            });
        });
    };
    ForecastService.prototype.getForecastWaitTime = function (dailyForcast, duration) {
        var min = ForecastService_1.minDailyWaitTime / dailyForcast;
        var max = ForecastService_1.maxDailyWaitTime / dailyForcast;
        return this.mathService.probabilityValue(min, max, 0.76);
    };
    ForecastService.prototype.getDurationTime = function (plan) {
        return (plan.duration * 24 * 60 * 60 * 1000 -
            this.getForecastWaitTime(plan.dailyForecasts, plan.duration) *
                plan.duration);
    };
    ForecastService.prototype._createTransaction = function (plan, pair, percentageProfit, stakeRate) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var forecast;
            var _this = this;
            return __generator(this, function (_a) {
                forecast = new this.forecastModel({
                    plan: plan._id,
                    planObject: plan,
                    pair: pair._id,
                    pairObject: pair,
                    market: pair.assetType,
                    percentageProfit: percentageProfit,
                    stakeRate: stakeRate,
                    manualMode: plan.manualMode,
                });
                return [2 /*return*/, {
                        object: forecast.toObject({ getters: true }),
                        instance: {
                            model: forecast,
                            onFailed: "Delete the forecast with an id of (".concat(forecast._id, ")"),
                            callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.forecastModel.deleteOne({ _id: forecast._id })];
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
    ForecastService.prototype._updateTransaction = function (forecastId, pair, percentageProfit, stakeRate, move, openingPrice, closingPrice) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var forecast, oldPair, oldPairObject, oldMarket, oldMove, oldPercentageProfit, oldStakeRate, oldOpeningPrice, oldClosingPrice;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(forecastId)];
                    case 1:
                        forecast = _a.sent();
                        if (pair.assetType !== forecast.market)
                            throw new http_exception_1.default(400, "The pair is not compatible with this forecast, use a ".concat(forecast.market, " pair"));
                        oldPair = forecast.pair;
                        oldPairObject = forecast.pairObject;
                        oldMarket = forecast.market;
                        oldMove = forecast.move;
                        oldPercentageProfit = forecast.percentageProfit;
                        oldStakeRate = forecast.stakeRate;
                        oldOpeningPrice = forecast.openingPrice;
                        oldClosingPrice = forecast.closingPrice;
                        forecast.pair = pair._id;
                        forecast.pairObject = pair;
                        forecast.market = pair.assetType;
                        forecast.move = move;
                        forecast.percentageProfit = percentageProfit;
                        forecast.stakeRate = stakeRate;
                        forecast.openingPrice = openingPrice;
                        forecast.closingPrice = closingPrice;
                        return [2 /*return*/, {
                                object: forecast.toObject({ getters: true }),
                                instance: {
                                    model: forecast,
                                    onFailed: "Set the forecast with an id of (".concat(forecast._id, ") to the following: \n        \npair = (").concat(oldPair, "), \n        \npairObject = (").concat(oldPairObject, "), \n        \nmarket = (").concat(oldMarket, "), \n        \nmove = (").concat(oldMove, "), \n        \npercentageProfit = (").concat(oldPercentageProfit, "), \n        \nstakeRate = (").concat(oldStakeRate, "), \n        \nopeningPrice = (").concat(oldOpeningPrice, "), \n        \nclosingPrice = (").concat(oldClosingPrice, ")"),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    forecast.pair = oldPair;
                                                    forecast.pairObject = oldPairObject;
                                                    forecast.market = oldMarket;
                                                    forecast.move = oldMove;
                                                    forecast.percentageProfit = oldPercentageProfit;
                                                    forecast.stakeRate = oldStakeRate;
                                                    forecast.openingPrice = oldOpeningPrice;
                                                    forecast.closingPrice = oldClosingPrice;
                                                    return [4 /*yield*/, forecast.save()];
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
    ForecastService.prototype._updateStatusTransaction = function (forecastId, status, move) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var forecast, oldStatus, oldStartTime, oldTimeStamps, oldRuntime, oldMove, runtime;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(forecastId)];
                    case 1:
                        forecast = _a.sent();
                        oldStatus = forecast.status;
                        oldStartTime = forecast.startTime;
                        oldTimeStamps = forecast.timeStamps.slice();
                        oldRuntime = forecast.runTime;
                        oldMove = forecast.move;
                        if (oldStatus === forecast_enum_1.ForecastStatus.SETTLED)
                            throw new http_exception_1.default(400, 'This forecast has already been settled');
                        switch (status) {
                            case forecast_enum_1.ForecastStatus.MARKET_CLOSED:
                            case forecast_enum_1.ForecastStatus.ON_HOLD:
                                runtime =
                                    new Date().getTime() -
                                        ((oldStartTime === null || oldStartTime === void 0 ? void 0 : oldStartTime.getTime()) || new Date().getTime());
                                if (oldStartTime)
                                    forecast.timeStamps = __spreadArray(__spreadArray([], oldTimeStamps, true), [runtime], false);
                                forecast.startTime = undefined;
                                break;
                            case forecast_enum_1.ForecastStatus.RUNNING:
                                forecast.startTime = new Date();
                            case forecast_enum_1.ForecastStatus.SETTLED:
                                runtime =
                                    new Date().getTime() -
                                        ((oldStartTime === null || oldStartTime === void 0 ? void 0 : oldStartTime.getTime()) || new Date().getTime());
                                if (oldStartTime)
                                    forecast.timeStamps = __spreadArray(__spreadArray([], oldTimeStamps, true), [runtime], false);
                                forecast.runTime = forecast.timeStamps.reduce(function (acc, curr) { return (acc += curr); }, 0);
                                forecast.startTime = undefined;
                                forecast.move = move;
                        }
                        forecast.status = status;
                        return [2 /*return*/, {
                                object: forecast.toObject({ getters: true }),
                                instance: {
                                    model: forecast,
                                    onFailed: "Set the status of the forecast with an id of (".concat(forecast._id, ") to (").concat(oldStatus, ") and startTime to (").concat(oldStartTime, ") and timeStamps to (").concat(JSON.stringify(oldTimeStamps), ") and move to (").concat(oldMove, ") and runtime to (").concat(oldRuntime, ")"),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    forecast.status = oldStatus;
                                                    forecast.startTime = oldStartTime;
                                                    forecast.timeStamps = oldTimeStamps;
                                                    forecast.move = oldMove;
                                                    forecast.runTime = oldRuntime;
                                                    return [4 /*yield*/, forecast.save()];
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
    ForecastService.prototype.getTodaysTotalForecast = function (planObject) {
        return __awaiter(this, void 0, void 0, function () {
            var today;
            return __generator(this, function (_a) {
                today = new Date(new Date().setHours(0, 0, 0, 0));
                return [2 /*return*/, this.forecastModel
                        .count({
                        plan: planObject._id,
                        createdAt: {
                            $gte: today,
                        },
                    })
                        .exec()];
            });
        });
    };
    ForecastService.prototype.create = function (plan, pair, percentageProfit, stakeRate) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionInstances, _a, forecastObject, forecastTransactionInstance, planTransactionInstance, activePlanInvestments, index, investmentObject, tradeInstances, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionInstances = [];
                        return [4 /*yield*/, this._createTransaction(plan, pair, percentageProfit, stakeRate)];
                    case 1:
                        _a = _b.sent(), forecastObject = _a.object, forecastTransactionInstance = _a.instance;
                        transactionInstances.push(forecastTransactionInstance);
                        return [4 /*yield*/, this.planService.updateForecastDetails(forecastObject.plan, forecastObject)];
                    case 2:
                        planTransactionInstance = _b.sent();
                        transactionInstances.push(planTransactionInstance);
                        return [4 /*yield*/, this.investmentService.getAllAutoAwaiting(forecastObject.plan)];
                    case 3:
                        activePlanInvestments = _b.sent();
                        index = 0;
                        _b.label = 4;
                    case 4:
                        if (!(index < activePlanInvestments.length)) return [3 /*break*/, 9];
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        investmentObject = activePlanInvestments[index];
                        return [4 /*yield*/, this.tradeService.create(investmentObject.user, investmentObject, forecastObject)];
                    case 6:
                        tradeInstances = _b.sent();
                        tradeInstances.forEach(function (instance) {
                            return transactionInstances.push(instance);
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        this.SendMailService.sendDeveloperErrorMail(error_1);
                        return [3 /*break*/, 8];
                    case 8:
                        index++;
                        return [3 /*break*/, 4];
                    case 9: return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances)];
                    case 10:
                        _b.sent();
                        return [2 /*return*/, forecastTransactionInstance.model];
                }
            });
        });
    };
    ForecastService.prototype.autoCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var plans, index, plan, totalForecast, todaysForecast, playedRate, startOfDayTime, endOfDayTime, currentTime, timeRate, pair, assets, _loop_1, this_1, state_1, error, minPercentageProfit, maxPercentageProfit, stakeRate, percentageProfit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.planService.getAllAutoIdled()];
                    case 1:
                        plans = _a.sent();
                        if (!plans.length)
                            return [2 /*return*/];
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < plans.length)) return [3 /*break*/, 9];
                        plan = plans[index];
                        totalForecast = plan.dailyForecasts * plan.duration;
                        return [4 /*yield*/, this.getTodaysTotalForecast(plan)];
                    case 3:
                        todaysForecast = _a.sent();
                        playedRate = todaysForecast / plan.dailyForecasts;
                        startOfDayTime = new Date().setHours(0, 0, 0, 0);
                        endOfDayTime = new Date().setHours(23, 59, 59, 999);
                        currentTime = new Date().getTime() -
                            this.getForecastWaitTime(plan.dailyForecasts, plan.duration);
                        timeRate = (startOfDayTime - currentTime) / (startOfDayTime - endOfDayTime);
                        if (timeRate < playedRate)
                            return [3 /*break*/, 8];
                        pair = void 0;
                        assets = plan.assets;
                        _loop_1 = function () {
                            var error, selectedAsset, validPairs;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!assets.length) {
                                            error = new Error("There is no assets or assets with valid pairs in plan (".concat(plan.name, " - ").concat(plan._id, ")"));
                                            this_1.SendMailService.sendDeveloperErrorMail(error);
                                            return [2 /*return*/, "break"];
                                        }
                                        selectedAsset = helpers_1.default.randomPickFromArray(assets);
                                        return [4 /*yield*/, this_1.pairService.getByBase(selectedAsset._id)];
                                    case 1:
                                        validPairs = _b.sent();
                                        if (!validPairs.length) {
                                            assets = assets.filter(function (cur) { return cur._id !== selectedAsset._id; });
                                            return [2 /*return*/, "continue"];
                                        }
                                        pair = helpers_1.default.randomPickFromArray(validPairs);
                                        return [2 /*return*/, "break"];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 4;
                    case 4:
                        if (!true) return [3 /*break*/, 6];
                        return [5 /*yield**/, _loop_1()];
                    case 5:
                        state_1 = _a.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 6];
                        return [3 /*break*/, 4];
                    case 6:
                        if (!pair)
                            return [2 /*return*/];
                        if (pair.assetType !== plan.assetType) {
                            error = new Error("The pair is not compatible with this plan (".concat(plan.name, " - ").concat(plan._id, ")"));
                            this.SendMailService.sendDeveloperErrorMail(error);
                            return [3 /*break*/, 9];
                        }
                        minPercentageProfit = plan.minPercentageProfit / totalForecast;
                        maxPercentageProfit = plan.maxPercentageProfit / totalForecast;
                        stakeRate = helpers_1.default.getRandomValue(ForecastService_1.minStakeRate, ForecastService_1.maxStakeRate);
                        percentageProfit = this.mathService.probabilityValue(minPercentageProfit, maxPercentageProfit, 0.76);
                        return [4 /*yield*/, this.create(plan, pair, percentageProfit, stakeRate)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        index++;
                        return [3 /*break*/, 2];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ForecastService.prototype.manualCreate = function (planId, pairId, percentageProfit, stakeRate) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var plan, pair, forecast, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.planService.get(planId)];
                    case 1:
                        plan = _a.sent();
                        return [4 /*yield*/, this.pairService.get(pairId)];
                    case 2:
                        pair = _a.sent();
                        if (!plan)
                            throw new http_exception_1.default(404, 'The plan no longer exist');
                        if (plan.forecastStatus && plan.forecastStatus !== forecast_enum_1.ForecastStatus.SETTLED)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.BAD_REQUEST, 'This plan already has an unsettled forecast running');
                        if (!pair)
                            throw new http_exception_1.default(404, 'The selected pair no longer exist');
                        if (pair.assetType !== plan.assetType)
                            throw new http_exception_1.default(400, 'The pair is not compatible with this plan plan');
                        return [4 /*yield*/, this.create(plan, pair, percentageProfit, stakeRate)];
                    case 3:
                        forecast = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Forecast created successfully',
                                data: { forecast: forecast },
                            }];
                    case 4:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, 'Failed to create this forecast, please try again');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ForecastService.prototype.update = function (forecastId, pairId, percentageProfit, stakeRate, move, openingPrice, closingPrice) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var pair, transactionInstances, _a, updateForecastTransactionInstance, forecastObject, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.pairService.get(pairId)];
                    case 1:
                        pair = _b.sent();
                        if (!pair)
                            throw new http_exception_1.default(404, 'The selected pair no longer exist');
                        transactionInstances = [];
                        return [4 /*yield*/, this._updateTransaction(forecastId, pair, percentageProfit, stakeRate, move, openingPrice, closingPrice)];
                    case 2:
                        _a = _b.sent(), updateForecastTransactionInstance = _a.instance, forecastObject = _a.object;
                        transactionInstances.push(updateForecastTransactionInstance);
                        return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Forecast updated successfully',
                                data: { forecast: updateForecastTransactionInstance.model },
                            }];
                    case 4:
                        err_2 = _b.sent();
                        throw new app_exception_1.default(err_2, 'Failed to update this forecast, please try again');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ForecastService.prototype.updateStatus = function (forecastId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionInstances, move, _a, forecastInstance, forecastObject, planTransactionInstance, activePlanInvestments, index, investmentObject, tradeInstances, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionInstances = [];
                        if (status === forecast_enum_1.ForecastStatus.SETTLED) {
                            move = forecast_enum_1.ForecastMove.LONG;
                        }
                        return [4 /*yield*/, this._updateStatusTransaction(forecastId, status, move)];
                    case 1:
                        _a = _b.sent(), forecastInstance = _a.instance, forecastObject = _a.object;
                        transactionInstances.push(forecastInstance);
                        return [4 /*yield*/, this.planService.updateForecastDetails(forecastObject.plan, forecastObject)];
                    case 2:
                        planTransactionInstance = _b.sent();
                        transactionInstances.push(planTransactionInstance);
                        return [4 /*yield*/, this.investmentService.getAllAutoRunning(forecastObject.plan)];
                    case 3:
                        activePlanInvestments = _b.sent();
                        index = 0;
                        _b.label = 4;
                    case 4:
                        if (!(index < activePlanInvestments.length)) return [3 /*break*/, 9];
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        investmentObject = activePlanInvestments[index];
                        return [4 /*yield*/, this.tradeService.updateStatus(investmentObject, forecastObject)];
                    case 6:
                        tradeInstances = _b.sent();
                        tradeInstances.forEach(function (instance) {
                            return transactionInstances.push(instance);
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _b.sent();
                        this.SendMailService.sendDeveloperErrorMail(error_2);
                        return [3 /*break*/, 8];
                    case 8:
                        index++;
                        return [3 /*break*/, 4];
                    case 9: return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances)];
                    case 10:
                        _b.sent();
                        return [2 /*return*/, forecastInstance.model];
                }
            });
        });
    };
    ForecastService.prototype.autoUpdateStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var plans, index, plan, totalForecast, durationTime, forecastTime, forecastStatus, forecastTimeStamps, forecastStartTime, runTime, totalRuntime, error, error, error, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.planService.getAllAutoRunning()];
                    case 1:
                        plans = _a.sent();
                        if (!plans.length)
                            return [2 /*return*/];
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < plans.length)) return [3 /*break*/, 8];
                        plan = plans[index];
                        totalForecast = plan.dailyForecasts * plan.duration;
                        durationTime = this.getDurationTime(plan);
                        forecastTime = durationTime / totalForecast;
                        forecastStatus = plan.forecastStatus;
                        forecastTimeStamps = plan.forecastTimeStamps.slice();
                        forecastStartTime = plan.forecastStartTime;
                        runTime = new Date().getTime() -
                            ((forecastStartTime === null || forecastStartTime === void 0 ? void 0 : forecastStartTime.getTime()) || new Date().getTime());
                        forecastTimeStamps.push(runTime);
                        totalRuntime = forecastTimeStamps.reduce(function (acc, curr) { return (acc += curr); }, 0);
                        if (!(totalRuntime >= forecastTime &&
                            forecastStatus === forecast_enum_1.ForecastStatus.RUNNING)) return [3 /*break*/, 4];
                        if (!plan.currentForecast) {
                            error = new Error("There is no current forecast in plan (".concat(plan.name, " - ").concat(plan._id, ")"));
                            this.SendMailService.sendDeveloperErrorMail(error);
                            return [3 /*break*/, 7];
                        }
                        return [4 /*yield*/, this.updateStatus(plan.currentForecast, forecast_enum_1.ForecastStatus.SETTLED)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(forecastStatus === forecast_enum_1.ForecastStatus.PREPARING)) return [3 /*break*/, 6];
                        if (!plan.currentForecast) {
                            error = new Error("There is no current forecast in plan (".concat(plan.name, " - ").concat(plan._id, ")"));
                            this.SendMailService.sendDeveloperErrorMail(error);
                            return [3 /*break*/, 7];
                        }
                        return [4 /*yield*/, this.updateStatus(plan.currentForecast, forecast_enum_1.ForecastStatus.RUNNING)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        if (forecastStatus === forecast_enum_1.ForecastStatus.RUNNING) {
                            if (!plan.currentForecast) {
                                error = new Error("There is no current forecast in plan (".concat(plan.name, " - ").concat(plan._id, ")"));
                                this.SendMailService.sendDeveloperErrorMail(error);
                                return [3 /*break*/, 7];
                            }
                            // LOGIC TO CHECK IF MARKET HAS CLOSED
                            // await this.updateStatus(plan.currentForecast, ForecastStatus.MARKET_CLOSED)
                        }
                        // CHECK IF FORECAST MARKET HAS OPENED
                        else if (forecastStatus === forecast_enum_1.ForecastStatus.MARKET_CLOSED) {
                            if (!plan.currentForecast) {
                                error = new Error("There is no current forecast in plan (".concat(plan.name, " - ").concat(plan._id, ")"));
                                this.SendMailService.sendDeveloperErrorMail(error);
                                return [3 /*break*/, 7];
                            }
                            // LOGIC TO CHECK IF MARKET HAS OPENED
                            // await this.updateStatus(plan.currentForecast, ForecastStatus.RUNNING)
                        }
                        _a.label = 7;
                    case 7:
                        index++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ForecastService.prototype.manualUpdateStatus = function (forecastId, status) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var forecast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateStatus(forecastId, status)];
                    case 1:
                        forecast = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Forecast created successfully',
                                data: { forecast: forecast },
                            }];
                }
            });
        });
    };
    ForecastService.prototype.delete = function (forecastId) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var forecast, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(forecastId)];
                    case 1:
                        forecast = _a.sent();
                        if (forecast.status !== forecast_enum_1.ForecastStatus.SETTLED)
                            throw new http_exception_1.default(400, 'Forecast has not been settled yet');
                        return [4 /*yield*/, this.forecastModel.deleteOne({ _id: forecast._id })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Forecast deleted successfully',
                                data: { forecast: forecast },
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Failed to delete this forecast, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ForecastService.prototype.fetchAll = function (planId) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var forecasts, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        forecasts = void 0;
                        return [4 /*yield*/, this.forecastModel
                                .find({ plan: planId })
                                .select('-planObject -pairObject')
                                .populate('plan')
                                .populate('pair')];
                    case 1:
                        forecasts = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Forecast fetched successfully',
                                data: { forecasts: forecasts },
                            }];
                    case 2:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to fetch forecast, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var ForecastService_1;
    ForecastService.minStakeRate = 0.1;
    ForecastService.maxStakeRate = 0.25;
    ForecastService.minDailyWaitTime = investment_service_1.default.minWaitHour * 60 * 60 * 1000;
    ForecastService.maxDailyWaitTime = investment_service_1.default.minWaitHour * 60 * 60 * 1000;
    ForecastService.profitProbability = 0.5;
    ForecastService = ForecastService_1 = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.PLAN_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.PAIR_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.MATH_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.INVESTMENT_SERVICE)),
        __param(4, (0, typedi_1.Inject)(serviceToken_1.default.TRADE_SERVICE)),
        __param(5, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_MANAGER_SERVICE)),
        __param(6, (0, typedi_1.Inject)(serviceToken_1.default.SEND_MAIL_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
    ], ForecastService);
    return ForecastService;
}());
exports.default = ForecastService;
