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
var user_enum_1 = require("@/modules/user/user.enum");
var activity_enum_1 = require("@/modules/activity/activity.enum");
var typedi_1 = require("typedi");
var activity_model_1 = __importDefault(require("@/modules/activity/activity.model"));
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_type_1 = require("@/modules/http/http.type");
var http_enum_1 = require("@/modules/http/http.enum");
var user_model_1 = __importDefault(require("../user/user.model"));
var ActivityService = /** @class */ (function () {
    function ActivityService() {
        var _this = this;
        this.activityModel = activity_model_1.default;
        this.userModel = user_model_1.default;
        this.fetchAll = function (accessBy, forWho, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var activities, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        activities = void 0;
                        if (!(accessBy >= user_enum_1.UserRole.ADMIN && userId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.activityModel
                                .find({
                                user: userId,
                                forWho: forWho,
                            })
                                .select('-userObject')
                                .populate('user', 'username isDeleted')];
                    case 1:
                        activities = _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(accessBy >= user_enum_1.UserRole.ADMIN && !userId)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.activityModel
                                .find({ forWho: forWho })
                                .select('-userObject')
                                .populate('user', 'username isDeleted')];
                    case 3:
                        activities = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.activityModel
                            .find({
                            user: userId,
                            forWho: forWho,
                            status: activity_enum_1.ActivityStatus.VISIBLE,
                        })
                            .select('-userObject')
                            .populate('user', 'username isDeleted')];
                    case 5:
                        activities = _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Activities fetched successfully',
                            data: { activities: activities },
                        }];
                    case 7:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, 'Failed to fetch activities, please try again');
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.hide = function (userId, activityId, forWho) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var activity, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.activityModel.findOne({
                                _id: activityId,
                                user: userId,
                                status: activity_enum_1.ActivityStatus.VISIBLE,
                                forWho: forWho,
                            })];
                    case 1:
                        activity = _a.sent();
                        if (!activity)
                            throw new http_exception_1.default(404, 'Activity not found');
                        activity.status = activity_enum_1.ActivityStatus.HIDDEN;
                        return [4 /*yield*/, activity.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Activity log deleted successfully',
                                data: { activity: activity },
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Failed to delete activity log, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.hideAll = function (userId, forWho) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var activities, _i, activities_1, activity, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.activityModel.find({
                                user: userId,
                                status: activity_enum_1.ActivityStatus.VISIBLE,
                                forWho: forWho,
                            })];
                    case 1:
                        activities = _a.sent();
                        if (!activities.length)
                            throw new http_exception_1.default(404, 'No Activity log found');
                        _i = 0, activities_1 = activities;
                        _a.label = 2;
                    case 2:
                        if (!(_i < activities_1.length)) return [3 /*break*/, 5];
                        activity = activities_1[_i];
                        activity.status = activity_enum_1.ActivityStatus.HIDDEN;
                        return [4 /*yield*/, activity.save()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Activity logs deleted successfully',
                        }];
                    case 6:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Failed to delete activity logs, please try again');
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (activityId, forWho, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var activity, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        activity = void 0;
                        if (!userId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.activityModel.findOne({
                                _id: activityId,
                                forWho: forWho,
                                user: userId,
                            })];
                    case 1:
                        activity = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.activityModel.findOne({
                            _id: activityId,
                            forWho: forWho,
                        })];
                    case 3:
                        activity = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!activity)
                            throw new http_exception_1.default(404, 'Activity not found');
                        return [4 /*yield*/, this.activityModel.deleteOne({ _id: activity._id })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Activity log deleted successfully',
                                data: { activity: activity },
                            }];
                    case 6:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Failed to delete activities log, please try again');
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.deleteAll = function (fromAllAccounts, forWho, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var activities, _i, activities_2, activity, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        activities = void 0;
                        if (!fromAllAccounts) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.activityModel.find({ forWho: forWho })];
                    case 1:
                        activities = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.activityModel.find({ forWho: forWho, user: userId })];
                    case 3:
                        activities = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!activities.length)
                            throw new http_exception_1.default(404, 'No Activity found');
                        _i = 0, activities_2 = activities;
                        _a.label = 5;
                    case 5:
                        if (!(_i < activities_2.length)) return [3 /*break*/, 8];
                        activity = activities_2[_i];
                        return [4 /*yield*/, this.activityModel.deleteOne({ _id: activity._id })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Activity logs deleted successfully',
                        }];
                    case 9:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Failed to delete activities log, please try again');
                    case 10: return [2 /*return*/];
                }
            });
        }); };
    }
    ActivityService.prototype.set = function (user, forWho, category, message) {
        return __awaiter(this, void 0, void 0, function () {
            var activity, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.activityModel.create({
                                user: user._id,
                                userObject: user,
                                category: category,
                                message: message,
                                forWho: forWho,
                            })];
                    case 1:
                        activity = _a.sent();
                        return [2 /*return*/, activity];
                    case 2:
                        err_6 = _a.sent();
                        throw new app_exception_1.default(err_6, 'Failed to register activity, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ActivityService = __decorate([
        (0, typedi_1.Service)()
    ], ActivityService);
    return ActivityService;
}());
exports.default = ActivityService;
