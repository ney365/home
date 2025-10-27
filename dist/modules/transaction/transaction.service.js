"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var transaction_model_1 = __importDefault(require("@/modules/transaction/transaction.model"));
var formatNumber_1 = __importDefault(require("@/utils/formats/formatNumber"));
var transactionManager_type_1 = require("@/modules/transactionManager/transactionManager.type");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_type_1 = require("@/modules/http/http.type");
var http_enum_1 = require("@/modules/http/http.enum");
var user_model_1 = __importDefault(require("../user/user.model"));
var TransactionService = /** @class */ (function () {
    function TransactionService() {
        var _this = this;
        this.transactionModel = transaction_model_1.default;
        this.userModel = user_model_1.default;
        this.setAmount = function (categoryId, status, amount) { return __awaiter(_this, void 0, void 0, function () {
            var transaction, oldStatus, oldAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionModel.findOne({
                            category: categoryId,
                        })];
                    case 1:
                        transaction = _a.sent();
                        if (!transaction)
                            throw new http_exception_1.default(404, 'Transaction not found');
                        oldStatus = transaction.status;
                        oldAmount = transaction.amount;
                        transaction.status = status;
                        transaction.amount = amount;
                        return [2 /*return*/, { transaction: transaction, oldAmount: oldAmount, oldStatus: oldStatus }];
                }
            });
        }); };
        this.setStatus = function (categoryId, status) { return __awaiter(_this, void 0, void 0, function () {
            var transaction, oldStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionModel.findOne({
                            category: categoryId,
                        })];
                    case 1:
                        transaction = _a.sent();
                        if (!transaction)
                            throw new http_exception_1.default(404, 'Transaction not found');
                        oldStatus = transaction.status;
                        transaction.status = status;
                        return [2 /*return*/, { transaction: transaction, oldStatus: oldStatus }];
                }
            });
        }); };
        this.fetch = function (transactionId, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transaction, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.transactionModel.findOne({
                                _id: transactionId,
                                user: userId,
                            })];
                    case 1:
                        transaction = _a.sent();
                        if (!transaction)
                            throw new http_exception_1.default(404, 'Transaction not found');
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Transaction fetched successfully',
                                data: { transaction: transaction },
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, 'Failed to fetch transaction, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAll = function (all, environment, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transactions, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        transactions = void 0;
                        if (!all) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.transactionModel
                                .find({ environment: environment })
                                .sort({ updatedAt: -1 })
                                .select('-userObject -categoryObject -environment')
                                .populate('user', 'username isDeleted')];
                    case 1:
                        transactions = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.transactionModel
                            .find({ environment: environment, user: userId })
                            .sort({ updatedAt: -1 })
                            .select('-userObject -categoryObject -environment')];
                    case 3:
                        transactions = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Transactions fetched successfully',
                            data: { transactions: transactions },
                        }];
                    case 5:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Failed to fetch transactions, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (transactionId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transaction, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(transactionId)];
                    case 1:
                        transaction = _a.sent();
                        return [4 /*yield*/, transaction.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Transaction deleted successfully',
                                data: { transaction: transaction },
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Failed to delete this transaction, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    TransactionService.prototype.find = function (transactionId, fromAllAccounts, userId) {
        if (fromAllAccounts === void 0) { fromAllAccounts = true; }
        return __awaiter(this, void 0, void 0, function () {
            var transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fromAllAccounts) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.transactionModel.findById(transactionId)];
                    case 1:
                        transaction = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.transactionModel.findOne({
                            _id: transactionId,
                            user: userId,
                        })];
                    case 3:
                        transaction = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!transaction)
                            throw new http_exception_1.default(404, 'Transaction not found');
                        return [2 /*return*/, transaction];
                }
            });
        });
    };
    TransactionService.prototype._createTransaction = function (user, status, categoryName, categoryObject, amount, environment, stake) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var transaction;
            return __generator(this, function (_a) {
                transaction = new this.transactionModel({
                    user: user._id,
                    userObject: user,
                    amount: amount,
                    status: status,
                    categoryName: categoryName,
                    category: categoryObject._id,
                    categoryObject: categoryObject,
                    stake: stake,
                    environment: environment,
                });
                return [2 /*return*/, {
                        object: transaction.toObject({ getters: true }),
                        instance: {
                            model: transaction,
                            onFailed: "Delete the transaction with an id of (".concat(transaction._id, ")"),
                            callback: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, transaction.deleteOne()];
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
    TransactionService.prototype._updateAmountTransaction = function (categoryId, status, amount) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var data, oldAmount, oldStatus, transaction;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setAmount(categoryId, status, amount)];
                    case 1:
                        data = _a.sent();
                        oldAmount = data.oldAmount, oldStatus = data.oldStatus, transaction = data.transaction;
                        return [2 /*return*/, {
                                object: transaction.toObject({ getters: true }),
                                instance: {
                                    model: transaction,
                                    onFailed: "Set the status of the transaction with an id of (".concat(transaction._id, ") to (").concat(oldStatus, ") and the amount to (").concat(formatNumber_1.default.toDollar(oldAmount), ")"),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    transaction.status = oldStatus;
                                                    transaction.amount = oldAmount;
                                                    return [4 /*yield*/, transaction.save()];
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
    TransactionService.prototype._updateStatusTransaction = function (categoryId, status) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var _a, oldStatus, transaction;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.setStatus(categoryId, status)];
                    case 1:
                        _a = _b.sent(), oldStatus = _a.oldStatus, transaction = _a.transaction;
                        return [2 /*return*/, {
                                object: transaction.toObject({ getters: true }),
                                instance: {
                                    model: transaction,
                                    onFailed: "Set the status of the transaction with an id of (".concat(transaction._id, ") to (").concat(oldStatus, ")"),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, transaction.save()];
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
    TransactionService.prototype.create = function (user, status, categoryName, categoryObject, amount, environment, stake) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._createTransaction(user, status, categoryName, categoryObject, amount, environment, stake)];
                    case 1:
                        instance = (_a.sent()).instance;
                        return [2 /*return*/, instance];
                    case 2:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to register this transaction, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.updateAmount = function (categoryId, status, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._updateAmountTransaction(categoryId, status, amount)];
                    case 1:
                        instance = (_a.sent()).instance;
                        return [2 /*return*/, instance];
                    case 2:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Failed to update transaction amount, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.forceUpdateAmount = function (transactionId, status, amount) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var transaction, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(transactionId)];
                    case 1:
                        transaction = _a.sent();
                        transaction.status = status;
                        transaction.amount = amount;
                        return [4 /*yield*/, transaction.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Transaction amount updated successfully',
                                data: { transaction: transaction },
                            }];
                    case 3:
                        err_6 = _a.sent();
                        throw new app_exception_1.default(err_6, 'Failed to update transaction amount, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.updateStatus = function (categoryId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._updateStatusTransaction(categoryId, status)];
                    case 1:
                        instance = (_a.sent()).instance;
                        return [2 /*return*/, instance];
                    case 2:
                        err_7 = _a.sent();
                        throw new app_exception_1.default(err_7, 'Failed to update transaction status, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.forceUpdateStatus = function (transactionId, status) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var transaction, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(transactionId)];
                    case 1:
                        transaction = _a.sent();
                        transaction.status = status;
                        return [4 /*yield*/, transaction.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Transaction status updated successfully',
                                data: { transaction: transaction },
                            }];
                    case 3:
                        err_8 = _a.sent();
                        throw new app_exception_1.default(err_8, 'Failed to update this transaction status, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.get = function (transactionId, fromAllAccounts, userId) {
        if (fromAllAccounts === void 0) { fromAllAccounts = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(transactionId, fromAllAccounts, userId)];
                    case 1: return [2 /*return*/, (_a.sent()).toObject()];
                }
            });
        });
    };
    TransactionService = __decorate([
        (0, typedi_1.Service)()
    ], TransactionService);
    return TransactionService;
}());
exports.default = TransactionService;
