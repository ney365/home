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
var plan_model_1 = __importDefault(require("@/modules/plan/plan.model"));
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_type_1 = require("@/modules/http/http.type");
var http_enum_1 = require("@/modules/http/http.enum");
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var plan_enum_1 = require("@/modules/plan/plan.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var transactionManager_type_1 = require("../transactionManager/transactionManager.type");
var forecast_enum_1 = require("../forecast/forecast.enum");
var forecast_model_1 = __importDefault(require("../forecast/forecast.model"));
var PlanService = /** @class */ (function () {
    function PlanService(assetService) {
        this.assetService = assetService;
        this.planModel = plan_model_1.default;
        this.forecastModel = forecast_model_1.default;
    }
    PlanService.prototype.find = function (planId, fromAllAccounts, userId) {
        if (fromAllAccounts === void 0) { fromAllAccounts = true; }
        return __awaiter(this, void 0, void 0, function () {
            var plan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fromAllAccounts) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.planModel.findById(planId)];
                    case 1:
                        plan = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.planModel.findOne({ _id: planId, user: userId })];
                    case 3:
                        plan = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!plan)
                            throw new http_exception_1.default(404, 'Plan not found');
                        return [2 /*return*/, plan];
                }
            });
        });
    };
    PlanService.prototype._updateForecastDetails = function (planId, forecastObject) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var plan, oldStatus, oldCurrentForecast, oldTimeStamps, oldStartTime, oldRuntime;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(planId)];
                    case 1:
                        plan = _a.sent();
                        oldStatus = plan.forecastStatus;
                        oldCurrentForecast = plan.currentForecast;
                        oldTimeStamps = plan.forecastTimeStamps.slice();
                        oldStartTime = plan.forecastStartTime;
                        oldRuntime = plan.runTime;
                        plan.currentForecast = forecastObject._id;
                        plan.forecastStatus = forecastObject.status;
                        plan.forecastTimeStamps = forecastObject.timeStamps.slice();
                        plan.forecastStartTime = forecastObject.startTime;
                        if (forecastObject.status === forecast_enum_1.ForecastStatus.SETTLED) {
                            plan.forecastStatus = undefined;
                            plan.forecastStartTime = undefined;
                            plan.currentForecast = undefined;
                            plan.runTime += forecastObject.runTime;
                        }
                        return [2 /*return*/, {
                                object: plan.toObject({ getters: true }),
                                instance: {
                                    model: plan,
                                    onFailed: "Set the plan with an id of (".concat(plan._id, ") forecastStartTime to (").concat(oldStartTime, ") and forecastTimeStamps to (").concat(JSON.stringify(oldTimeStamps), ") and ForecastStatus to (").concat(oldStartTime, ") and currentForecast to (").concat(oldCurrentForecast, ") and runTime = (").concat(oldRuntime, ")"),
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    plan.currentForecast = oldCurrentForecast;
                                                    plan.forecastStatus = oldStatus;
                                                    plan.forecastTimeStamps = oldTimeStamps;
                                                    plan.forecastStartTime = oldStartTime;
                                                    plan.runTime = oldRuntime;
                                                    return [4 /*yield*/, plan.save()];
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
    PlanService.prototype.create = function (icon, name, engine, minAmount, maxAmount, minPercentageProfit, maxPercentageProfit, duration, dailyForecasts, gas, description, assetType, assets) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var _i, assets_1, assetId, assetExist, plan, assetsObj, _a, _b, assetId, asset, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 10, , 11]);
                        _i = 0, assets_1 = assets;
                        _c.label = 1;
                    case 1:
                        if (!(_i < assets_1.length)) return [3 /*break*/, 4];
                        assetId = assets_1[_i];
                        return [4 /*yield*/, this.assetService.get(assetId, assetType)];
                    case 2:
                        assetExist = _c.sent();
                        if (!assetExist)
                            throw new http_exception_1.default(404, 'Some of the selected assets those not exist');
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.planModel.create({
                            icon: icon,
                            name: name,
                            engine: engine,
                            minAmount: minAmount,
                            maxAmount: maxAmount,
                            minPercentageProfit: minPercentageProfit,
                            maxPercentageProfit: maxPercentageProfit,
                            duration: duration,
                            dailyForecasts: dailyForecasts,
                            gas: gas,
                            description: description,
                            assetType: assetType,
                            assets: assets,
                        })];
                    case 5:
                        plan = _c.sent();
                        assetsObj = [];
                        _a = 0, _b = plan.assets;
                        _c.label = 6;
                    case 6:
                        if (!(_a < _b.length)) return [3 /*break*/, 9];
                        assetId = _b[_a];
                        return [4 /*yield*/, this.assetService.get(assetId, assetType)];
                    case 7:
                        asset = _c.sent();
                        if (asset)
                            assetsObj.push(asset);
                        _c.label = 8;
                    case 8:
                        _a++;
                        return [3 /*break*/, 6];
                    case 9:
                        plan.assets = assetsObj;
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Plan has been created successfully',
                                data: { plan: plan },
                            }];
                    case 10:
                        err_1 = _c.sent();
                        throw new app_exception_1.default(err_1, 'Failed to create this plan, please try again');
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    PlanService.prototype.update = function (planId, icon, name, engine, minAmount, maxAmount, minPercentageProfit, maxPercentageProfit, duration, dailyForecasts, gas, description, assetType, assets) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var _i, assets_2, assetId, assetExist, plan, assetsObj, _a, _b, assetId, asset, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 11, , 12]);
                        _i = 0, assets_2 = assets;
                        _c.label = 1;
                    case 1:
                        if (!(_i < assets_2.length)) return [3 /*break*/, 4];
                        assetId = assets_2[_i];
                        return [4 /*yield*/, this.assetService.get(assetId, assetType)];
                    case 2:
                        assetExist = _c.sent();
                        if (!assetExist)
                            throw new http_exception_1.default(404, 'Some of the selected assets those not exist');
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.find(planId)];
                    case 5:
                        plan = _c.sent();
                        plan.name = name;
                        plan.icon = icon;
                        plan.engine = engine;
                        plan.minAmount = minAmount;
                        plan.maxAmount = maxAmount;
                        plan.minPercentageProfit = minPercentageProfit;
                        plan.maxPercentageProfit = maxPercentageProfit;
                        plan.duration = duration;
                        plan.dailyForecasts = dailyForecasts;
                        plan.gas = gas;
                        plan.description = description;
                        plan.assetType = assetType;
                        plan.assets = assets;
                        assetsObj = [];
                        _a = 0, _b = plan.assets;
                        _c.label = 6;
                    case 6:
                        if (!(_a < _b.length)) return [3 /*break*/, 9];
                        assetId = _b[_a];
                        return [4 /*yield*/, this.assetService.get(assetId, assetType)];
                    case 7:
                        asset = _c.sent();
                        if (asset)
                            assetsObj.push(asset);
                        _c.label = 8;
                    case 8:
                        _a++;
                        return [3 /*break*/, 6];
                    case 9:
                        plan.assets = assetsObj;
                        return [4 /*yield*/, plan.save()];
                    case 10:
                        _c.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Plan has been updated successfully',
                                data: { plan: plan },
                            }];
                    case 11:
                        err_2 = _c.sent();
                        throw new app_exception_1.default(err_2, 'Failed to create this plan, please try again');
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    PlanService.prototype.updateStatus = function (planId, status) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var plan, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(planId)];
                    case 1:
                        plan = _a.sent();
                        plan.status = status;
                        return [4 /*yield*/, plan.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Plan status has been updated successfully',
                                data: { plan: plan },
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Failed to update plan status, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PlanService.prototype.updateForecastDetails = function (planId, forecastObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._updateForecastDetails(planId, forecastObject)];
                    case 1: return [2 /*return*/, (_a.sent()).instance];
                }
            });
        });
    };
    PlanService.prototype.get = function (planId) {
        return __awaiter(this, void 0, void 0, function () {
            var plan, assetsObj, _i, _a, assetId, asset;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.planModel.findById(planId)];
                    case 1:
                        plan = _b.sent();
                        if (!plan)
                            return [2 /*return*/, null];
                        assetsObj = [];
                        _i = 0, _a = plan.assets;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        assetId = _a[_i];
                        return [4 /*yield*/, this.assetService.get(assetId, plan.assetType)];
                    case 3:
                        asset = _b.sent();
                        if (asset)
                            assetsObj.push(asset);
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        plan.assets = assetsObj;
                        return [2 /*return*/, plan.toObject({ getters: true })];
                }
            });
        });
    };
    PlanService.prototype.getAllAutoIdled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var plans, index, plan, assetsObj, _i, _a, assetId, asset;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.planModel.find({
                            manualMode: false,
                            status: plan_enum_1.PlanStatus.ACTIVE,
                            forecastStatus: { $or: [forecast_enum_1.ForecastStatus.SETTLED, undefined] },
                        })];
                    case 1:
                        plans = _b.sent();
                        index = 0;
                        _b.label = 2;
                    case 2:
                        if (!(index < plans.length)) return [3 /*break*/, 8];
                        plan = plans[index];
                        assetsObj = [];
                        _i = 0, _a = plan.assets;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        assetId = _a[_i];
                        return [4 /*yield*/, this.assetService.get(assetId, plan.assetType)];
                    case 4:
                        asset = _b.sent();
                        if (asset)
                            assetsObj.push(asset);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        plan.assets = assetsObj;
                        plan.toObject({ getters: true });
                        _b.label = 7;
                    case 7:
                        index++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/, plans];
                }
            });
        });
    };
    PlanService.prototype.getAllAutoRunning = function () {
        return __awaiter(this, void 0, void 0, function () {
            var plans, index, plan, assetsObj, _i, _a, assetId, asset;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.planModel.find({
                            manualMode: false,
                            status: plan_enum_1.PlanStatus.ACTIVE,
                            forecastStatus: {
                                $or: [
                                    forecast_enum_1.ForecastStatus.PREPARING,
                                    forecast_enum_1.ForecastStatus.RUNNING,
                                    forecast_enum_1.ForecastStatus.MARKET_CLOSED,
                                ],
                            },
                        })];
                    case 1:
                        plans = _b.sent();
                        index = 0;
                        _b.label = 2;
                    case 2:
                        if (!(index < plans.length)) return [3 /*break*/, 8];
                        plan = plans[index];
                        assetsObj = [];
                        _i = 0, _a = plan.assets;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        assetId = _a[_i];
                        return [4 /*yield*/, this.assetService.get(assetId, plan.assetType)];
                    case 4:
                        asset = _b.sent();
                        if (asset)
                            assetsObj.push(asset);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        plan.assets = assetsObj;
                        plan.toObject({ getters: true });
                        _b.label = 7;
                    case 7:
                        index++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/, plans];
                }
            });
        });
    };
    PlanService.prototype.delete = function (planId) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var plan, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.planModel.findByIdAndDelete(planId)];
                    case 1:
                        plan = _a.sent();
                        if (!plan)
                            throw new http_exception_1.default(404, 'Plan not found');
                        return [4 /*yield*/, this.forecastModel.deleteMany({ plan: plan._id })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Plan has been deleted successfully',
                                data: { plan: plan },
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to delete plan, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PlanService.prototype.fetchAll = function (role) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var plans, _i, plans_1, plan, assetsObj, _a, _b, assetId, asset, err_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 12, , 13]);
                        plans = void 0;
                        if (!(role > user_enum_1.UserRole.USER)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.planModel.find()];
                    case 1:
                        plans = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.planModel.find({
                            status: { $ne: plan_enum_1.PlanStatus.SUSPENDED },
                        })];
                    case 3:
                        plans = _c.sent();
                        _c.label = 4;
                    case 4:
                        _i = 0, plans_1 = plans;
                        _c.label = 5;
                    case 5:
                        if (!(_i < plans_1.length)) return [3 /*break*/, 11];
                        plan = plans_1[_i];
                        assetsObj = [];
                        _a = 0, _b = plan.assets;
                        _c.label = 6;
                    case 6:
                        if (!(_a < _b.length)) return [3 /*break*/, 9];
                        assetId = _b[_a];
                        return [4 /*yield*/, this.assetService.get(assetId, plan.assetType)];
                    case 7:
                        asset = _c.sent();
                        if (asset)
                            assetsObj.push(asset);
                        _c.label = 8;
                    case 8:
                        _a++;
                        return [3 /*break*/, 6];
                    case 9:
                        plan.assets = assetsObj;
                        _c.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 5];
                    case 11: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Plans fetched successfully',
                            data: { plans: plans },
                        }];
                    case 12:
                        err_5 = _c.sent();
                        throw new app_exception_1.default(err_5, 'Failed to fetch plans, please try again');
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    PlanService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.ASSET_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], PlanService);
    return PlanService;
}());
exports.default = PlanService;
