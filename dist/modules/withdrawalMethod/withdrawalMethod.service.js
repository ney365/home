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
var withdrawalMethod_model_1 = __importDefault(require("@/modules/withdrawalMethod/withdrawalMethod.model"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var withdrawalMethod_enum_1 = require("@/modules/withdrawalMethod/withdrawalMethod.enum");
var http_type_1 = require("@/modules/http/http.type");
var http_enum_1 = require("@/modules/http/http.enum");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var errorCodes_enum_1 = require("@/utils/enums/errorCodes.enum");
var WithdrawalMethodService = /** @class */ (function () {
    function WithdrawalMethodService(currencyService) {
        var _this = this;
        this.currencyService = currencyService;
        this.withdrawalMethodModel = withdrawalMethod_model_1.default;
        this.find = function (withdrawalMethodId, fromAllAccounts, userId) {
            if (fromAllAccounts === void 0) { fromAllAccounts = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var withdrawalMethod;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!fromAllAccounts) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.withdrawalMethodModel.findById(withdrawalMethodId)];
                        case 1:
                            withdrawalMethod = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.withdrawalMethodModel.findOne({
                                _id: withdrawalMethodId,
                                user: userId,
                            })];
                        case 3:
                            withdrawalMethod = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!withdrawalMethod)
                                throw new http_exception_1.default(404, 'Withdrawal method not found');
                            return [2 /*return*/, withdrawalMethod];
                    }
                });
            });
        };
        this.create = function (currencyId, network, fee, minWithdrawal) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var currency, withdrawalMethodExist, withdrawalMethod, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (fee >= minWithdrawal)
                            throw new http_exception_1.default(400, 'Min withdrawal must be greater than the fee');
                        return [4 /*yield*/, this.currencyService.get(currencyId)];
                    case 1:
                        currency = _a.sent();
                        return [4 /*yield*/, this.withdrawalMethodModel.findOne({
                                name: currency.name,
                                network: network,
                            })];
                    case 2:
                        withdrawalMethodExist = _a.sent();
                        if (withdrawalMethodExist)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.REQUEST_CONFLICT, 'This withdrawal method already exist');
                        return [4 /*yield*/, this.withdrawalMethodModel.create({
                                currency: currency._id,
                                name: currency.name,
                                symbol: currency.symbol,
                                logo: currency.logo,
                                network: network,
                                fee: fee,
                                minWithdrawal: minWithdrawal,
                                status: withdrawalMethod_enum_1.WithdrawalMethodStatus.ENABLED,
                            })];
                    case 3:
                        withdrawalMethod = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Withdrawal method added successfully',
                                data: { withdrawalMethod: withdrawalMethod },
                            }];
                    case 4:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, 'Failed to add this withdrawal method, please try again');
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (withdrawalMethodId, currencyId, network, fee, minWithdrawal) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var withdrawalMethod, currency, withdrawalMethodExist, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (fee >= minWithdrawal)
                            throw new http_exception_1.default(400, 'Min withdrawal must be greater than the fee');
                        return [4 /*yield*/, this.find(withdrawalMethodId)];
                    case 1:
                        withdrawalMethod = _a.sent();
                        return [4 /*yield*/, this.currencyService.get(currencyId)];
                    case 2:
                        currency = _a.sent();
                        return [4 /*yield*/, this.withdrawalMethodModel.findOne({
                                name: currency.name,
                                network: network,
                                _id: { $ne: withdrawalMethod._id },
                            })];
                    case 3:
                        withdrawalMethodExist = _a.sent();
                        if (withdrawalMethodExist)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.REQUEST_CONFLICT, 'This withdrawal method already exist');
                        withdrawalMethod.currency = currency._id;
                        withdrawalMethod.name = currency.name;
                        withdrawalMethod.symbol = currency.symbol;
                        withdrawalMethod.logo = currency.logo;
                        withdrawalMethod.network = network;
                        withdrawalMethod.fee = fee;
                        withdrawalMethod.minWithdrawal = minWithdrawal;
                        return [4 /*yield*/, withdrawalMethod.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Withdrawal method updated successfully',
                                data: { withdrawalMethod: withdrawalMethod },
                            }];
                    case 5:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Failed to update this withdrawal method, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (withdrawalMethodId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var withdrawalMethod, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(withdrawalMethodId)];
                    case 1:
                        withdrawalMethod = _a.sent();
                        return [4 /*yield*/, withdrawalMethod.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Withdrawal method deleted successfully',
                                data: { withdrawalMethod: withdrawalMethod },
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Failed to delete this withdrawal method, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateStatus = function (withdrawalMethodId, status) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var withdrawalMethod, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(withdrawalMethodId)];
                    case 1:
                        withdrawalMethod = _a.sent();
                        withdrawalMethod.status = status;
                        return [4 /*yield*/, withdrawalMethod.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Status updated successfully',
                                data: { withdrawalMethod: withdrawalMethod },
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to update this withdrawal method status, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAll = function (all) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var withdrawalMethods, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        withdrawalMethods = void 0;
                        if (!all) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.withdrawalMethodModel.find()];
                    case 1:
                        withdrawalMethods = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.withdrawalMethodModel.find({
                            status: withdrawalMethod_enum_1.WithdrawalMethodStatus.ENABLED,
                        })];
                    case 3:
                        withdrawalMethods = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Withdrawal method fetched successfully',
                            data: { withdrawalMethods: withdrawalMethods },
                        }];
                    case 5:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Failed to fetch withdrawal method, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    WithdrawalMethodService.prototype.get = function (withdrawalMethodId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(withdrawalMethodId)];
                    case 1: return [2 /*return*/, (_a.sent()).toObject()];
                }
            });
        });
    };
    WithdrawalMethodService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.CURRENCY_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], WithdrawalMethodService);
    return WithdrawalMethodService;
}());
exports.default = WithdrawalMethodService;
