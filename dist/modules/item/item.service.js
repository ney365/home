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
var item_model_1 = __importDefault(require("@/modules/item/item.model"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var item_enum_1 = require("@/modules/item/item.enum");
var transaction_enum_1 = require("@/modules/transaction/transaction.enum");
var notification_enum_1 = require("@/modules/notification/notification.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var http_type_1 = require("@/modules/http/http.type");
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_enum_1 = require("@/modules/http/http.enum");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var transactionManager_type_1 = require("@/modules/transactionManager/transactionManager.type");
var errorCodes_enum_1 = require("@/utils/enums/errorCodes.enum");
var imageUploader_1 = __importDefault(require("../imageUploader/imageUploader"));
var imageUploader_enum_1 = require("../imageUploader/imageUploader.enum");
var ItemService = /** @class */ (function () {
    function ItemService(itemSettingsService, userService, transactionService, notificationService, referralService, mathService, transactionManagerService) {
        var _this = this;
        this.itemSettingsService = itemSettingsService;
        this.userService = userService;
        this.transactionService = transactionService;
        this.notificationService = notificationService;
        this.referralService = referralService;
        this.mathService = mathService;
        this.transactionManagerService = transactionManagerService;
        this.itemModel = item_model_1.default;
        this.imageUploader = new imageUploader_1.default();
        this.create = function (isAdmin, userId, cover, title, description, amount) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transactionInstances, itemSettings, gasFee, user, _a, userInstance, userObject, _b, itemInstance, item, transactionInstance, userNotificationInstance, adminNotificationInstance, err_1;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 12, , 13]);
                        transactionInstances = [];
                        return [4 /*yield*/, this.itemSettingsService.get()];
                    case 1:
                        itemSettings = _e.sent();
                        gasFee = itemSettings ? itemSettings.fee : 1;
                        user = void 0;
                        if (!isAdmin) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userService.get(userId)];
                    case 2:
                        user = _e.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.userService.fund(userId, user_enum_1.UserAccount.MAIN_BALANCE, -gasFee, undefined, 'You do not have sufficient funds to pay for gas fee')];
                    case 4:
                        _a = _e.sent(), userInstance = _a.instance, userObject = _a.object;
                        transactionInstances.push(userInstance);
                        user = userObject;
                        _e.label = 5;
                    case 5: return [4 /*yield*/, this._createTransaction(user, user, user, cover, title, description, item_enum_1.ItemStatus.ON_SALE, amount, gasFee, item_enum_1.ItemOwnership.CREATED)];
                    case 6:
                        _b = _e.sent(), itemInstance = _b.instance, item = _b.object;
                        transactionInstances.push(itemInstance);
                        return [4 /*yield*/, this.transactionService.create(user, item_enum_1.ItemStatus.CREATED, transaction_enum_1.TransactionCategory.ITEM_CREATED, item, amount, user_enum_1.UserEnvironment.LIVE, amount)];
                    case 7:
                        transactionInstance = _e.sent();
                        transactionInstances.push(transactionInstance);
                        return [4 /*yield*/, this.notificationService.create("Your item was created successfully", notification_enum_1.NotificationCategory.ITEM_CREATED, item, notification_enum_1.NotificationForWho.USER, item_enum_1.ItemStatus.CREATED, user_enum_1.UserEnvironment.LIVE, user)];
                    case 8:
                        userNotificationInstance = _e.sent();
                        transactionInstances.push(userNotificationInstance);
                        return [4 /*yield*/, this.notificationService.create("".concat(user.username, " just created a new item"), notification_enum_1.NotificationCategory.ITEM_CREATED, item, notification_enum_1.NotificationForWho.ADMIN, item_enum_1.ItemStatus.CREATED, user_enum_1.UserEnvironment.LIVE)];
                    case 9:
                        adminNotificationInstance = _e.sent();
                        transactionInstances.push(adminNotificationInstance);
                        return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances)];
                    case 10:
                        _e.sent();
                        _c = {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'item has been registered successfully'
                        };
                        _d = {};
                        return [4 /*yield*/, itemInstance.model.populate('user', 'username profile name isDeleted')];
                    case 11: return [2 /*return*/, (_c.data = (_d.item = _e.sent(),
                            _d),
                            _c)];
                    case 12:
                        err_1 = _e.sent();
                        throw new app_exception_1.default(err_1, 'Failed to register this item, please try again');
                    case 13: return [2 /*return*/];
                }
            });
        }); };
        this.purchase = function (itemId, buyerId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transactionInstances, item, sellerId, amount, _a, buyerInstance, buyerObject, _b, soldItemInstance, soldItemObject, _c, sellerInstance, sellerObject, _d, boughtItemInstance, boughtItemObject, sellerTransactionInstance, buyerTransactionInstance, sellerNotificationInstance, buyerNotificationInstance, adminNotificationInstance, err_2;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 12, , 13]);
                        transactionInstances = [];
                        return [4 /*yield*/, this.get(itemId)];
                    case 1:
                        item = _e.sent();
                        if (item.status === item_enum_1.ItemStatus.SOLD)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.BAD_REQUEST, 'Item has already been sold');
                        if (item.status !== item_enum_1.ItemStatus.ON_SALE)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.BAD_REQUEST, 'This item is not yet for sale');
                        sellerId = item.user._id;
                        amount = item.amount;
                        if (sellerId.toString() === buyerId.toString())
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.BAD_REQUEST, 'You cannot purchase your own item');
                        return [4 /*yield*/, this.userService.fund(buyerId, user_enum_1.UserAccount.MAIN_BALANCE, -amount)];
                    case 2:
                        _a = _e.sent(), buyerInstance = _a.instance, buyerObject = _a.object;
                        transactionInstances.push(buyerInstance);
                        return [4 /*yield*/, this._purchaseTransaction(itemId, buyerObject)];
                    case 3:
                        _b = _e.sent(), soldItemInstance = _b.instance, soldItemObject = _b.object;
                        transactionInstances.push(soldItemInstance);
                        return [4 /*yield*/, this.userService.fund(sellerId, user_enum_1.UserAccount.MAIN_BALANCE, amount)];
                    case 4:
                        _c = _e.sent(), sellerInstance = _c.instance, sellerObject = _c.object;
                        transactionInstances.push(sellerInstance);
                        return [4 /*yield*/, this._createTransaction(buyerObject, sellerObject, buyerObject, soldItemObject.cover, soldItemObject.title, soldItemObject.description, item_enum_1.ItemStatus.BOUGHT, amount, soldItemObject.gasFee, item_enum_1.ItemOwnership.COLLECTED, soldItemObject._id)];
                    case 5:
                        _d = _e.sent(), boughtItemInstance = _d.instance, boughtItemObject = _d.object;
                        transactionInstances.push(boughtItemInstance);
                        return [4 /*yield*/, this.transactionService.create(sellerObject, item_enum_1.ItemStatus.SOLD, transaction_enum_1.TransactionCategory.ITEM_SOLD, soldItemObject, amount, user_enum_1.UserEnvironment.LIVE, amount)];
                    case 6:
                        sellerTransactionInstance = _e.sent();
                        transactionInstances.push(sellerTransactionInstance);
                        return [4 /*yield*/, this.transactionService.create(buyerObject, item_enum_1.ItemStatus.BOUGHT, transaction_enum_1.TransactionCategory.ITEM_BOUGHT, boughtItemObject, amount, user_enum_1.UserEnvironment.LIVE, amount)];
                    case 7:
                        buyerTransactionInstance = _e.sent();
                        transactionInstances.push(buyerTransactionInstance);
                        return [4 /*yield*/, this.notificationService.create("Your item (\"".concat(boughtItemObject.title, "\") was purchased by ").concat(buyerObject.username), notification_enum_1.NotificationCategory.ITEM_SOLD, soldItemObject, notification_enum_1.NotificationForWho.USER, item_enum_1.ItemStatus.SOLD, user_enum_1.UserEnvironment.LIVE, sellerObject)];
                    case 8:
                        sellerNotificationInstance = _e.sent();
                        transactionInstances.push(sellerNotificationInstance);
                        return [4 /*yield*/, this.notificationService.create("Your purchase of \"".concat(boughtItemObject.title, "\" was successfull"), notification_enum_1.NotificationCategory.ITEM_BOUGHT, boughtItemObject, notification_enum_1.NotificationForWho.USER, item_enum_1.ItemStatus.BOUGHT, user_enum_1.UserEnvironment.LIVE, buyerObject)];
                    case 9:
                        buyerNotificationInstance = _e.sent();
                        transactionInstances.push(buyerNotificationInstance);
                        return [4 /*yield*/, this.notificationService.create("".concat(buyerObject.username, " just purchased item (\"").concat(boughtItemObject.title, "\") from ").concat(sellerObject.username), notification_enum_1.NotificationCategory.ITEM_BOUGHT, boughtItemObject, notification_enum_1.NotificationForWho.ADMIN, item_enum_1.ItemStatus.BOUGHT, user_enum_1.UserEnvironment.LIVE)];
                    case 10:
                        adminNotificationInstance = _e.sent();
                        transactionInstances.push(adminNotificationInstance);
                        return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances)];
                    case 11:
                        _e.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'item has been purchased successfully',
                                data: { item: boughtItemInstance.model },
                            }];
                    case 12:
                        err_2 = _e.sent();
                        throw new app_exception_1.default(err_2, 'Failed to purchase this item, please try again');
                    case 13: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (itemId, cover, title, description, amount) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var item, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.find(itemId)];
                    case 1:
                        item = _a.sent();
                        if (!cover) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.deleteCover(item)];
                    case 2:
                        _a.sent();
                        item.cover = cover;
                        _a.label = 3;
                    case 3:
                        item.title = title;
                        item.description = description;
                        item.amount = amount;
                        return [4 /*yield*/, item.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'item has been updated successfully',
                                data: { item: item },
                            }];
                    case 5:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Failed to register this item, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updateStatus = function (itemId, status) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var item, oldStatus, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(itemId)];
                    case 1:
                        item = _a.sent();
                        oldStatus = item.status;
                        if (oldStatus === item_enum_1.ItemStatus.SOLD)
                            throw new http_exception_1.default(400, 'Item has already been sold');
                        item.status = status;
                        return [4 /*yield*/, item.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Status updated successfully',
                                data: { item: item },
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to update this item  status, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.feature = function (itemId, featuring) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var item, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(itemId)];
                    case 1:
                        item = _a.sent();
                        item.featured = featuring;
                        if (featuring) {
                            item.dateFeatured = new Date();
                        }
                        else {
                            item.dateFeatured = undefined;
                        }
                        return [4 /*yield*/, item.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: "Item has been ".concat(featuring ? 'featured' : 'unfeatured', " successfully"),
                                data: { item: item },
                            }];
                    case 3:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, "Failed to ".concat(featuring ? 'featured' : 'unfeatured', " this item  status, please try again"));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.recommend = function (itemId, recommended) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var item, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(itemId)];
                    case 1:
                        item = _a.sent();
                        item.recommended = recommended;
                        if (recommended) {
                            item.dateRecommended = new Date();
                        }
                        else {
                            item.dateRecommended = undefined;
                        }
                        return [4 /*yield*/, item.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: "Item has been ".concat(recommended ? 'recommended' : 'unrecommended', " successfully"),
                                data: { item: item },
                            }];
                    case 3:
                        err_6 = _a.sent();
                        throw new app_exception_1.default(err_6, "Failed to ".concat(recommended ? 'recommended' : 'unrecommended', " this item  status, please try again"));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.sell = function (itemId, isAdmin, amount, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var transactionInstances, itemSettings, gasFee, _a, sellItemInstance, sellItemObject, _b, userInstance, userObject, err_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        transactionInstances = [];
                        return [4 /*yield*/, this.itemSettingsService.get()];
                    case 1:
                        itemSettings = _c.sent();
                        gasFee = itemSettings ? itemSettings.fee : 1;
                        return [4 /*yield*/, this._sellTransaction(itemId, amount, isAdmin, userId)];
                    case 2:
                        _a = _c.sent(), sellItemInstance = _a.instance, sellItemObject = _a.object;
                        transactionInstances.push(sellItemInstance);
                        if (!userId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userService.fund(userId, user_enum_1.UserAccount.MAIN_BALANCE, -gasFee, undefined, 'You do not have sufficient funds to pay for gas fee')];
                    case 3:
                        _b = _c.sent(), userInstance = _b.instance, userObject = _b.object;
                        transactionInstances.push(userInstance);
                        _c.label = 4;
                    case 4: return [4 /*yield*/, this.transactionManagerService.execute(transactionInstances)];
                    case 5:
                        _c.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'item has been registered successfully',
                                data: { item: sellItemInstance.model },
                            }];
                    case 6:
                        err_7 = _c.sent();
                        throw new app_exception_1.default(err_7, 'Failed to register this item, please try again');
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (itemId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var item, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(itemId)];
                    case 1:
                        item = _a.sent();
                        this.deleteCover(item);
                        return [4 /*yield*/, this.itemModel.deleteOne({ _id: item._id })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'item deleted successfully',
                                data: { item: item },
                            }];
                    case 3:
                        err_8 = _a.sent();
                        throw new app_exception_1.default(err_8, 'Failed to delete this item, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAll = function (all, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var items, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        items = void 0;
                        if (!all) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.itemModel
                                .find()
                                .sort({ dateOwned: -1 })
                                .select('-userObject')
                                .populate('user', 'username profile name isDeleted')];
                    case 1:
                        items = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.itemModel
                            .find({ user: userId })
                            .sort({ dateOwned: -1 })
                            .select('-userObject')
                            .populate('user', 'username profile name isDeleted')];
                    case 3:
                        items = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'item history fetched successfully',
                            data: { items: items },
                        }];
                    case 5:
                        err_9 = _a.sent();
                        throw new app_exception_1.default(err_9, 'Failed to fetch item history, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    ItemService_1 = ItemService;
    ItemService.prototype.find = function (itemId, fromAllAccounts, userId) {
        if (fromAllAccounts === void 0) { fromAllAccounts = true; }
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fromAllAccounts) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.itemModel
                                .findById(itemId)
                                .select('-userObject')
                                .populate('user', 'username profile name isDeleted')];
                    case 1:
                        item = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.itemModel
                            .findOne({
                            _id: itemId,
                            user: userId,
                        })
                            .select('-userObject')
                            .populate('user', 'username profile name isDeleted')];
                    case 3:
                        item = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!item)
                            throw new http_exception_1.default(404, 'item not found');
                        return [2 /*return*/, item];
                }
            });
        });
    };
    ItemService.prototype.deleteCover = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var itemHasClonedCover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.itemModel
                            .count({ firstOne: item.firstOne, cover: item.cover })
                            .exec()];
                    case 1:
                        itemHasClonedCover = (_a.sent()) > 1;
                        if (!itemHasClonedCover)
                            this.imageUploader.delete('item', item.cover, ItemService_1.itemImageSizes);
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemService.prototype.get = function (itemId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(itemId)];
                    case 1: return [2 /*return*/, (_a.sent()).toObject({ getters: true })];
                }
            });
        });
    };
    ItemService.prototype._createTransaction = function (user, seller, buyer, cover, title, description, status, amount, gasFee, ownership, firstOne) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var item;
            return __generator(this, function (_a) {
                item = new this.itemModel({
                    user: user._id,
                    userObject: user,
                    seller: seller._id,
                    sellerObject: seller,
                    buyer: buyer._id,
                    buyerObject: buyer,
                    title: title,
                    cover: cover,
                    description: description,
                    purchasedAmount: amount,
                    amount: amount,
                    gasFee: gasFee,
                    status: status,
                    ownership: ownership,
                    dateOwned: new Date(),
                });
                item.firstOne = firstOne ? firstOne : item._id;
                return [2 /*return*/, {
                        object: item.toObject({ getters: true }),
                        instance: {
                            model: item,
                            onFailed: "Delete the item with an id of (".concat(item._id, ")"),
                            callback: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, item.deleteOne()];
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
    ItemService.prototype._purchaseTransaction = function (itemId, buyerObject) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var item, oldBuyer, oldBuyerObject, oldStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(itemId)];
                    case 1:
                        item = _a.sent();
                        oldBuyer = item.buyer;
                        oldBuyerObject = JSON.parse(JSON.stringify(item.buyerObject));
                        oldStatus = item.status;
                        if (oldStatus === item_enum_1.ItemStatus.SOLD)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.BAD_REQUEST, 'Item has already been sold');
                        item.buyer = buyerObject._id;
                        item.buyerObject = buyerObject;
                        item.status = item_enum_1.ItemStatus.SOLD;
                        return [2 /*return*/, {
                                object: item.toObject({ getters: true }),
                                instance: {
                                    model: item,
                                    onFailed: "working on",
                                    callback: function () {
                                        return __awaiter(this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        item.buyer = oldBuyer;
                                                        item.buyerObject = oldBuyerObject;
                                                        item.status = oldStatus;
                                                        return [4 /*yield*/, item.save()];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        });
                                    },
                                },
                            }];
                }
            });
        });
    };
    ItemService.prototype._sellTransaction = function (itemId, amount, isAdmin, userId) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var item, oldStatus, oldAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(itemId, isAdmin, userId)];
                    case 1:
                        item = _a.sent();
                        oldStatus = item.status;
                        oldAmount = item.amount;
                        if (oldStatus === item_enum_1.ItemStatus.ON_SALE)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.BAD_REQUEST, 'Item is already on sale');
                        item.amount = amount;
                        item.status = item_enum_1.ItemStatus.ON_SALE;
                        return [2 /*return*/, {
                                object: item.toObject({ getters: true }),
                                instance: {
                                    model: item,
                                    onFailed: "working on",
                                    callback: function () {
                                        return __awaiter(this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        item.status = oldStatus;
                                                        item.amount = oldAmount;
                                                        return [4 /*yield*/, item.save()];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        });
                                    },
                                },
                            }];
                }
            });
        });
    };
    var ItemService_1;
    ItemService.itemImageSizes = [
        imageUploader_enum_1.ImageUploaderSizes.ITEM_VIEW,
        imageUploader_enum_1.ImageUploaderSizes.ITEM_COVER,
        imageUploader_enum_1.ImageUploaderSizes.ITEM_HERO,
        imageUploader_enum_1.ImageUploaderSizes.ITEM_PROFILE,
    ];
    ItemService = ItemService_1 = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.ITEM_SETTINGS_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.NOTIFICATION_SERVICE)),
        __param(4, (0, typedi_1.Inject)(serviceToken_1.default.REFERRAL_SERVICE)),
        __param(5, (0, typedi_1.Inject)(serviceToken_1.default.MATH_SERVICE)),
        __param(6, (0, typedi_1.Inject)(serviceToken_1.default.TRANSACTION_MANAGER_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
    ], ItemService);
    return ItemService;
}());
exports.default = ItemService;
