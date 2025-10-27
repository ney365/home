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
var activity_model_1 = __importDefault(require("@/modules/activity/activity.model"));
var user_model_1 = __importDefault(require("@/modules/user/user.model"));
var user_enum_1 = require("@/modules/user/user.enum");
var typedi_1 = require("typedi");
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var activity_enum_1 = require("@/modules/activity/activity.enum");
var transactionManager_type_1 = require("@/modules/transactionManager/transactionManager.type");
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_type_1 = require("@/modules/http/http.type");
var http_enum_1 = require("@/modules/http/http.enum");
var formatNumber_1 = __importDefault(require("@/utils/formats/formatNumber"));
var formatString_1 = __importDefault(require("@/utils/formats/formatString"));
var parseString_1 = __importDefault(require("@/utils/parsers/parseString"));
var renderFile_1 = __importDefault(require("@/utils/renderFile"));
var mailOption_enum_1 = require("@/modules/mailOption/mailOption.enum");
var notification_model_1 = __importDefault(require("@/modules/notification/notification.model"));
var config_constants_1 = require("@/modules/config/config.constants");
var mongoose_1 = require("mongoose");
var errorCodes_enum_1 = require("@/utils/enums/errorCodes.enum");
var imageUploader_1 = __importDefault(require("../imageUploader/imageUploader"));
var imageUploader_enum_1 = require("../imageUploader/imageUploader.enum");
var item_model_1 = __importDefault(require("../item/item.model"));
var deposit_model_1 = __importDefault(require("../deposit/deposit.model"));
var withdrawal_model_1 = __importDefault(require("../withdrawal/withdrawal.model"));
var UserService = /** @class */ (function () {
    function UserService(activityService, mailService) {
        var _this = this;
        this.activityService = activityService;
        this.mailService = mailService;
        this.userModel = user_model_1.default;
        this.notificationModel = notification_model_1.default;
        this.activityModel = activity_model_1.default;
        this.itemModel = item_model_1.default;
        this.depositModel = deposit_model_1.default;
        this.withdrawalModel = withdrawal_model_1.default;
        this.imageUploader = new imageUploader_1.default();
        this.setFund = function (user, account, amount, insufficentFundErrorMessage) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (isNaN(amount) || amount === 0)
                    throw new http_exception_1.default(400, 'Invalid amount');
                if (!Object.values(user_enum_1.UserAccount).includes(account))
                    throw new http_exception_1.default(400, 'Invalid account');
                user[account] += +amount;
                if (user[account] < 0)
                    throw new http_exception_1.default(400, insufficentFundErrorMessage ||
                        "insufficient balance in ".concat(formatString_1.default.fromCamelToTitleCase(account), " Account"));
                return [2 /*return*/, user];
            });
        }); };
        this.fund = function (userIdOrUsername, account, amount, notFoundErrorMessage, insufficentFundErrorMessage) { return __awaiter(_this, void 0, transactionManager_type_1.TTransaction, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fundTransaction(userIdOrUsername, account, amount, notFoundErrorMessage, insufficentFundErrorMessage)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.forceFund = function (userId, account, amount) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var user, fundedUser, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.find(userId)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.setFund(user, account, amount)];
                    case 2:
                        fundedUser = _a.sent();
                        return [4 /*yield*/, fundedUser.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: "User has been ".concat(amount > 0 ? 'credited' : 'debited', " successfully"),
                                data: { user: fundedUser.toObject() },
                            }];
                    case 4:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, "Unable to ".concat(amount > 0 ? 'credit' : 'debit', " user, please try again"));
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAll = function () { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var users, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userModel
                                .find({ role: user_enum_1.UserRole.USER })
                                .sort({ createdAt: -1 })
                                .select('-password')];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Users fetched',
                                data: {
                                    users: users,
                                },
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new app_exception_1.default(err_2, 'Unable to get users, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.creators = function () { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var creators, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userModel
                                .find({ role: user_enum_1.UserRole.USER, status: user_enum_1.UserStatus.ACTIVE })
                                .select('-password')];
                    case 1:
                        creators = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Creators fetched',
                                data: {
                                    creators: creators,
                                },
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Unable to get users, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.get = function (userIdOrUsername, errorMessage) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(userIdOrUsername, errorMessage)];
                    case 1: return [2 /*return*/, (_a.sent()).toObject()];
                }
            });
        }); };
        this.fetch = function (userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.find(userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'User fetched',
                                data: { user: user },
                            }];
                    case 2:
                        err_4 = _a.sent();
                        throw new app_exception_1.default(err_4, 'Unable to get user, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateProfile = function (userId, name, username, bio) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var usernameExist, user, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userModel.findOne({
                                username: username,
                                _id: { $ne: userId },
                            })];
                    case 1:
                        usernameExist = _a.sent();
                        if (usernameExist)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.REQUEST_CONFLICT, 'Username already exist');
                        return [4 /*yield*/, this.find(userId)];
                    case 2:
                        user = _a.sent();
                        user.name = name;
                        user.username = username;
                        user.bio = bio;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        this.activityService.set(user.toObject(), activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'You updated your profile details');
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Profile updated successfully',
                                data: { user: user },
                            }];
                    case 4:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Unable to update profile, please try again');
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.updateProfileImages = function (userId, profile, cover) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var user, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(userId)];
                    case 1:
                        user = _a.sent();
                        if (profile) {
                            this.imageUploader.delete('profile', profile, UserService_1.coverImageSizes);
                            if (user.profile) {
                                this.imageUploader.delete('profile', user.profile, UserService_1.profileImageSizes);
                            }
                            user.profile = profile;
                        }
                        if (cover) {
                            this.imageUploader.delete('cover', cover, UserService_1.profileImageSizes);
                            if (user.cover) {
                                this.imageUploader.delete('cover', user.cover, UserService_1.coverImageSizes);
                            }
                            user.cover = cover;
                        }
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        this.activityService.set(user.toObject(), activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'You updated your profile details');
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Profile updated successfully',
                                data: { user: user },
                            }];
                    case 3:
                        err_6 = _a.sent();
                        throw new app_exception_1.default(err_6, 'Unable to update profile, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateEmail = function (userId, email) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var emailExist, user, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userModel.findOne({
                                email: email,
                                _id: { $ne: userId },
                            })];
                    case 1:
                        emailExist = _a.sent();
                        if (emailExist)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.REQUEST_CONFLICT, 'Email already exist');
                        return [4 /*yield*/, this.find(userId)];
                    case 2:
                        user = _a.sent();
                        user.email = email;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        this.activityService.set(user.toObject(), activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'Your updated your email address');
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Email updated successfully',
                                data: { user: user },
                            }];
                    case 4:
                        err_7 = _a.sent();
                        throw new app_exception_1.default(err_7, 'Unable to update email, please try again');
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.updateStatus = function (userId, status) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var user, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!userId)
                            throw new http_exception_1.default(404, 'User not found');
                        return [4 /*yield*/, this.find(userId)];
                    case 1:
                        user = _a.sent();
                        if (user.role >= user_enum_1.UserRole.ADMIN && status === user_enum_1.UserStatus.SUSPENDED)
                            throw new http_exception_1.default(400, 'Users with admin role can not be suspended');
                        user.status = status;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Status updated successfully',
                                data: { user: user },
                            }];
                    case 3:
                        err_8 = _a.sent();
                        throw new app_exception_1.default(err_8, 'Unable to update user status, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var user, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(userId)];
                    case 1:
                        user = _a.sent();
                        if (user.role >= user_enum_1.UserRole.ADMIN)
                            throw new http_exception_1.default(400, 'Users with admin role can not be deleted');
                        if (user.profile) {
                            this.imageUploader.delete('profile', user.profile, UserService_1.profileImageSizes);
                        }
                        if (user.cover) {
                            this.imageUploader.delete('cover', user.cover, UserService_1.coverImageSizes);
                        }
                        return [4 /*yield*/, this.userModel.deleteOne({ _id: userId })];
                    case 2:
                        _a.sent();
                        this.itemModel.deleteMany({ user: userId });
                        this.depositModel.deleteMany({ user: userId });
                        this.withdrawalModel.deleteMany({ user: userId });
                        this.notificationModel.deleteMany({ user: userId });
                        this.activityModel.deleteMany({ user: userId });
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'User deleted successfully',
                                data: { user: user },
                            }];
                    case 3:
                        err_9 = _a.sent();
                        throw new app_exception_1.default(err_9, 'Unable to delete user, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getReferredUsers = function (getAll, userId) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var users, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        users = [];
                        if (!!getAll) return [3 /*break*/, 3];
                        if (!userId)
                            throw new http_exception_1.default(404, 'User not specifield');
                        return [4 /*yield*/, this.find(userId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userModel
                                .find({
                                referred: userId,
                            })
                                .select('-password')];
                    case 2:
                        users = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.userModel
                            .find({ referred: { $exists: true } })
                            .select('-password')];
                    case 4:
                        users = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: "Referred users fetched successfully",
                            data: { users: users },
                        }];
                    case 6:
                        err_10 = _a.sent();
                        throw new app_exception_1.default(err_10, 'Unable to get referred users, please try again');
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    UserService_1 = UserService;
    UserService.prototype.find = function (userIdOrUsername, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel
                            .findOne({ username: userIdOrUsername })
                            .select('-password')];
                    case 1:
                        user = _a.sent();
                        if (!(!user && (0, mongoose_1.isValidObjectId)(userIdOrUsername))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userModel.findById(userIdOrUsername).select('-password')];
                    case 2:
                        user = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!user)
                            throw new http_exception_1.default(404, errorMessage || 'User not found');
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype._fundTransaction = function (userIdOrUsername, account, amount, notFoundErrorMessage, insufficentFundErrorMessage) {
        return __awaiter(this, void 0, transactionManager_type_1.TTransaction, function () {
            var user, fundedUser, onFailed;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(userIdOrUsername, notFoundErrorMessage)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.setFund(user, account, amount, insufficentFundErrorMessage)];
                    case 2:
                        fundedUser = _a.sent();
                        onFailed = "".concat(amount > 0 ? 'substract' : 'add', " ").concat(amount > 0
                            ? formatNumber_1.default.toDollar(amount)
                            : formatNumber_1.default.toDollar(-amount), " ").concat(amount > 0 ? 'from' : 'to', " the ").concat(formatString_1.default.fromCamelToTitleCase(account), " of the user with an id of (").concat(fundedUser._id, ")");
                        return [2 /*return*/, {
                                object: user.toObject({ getters: true }),
                                instance: {
                                    model: user,
                                    onFailed: onFailed,
                                    callback: function () { return __awaiter(_this, void 0, void 0, function () {
                                        var user;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.setFund(fundedUser, account, -amount)];
                                                case 1:
                                                    user = _a.sent();
                                                    return [4 /*yield*/, user.save()];
                                                case 2:
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
    UserService.prototype.sendEmail = function (userId, subject, heading, content) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var user, emailContent, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.find(userId)];
                    case 1:
                        user = _a.sent();
                        this.mailService.setSender(mailOption_enum_1.MailOptionName.TEST);
                        return [4 /*yield*/, (0, renderFile_1.default)('email/custom', {
                                heading: heading,
                                content: content,
                                config: config_constants_1.SiteConstants,
                            })];
                    case 2:
                        emailContent = _a.sent();
                        this.mailService.sendMail({
                            subject: subject,
                            to: user.email,
                            text: parseString_1.default.clearHtml(emailContent),
                            html: emailContent,
                        });
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: "Email has been sent successfully",
                            }];
                    case 3:
                        err_11 = _a.sent();
                        throw new app_exception_1.default(err_11, 'Unable to send email, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var UserService_1;
    UserService.profileImageSizes = [
        imageUploader_enum_1.ImageUploaderSizes.PROFILE_CARD,
        imageUploader_enum_1.ImageUploaderSizes.PROFILE_ICON,
        imageUploader_enum_1.ImageUploaderSizes.PROFILE_MAIN,
        imageUploader_enum_1.ImageUploaderSizes.PROFILE_NAV,
    ];
    UserService.coverImageSizes = [
        imageUploader_enum_1.ImageUploaderSizes.COVER_MAIN,
        imageUploader_enum_1.ImageUploaderSizes.COVER_MENU,
        imageUploader_enum_1.ImageUploaderSizes.COVER_CARD,
        imageUploader_enum_1.ImageUploaderSizes.COVER_PROFILE,
    ];
    UserService = UserService_1 = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.ACTIVITY_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.MAIL_SERVICE)),
        __metadata("design:paramtypes", [Object, Object])
    ], UserService);
    return UserService;
}());
exports.default = UserService;
