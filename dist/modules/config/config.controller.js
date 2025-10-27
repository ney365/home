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
var express_1 = require("express");
var config_constants_1 = require("@/modules/config/config.constants");
var http_enum_1 = require("@/modules/http/http.enum");
var axios_1 = __importDefault(require("axios"));
var ConfigController = /** @class */ (function () {
    function ConfigController() {
        var _this = this;
        this.path = '/configurations';
        this.router = (0, express_1.Router)();
        this.ethereumRate = 1694.62;
        this.initialiseRoutes = function () {
            _this.router.get("".concat(_this.path, "/constants"), _this.getConstants);
        };
        this.getCoinsRate = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, error_1;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')];
                    case 1:
                        res = _e.sent();
                        if ((_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.ethereum) === null || _b === void 0 ? void 0 : _b.usd) {
                            this.ethereumRate = +((_d = (_c = res === null || res === void 0 ? void 0 : res.data) === null || _c === void 0 ? void 0 : _c.ethereum) === null || _d === void 0 ? void 0 : _d.usd) || this.ethereumRate;
                            // console.log(this.ethereumRate)
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _e.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getConstants = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var constants;
            return __generator(this, function (_a) {
                constants = {
                    liveChatApi: config_constants_1.SiteConstants.liveChatApi,
                    siteName: config_constants_1.SiteConstants.siteName,
                    siteDomain: config_constants_1.SiteConstants.siteDomain,
                    siteApi: config_constants_1.SiteConstants.siteApi,
                    siteUrl: config_constants_1.SiteConstants.siteUrl,
                    baseImageUrl: config_constants_1.SiteConstants.baseImageUrl,
                    siteEmail: config_constants_1.SiteConstants.siteEmail,
                    siteAddress: config_constants_1.SiteConstants.siteAddress,
                    sitePhone: config_constants_1.SiteConstants.sitePhone,
                    ethereumRate: this.ethereumRate,
                };
                res.status(200).json({
                    status: http_enum_1.HttpResponseStatus.SUCCESS,
                    message: 'Constants fetched',
                    data: { constants: constants },
                });
                return [2 /*return*/];
            });
        }); };
        this.initialiseRoutes();
        this.getCoinsRate();
        setInterval(this.getCoinsRate, 10 * 60 * 1000);
    }
    ConfigController = __decorate([
        (0, typedi_1.Service)(),
        __metadata("design:paramtypes", [])
    ], ConfigController);
    return ConfigController;
}());
exports.default = ConfigController;
