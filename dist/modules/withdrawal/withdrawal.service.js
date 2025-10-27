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
var withdrawal_model_1 = __importDefault(require("@/modules/withdrawal/withdrawal.model"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var withdrawal_enum_1 = require("@/modules/withdrawal/withdrawal.enum");
var transaction_enum_1 = require("@/modules/transaction/transaction.enum");
var formatNumber_1 = __importDefault(require("@/utils/formats/formatNumber"));
var notification_enum_1 = require("@/modules/notification/notification.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var http_type_1 = require("@/modules/http/http.type");
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_enum_1 = require("@/modules/http/http.enum");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var transactionManager_type_1 = require("@/modules/transactionManager/transactionManager.type");
var user_model_1 = __importDefault(require("../user/user.model"));
var WithdrawalService = /** @class */ (function () {
    function WithdrawalService(withdrawalMethodService, userService, transactionService, notificationService, transactionManagerService) {
        var _this = this;
        this.withdrawalMethodService = withdrawalMethodService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.notificationService = notificationService;
        this.transactionManagerService = transactionManagerService;
        this.withdrawalModel = withdrawal_model_1.default;
        this.userModel = user_model_1.default;
        this.find = function (withdrawalId, fromAllAccounts, userId) {
            if (fromAllAccounts === void 0) { fromAllAccounts = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var withdrawal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!fromAllAccounts) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.withdrawalModel
                                    .findById(withdrawalId)
                                    .populate('user', 'username isDeleted')];
                        case 1:
                            withdrawal = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.withdrawalModel.findOne({
                                _id: withdrawalId,
                                user: userId,
                            })];
                        case 3:
                            withdrawal = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!withdrawal)
                                throw new http_exception_1.default(404, 'Withdrawal transaction not found');
                            return [2 /*return*/, withdrawal];
                    }
                });
            });
        };
        this.create = function (withdrawalMethodId, userId, account, address, amount) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var withdrawalMethod, transactionInstances, userTransaction, user, _a, withdrawal, withdrawalInstance, transaction, adminNotification, rawWithdrawalIntance, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.withdrawalMethodService.get(withdrawalMethodId)];
                    case 1:
                        withdrawalMethod = _b.sent();
                        if (!withdrawalMethod)
                            throw new http_exception_1.default(404, 'Withdrawal method not found');
                        if (withdrawalMethod.minWithdrawal > amount)
                            throw new http_exception_1.default(400, 'Amount is lower than the min withdrawal of the selected withdrawal method');
                        transactionInstances = [];
                        return [4 /*yield*/, this.userService.fund(userId, account, -(amount + withdrawalMethod.fee))];
                    case 2:
                        userTransaction = _b.sent();
                        transactionInstances.push(userTransaction.instance);
                        user = userTransaction.object;
                        return [4 /*yield*/, this._createTransaction(withdrawalMethod, user, account, address, amount)];
                    case 3:
                        _a = _b.sent(), withdrawal = _a.object, withdrawalInstance = _a.instance;
                        transactionInstances.push(withdrawalInstance);
                        return [4 /*yield*/, this.transactionService.create(user, withdrawal.status, transaction_enum_1.TransactionCategory.WITHDRAWAL, withdrawal, amount, user_enum_1.UserEnvironment.LIVE)];
                    case 4:
                        transaction = _b.sent();
                        transactionInstances.push(transaction);
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " just made a withdrawal request of ").concat(formatNumber_1.default.toDollar(amount), " awaiting for your approval"), notification_enum_1.NotificationCategory.WITHDRAWAL, withdrawal, notification_enum_1.NotificationForWho.ADMIN, withdrawal.status, user_enum_1.UserEnvironment.LIVE)];
                    case 5:
                        adminNotification = _b.sent();
                        transactionInstances.push(adminNotification);
                        return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances)];
                    case 6:
                        _b.sent();
                        rawWithdrawalIntance = withdrawalInstance.model;
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Withdrawal has been registered successfully',
                                data: { withdrawal: rawWithdrawalIntance },
                            }];
                    case 7:
                        err_1 = _b.sent();
                        throw new app_exception_1.default(err_1, 'Failed to register this withdrawal, please try again');
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (withdrawalId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var withdrawal, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(withdrawalId)];
                    case 1:
                        withdrawal = _a.sent();
                        if (withdrawal.status === withdrawal_enum_1.WithdrawalStatus.PENDING)
                            throw new http_exception_1.default(400, 'Withdrawal has not been settled yet');
                        return [4 /*yield*/, withdrawal.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Withdrawal deleted successfully',
                                data: { withdrawal: withdrawal },
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Failed to delete this withdrawal, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateStatus = function (withdrawalId, status) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transactionInstances, _a, withdrawalInstance, withdrawal, transactionInstance, user, fundedUserTransaction, sendingNotification, rawWithdrawalIntance, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        transactionInstances = [];
                        return [4 /*yield*/, this._updateStatusTransaction(withdrawalId, status)];
                    case 1:
                        _a = _b.sent(), withdrawalInstance = _a.instance, withdrawal = _a.object;
                        transactionInstances.push(withdrawalInstance);
                        return [4 /*yield*/, this.transactionService.updateStatus(withdrawal._id, status)];
                    case 2:
                        transactionInstance = _b.sent();
                        transactionInstances.push(transactionInstance);
                        user = void 0;
                        if (!(status === withdrawal_enum_1.WithdrawalStatus.CANCELLED)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userService.fund(withdrawal.user._id, withdrawal.account, withdrawal.amount + withdrawal.fee)];
                    case 3:
                        fundedUserTransaction = _b.sent();
                        transactionInstances.push(fundedUserTransaction.instance);
                        user = fundedUserTransaction.object;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.userService.get(withdrawal.user._id)];
                    case 5:
                        user = _b.sent();
                        _b.label = 6;
                    case 6: return [4 /*yield*/, this.notificationService.create("Your withdrawal of ".concat(formatNumber_1.default.toDollar(withdrawal.amount), " was ").concat(status), notification_enum_1.NotificationCategory.WITHDRAWAL, withdrawal, notification_enum_1.NotificationForWho.USER, status, user_enum_1.UserEnvironment.LIVE, user)];
                    case 7:
                        sendingNotification = _b.sent();
                        transactionInstances.push(sendingNotification);
                        return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances)];
                    case 8:
                        _b.sent();
                        rawWithdrawalIntance = withdrawalInstance.model;
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Status updated successfully',
                                data: { withdrawal: rawWithdrawalIntance },
                            }];
                    case 9:
                        err_3 = _b.sent();
                        throw new app_exception_1.default(err_3, 'Failed to update this withdrawal status, please try again');
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.fetch = function (fromAllAccounts, withdrawalId, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var withdrawal, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.find(withdrawalId, fromAllAccounts, userId)];
                    case 1:
                        withdrawal = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Withdrawal history fetched successfully',
                                data: { withdrawal: withdrawal },
                            }];
                    case 2:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to fetch withdrawal history, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAll = function (all, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var withdrawals, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        withdrawals = void 0;
                        if (!all) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.withdrawalModel
                                .find()
                                .sort({ createdAt: -1 })
                                .select('-userObject -withdrawalMethod')
                                .populate('user', 'username name profile isDeleted')];
                    case 1:
                        withdrawals = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.withdrawalModel
                            .find({
                            user: userId,
                        })
                            .sort({ createdAt: -1 })
                            .select('-userObject -withdrawalMethod')
                            .populate('user', 'username name profile isDeleted')];
                    case 3:
                        withdrawals = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Withdrawal history fetched successfully',
                            data: { withdrawals: withdrawals },
                        }];
                    case 5:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Failed to fetch withdrawal history, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    WithdrawalService.prototype._updateStatusTransaction = function (withdrawalId, status) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var withdrawal, oldStatus;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(withdrawalId)];
                    case 1:
                        withdrawal = _a.sent();
                        if (!Object.values(withdrawal_enum_1.WithdrawalStatus).includes(status))
                            throw new http_exception_1.default(400, 'Invalid withdrawal status');
                        oldStatus = withdrawal.status;
                        if (oldStatus !== withdrawal_enum_1.WithdrawalStatus.PENDING)
                            throw new http_exception_1.default(400, 'Withdrawal as already been settled');
                        withdrawal.status = status;
                        return [2 /*return*/, {
                                object: withdrawal.toObject({ getters: true }),
                                instance: {
                                    model: withdrawal,
                                    onFailed: "Set the status of the withdrawal with an id of (".concat(withdrawal._id, ") to (").concat(oldStatus, ")"),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    withdrawal.status = oldStatus;
                                                    return [4 /*yield*/, withdrawal.save()];
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
    WithdrawalService.prototype._createTransaction = function (withdrawalMethod, user, account, address, amount) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var withdrawal;
            return __generator(this, function (_a) {
                withdrawal = new this.withdrawalModel({
                    withdrawalMethod: withdrawalMethod._id,
                    withdrawalMethodObject: withdrawalMethod,
                    user: user._id,
                    userObject: user,
                    account: account,
                    address: address,
                    amount: amount,
                    fee: withdrawalMethod.fee,
                    status: withdrawal_enum_1.WithdrawalStatus.PENDING,
                });
                return [2 /*return*/, {
                        object: withdrawal.toObject({ getters: true }),
                        instance: {
                            model: withdrawal,
                            onFailed: "Delete the withdrawal with an id of (".concat(withdrawal._id, ")"),
                            callback: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, withdrawal.deleteOne()];
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
    WithdrawalService.prototype.get = function (withdrawalId, fromAllAccounts, userId) {
        if (fromAllAccounts === void 0) { fromAllAccounts = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(withdrawalId, fromAllAccounts, userId)];
                    case 1: return [2 /*return*/, (_a.sent()).toObject()];
                }
            });
        });
    };
    WithdrawalService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.WITHDRAWAL_METHOD_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __param(4, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_MANAGER_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
    ], WithdrawalService);
    return WithdrawalService;
}());
exports.default = WithdrawalService;
