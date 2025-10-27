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
var transfer_model_1 = __importDefault(require("@/modules/transfer/transfer.model"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var transfer_enum_1 = require("@/modules/transfer/transfer.enum");
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
var TransferService = /** @class */ (function () {
    function TransferService(transferSettingsService, userService, transactionService, notificationService, transactionManagerService) {
        var _this = this;
        this.transferSettingsService = transferSettingsService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.notificationService = notificationService;
        this.transactionManagerService = transactionManagerService;
        this.transferModel = transfer_model_1.default;
        this.userModel = user_model_1.default;
        this.find = function (transferId, fromAllAccounts, userId) {
            if (fromAllAccounts === void 0) { fromAllAccounts = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var transfer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!fromAllAccounts) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.transferModel.findOne({ _id: transferId })];
                        case 1:
                            transfer = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.transferModel.findOne({
                                _id: transferId,
                                $or: [{ fromUser: userId }, { toUser: userId }],
                            })];
                        case 3:
                            transfer = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!transfer)
                                throw new http_exception_1.default(404, 'Transfer transaction not found');
                            return [2 /*return*/, transfer];
                    }
                });
            });
        };
        this.create = function (fromUserId, toUserUsername, account, amount) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transactionInstances, transferSettings, fee, status_1, fromUserTransaction, fromUser, toUser, toUserTransaction, _a, transfer, transferInstance, fromUserTransactionTransaction, fromUserNotification, toUserTransaction, toUserNotification, adminNotification, fromUserTransaction_1, fromUserNotification, adminNotification, rawTransfer, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 19, , 20]);
                        transactionInstances = [];
                        return [4 /*yield*/, this.transferSettingsService.get()];
                    case 1:
                        transferSettings = _b.sent();
                        if (!transferSettings)
                            throw new http_exception_1.default(404, 'Transfer settings not found');
                        fee = transferSettings.fee;
                        status_1 = !transferSettings.approval
                            ? transfer_enum_1.TransferStatus.SUCCESSFUL
                            : transfer_enum_1.TransferStatus.PENDING;
                        return [4 /*yield*/, this.userService.fund(fromUserId, account, -(amount + fee))];
                    case 2:
                        fromUserTransaction = _b.sent();
                        transactionInstances.push(fromUserTransaction.instance);
                        fromUser = fromUserTransaction.object;
                        toUser = void 0;
                        if (!(status_1 === transfer_enum_1.TransferStatus.SUCCESSFUL)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userService.fund(toUserUsername, user_enum_1.UserAccount.MAIN_BALANCE, amount, "No Recipient with the username of ".concat(toUserUsername, " was found"))];
                    case 3:
                        toUserTransaction = _b.sent();
                        transactionInstances.push(toUserTransaction.instance);
                        toUser = toUserTransaction.object;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.userService.get(toUserUsername, "No Recipient with the username of ".concat(toUserUsername, " was found"))];
                    case 5:
                        toUser = _b.sent();
                        _b.label = 6;
                    case 6:
                        if (toUser._id.toString() === fromUser._id.toString())
                            throw new http_exception_1.default(400, 'You can not transfer to your own account');
                        return [4 /*yield*/, this._createTransaction(fromUser, toUser, account, status_1, fee, amount)];
                    case 7:
                        _a = _b.sent(), transfer = _a.object, transferInstance = _a.instance;
                        transactionInstances.push(transferInstance);
                        if (!(status_1 === transfer_enum_1.TransferStatus.SUCCESSFUL)) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.transactionService.create(fromUser, status_1, transaction_enum_1.TransactionCategory.TRANSFER_OUT, transfer, amount, user_enum_1.UserEnvironment.LIVE)];
                    case 8:
                        fromUserTransactionTransaction = _b.sent();
                        transactionInstances.push(fromUserTransactionTransaction);
                        return [4 /*yield*/, this.notificationService.create("Your transfer of ".concat(formatNumber_1.default.toDollar(amount), " to ").concat(toUserUsername, " was successful."), notification_enum_1.NotificationCategory.TRANSFER, transfer, notification_enum_1.NotificationForWho.USER, status_1, user_enum_1.UserEnvironment.LIVE, fromUser)];
                    case 9:
                        fromUserNotification = _b.sent();
                        transactionInstances.push(fromUserNotification);
                        return [4 /*yield*/, this.transactionService.create(toUser, status_1, transaction_enum_1.TransactionCategory.TRANSFER_IN, transfer, amount, user_enum_1.UserEnvironment.LIVE)];
                    case 10:
                        toUserTransaction = _b.sent();
                        transactionInstances.push(toUserTransaction);
                        return [4 /*yield*/, this.notificationService.create("".concat(fromUser.username, " just sent you ").concat(formatNumber_1.default.toDollar(amount), "."), notification_enum_1.NotificationCategory.TRANSFER, transfer, notification_enum_1.NotificationForWho.USER, status_1, user_enum_1.UserEnvironment.LIVE, toUser)];
                    case 11:
                        toUserNotification = _b.sent();
                        transactionInstances.push(toUserNotification);
                        return [4 /*yield*/, this.notificationService.create("".concat(fromUser.username, " just made a successful transfer of ").concat(formatNumber_1.default.toDollar(amount), " to ").concat(toUser.username), notification_enum_1.NotificationCategory.TRANSFER, transfer, notification_enum_1.NotificationForWho.ADMIN, status_1, user_enum_1.UserEnvironment.LIVE)];
                    case 12:
                        adminNotification = _b.sent();
                        transactionInstances.push(adminNotification);
                        return [3 /*break*/, 17];
                    case 13: return [4 /*yield*/, this.transactionService.create(fromUser, status_1, transaction_enum_1.TransactionCategory.TRANSFER_OUT, transfer, amount, user_enum_1.UserEnvironment.LIVE)];
                    case 14:
                        fromUserTransaction_1 = _b.sent();
                        transactionInstances.push(fromUserTransaction_1);
                        return [4 /*yield*/, this.notificationService.create("Your transfer of ".concat(formatNumber_1.default.toDollar(amount), " to ").concat(toUserUsername, " is ongoing."), notification_enum_1.NotificationCategory.TRANSFER, transfer, notification_enum_1.NotificationForWho.USER, status_1, user_enum_1.UserEnvironment.LIVE, fromUser)];
                    case 15:
                        fromUserNotification = _b.sent();
                        transactionInstances.push(fromUserNotification);
                        return [4 /*yield*/, this.notificationService.create("".concat(fromUser.username, " just made a transfer request of ").concat(formatNumber_1.default.toDollar(amount), " to ").concat(toUser.username, " awaiting for your approver"), notification_enum_1.NotificationCategory.TRANSFER, transfer, notification_enum_1.NotificationForWho.ADMIN, status_1, user_enum_1.UserEnvironment.LIVE)];
                    case 16:
                        adminNotification = _b.sent();
                        transactionInstances.push(adminNotification);
                        _b.label = 17;
                    case 17: 
                    // execute all transaction instances
                    return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances)];
                    case 18:
                        // execute all transaction instances
                        _b.sent();
                        rawTransfer = transferInstance.model;
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Transfer has been registered successfully',
                                data: { transfer: rawTransfer },
                            }];
                    case 19:
                        err_1 = _b.sent();
                        throw new app_exception_1.default(err_1, 'Failed to register this transfer, please try again');
                    case 20: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (transferId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transfer, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(transferId)];
                    case 1:
                        transfer = _a.sent();
                        if (transfer.status === transfer_enum_1.TransferStatus.PENDING)
                            throw new http_exception_1.default(400, 'Transfer has not been settled yet');
                        return [4 /*yield*/, transfer.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Transfer deleted successfully',
                                data: { transfer: transfer },
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Failed to delete this transfer, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateStatus = function (transferId, status) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transactionInstances, _a, transferInstance, transfer, transactionInstance, fromUser, fromUserTransaction, toUserTransaction, toUser, toUserTransactionTransaction, toUserNotification, sendingNotification, rawTransfer, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, , 13]);
                        transactionInstances = [];
                        return [4 /*yield*/, this._updateStatusTransaction(transferId, status)];
                    case 1:
                        _a = _b.sent(), transferInstance = _a.instance, transfer = _a.object;
                        transactionInstances.push(transferInstance);
                        return [4 /*yield*/, this.transactionService.updateStatus(transfer._id, status)];
                    case 2:
                        transactionInstance = _b.sent();
                        transactionInstances.push(transactionInstance);
                        fromUser = void 0;
                        if (!(status === transfer_enum_1.TransferStatus.REVERSED)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userService.fund(transfer.fromUser, transfer.account, transfer.amount + transfer.fee)];
                    case 3:
                        fromUserTransaction = _b.sent();
                        transactionInstances.push(fromUserTransaction.instance);
                        fromUser = fromUserTransaction.object;
                        return [3 /*break*/, 9];
                    case 4: return [4 /*yield*/, this.userService.get(transfer.fromUser)
                        // Add toUser instance
                    ];
                    case 5:
                        fromUser = _b.sent();
                        return [4 /*yield*/, this.userService.fund(transfer.toUser, user_enum_1.UserAccount.MAIN_BALANCE, transfer.amount)];
                    case 6:
                        toUserTransaction = _b.sent();
                        transactionInstances.push(toUserTransaction.instance);
                        toUser = toUserTransaction.object;
                        return [4 /*yield*/, this.transactionService.create(toUser, status, transaction_enum_1.TransactionCategory.TRANSFER_IN, transfer, transfer.amount, user_enum_1.UserEnvironment.LIVE)];
                    case 7:
                        toUserTransactionTransaction = _b.sent();
                        transactionInstances.push(toUserTransactionTransaction);
                        return [4 /*yield*/, this.notificationService.create("".concat(fromUser.username, " just sent you ").concat(formatNumber_1.default.toDollar(transfer.amount), "."), notification_enum_1.NotificationCategory.TRANSFER, transfer, notification_enum_1.NotificationForWho.USER, status, user_enum_1.UserEnvironment.LIVE, toUser)];
                    case 8:
                        toUserNotification = _b.sent();
                        transactionInstances.push(toUserNotification);
                        _b.label = 9;
                    case 9: return [4 /*yield*/, this.notificationService.create("Your transfer of ".concat(formatNumber_1.default.toDollar(transfer.amount), " was ").concat(status), notification_enum_1.NotificationCategory.TRANSFER, transfer, notification_enum_1.NotificationForWho.USER, status, user_enum_1.UserEnvironment.LIVE, fromUser)];
                    case 10:
                        sendingNotification = _b.sent();
                        transactionInstances.push(sendingNotification);
                        return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances)];
                    case 11:
                        _b.sent();
                        rawTransfer = transferInstance.model;
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Status updated successfully',
                                data: { transfer: rawTransfer },
                            }];
                    case 12:
                        err_3 = _b.sent();
                        throw new app_exception_1.default(err_3, 'Failed to update this transfer status, please try again');
                    case 13: return [2 /*return*/];
                }
            });
        }); };
        this.fetch = function (fromAllAccounts, transferId, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transfer, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.find(transferId, fromAllAccounts, userId)];
                    case 1:
                        transfer = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Transfer history fetched successfully',
                                data: { transfer: transfer },
                            }];
                    case 2:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to fetch transfer history, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAll = function (allUsers, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transfers, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        transfers = void 0;
                        if (!allUsers) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.transferModel
                                .find()
                                .sort({
                                updatedAt: -1,
                            })
                                .select('-fromUserObject -toUserObject')
                                .populate('toUser', 'username isDeleted')
                                .populate('fromUser', 'username isDeleted')];
                    case 1:
                        transfers = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.transferModel
                            .find({
                            $or: [
                                { fromUser: userId },
                                { toUser: userId, status: transfer_enum_1.TransferStatus.SUCCESSFUL },
                            ],
                        })
                            .sort({
                            updatedAt: -1,
                        })
                            .select('-fromUserObject -toUserObject')
                            .populate('toUser', 'username isDeleted')
                            .populate('fromUser', 'username isDeleted')];
                    case 3:
                        transfers = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Transfer history fetched successfully',
                            data: { transfers: transfers },
                        }];
                    case 5:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Failed to fetch transfer history, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    TransferService.prototype._updateStatusTransaction = function (transferId, status) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var transfer, oldStatus;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(transferId)];
                    case 1:
                        transfer = _a.sent();
                        oldStatus = transfer.status;
                        if (oldStatus !== transfer_enum_1.TransferStatus.PENDING)
                            throw new http_exception_1.default(400, 'Transfer as already been settled');
                        transfer.status = status;
                        return [2 /*return*/, {
                                object: transfer.toObject({ getters: true }),
                                instance: {
                                    model: transfer,
                                    onFailed: "Set the status of the transfer with an id of (".concat(transfer._id, ") to (").concat(oldStatus, ")"),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    transfer.status = oldStatus;
                                                    return [4 /*yield*/, transfer.save()];
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
    TransferService.prototype._createTransaction = function (fromUser, toUser, account, status, fee, amount) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var transfer;
            return __generator(this, function (_a) {
                transfer = new this.transferModel({
                    fromUser: fromUser._id,
                    fromUserObject: fromUser,
                    toUser: toUser._id,
                    toUserObject: toUser,
                    account: account,
                    amount: amount,
                    fee: fee,
                    status: status,
                });
                return [2 /*return*/, {
                        object: transfer.toObject({ getters: true }),
                        instance: {
                            model: transfer,
                            onFailed: "Delete the transfer with an id of (".concat(transfer._id, ")"),
                            callback: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, transfer.deleteOne()];
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
    TransferService.prototype.get = function (transferId, fromAllAccounts, userId) {
        if (fromAllAccounts === void 0) { fromAllAccounts = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(transferId, fromAllAccounts, userId)];
                    case 1: return [2 /*return*/, (_a.sent()).toObject()];
                }
            });
        });
    };
    TransferService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.TRANSFER_SETTINGS_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __param(4, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_MANAGER_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
    ], TransferService);
    return TransferService;
}());
exports.default = TransferService;
