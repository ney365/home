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
var investment_model_1 = __importDefault(require("@/modules/investment/investment.model"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var investment_enum_1 = require("@/modules/investment/investment.enum");
var transaction_enum_1 = require("@/modules/transaction/transaction.enum");
var formatNumber_1 = __importDefault(require("@/utils/formats/formatNumber"));
var notification_enum_1 = require("@/modules/notification/notification.enum");
var referral_enum_1 = require("@/modules/referral/referral.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var http_type_1 = require("@/modules/http/http.type");
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_enum_1 = require("@/modules/http/http.enum");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var transactionManager_type_1 = require("@/modules/transactionManager/transactionManager.type");
var formatNumber_2 = __importDefault(require("@/utils/formats/formatNumber"));
var forecast_enum_1 = require("../forecast/forecast.enum");
var errorCodes_enum_1 = require("@/utils/enums/errorCodes.enum");
var trade_model_1 = __importDefault(require("../trade/trade.model"));
var InvestmentService = /** @class */ (function () {
    function InvestmentService(planService, userService, transactionService, notificationService, referralService, mathService, transactionManagerService) {
        var _this = this;
        this.planService = planService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.notificationService = notificationService;
        this.referralService = referralService;
        this.mathService = mathService;
        this.transactionManagerService = transactionManagerService;
        this.investmentModel = investment_model_1.default;
        this.tradeModel = trade_model_1.default;
        this.create = function (planId, userId, amount, account, environment) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var plan, transactionInstances_1, _a, userInstance, user, _b, investmentInstance, investment, referralInstances, transactionInstance, userNotificationInstance, adminNotificationInstance, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, this.planService.get(planId)];
                    case 1:
                        plan = _c.sent();
                        if (!plan)
                            throw new http_exception_1.default(404, 'The selected plan no longer exist');
                        if (plan.minAmount > amount || plan.maxAmount < amount)
                            throw new http_exception_1.default(400, "The amount allowed in this plan is between ".concat(formatNumber_2.default.toDollar(plan.minAmount), " and ").concat(formatNumber_2.default.toDollar(plan.maxAmount), "."));
                        transactionInstances_1 = [];
                        return [4 /*yield*/, this.userService.fund(userId, account, -amount)];
                    case 2:
                        _a = _c.sent(), userInstance = _a.instance, user = _a.object;
                        transactionInstances_1.push(userInstance);
                        return [4 /*yield*/, this._createTransaction(user, plan, amount, account, environment)];
                    case 3:
                        _b = _c.sent(), investmentInstance = _b.instance, investment = _b.object;
                        transactionInstances_1.push(investmentInstance);
                        if (!(environment === user_enum_1.UserEnvironment.LIVE)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.referralService.create(referral_enum_1.ReferralTypes.INVESTMENT, user, investment.amount)];
                    case 4:
                        referralInstances = _c.sent();
                        referralInstances.forEach(function (instance) {
                            transactionInstances_1.push(instance);
                        });
                        _c.label = 5;
                    case 5: return [4 /*yield*/, this.transactionService.create(user, investment.status, transaction_enum_1.TransactionCategory.INVESTMENT, investment, amount, environment, amount)];
                    case 6:
                        transactionInstance = _c.sent();
                        transactionInstances_1.push(transactionInstance);
                        return [4 /*yield*/, this.notificationService.create("Your investment of ".concat(formatNumber_1.default.toDollar(amount), " on the ").concat(plan.name, " plan is up and running"), notification_enum_1.NotificationCategory.INVESTMENT, investment, notification_enum_1.NotificationForWho.USER, investment.status, environment, user)];
                    case 7:
                        userNotificationInstance = _c.sent();
                        transactionInstances_1.push(userNotificationInstance);
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " just invested in the ").concat(plan.name, " plan with the sum of ").concat(formatNumber_1.default.toDollar(amount), ", on his ").concat(environment, " account"), notification_enum_1.NotificationCategory.INVESTMENT, investment, notification_enum_1.NotificationForWho.ADMIN, investment.status, environment)];
                    case 8:
                        adminNotificationInstance = _c.sent();
                        transactionInstances_1.push(adminNotificationInstance);
                        return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances_1)];
                    case 9:
                        _c.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Investment has been registered successfully',
                                data: { investment: investmentInstance.model },
                            }];
                    case 10:
                        err_1 = _c.sent();
                        throw new app_exception_1.default(err_1, 'Failed to register this investment, please try again');
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        this.forceUpdateStatus = function (investmentId, status) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.updateStatus(investmentId, status)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.transactionManagerService.execute(result.instances)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Status updated successfully',
                                data: { investment: result.model },
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Failed to update this investment  status, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (investmentId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var investment, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.find(investmentId)];
                    case 1:
                        investment = _a.sent();
                        if (investment.status !== investment_enum_1.InvestmentStatus.COMPLETED)
                            throw new http_exception_1.default(400, 'Investment has not been settled yet');
                        return [4 /*yield*/, this.investmentModel.deleteOne({ _id: investment._id })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.tradeModel.deleteMany({ investment: investmentId })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Investment deleted successfully',
                                data: { investment: investment },
                            }];
                    case 4:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Failed to delete this investment, please try again');
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAll = function (all, environment, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var investments, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        investments = void 0;
                        if (!all) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.investmentModel
                                .find({ environment: environment })
                                .select('-userObject -plan')
                                .populate('user', 'username isDeleted')];
                    case 1:
                        investments = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.investmentModel
                            .find({ environment: environment, user: userId })
                            .select('-userObject -plan')];
                    case 3:
                        investments = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Investment history fetched successfully',
                            data: { investments: investments },
                        }];
                    case 5:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to fetch investment history, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    InvestmentService_1 = InvestmentService;
    InvestmentService.prototype.find = function (investmentId, fromAllAccounts, userId) {
        if (fromAllAccounts === void 0) { fromAllAccounts = true; }
        return __awaiter(this, void 0, void 0, function () {
            var investment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fromAllAccounts) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.investmentModel.findById(investmentId)];
                    case 1:
                        investment = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.investmentModel.findOne({
                            _id: investmentId,
                            user: userId,
                        })];
                    case 3:
                        investment = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!investment)
                            throw new http_exception_1.default(404, 'Investment plan not found');
                        return [2 /*return*/, investment];
                }
            });
        });
    };
    InvestmentService.prototype.getAllAutoAwaiting = function (planId) {
        return __awaiter(this, void 0, void 0, function () {
            var investments, index, investment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.investmentModel.find({
                            manualMode: false,
                            status: investment_enum_1.InvestmentStatus.AWAITING_TRADE,
                            plan: planId,
                            tradeStatus: { $or: [forecast_enum_1.ForecastStatus.SETTLED, undefined] },
                        })];
                    case 1:
                        investments = _a.sent();
                        for (index = 0; index < investments.length; index++) {
                            investment = investments[index];
                            investment.toObject({ getters: true });
                        }
                        return [2 /*return*/, investments];
                }
            });
        });
    };
    InvestmentService.prototype.getAllAutoRunning = function (planId) {
        return __awaiter(this, void 0, void 0, function () {
            var investments, index, investment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.investmentModel.find({
                            manualMode: false,
                            status: investment_enum_1.InvestmentStatus.RUNNING,
                            plan: planId,
                            tradeStatus: forecast_enum_1.ForecastStatus.RUNNING,
                        })];
                    case 1:
                        investments = _a.sent();
                        for (index = 0; index < investments.length; index++) {
                            investment = investments[index];
                            investment.toObject({ getters: true });
                        }
                        return [2 /*return*/, investments];
                }
            });
        });
    };
    InvestmentService.prototype.get = function (investmentId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(investmentId)];
                    case 1: return [2 /*return*/, (_a.sent()).toObject({ getters: true })];
                }
            });
        });
    };
    InvestmentService.prototype._createTransaction = function (user, plan, amount, account, environment) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var investment;
            return __generator(this, function (_a) {
                investment = new this.investmentModel({
                    plan: plan._id,
                    planObject: plan,
                    user: user._id,
                    userObject: user,
                    minRunTime: plan.duration *
                        1000 *
                        60 *
                        60 *
                        (24 -
                            this.mathService.probabilityValue(InvestmentService_1.minWaitHour, InvestmentService_1.maxWaitHour, 0.76)),
                    gas: plan.gas,
                    amount: amount,
                    balance: amount,
                    account: account,
                    environment: environment,
                    status: investment_enum_1.InvestmentStatus.AWAITING_TRADE,
                    manualMode: plan.manualMode,
                });
                return [2 /*return*/, {
                        object: investment.toObject({ getters: true }),
                        instance: {
                            model: investment,
                            onFailed: "Delete the investment with an id of (".concat(investment._id, ")"),
                            callback: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, investment.deleteOne()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            },
                        },
                    }];
            });
        });
    };
    InvestmentService.prototype._updateStatusTransaction = function (investmentId, status) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var investment, oldStatus;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(investmentId)];
                    case 1:
                        investment = _a.sent();
                        oldStatus = investment.status;
                        if (oldStatus === investment_enum_1.InvestmentStatus.COMPLETED)
                            throw new http_exception_1.default(400, 'Investment plan has already been settled');
                        investment.status = status;
                        return [2 /*return*/, {
                                object: investment.toObject({ getters: true }),
                                instance: {
                                    model: investment,
                                    onFailed: "Set the status of the investment with an id of (".concat(investment._id, ") to (").concat(oldStatus, ")"),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    investment.status = oldStatus;
                                                    return [4 /*yield*/, investment.save()];
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
    InvestmentService.prototype._updateTradeDetails = function (investmentId, tradeObject) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var investment, oldStatus, oldTradeStatus, oldCurrentTrade, oldTimeStamps, oldStartTime, oldRuntime, oldBalance;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(investmentId)];
                    case 1:
                        investment = _a.sent();
                        oldStatus = investment.status;
                        oldTradeStatus = investment.tradeStatus;
                        oldCurrentTrade = investment.currentTrade;
                        oldTimeStamps = investment.tradeTimeStamps.slice();
                        oldStartTime = investment.tradeStartTime;
                        oldRuntime = investment.runTime;
                        oldBalance = investment.balance;
                        investment.currentTrade = tradeObject._id;
                        investment.tradeStatus = tradeObject.status;
                        investment.tradeTimeStamps = tradeObject.timeStamps.slice();
                        investment.tradeStartTime = tradeObject.startTime;
                        switch (tradeObject.status) {
                            case forecast_enum_1.ForecastStatus.MARKET_CLOSED:
                            case forecast_enum_1.ForecastStatus.ON_HOLD:
                            case forecast_enum_1.ForecastStatus.SETTLED:
                                investment.status = investment_enum_1.InvestmentStatus.AWAITING_TRADE;
                                break;
                            case forecast_enum_1.ForecastStatus.PREPARING:
                                investment.status = investment_enum_1.InvestmentStatus.PROCESSING_TRADE;
                                break;
                            case forecast_enum_1.ForecastStatus.RUNNING:
                                investment.status = investment_enum_1.InvestmentStatus.RUNNING;
                                break;
                            default:
                                throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.BAD_REQUEST, 'Invalid forcast status');
                        }
                        if (tradeObject.status === forecast_enum_1.ForecastStatus.SETTLED) {
                            investment.currentTrade = undefined;
                            investment.tradeStatus = undefined;
                            investment.tradeTimeStamps = [];
                            investment.tradeStartTime = undefined;
                            investment.runTime += tradeObject.runTime;
                            investment.balance += tradeObject.profit;
                            if (investment.runTime >= investment.minRunTime) {
                                investment.status = investment_enum_1.InvestmentStatus.FINALIZING;
                            }
                        }
                        return [2 /*return*/, {
                                object: investment.toObject({ getters: true }),
                                instance: {
                                    model: investment,
                                    onFailed: "Set the investment with an id of (".concat(investment._id, ") to the following: \n        \n status = (").concat(oldStatus, "),\n        \n tradeStatus = (").concat(oldTradeStatus, "),\n        \n currentTrade = (").concat(oldCurrentTrade, "),\n        \n tradeTimeStamps = (").concat(oldTimeStamps, "),\n        \n tradeStartTime = (").concat(oldStartTime, "),\n        \n runTime = (").concat(oldRuntime, "),\n        \n balance = (").concat(oldBalance, "),\n        "),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    investment.status = oldStatus;
                                                    investment.tradeStatus = oldTradeStatus;
                                                    investment.currentTrade = oldCurrentTrade;
                                                    investment.tradeTimeStamps = oldTimeStamps;
                                                    investment.tradeStartTime = oldStartTime;
                                                    investment.runTime = oldRuntime;
                                                    investment.balance = oldBalance;
                                                    return [4 /*yield*/, investment.save()];
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
    InvestmentService.prototype._fundTransaction = function (investmentId, amount) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var investment, onFailed;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(investmentId)];
                    case 1:
                        investment = _a.sent();
                        investment.balance += amount;
                        onFailed = "".concat(amount > 0 ? 'substract' : 'add', " ").concat(amount > 0
                            ? formatNumber_2.default.toDollar(amount)
                            : formatNumber_2.default.toDollar(-amount), " ").concat(amount > 0 ? 'from' : 'to', " the investment with an id of (").concat(investment._id, ")");
                        return [2 /*return*/, {
                                object: investment.toObject({ getters: true }),
                                instance: {
                                    model: investment,
                                    onFailed: onFailed,
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    investment.balance -= amount;
                                                    return [4 /*yield*/, investment.save()];
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
    InvestmentService.prototype.updateTradeDetails = function (investmentId, tradeObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._updateTradeDetails(investmentId, tradeObject)];
                    case 1: return [2 /*return*/, (_a.sent()).instance];
                }
            });
        });
    };
    InvestmentService.prototype.updateStatus = function (investmentId, status, sendNotice) {
        if (sendNotice === void 0) { sendNotice = true; }
        return __awaiter(this, void 0, void 0, function () {
            var transactionInstances, _a, investment, investmentInstance, user, account, userTransaction, userInstance, transactionInstance, referralInstances, notificationMessage, receiver, _b, notificationInstance;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        transactionInstances = [];
                        return [4 /*yield*/, this._updateStatusTransaction(investmentId, status)];
                    case 1:
                        _a = _c.sent(), investment = _a.object, investmentInstance = _a.instance;
                        transactionInstances.push(investmentInstance);
                        if (!(status === investment_enum_1.InvestmentStatus.COMPLETED)) return [3 /*break*/, 5];
                        account = investment.account === user_enum_1.UserAccount.DEMO_BALANCE
                            ? user_enum_1.UserAccount.DEMO_BALANCE
                            : user_enum_1.UserAccount.MAIN_BALANCE;
                        return [4 /*yield*/, this.userService.fund(investment.user, account, investment.balance)];
                    case 2:
                        userTransaction = _c.sent();
                        user = userTransaction.object;
                        userInstance = userTransaction.instance;
                        transactionInstances.push(userInstance);
                        return [4 /*yield*/, this.transactionService.updateAmount(investment._id, investment.status, investment.balance)];
                    case 3:
                        transactionInstance = _c.sent();
                        transactionInstances.push(transactionInstance);
                        if (!(investment.environment === user_enum_1.UserEnvironment.LIVE)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.referralService.create(referral_enum_1.ReferralTypes.COMPLETED_PACKAGE_EARNINGS, user, investment.balance - investment.amount)];
                    case 4:
                        referralInstances = _c.sent();
                        referralInstances.forEach(function (instance) {
                            transactionInstances.push(instance);
                        });
                        _c.label = 5;
                    case 5:
                        if (!sendNotice) return [3 /*break*/, 10];
                        notificationMessage = void 0;
                        switch (status) {
                            case investment_enum_1.InvestmentStatus.RUNNING:
                                notificationMessage = 'is now running';
                                break;
                            case investment_enum_1.InvestmentStatus.SUSPENDED:
                                notificationMessage = 'has been suspended';
                                break;
                            case investment_enum_1.InvestmentStatus.COMPLETED:
                                notificationMessage = 'has been completed';
                                break;
                            case investment_enum_1.InvestmentStatus.INSUFFICIENT_GAS:
                                notificationMessage = 'has ran out of gas';
                                break;
                            case investment_enum_1.InvestmentStatus.REFILLING:
                                notificationMessage = 'is now filling';
                                break;
                            case investment_enum_1.InvestmentStatus.ON_MAINTAINACE:
                                notificationMessage = 'is corrently on maintance';
                                break;
                            case investment_enum_1.InvestmentStatus.AWAITING_TRADE:
                                notificationMessage = 'is awaiting the trade';
                                break;
                            case investment_enum_1.InvestmentStatus.PROCESSING_TRADE:
                                notificationMessage = 'is processing the next trade';
                                break;
                        }
                        if (!notificationMessage) return [3 /*break*/, 10];
                        if (!user) return [3 /*break*/, 6];
                        _b = user;
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.userService.get(investment.user)];
                    case 7:
                        _b = _c.sent();
                        _c.label = 8;
                    case 8:
                        receiver = _b;
                        return [4 /*yield*/, this.notificationService.create("Your investment package ".concat(notificationMessage), notification_enum_1.NotificationCategory.INVESTMENT, investment, notification_enum_1.NotificationForWho.USER, status, investment.environment, receiver)];
                    case 9:
                        notificationInstance = _c.sent();
                        transactionInstances.push(notificationInstance);
                        _c.label = 10;
                    case 10: return [2 /*return*/, {
                            model: investmentInstance.model,
                            instances: transactionInstances,
                        }];
                }
            });
        });
    };
    InvestmentService.prototype.fund = function (investmentId, amount) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fundTransaction(investmentId, amount)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestmentService.prototype.forceFund = function (investmentId, amount) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var investment, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fund(investmentId, amount)];
                    case 1:
                        investment = (_a.sent()).instance.model;
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Investment has been funded successfully',
                                data: { investment: investment },
                            }];
                    case 2:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Failed to fund this investment, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvestmentService.prototype.refill = function (investmentId, gas) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var investment, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(investmentId)];
                    case 1:
                        investment = _a.sent();
                        investment.gas += gas;
                        return [4 /*yield*/, investment.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Investment has been refilled successfully',
                                data: { investment: investment },
                            }];
                    case 3:
                        err_6 = _a.sent();
                        throw new app_exception_1.default(err_6, 'Failed to refill this investment, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var InvestmentService_1;
    InvestmentService.minWaitHour = 4;
    InvestmentService.maxWaitHour = 8;
    InvestmentService = InvestmentService_1 = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.PLAN_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __param(4, (0, typedi_1.Inject)(serviceToken_1.default.REFERRAL_SERVICE)),
        __param(5, (0, typedi_1.Inject)(serviceToken_1.default.MATH_SERVICE)),
        __param(6, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_MANAGER_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
    ], InvestmentService);
    return InvestmentService;
}());
exports.default = InvestmentService;
