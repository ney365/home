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
var deposit_model_1 = __importDefault(require("@/modules/deposit/deposit.model"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var deposit_enum_1 = require("@/modules/deposit/deposit.enum");
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
var user_model_1 = __importDefault(require("../user/user.model"));
var DepositService = /** @class */ (function () {
    function DepositService(depositMethodService, userService, transactionService, referralService, notificationService, transactionManagerService) {
        var _this = this;
        this.depositMethodService = depositMethodService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.referralService = referralService;
        this.notificationService = notificationService;
        this.transactionManagerService = transactionManagerService;
        this.depositModel = deposit_model_1.default;
        this.userModel = user_model_1.default;
        this.create = function (depositMethodId, userId, amount) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var depositMethod, user, transactionInstances, _a, deposit, depositInstance, transactionInstance, adminNotification, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.depositMethodService.get(depositMethodId)];
                    case 1:
                        depositMethod = _b.sent();
                        if (depositMethod.minDeposit > amount)
                            throw new http_exception_1.default(400, 'Amount is lower than the min deposit of the selected deposit method');
                        return [4 /*yield*/, this.userService.get(userId)];
                    case 2:
                        user = _b.sent();
                        transactionInstances = [];
                        return [4 /*yield*/, this._createTransaction(user, depositMethod, amount)];
                    case 3:
                        _a = _b.sent(), deposit = _a.object, depositInstance = _a.instance;
                        transactionInstances.push(depositInstance);
                        return [4 /*yield*/, this.transactionService.create(user, deposit.status, transaction_enum_1.TransactionCategory.DEPOSIT, deposit, amount, user_enum_1.UserEnvironment.LIVE)];
                    case 4:
                        transactionInstance = _b.sent();
                        transactionInstances.push(transactionInstance);
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " just made a deposit request of ").concat(formatNumber_1.default.toDollar(amount), " awaiting for your approval"), notification_enum_1.NotificationCategory.DEPOSIT, deposit, notification_enum_1.NotificationForWho.ADMIN, deposit.status, user_enum_1.UserEnvironment.LIVE)];
                    case 5:
                        adminNotification = _b.sent();
                        transactionInstances.push(adminNotification);
                        return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Deposit has been registered successfully',
                                data: { deposit: depositInstance.model },
                            }];
                    case 7:
                        err_1 = _b.sent();
                        throw new app_exception_1.default(err_1, 'Failed to register this deposit, please try again');
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (depositId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var deposit, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(depositId)];
                    case 1:
                        deposit = _a.sent();
                        if (deposit.status === deposit_enum_1.DepositStatus.PENDING)
                            throw new http_exception_1.default(400, 'Deposit has not been settled yet');
                        return [4 /*yield*/, deposit.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Deposit deleted successfully',
                                data: { deposit: deposit },
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Failed to delete this deposit, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateStatus = function (depositId, status) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transactionInstances_1, _a, deposit, depositInstance, user, userTransaction, userInstance, referralInstances, transactionInstance, notificationInstance, rawDepositIntance, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        transactionInstances_1 = [];
                        return [4 /*yield*/, this._updateStatusTransaction(depositId, status)];
                    case 1:
                        _a = _b.sent(), deposit = _a.object, depositInstance = _a.instance;
                        transactionInstances_1.push(depositInstance);
                        user = void 0;
                        if (!(status === deposit_enum_1.DepositStatus.APPROVED)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userService.fund(deposit.user._id, user_enum_1.UserAccount.MAIN_BALANCE, deposit.amount - deposit.fee)];
                    case 2:
                        userTransaction = _b.sent();
                        user = userTransaction.object;
                        userInstance = userTransaction.instance;
                        transactionInstances_1.push(userInstance);
                        return [4 /*yield*/, this.referralService.create(referral_enum_1.ReferralTypes.DEPOSIT, user, deposit.amount)];
                    case 3:
                        referralInstances = _b.sent();
                        referralInstances.forEach(function (instance) {
                            transactionInstances_1.push(instance);
                        });
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.userService.get(deposit.user._id)];
                    case 5:
                        user = _b.sent();
                        _b.label = 6;
                    case 6: return [4 /*yield*/, this.transactionService.updateStatus(deposit._id, status)];
                    case 7:
                        transactionInstance = _b.sent();
                        transactionInstances_1.push(transactionInstance);
                        return [4 /*yield*/, this.notificationService.create("Your deposit of ".concat(formatNumber_1.default.toDollar(deposit.amount), " was ").concat(status), notification_enum_1.NotificationCategory.DEPOSIT, deposit, notification_enum_1.NotificationForWho.USER, status, user_enum_1.UserEnvironment.LIVE, user)];
                    case 8:
                        notificationInstance = _b.sent();
                        transactionInstances_1.push(notificationInstance);
                        return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances_1)];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, depositInstance.model];
                    case 10:
                        rawDepositIntance = _b.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Status updated successfully',
                                data: { deposit: rawDepositIntance },
                            }];
                    case 11:
                        err_3 = _b.sent();
                        throw new app_exception_1.default(err_3, 'Failed to update this deposit  status, please try again');
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        this.fetch = function (fromAllAccounts, depositId, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var deposit, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.find(depositId, fromAllAccounts, userId)];
                    case 1:
                        deposit = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Deposit fetched successfully',
                                data: { deposit: deposit },
                            }];
                    case 2:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to fetch deposit, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAll = function (all, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var deposits, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        deposits = void 0;
                        if (!all) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.depositModel
                                .find()
                                .sort({ createdAt: -1 })
                                .select('-userObject -depositMethod')
                                .populate('user', 'username name profile isDeleted')];
                    case 1:
                        deposits = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.depositModel
                            .find({ user: userId })
                            .sort({ createdAt: -1 })
                            .select('-userObject -depositMethod')];
                    case 3:
                        deposits = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Deposit history fetched successfully',
                            data: { deposits: deposits },
                        }];
                    case 5:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Failed to fetch deposit history, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    DepositService.prototype.find = function (depositId, fromAllAccounts, userId) {
        if (fromAllAccounts === void 0) { fromAllAccounts = true; }
        return __awaiter(this, void 0, void 0, function () {
            var deposit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fromAllAccounts) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.depositModel
                                .findById(depositId)
                                .populate('user', 'username name profile isDeleted')];
                    case 1:
                        deposit = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.depositModel
                            .findOne({
                            _id: depositId,
                            user: userId,
                        })
                            .populate('user', 'username name profile isDeleted')];
                    case 3:
                        deposit = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!deposit)
                            throw new http_exception_1.default(404, 'Deposit transaction not found');
                        return [2 /*return*/, deposit];
                }
            });
        });
    };
    DepositService.prototype._createTransaction = function (user, depositMethod, amount) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var deposit;
            return __generator(this, function (_a) {
                deposit = new this.depositModel({
                    depositMethod: depositMethod._id,
                    depositMethodObject: depositMethod,
                    user: user._id,
                    userObject: user,
                    amount: amount,
                    fee: depositMethod.fee,
                    status: deposit_enum_1.DepositStatus.PENDING,
                });
                return [2 /*return*/, {
                        object: deposit.toObject({ getters: true }),
                        instance: {
                            model: deposit,
                            onFailed: "Delete the deposit with an id of (".concat(deposit._id, ")"),
                            callback: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, deposit.deleteOne()];
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
    DepositService.prototype._updateStatusTransaction = function (depositId, status) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var deposit, oldStatus;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(depositId)];
                    case 1:
                        deposit = _a.sent();
                        oldStatus = deposit.status;
                        if (oldStatus !== deposit_enum_1.DepositStatus.PENDING)
                            throw new http_exception_1.default(400, 'Deposit as already been settled');
                        deposit.status = status;
                        return [2 /*return*/, {
                                object: deposit.toObject({ getters: true }),
                                instance: {
                                    model: deposit,
                                    onFailed: "Set the status of the deposit with an id of (".concat(deposit._id, ") to (").concat(oldStatus, ")"),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    deposit.status = oldStatus;
                                                    return [4 /*yield*/, deposit.save()];
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
    DepositService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.DEPOSIT_METHOD_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.REFERRAL_SERVICE)),
        __param(4, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __param(5, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_MANAGER_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
    ], DepositService);
    return DepositService;
}());
exports.default = DepositService;
