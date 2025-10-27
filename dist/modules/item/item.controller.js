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
var express_1 = require("express");
var item_validation_1 = __importDefault(require("@/modules/item/item.validation"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var http_middleware_1 = __importDefault(require("@/modules/http/http.middleware"));
var user_enum_1 = require("@/modules/user/user.enum");
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var imageUploader_1 = __importDefault(require("../imageUploader/imageUploader"));
var item_service_1 = __importDefault(require("./item.service"));
var errorCodes_enum_1 = require("@/utils/enums/errorCodes.enum");
var ItemController = /** @class */ (function () {
    function ItemController(itemService) {
        var _this = this;
        this.itemService = itemService;
        this.path = '/item';
        this.router = (0, express_1.Router)();
        this.imageUploader = new imageUploader_1.default();
        this.fetchAll = function (all) {
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var response, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.itemService.fetchAll(all)];
                        case 1:
                            response = _a.sent();
                            res.status(200).json(response);
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            next(new http_exception_1.default(err_1.status, err_1.message, err_1.statusStrength));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        this.create = function (isAdmin) {
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var itemName, _a, userId, title, description, amount, itemImages, cover, user_Id, response, err_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = req.body, userId = _a.userId, title = _a.title, description = _a.description, amount = _a.amount, itemImages = _a.item;
                            if (!itemImages)
                                throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.BAD_REQUEST, 'Image is required');
                            cover = itemImages[0].name;
                            itemName = cover;
                            user_Id = isAdmin ? userId : req.user._id;
                            return [4 /*yield*/, this.itemService.create(isAdmin, user_Id, cover, title, description, amount)];
                        case 1:
                            response = _b.sent();
                            res.status(201).json(response);
                            return [3 /*break*/, 3];
                        case 2:
                            err_2 = _b.sent();
                            if (itemName)
                                this.imageUploader.delete('item', itemName, item_service_1.default.itemImageSizes);
                            next(new http_exception_1.default(err_2.status, err_2.message, err_2.statusStrength));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        this.update = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var itemName, _a, itemId, title, description, amount, itemImages, item, response, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, itemId = _a.itemId, title = _a.title, description = _a.description, amount = _a.amount, itemImages = _a.item;
                        item = void 0;
                        if (itemImages) {
                            ;
                            item = itemImages[0].name;
                        }
                        itemName = item;
                        return [4 /*yield*/, this.itemService.update(itemId, item, title, description, amount)];
                    case 1:
                        response = _b.sent();
                        res.status(201).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _b.sent();
                        if (itemName)
                            this.imageUploader.delete('item', itemName, item_service_1.default.itemImageSizes);
                        next(new http_exception_1.default(err_3.status, err_3.message, err_3.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.purchase = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var itemId, userId, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        itemId = req.body.itemId;
                        userId = req.user._id;
                        return [4 /*yield*/, this.itemService.purchase(itemId, userId)];
                    case 1:
                        response = _a.sent();
                        res.status(200).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        next(new http_exception_1.default(err_4.status, err_4.message, err_4.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.sell = function (isAdmin) {
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var _a, itemId, amount, userId, response, err_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = req.body, itemId = _a.itemId, amount = _a.amount;
                            userId = req.user._id;
                            return [4 /*yield*/, this.itemService.sell(itemId, isAdmin, amount, userId)];
                        case 1:
                            response = _b.sent();
                            res.status(200).json(response);
                            return [3 /*break*/, 3];
                        case 2:
                            err_5 = _b.sent();
                            next(new http_exception_1.default(err_5.status, err_5.message, err_5.statusStrength));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        this.updateStatus = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, itemId, status_1, response, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, itemId = _a.itemId, status_1 = _a.status;
                        return [4 /*yield*/, this.itemService.updateStatus(itemId, status_1)];
                    case 1:
                        response = _b.sent();
                        res.status(200).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _b.sent();
                        next(new http_exception_1.default(err_6.status, err_6.message, err_6.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.feature = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, itemId, featured, response, err_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, itemId = _a.itemId, featured = _a.featured;
                        return [4 /*yield*/, this.itemService.feature(itemId, featured)];
                    case 1:
                        response = _b.sent();
                        res.status(200).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _b.sent();
                        next(new http_exception_1.default(err_7.status, err_7.message, err_7.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.recommend = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, itemId, recommended, response, err_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, itemId = _a.itemId, recommended = _a.recommended;
                        return [4 /*yield*/, this.itemService.recommend(itemId, recommended)];
                    case 1:
                        response = _b.sent();
                        res.status(200).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_8 = _b.sent();
                        next(new http_exception_1.default(err_8.status, err_8.message, err_8.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var itemId, response, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        itemId = req.params.itemId;
                        return [4 /*yield*/, this.itemService.delete(itemId)];
                    case 1:
                        response = _a.sent();
                        res.status(200).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_9 = _a.sent();
                        next(new http_exception_1.default(err_9.status, err_9.message, err_9.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.intialiseRoutes();
    }
    ItemController.prototype.intialiseRoutes = function () {
        this.router.post("".concat(this.path, "/create"), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), this.imageUploader.setNames([{ name: 'item', maxCount: 1 }]), http_middleware_1.default.validate(item_validation_1.default.create), this.imageUploader.resize(['item'], item_service_1.default.itemImageSizes), this.create(false));
        this.router.post("".concat(this.path, "/create/master"), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), this.imageUploader.setNames([{ name: 'item', maxCount: 1 }]), http_middleware_1.default.validate(item_validation_1.default.masterCreate), this.imageUploader.resize(['item'], item_service_1.default.itemImageSizes), this.create(true));
        this.router.put("".concat(this.path, "/update"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), this.imageUploader.setNames([{ name: 'item', maxCount: 1 }]), http_middleware_1.default.validate(item_validation_1.default.update), this.imageUploader.resize(['item'], item_service_1.default.itemImageSizes), this.update);
        this.router.post("".concat(this.path, "/purchase"), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), http_middleware_1.default.validate(item_validation_1.default.purchase), this.purchase);
        this.router.post("".concat(this.path, "/sell"), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), http_middleware_1.default.validate(item_validation_1.default.sell), this.sell(false));
        this.router.post("".concat(this.path, "/sell/master"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), http_middleware_1.default.validate(item_validation_1.default.sell), this.sell(true));
        this.router.patch("".concat(this.path, "/update-status"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), http_middleware_1.default.validate(item_validation_1.default.updateStatus), this.updateStatus);
        this.router.patch("".concat(this.path, "/feature"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), http_middleware_1.default.validate(item_validation_1.default.feature), this.feature);
        this.router.patch("".concat(this.path, "/recommend"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), http_middleware_1.default.validate(item_validation_1.default.recommend), this.recommend);
        this.router.delete("".concat(this.path, "/delete/:itemId"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), this.delete);
        // this.router.get(
        //   `${this.path}/master`,
        //   HttpMiddleware.authenticate(UserRole.ADMIN),
        //   this.fetchAll(true)
        // )
        this.router.get("".concat(this.path), this.fetchAll(true));
    };
    ItemController = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.ITEM_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], ItemController);
    return ItemController;
}());
exports.default = ItemController;
