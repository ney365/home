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
var failedTransaction_model_1 = __importDefault(require("@/modules/failedTransaction/failedTransaction.model"));
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_type_1 = require("@/modules/http/http.type");
var http_enum_1 = require("@/modules/http/http.enum");
var FailedTransactionService = /** @class */ (function () {
    function FailedTransactionService() {
        var _this = this;
        this.failedTransactionModel = failedTransaction_model_1.default;
        this.find = function (failedTransactionId, fromAllAccounts, userId) {
            if (fromAllAccounts === void 0) { fromAllAccounts = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var failedTransaction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!fromAllAccounts) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.failedTransactionModel.findById(failedTransactionId)];
                        case 1:
                            failedTransaction = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.failedTransactionModel.findOne({
                                _id: failedTransactionId,
                                user: userId,
                            })];
                        case 3:
                            failedTransaction = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!failedTransaction)
                                throw new http_exception_1.default(404, 'Failed transaction not found');
                            return [2 /*return*/, failedTransaction];
                    }
                });
            });
        };
        this.fetchAll = function () { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var failedTransactions, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.failedTransactionModel.find()];
                    case 1:
                        failedTransactions = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Failed transactions fetched successfully',
                                data: { failedTransactions: failedTransactions },
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, 'Unable to fetch Failed Transactions, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    FailedTransactionService.prototype.create = function (message, collectionName, status) {
        return __awaiter(this, void 0, void 0, function () {
            var failedTransaction, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.failedTransactionModel.create({
                                message: message,
                                collectionName: collectionName,
                                status: status,
                            })];
                    case 1:
                        failedTransaction = _a.sent();
                        return [2 /*return*/, failedTransaction.toObject({ getters: true })];
                    case 2:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Unable to register failed transaction, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FailedTransactionService.prototype.updateStatus = function (failedTransactionId, status) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var failedTransaction, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(failedTransactionId)];
                    case 1:
                        failedTransaction = _a.sent();
                        failedTransaction.status = status;
                        return [4 /*yield*/, failedTransaction.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Failed transaction status updated successfully',
                                data: { failedTransaction: failedTransaction },
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Unable to update Failed Transaction status, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FailedTransactionService.prototype.delete = function (failedTransactionId) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var failedTransaction, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(failedTransactionId)];
                    case 1:
                        failedTransaction = _a.sent();
                        return [4 /*yield*/, this.failedTransactionModel.deleteOne({
                                _id: failedTransaction._id,
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Failed transaction deleted successfully',
                                data: {
                                    failedTransaction: failedTransaction,
                                },
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Unable to delete Failed Transaction, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FailedTransactionService.prototype.fetch = function (failedTransactionId) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var failedTransaction, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.find(failedTransactionId)];
                    case 1:
                        failedTransaction = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Failed transaction fetched successfully',
                                data: {
                                    failedTransaction: failedTransaction,
                                },
                            }];
                    case 2:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Unable to fetch Failed Transaction, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FailedTransactionService = __decorate([
        (0, typedi_1.Service)()
    ], FailedTransactionService);
    return FailedTransactionService;
}());
exports.default = FailedTransactionService;
