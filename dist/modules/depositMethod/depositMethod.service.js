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
var depositMethod_model_1 = __importDefault(require("@/modules/depositMethod/depositMethod.model"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var depositMethod_enum_1 = require("@/modules/depositMethod/depositMethod.enum");
var http_type_1 = require("@/modules/http/http.type");
var http_enum_1 = require("@/modules/http/http.enum");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var errorCodes_enum_1 = require("@/utils/enums/errorCodes.enum");
var DepositMethodService = /** @class */ (function () {
    function DepositMethodService(currencyService) {
        var _this = this;
        this.currencyService = currencyService;
        this.depositMethodModel = depositMethod_model_1.default;
        this.create = function (currencyId, address, network, fee, minDeposit) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var currency, depositMethodExist, depositMethod, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (fee >= minDeposit)
                            throw new http_exception_1.default(400, 'Min deposit must be greater than the fee');
                        return [4 /*yield*/, this.currencyService.get(currencyId)];
                    case 1:
                        currency = _a.sent();
                        return [4 /*yield*/, this.depositMethodModel.findOne({
                                name: currency.name,
                                network: network,
                            })];
                    case 2:
                        depositMethodExist = _a.sent();
                        if (depositMethodExist)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.REQUEST_CONFLICT, 'This deposit method already exist');
                        return [4 /*yield*/, this.depositMethodModel.create({
                                currency: currency._id,
                                name: currency.name,
                                symbol: currency.symbol,
                                logo: currency.logo,
                                address: address,
                                network: network,
                                fee: fee,
                                minDeposit: minDeposit,
                                status: depositMethod_enum_1.DepositMethodStatus.ENABLED,
                                autoUpdate: true,
                                price: 1,
                            })];
                    case 3:
                        depositMethod = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Deposit method added successfully',
                                data: { depositMethod: depositMethod },
                            }];
                    case 4:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, 'Failed to add this deposit method, please try again');
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (depositMethodId, currencyId, address, network, fee, minDeposit) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var depositMethod, currency, depositMethodExist, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (fee >= minDeposit)
                            throw new http_exception_1.default(400, 'Min deposit must be greater than the fee');
                        return [4 /*yield*/, this.find(depositMethodId)];
                    case 1:
                        depositMethod = _a.sent();
                        return [4 /*yield*/, this.currencyService.get(currencyId)];
                    case 2:
                        currency = _a.sent();
                        return [4 /*yield*/, this.depositMethodModel.findOne({
                                name: currency.name,
                                network: network,
                                _id: { $ne: depositMethod._id },
                            })];
                    case 3:
                        depositMethodExist = _a.sent();
                        if (depositMethodExist)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.REQUEST_CONFLICT, 'This deposit method already exist');
                        depositMethod.currency = currency._id;
                        depositMethod.name = currency.name;
                        depositMethod.symbol = currency.symbol;
                        depositMethod.logo = currency.logo;
                        depositMethod.address = address;
                        depositMethod.network = network;
                        depositMethod.fee = fee;
                        depositMethod.minDeposit = minDeposit;
                        return [4 /*yield*/, depositMethod.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Deposit method updated successfully',
                                data: { depositMethod: depositMethod },
                            }];
                    case 5:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Failed to update this deposit method, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (depositMethodId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var depositMethod, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(depositMethodId)];
                    case 1:
                        depositMethod = _a.sent();
                        return [4 /*yield*/, depositMethod.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Deposit method deleted successfully',
                                data: { depositMethod: depositMethod },
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Failed to delete this deposit method, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateStatus = function (depositMethodId, status) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var depositMethod, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(depositMethodId)];
                    case 1:
                        depositMethod = _a.sent();
                        if (!Object.values(depositMethod_enum_1.DepositMethodStatus).includes(status))
                            throw new http_exception_1.default(400, 'Invalid status value');
                        depositMethod.status = status;
                        return [4 /*yield*/, depositMethod.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Status updated successfully',
                                data: { depositMethod: depositMethod },
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to update this deposit method status, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAll = function (all) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var depositMethods, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        depositMethods = void 0;
                        if (!all) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.depositMethodModel.find()];
                    case 1:
                        depositMethods = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.depositMethodModel.find({
                            status: depositMethod_enum_1.DepositMethodStatus.ENABLED,
                        })];
                    case 3:
                        depositMethods = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Deposit method fetched successfully',
                            data: { depositMethods: depositMethods },
                        }];
                    case 5:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Failed to fetch deposit method, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    DepositMethodService.prototype.find = function (depositMethodId) {
        return __awaiter(this, void 0, void 0, function () {
            var depositMethod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositMethodModel.findById(depositMethodId)];
                    case 1:
                        depositMethod = _a.sent();
                        if (!depositMethod)
                            throw new http_exception_1.default(404, 'Deposit method not found');
                        return [2 /*return*/, depositMethod];
                }
            });
        });
    };
    DepositMethodService.prototype.get = function (depositMethodId) {
        return __awaiter(this, void 0, void 0, function () {
            var depositMethod, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.depositMethodModel.findOne({
                                _id: depositMethodId,
                                status: depositMethod_enum_1.DepositMethodStatus.ENABLED,
                            })];
                    case 1:
                        depositMethod = _a.sent();
                        if (!depositMethod)
                            throw new http_exception_1.default(404, 'Deposit method not found');
                        return [2 /*return*/, depositMethod.toObject({ getters: true })];
                    case 2:
                        err_6 = _a.sent();
                        throw new app_exception_1.default(err_6, 'Failed to get deposit method, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DepositMethodService.prototype.updateMode = function (depositMethodId, autoUpdate) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var depositMethod, newDepositMethod, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(depositMethodId)];
                    case 1:
                        depositMethod = _a.sent();
                        depositMethod.autoUpdate = autoUpdate;
                        return [4 /*yield*/, depositMethod.save()];
                    case 2:
                        newDepositMethod = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: "Deposit method price updating is now on ".concat(autoUpdate ? 'auto mode' : 'manual mode'),
                                data: { depositMethod: newDepositMethod },
                            }];
                    case 3:
                        err_7 = _a.sent();
                        throw new app_exception_1.default(err_7, 'Unable to update price mode, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DepositMethodService.prototype.updatePrice = function (depositMethodId, price) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var depositMethod, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(depositMethodId)];
                    case 1:
                        depositMethod = _a.sent();
                        if (depositMethod.autoUpdate)
                            throw new http_exception_1.default(400, 'Can not update a deposit method price that is on auto update mode');
                        depositMethod.price = price;
                        return [4 /*yield*/, depositMethod.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Deposit method price updated successfully',
                                data: { depositMethod: depositMethod },
                            }];
                    case 3:
                        err_8 = _a.sent();
                        throw new app_exception_1.default(err_8, 'Unable to update deposit method price, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DepositMethodService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.CURRENCY_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], DepositMethodService);
    return DepositMethodService;
}());
exports.default = DepositMethodService;
