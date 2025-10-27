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
var notification_model_1 = __importDefault(require("@/modules/notification/notification.model"));
var notification_enum_1 = require("@/modules/notification/notification.enum");
var http_type_1 = require("@/modules/http/http.type");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_enum_1 = require("@/modules/http/http.enum");
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var transactionManager_type_1 = require("@/modules/transactionManager/transactionManager.type");
var user_model_1 = __importDefault(require("../user/user.model"));
var NotificationService = /** @class */ (function () {
    function NotificationService() {
        var _this = this;
        this.notificationModel = notification_model_1.default;
        this.userModel = user_model_1.default;
        this.find = function (notificationId, fromAllAccounts, userId) {
            if (fromAllAccounts === void 0) { fromAllAccounts = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var notification;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!fromAllAccounts) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.notificationModel.findById(notificationId)];
                        case 1:
                            notification = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.notificationModel.findOne({
                                _id: notificationId,
                                user: userId,
                            })];
                        case 3:
                            notification = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!notification)
                                throw new http_exception_1.default(404, 'Notification not found');
                            return [2 /*return*/, notification];
                    }
                });
            });
        };
        this.delete = function (fromAllAccounts, notificationId, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var notification, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(notificationId, fromAllAccounts, userId)];
                    case 1:
                        notification = _a.sent();
                        return [4 /*yield*/, notification.deleteOne()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Notification deleted successfully',
                                data: { notification: notification },
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, 'Failed to delete notification, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.read = function (notificationId, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var notification, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(notificationId, false, userId)];
                    case 1:
                        notification = _a.sent();
                        notification.read = true;
                        return [4 /*yield*/, notification.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Notification has been read successfully',
                                data: { notification: notification },
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Failed to read notification, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.fetch = function (fromAllAccounts, notificationId, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var notification, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.find(notificationId, fromAllAccounts, userId)];
                    case 1:
                        notification = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Notification fetched successfully',
                                data: { notification: notification },
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Failed to fetch notification, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAll = function (fromAllAccounts, environment, forWho, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var notifications, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        notifications = void 0;
                        if (!(fromAllAccounts && forWho === notification_enum_1.NotificationForWho.USER)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.notificationModel
                                .find({ environment: environment, forWho: forWho })
                                .sort({ createdAt: -1 })
                                .select('-userObject -categoryObject')
                                .populate('user', 'username isDeleted')];
                    case 1:
                        notifications = _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!fromAllAccounts) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.notificationModel
                                .find({ environment: environment, forWho: forWho })
                                .sort({ createdAt: -1 })
                                .select('-userObject -categoryObject')];
                    case 3:
                        notifications = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.notificationModel
                            .find({ environment: environment, forWho: forWho, user: userId })
                            .sort({ createdAt: -1 })
                            .select('-userObject -categoryObject')];
                    case 5:
                        notifications = _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Notifications fetched successfully',
                            data: { notifications: notifications },
                        }];
                    case 7:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to fetch notifications, please try again');
                    case 8: return [2 /*return*/];
                }
            });
        }); };
    }
    NotificationService.prototype._createTransaction = function (message, categoryName, categoryObject, forWho, status, environment, user) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var notification_1;
            return __generator(this, function (_a) {
                try {
                    notification_1 = new this.notificationModel({
                        user: user ? user._id : undefined,
                        userObject: user,
                        message: message,
                        categoryName: categoryName,
                        category: categoryObject._id,
                        categoryObject: categoryObject,
                        forWho: forWho,
                        status: status,
                        environment: environment,
                    });
                    return [2 /*return*/, {
                            object: notification_1.toObject({ getters: true }),
                            instance: {
                                model: notification_1,
                                onFailed: "Delete the notification with an id of (".concat(notification_1._id, ")"),
                                callback: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, notification_1.deleteOne()];
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
                catch (err) {
                    throw new app_exception_1.default(err, 'Unable to send notification, please try again');
                }
                return [2 /*return*/];
            });
        });
    };
    NotificationService.prototype.create = function (message, categoryName, categoryObject, forWho, status, environment, user) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (forWho === notification_enum_1.NotificationForWho.USER && !user)
                            throw new Error('User object must be provided when forWho is equal to user');
                        return [4 /*yield*/, this._createTransaction(message, categoryName, categoryObject, forWho, status, environment, user)];
                    case 1:
                        instance = (_a.sent()).instance;
                        return [2 /*return*/, instance];
                    case 2:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Failed to send notification, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService = __decorate([
        (0, typedi_1.Service)()
    ], NotificationService);
    return NotificationService;
}());
exports.default = NotificationService;
