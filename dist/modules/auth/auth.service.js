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
var user_model_1 = __importDefault(require("@/modules/user/user.model"));
var typedi_1 = require("typedi");
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var activity_enum_1 = require("@/modules/activity/activity.enum");
var user_enum_1 = require("@/modules/user/user.enum");
var http_type_1 = require("@/modules/http/http.type");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_enum_1 = require("@/modules/http/http.enum");
var encryption_1 = __importDefault(require("@/utils/encryption"));
var renderFile_1 = __importDefault(require("@/utils/renderFile"));
var parseString_1 = __importDefault(require("@/utils/parsers/parseString"));
var config_constants_1 = require("@/modules/config/config.constants");
var formatString_1 = __importDefault(require("@/utils/formats/formatString"));
var app_crypto_1 = __importDefault(require("../app/app.crypto"));
var errorCodes_enum_1 = require("@/utils/enums/errorCodes.enum");
var AuthService = /** @class */ (function () {
    function AuthService(mailService, emailVerificationService, resetPasswordService, activityService) {
        var _this = this;
        this.mailService = mailService;
        this.emailVerificationService = emailVerificationService;
        this.resetPasswordService = resetPasswordService;
        this.activityService = activityService;
        this.userModel = user_model_1.default;
        this.emailVerification = function (user) { return __awaiter(_this, void 0, http_type_1.THttpResponse, function () {
            var verifyLink, username, email, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.emailVerificationService.create(user)];
                    case 1:
                        verifyLink = _a.sent();
                        console.log('verifyLink:', verifyLink);
                        username = user.username;
                        email = user.email;
                        return [4 /*yield*/, this.sendEmailVerificationMail(email, username, verifyLink)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.INFO,
                                message: 'A verification link has been sent to your email address',
                                data: { email: formatString_1.default.mask(email, 2, 3) },
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new app_exception_1.default(err_1, 'Unable to send verification email, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    AuthService.prototype.register = function (name, email, username, password, walletPhrase, role, status, mainBalance, referralBalance, demoBalance, bonusBalance, country, invite) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var referred, refer, emailExist, usernameExist, key, user, _a, _b, err_2;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, , 9]);
                        referred = void 0;
                        if (!invite) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userModel.findOne({ refer: invite })];
                    case 1:
                        referred = _d.sent();
                        if (!referred)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.BAD_REQUEST, 'Invalid referral code');
                        _d.label = 2;
                    case 2:
                        refer = app_crypto_1.default.generateCode({ length: 10 })[0];
                        return [4 /*yield*/, this.userModel.findOne({ email: email })];
                    case 3:
                        emailExist = _d.sent();
                        if (emailExist)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.REQUEST_CONFLICT, 'Email already exist');
                        return [4 /*yield*/, this.userModel.findOne({ username: username })];
                    case 4:
                        usernameExist = _d.sent();
                        if (usernameExist)
                            throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.REQUEST_CONFLICT, 'Username already exist');
                        key = app_crypto_1.default.randomBytes(16).toString('hex');
                        _b = (_a = this.userModel).create;
                        _c = {
                            name: name,
                            email: email,
                            username: username,
                            country: country
                        };
                        return [4 /*yield*/, app_crypto_1.default.setHash(password)];
                    case 5: return [4 /*yield*/, _b.apply(_a, [(_c.password = _d.sent(),
                                _c.walletPhrase = walletPhrase,
                                _c.role = role,
                                _c.status = status,
                                _c.refer = refer,
                                _c.mainBalance = mainBalance,
                                _c.referralBalance = referralBalance,
                                _c.demoBalance = demoBalance,
                                _c.bonusBalance = bonusBalance,
                                _c.referred = referred === null || referred === void 0 ? void 0 : referred._id,
                                _c.key = key,
                                _c.verifield = false,
                                _c.isDeleted = false,
                                _c)])];
                    case 6:
                        user = _d.sent();
                        this.activityService.set(user.toObject({ getters: true }), activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'your account was created');
                        return [4 /*yield*/, this.emailVerification(user)];
                    case 7:
                        _d.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.INFO,
                                message: 'A verification link has been sent to your email address',
                                data: { user: user },
                            }];
                    case 8:
                        err_2 = _d.sent();
                        throw new app_exception_1.default(err_2, 'Unable to register, please try again');
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.login = function (account, password) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var user, accessToken, expiresIn, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userModel.findOne({
                                $or: [{ email: account }, { username: account }],
                            })];
                    case 1:
                        user = _a.sent();
                        console.log(password);
                        if (!user)
                            throw new http_exception_1.default(404, 'Could not find a user with that Email or Username');
                        return [4 /*yield*/, app_crypto_1.default.isValidHash(password, user.password)];
                    case 2:
                        if (!(_a.sent()))
                            throw new http_exception_1.default(400, 'Incorrect password');
                        if (user.status !== user_enum_1.UserStatus.ACTIVE) {
                            throw new http_exception_1.default(403, 'Your account is under review, please check in later', http_enum_1.HttpResponseStatus.INFO);
                        }
                        if (user.verifield) {
                            this.activityService.set(user.toObject({ getters: true }), activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'you logged in to your account');
                            accessToken = encryption_1.default.createToken(user);
                            expiresIn = 1000 * 60 * 60 * 24 + new Date().getTime();
                            return [2 /*return*/, {
                                    status: http_enum_1.HttpResponseStatus.SUCCESS,
                                    message: 'Login successful',
                                    data: { accessToken: accessToken, expiresIn: expiresIn },
                                }];
                        }
                        return [4 /*yield*/, this.emailVerification(user)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        err_3 = _a.sent();
                        throw new app_exception_1.default(err_3, 'Unable to login, please try again');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.updatePassword = function (userId, password, oldPassword) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var user, _a, _b, err_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.userModel.findById(userId)];
                    case 1:
                        user = _c.sent();
                        if (!user)
                            throw new http_exception_1.default(404, 'User not found');
                        _a = oldPassword;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, app_crypto_1.default.isValidHash(oldPassword, user.password)];
                    case 2:
                        _a = !(_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_a)
                            throw new http_exception_1.default(400, 'Incorrect password');
                        if (!oldPassword && user.role >= user_enum_1.UserRole.ADMIN)
                            throw new http_exception_1.default(409, 'This action can not be performed on an admin');
                        _b = user;
                        return [4 /*yield*/, app_crypto_1.default.setHash(password)];
                    case 4:
                        _b.password = _c.sent();
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _c.sent();
                        this.activityService.set(user.toObject({ getters: true }), activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'you updated your password');
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Password updated successfully',
                                data: { user: user },
                            }];
                    case 6:
                        err_4 = _c.sent();
                        throw new app_exception_1.default(err_4, 'Unable to update password, please try again');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.verifyUser = function (userId) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var user, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userModel.findById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new http_exception_1.default(404, 'User not found');
                        user.verifield = true;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'User has been verifield successfully',
                                data: { user: user },
                            }];
                    case 3:
                        err_5 = _a.sent();
                        throw new app_exception_1.default(err_5, 'Unable to verify user, please try again');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.forgetPassword = function (account) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var user, resetLink, username, email, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userModel.findOne({
                                $or: [{ email: account }, { username: account }],
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new http_exception_1.default(404, 'Could not find a user with that Email or Username');
                        return [4 /*yield*/, this.resetPasswordService.create(user)];
                    case 2:
                        resetLink = _a.sent();
                        console.log('resetLink:', resetLink);
                        username = user.username;
                        email = user.email;
                        return [4 /*yield*/, this.sendResetPasswordMail(email, username, resetLink)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.INFO,
                                message: 'A reset password link has been sent to your email address',
                                data: { email: formatString_1.default.mask(email, 2, 3) },
                            }];
                    case 4:
                        err_6 = _a.sent();
                        throw new app_exception_1.default(err_6, 'Unable to reset password, please try again');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.resetPassword = function (key, verifyToken, password) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var user, _a, err_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.resetPasswordService.verify(key, verifyToken)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.userModel.findOne({ key: key }).select('-password')];
                    case 2:
                        user = _b.sent();
                        if (!user)
                            throw new http_exception_1.default(404, 'User not found');
                        _a = user;
                        return [4 /*yield*/, app_crypto_1.default.setHash(password)];
                    case 3:
                        _a.password = _b.sent();
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _b.sent();
                        this.activityService.set(user.toObject({ getters: true }), activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'you reset your password');
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Password updated successfully',
                                data: undefined,
                            }];
                    case 5:
                        err_7 = _b.sent();
                        throw new app_exception_1.default(err_7, 'Unable to update password, please try again');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.verifyEmail = function (key, verifyToken) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var user, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.emailVerificationService.verify(key, verifyToken)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userModel.findOne({ key: key })];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            throw new http_exception_1.default(404, 'User not found');
                        user.verifield = true;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        this.sendWelcomeMail(user);
                        this.activityService.set(user.toObject({ getters: true }), activity_enum_1.ActivityForWho.USER, activity_enum_1.ActivityCategory.PROFILE, 'you verifield your email address');
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: 'Email successfully verifield',
                            }];
                    case 4:
                        err_8 = _a.sent();
                        throw new app_exception_1.default(err_8, 'Unable to verify email, please try again');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.sendWelcomeMail = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var name_1, btnLink, siteName, subject, emailContent, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        name_1 = formatString_1.default.toTitleCase(user.name);
                        btnLink = "".concat(config_constants_1.SiteConstants.frontendLink);
                        siteName = config_constants_1.SiteConstants.siteName;
                        subject = "Welcome to ".concat(siteName, " Marketplace!");
                        return [4 /*yield*/, (0, renderFile_1.default)('email/welcome', {
                                btnLink: btnLink,
                                name: name_1,
                                siteName: siteName,
                                config: config_constants_1.SiteConstants,
                            })];
                    case 1:
                        emailContent = _a.sent();
                        this.mailService.sendMail({
                            subject: subject,
                            to: user.email,
                            text: parseString_1.default.clearHtml(emailContent),
                            html: emailContent,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_9 = _a.sent();
                        throw new app_exception_1.default(err_9, 'Failed to send email, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.sendResetPasswordMail = function (email, username, resetLink) {
        return __awaiter(this, void 0, void 0, function () {
            var subject, emailContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subject = 'Reset Password';
                        return [4 /*yield*/, (0, renderFile_1.default)('email/resetPassword', {
                                resetLink: resetLink,
                                username: username,
                                config: config_constants_1.SiteConstants,
                            })];
                    case 1:
                        emailContent = _a.sent();
                        this.mailService.sendMail({
                            subject: subject,
                            to: email,
                            text: parseString_1.default.clearHtml(emailContent),
                            html: emailContent,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.sendEmailVerificationMail = function (email, username, verifyLink) {
        return __awaiter(this, void 0, void 0, function () {
            var subject, emailContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subject = 'Please verify your email';
                        return [4 /*yield*/, (0, renderFile_1.default)('email/verifyEmail', {
                                verifyLink: verifyLink,
                                username: username,
                                subject: subject,
                                config: config_constants_1.SiteConstants,
                            })];
                    case 1:
                        emailContent = _a.sent();
                        this.mailService.sendMail({
                            subject: subject,
                            to: email,
                            text: parseString_1.default.clearHtml(emailContent),
                            html: emailContent,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.MAIL_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.EMAIL_VERIFICATION_SERVICE)),
        __param(2, (0, typedi_1.Inject)(serviceToken_1.default.RESET_PASSWORD_SERVICE)),
        __param(3, (0, typedi_1.Inject)(serviceToken_1.default.ACTIVITY_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], AuthService);
    return AuthService;
}());
exports.default = AuthService;
