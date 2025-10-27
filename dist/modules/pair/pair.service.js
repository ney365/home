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
var pair_model_1 = __importDefault(require("@/modules/pair/pair.model"));
var http_type_1 = require("@/modules/http/http.type");
var http_enum_1 = require("@/modules/http/http.enum");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var asset_model_1 = __importDefault(require("../asset/asset.model"));
var errorCodes_enum_1 = require("@/utils/enums/errorCodes.enum");
var PairService = /** @class */ (function () {
    function PairService(assetService) {
        var _this = this;
        this.assetService = assetService;
        this.pairModel = pair_model_1.default;
        this.assetModel = asset_model_1.default;
        this.find = function (pairId, fromAllAccounts, userId) {
            if (fromAllAccounts === void 0) { fromAllAccounts = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var pair;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!fromAllAccounts) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.pairModel.findById(pairId)];
                        case 1:
                            pair = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.pairModel.findById({ _id: pairId, user: userId })];
                        case 3:
                            pair = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!pair)
                                throw new http_exception_1.default(404, 'Pair not found');
                            return [2 /*return*/, pair];
                    }
                });
            });
        };
        this.create = function (assetType, baseAssetId, quoteAssetId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var baseAsset, quoteAsset, pairExist, pair, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.assetService.get(baseAssetId, assetType)];
                    case 1:
                        baseAsset = _a.sent();
                        if (!baseAsset)
                            throw new http_exception_1.default(404, 'Base Asset not found');
                        return [4 /*yield*/, this.assetService.get(quoteAssetId, assetType)];
                    case 2:
                        quoteAsset = _a.sent();
                        if (!quoteAsset)
                            throw new http_exception_1.default(404, 'Quote Asset not found');
                        return [4 /*yield*/, this.pairModel.findOne({
                                baseAsset: baseAssetId,
                                quoteAsset: quoteAssetId,
                                assetType: assetType,
                            })];
                    case 3:
                        pairExist = _a.sent();
                        if (pairExist)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.REQUEST_CONFLICT, 'Pair already exist');
                        return [4 /*yield*/, this.pairModel.create({
                                assetType: assetType,
                                baseAsset: baseAsset._id,
                                baseAssetObject: baseAsset,
                                quoteAsset: quoteAsset._id,
                                quoteAssetObject: quoteAsset,
                            })];
                    case 4:
                        pair = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Pair added successfully',
                                data: { pair: pair },
                            }];
                    case 5:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, 'Unable to save new pair, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (pairId, assetType, baseAssetId, quoteAssetId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var pairExist, baseAsset, quoteAsset, pair, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.pairModel.findOne({
                                $and: [
                                    { _id: { $ne: pairId } },
                                    { assetType: assetType },
                                    { baseAsset: baseAssetId },
                                    { quoteAsset: quoteAssetId },
                                ],
                            })];
                    case 1:
                        pairExist = _a.sent();
                        if (pairExist)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.REQUEST_CONFLICT, 'Pair already exist');
                        return [4 /*yield*/, this.assetService.get(baseAssetId, assetType)];
                    case 2:
                        baseAsset = _a.sent();
                        if (!baseAsset)
                            throw new http_exception_1.default(404, 'Base Asset not found');
                        return [4 /*yield*/, this.assetService.get(quoteAssetId, assetType)];
                    case 3:
                        quoteAsset = _a.sent();
                        if (!quoteAsset)
                            throw new http_exception_1.default(404, 'Quote Asset not found');
                        return [4 /*yield*/, this.find(pairId)];
                    case 4:
                        pair = _a.sent();
                        pair.assetType = assetType;
                        pair.baseAsset = baseAsset._id;
                        pair.baseAssetObject = baseAsset;
                        pair.quoteAsset = quoteAsset._id;
                        pair.quoteAssetObject = quoteAsset;
                        return [4 /*yield*/, pair.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Pair updated successfully',
                                data: { pair: pair },
                            }];
                    case 6:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Unable to update pair, please try again');
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAll = function () { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var pairs, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pairModel
                                .find()
                                .select('-baseAssetObject -quoteAssetObject')
                                .populate('baseAsset', 'name symbol logo type isDeleted')
                                .populate('quoteAsset', 'name symbol logo type isDeleted')];
                    case 1:
                        pairs = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Pairs fetch successfully',
                                data: { pairs: pairs },
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Unable to fetch pair, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    PairService.prototype.get = function (pairId) {
        return __awaiter(this, void 0, void 0, function () {
            var pair, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pairModel.findById(pairId)];
                    case 1:
                        pair = _a.sent();
                        if (!pair)
                            return [2 /*return*/, null];
                        return [2 /*return*/, pair.toObject({ getters: true })];
                    case 2:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Unable to get pair, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PairService.prototype.getByBase = function (baseId) {
        return __awaiter(this, void 0, void 0, function () {
            var pairs, pairsObject, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pairModel.find({ baseAsset: baseId })];
                    case 1:
                        pairs = _a.sent();
                        pairsObject = pairs.map(function (pair) { return pair.toObject({ getters: true }); });
                        return [2 /*return*/, pairsObject];
                    case 2:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Unable to get pair, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PairService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.ASSET_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], PairService);
    return PairService;
}());
exports.default = PairService;
