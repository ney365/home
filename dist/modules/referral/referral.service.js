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
var referral_model_1 = __importDefault(require("@/modules/referral/referral.model"));
var referral_enum_1 = require("@/modules/referral/referral.enum");
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var formatNumber_1 = __importDefault(require("@/utils/formats/formatNumber"));
var notification_enum_1 = require("@/modules/notification/notification.enum");
var transaction_enum_1 = require("@/modules/transaction/transaction.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var transactionManager_type_1 = require("@/modules/transactionManager/transactionManager.type");
var allowedException_1 = __importDefault(require("@/utils/exceptions/allowedException"));
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_type_1 = require("@/modules/http/http.type");
var http_enum_1 = require("@/modules/http/http.enum");
var formatString_1 = __importDefault(require("@/utils/formats/formatString"));
var user_model_1 = __importDefault(require("../user/user.model"));
var mongoose_1 = require("mongoose");
var ReferralService = /** @class */ (function () {
    function ReferralService(notificationService, referralSettingsService, userService, transactionService) {
        var _this = this;
        this.notificationService = notificationService;
        this.referralSettingsService = referralSettingsService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.referralModel = referral_model_1.default;
        this.userModel = user_model_1.default;
        this.fetchAll = function (fromAllAccounts, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var referralTransactions, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.findAll(fromAllAccounts, userId)];
                    case 1:
                        referralTransactions = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Referral transactions fetched',
                                data: { referralTransactions: referralTransactions },
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, 'Failed to fetch referral transactions, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.earnings = function (fromAllAccounts, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var referralTransactions, referralEarnings_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.findAll(fromAllAccounts, userId)];
                    case 1:
                        referralTransactions = _a.sent();
                        referralEarnings_1 = [];
                        referralTransactions.forEach(function (transation) {
                            var index = referralEarnings_1.findIndex(function (obj) { return obj.user._id.toString() === transation.user._id.toString(); });
                            if (index !== -1) {
                                referralEarnings_1[index].earnings += transation.amount;
                            }
                            else {
                                referralEarnings_1.push({
                                    user: {
                                        _id: transation.user._id,
                                        username: transation.user.username,
                                        createdAt: transation.user.createdAt,
                                    },
                                    earnings: transation.amount,
                                    referrer: {
                                        _id: transation.referrer._id,
                                        username: transation.referrer.username,
                                    },
                                });
                            }
                        });
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Referral earnings fetched',
                                data: { referralEarnings: referralEarnings_1 },
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Failed to fetch referral transactions, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    ReferralService.prototype.findAll = function (fromAllAccounts, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var referralTransactions, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        referralTransactions = void 0;
                        if (!fromAllAccounts) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.referralModel
                                .find()
                                .select('-userObject -referrerObject')
                                .populate('user', 'username isDeleted createdAt')
                                .populate('referrer', 'username isDeleted')];
                    case 1:
                        referralTransactions = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.referralModel
                            .find({
                            referrer: userId,
                        })
                            .select('-userObject -referrerObject')
                            .populate('user', 'username isDeleted createdAt')
                            .populate('referrer', 'username isDeleted')];
                    case 3:
                        referralTransactions = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, referralTransactions];
                    case 5:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Failed to fetch referral transactions, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ReferralService.prototype._calcAmountEarn = function (type, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var referralSettings, rate, earn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.referralSettingsService.get()];
                    case 1:
                        referralSettings = _a.sent();
                        if (!referralSettings)
                            throw new http_exception_1.default(404, 'Referral settings not found');
                        rate = referralSettings.get(type);
                        earn = (rate / 100) * amount;
                        return [2 /*return*/, { earn: earn, rate: rate }];
                }
            });
        });
    };
    ReferralService.prototype._createTransaction = function (referrer, user, type, rate, earn) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var referral;
            return __generator(this, function (_a) {
                referral = new this.referralModel({
                    rate: rate,
                    type: type,
                    referrer: referrer._id,
                    referrerObject: referrer,
                    user: user._id,
                    userObject: user,
                    amount: earn,
                });
                return [2 /*return*/, {
                        object: referral.toObject({ getters: true }),
                        instance: {
                            model: referral,
                            onFailed: "Delete Referral Transaction with an id of (".concat(referral._id, ")"),
                            callback: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, referral.deleteOne()];
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
    ReferralService.prototype.create = function (type, user, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var userReferrerId, _a, earn, rate, userReferralTransaction, error_1, transactionInstances, userReferrer, userReferrerInstance, _b, referralTransaction, referralTransactionInstance, message, category, forWho, status_1, userReferrerNotificationInstance, adminMessage, adminNotificationInstance, userReferrerTransactionInstance, err_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 10, , 11]);
                        userReferrerId = user.referred;
                        try {
                            if (!userReferrerId || !(0, mongoose_1.isValidObjectId)(userReferrerId))
                                throw new http_exception_1.default(404, 'Referrer not found');
                        }
                        catch (error) {
                            throw new allowedException_1.default(error);
                        }
                        return [4 /*yield*/, this._calcAmountEarn(type, amount)];
                    case 1:
                        _a = _c.sent(), earn = _a.earn, rate = _a.rate;
                        userReferralTransaction = void 0;
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.userService.fund(userReferrerId, user_enum_1.UserAccount.REFERRAL_BALANCE, earn)];
                    case 3:
                        userReferralTransaction = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _c.sent();
                        throw new allowedException_1.default(error_1);
                    case 5:
                        transactionInstances = [];
                        userReferrer = userReferralTransaction.object, userReferrerInstance = userReferralTransaction.instance;
                        transactionInstances.push(userReferrerInstance);
                        return [4 /*yield*/, this._createTransaction(userReferrer, user, type, rate, earn)];
                    case 6:
                        _b = _c.sent(), referralTransaction = _b.object, referralTransactionInstance = _b.instance;
                        transactionInstances.push(referralTransactionInstance);
                        message = "Your referral account has been credited with ".concat(formatNumber_1.default.toDollar(earn), ", from ").concat(user.username, " ").concat(formatString_1.default.fromCamelToTitleCase(type), " of ").concat(formatNumber_1.default.toDollar(amount));
                        category = notification_enum_1.NotificationCategory.REFERRAL;
                        forWho = notification_enum_1.NotificationForWho.USER;
                        status_1 = referral_enum_1.ReferralStatus.SUCCESS;
                        return [4 /*yield*/, this.notificationService.create(message, category, referralTransaction, forWho, status_1, user_enum_1.UserEnvironment.LIVE, userReferrer)];
                    case 7:
                        userReferrerNotificationInstance = _c.sent();
                        transactionInstances.push(userReferrerNotificationInstance);
                        adminMessage = "".concat(userReferrer.username, " referral account has been credited with ").concat(formatNumber_1.default.toDollar(earn), ", from ").concat(user.username, " ").concat(type, " of ").concat(formatNumber_1.default.toDollar(amount));
                        return [4 /*yield*/, this.notificationService.create(adminMessage, category, referralTransaction, notification_enum_1.NotificationForWho.ADMIN, referral_enum_1.ReferralStatus.SUCCESS, user_enum_1.UserEnvironment.LIVE)];
                    case 8:
                        adminNotificationInstance = _c.sent();
                        transactionInstances.push(adminNotificationInstance);
                        return [4 /*yield*/, this.transactionService.create(userReferrer, referral_enum_1.ReferralStatus.SUCCESS, transaction_enum_1.TransactionCategory.REFERRAL, referralTransaction, earn, user_enum_1.UserEnvironment.LIVE)];
                    case 9:
                        userReferrerTransactionInstance = _c.sent();
                        transactionInstances.push(userReferrerTransactionInstance);
                        return [2 /*return*/, transactionInstances];
                    case 10:
                        err_4 = _c.sent();
                        if (err_4.allow)
                            return [2 /*return*/, []];
                        throw new app_exception_1.default(err_4, 'Failed to register referral transactions, please try again');
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ReferralService.prototype.leaderboard = function () {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var referralTransactions, referralLeaderboard_1, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.findAll(true)];
                    case 1:
                        referralTransactions = _a.sent();
                        referralLeaderboard_1 = [];
                        referralTransactions.forEach(function (transation) {
                            var index = referralLeaderboard_1.findIndex(function (obj) {
                                return obj.user._id.toString() === transation.referrer._id.toString();
                            });
                            if (index !== -1) {
                                referralLeaderboard_1[index].earnings += transation.amount;
                            }
                            else {
                                referralLeaderboard_1.push({
                                    user: {
                                        _id: transation.referrer._id,
                                        username: transation.referrer.username,
                                        createdAt: transation.referrer.createdAt,
                                    },
                                    earnings: transation.amount,
                                });
                            }
                        });
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Referral leaderboard fetched',
                                data: { referralLeaderboard: referralLeaderboard_1 },
                            }];
                    case 2:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Failed to fetch referral transactions, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReferralService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.REFERRAL_SETTINGS_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], ReferralService);
    return ReferralService;
}());
exports.default = ReferralService;
