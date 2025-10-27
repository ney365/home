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
var express_1 = require("express");
var typedi_1 = require("typedi");
var auth_validation_1 = __importDefault(require("@/modules/auth/auth.validation"));
var user_enum_1 = require("@/modules/user/user.enum");
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var app_constants_1 = require("@/modules/app/app.constants");
var http_middleware_1 = __importDefault(require("@/modules/http/http.middleware"));
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_enum_1 = require("../http/http.enum");
var errorCodes_enum_1 = require("@/utils/enums/errorCodes.enum");
var AuthController = /** @class */ (function () {
    function AuthController(authService) {
        var _this = this;
        this.authService = authService;
        this.path = '/authentication';
        this.router = (0, express_1.Router)();
        this.initialiseRoutes = function () {
            // Register
            _this.router.post("".concat(_this.path, "/register"), http_middleware_1.default.validate(auth_validation_1.default.register), _this.register);
            // Login
            _this.router.post("".concat(_this.path, "/login"), http_middleware_1.default.validate(auth_validation_1.default.login), _this.login);
            // user
            _this.router.get("".concat(_this.path, "/user"), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), _this.user);
            // Update Password
            _this.router.patch("".concat(_this.path, "/update-password"), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), http_middleware_1.default.validate(auth_validation_1.default.updatePassword), _this.updatePassword(true));
            // Update User Password
            _this.router.patch("".concat(_this.path, "/update-password/:userId"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), http_middleware_1.default.validate(auth_validation_1.default.updateUserPassword), _this.updatePassword(false, true));
            // Forget Password
            _this.router.post("".concat(_this.path, "/forget-password"), http_middleware_1.default.validate(auth_validation_1.default.forgetPassword), _this.forgetPassword);
            // Reset Password
            _this.router.patch("".concat(_this.path, "/reset-password"), http_middleware_1.default.validate(auth_validation_1.default.resetPassword), _this.resetPassword);
            // Verify Email
            _this.router.patch("".concat(_this.path, "/verify-email"), http_middleware_1.default.validate(auth_validation_1.default.verifyEmail), _this.verifyEmail);
            // Verify User
            _this.router.patch("".concat(_this.path, "/verify"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), http_middleware_1.default.validate(auth_validation_1.default.verifyUser), _this.verifyUser);
        };
        this.register = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name_1, email, username, country, password, invite, walletPhrase, responce, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name_1 = _a.name, email = _a.email, username = _a.username, country = _a.country, password = _a.password, invite = _a.invite, walletPhrase = _a.walletPhrase;
                        return [4 /*yield*/, this.authService.register(name_1, email, username, password, walletPhrase, user_enum_1.UserRole.USER, user_enum_1.UserStatus.ACTIVE, app_constants_1.AppConstants.mainBalance, app_constants_1.AppConstants.referralBalance, app_constants_1.AppConstants.demoBalance, app_constants_1.AppConstants.bonusBalance, country, invite)];
                    case 1:
                        responce = _b.sent();
                        res.status(201).json(responce);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        next(new http_exception_1.default(err_1.status, err_1.message, err_1.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.login = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, account, password, responce, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, account = _a.account, password = _a.password;
                        return [4 /*yield*/, this.authService.login(account, password)];
                    case 1:
                        responce = _b.sent();
                        res.status(200).json(responce);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _b.sent();
                        next(new http_exception_1.default(err_2.status, err_2.message, err_2.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.user = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    console.log(req.user.status);
                    if (req.user.status !== user_enum_1.UserStatus.ACTIVE)
                        throw new http_exception_1.default(errorCodes_enum_1.ErrorCode.FORBIDDEN, 'Your account is under review, please check in later', http_enum_1.HttpResponseStatus.INFO);
                    res.status(200).json({
                        status: http_enum_1.HttpResponseStatus.SUCCESS,
                        message: 'profile fetched',
                        data: { user: req.user },
                    });
                }
                catch (err) {
                    next(new http_exception_1.default(err.status, err.message, err.statusStrength));
                }
                return [2 /*return*/];
            });
        }); };
        this.updatePassword = function (withOldPassword, isAdmin) {
            if (withOldPassword === void 0) { withOldPassword = true; }
            if (isAdmin === void 0) { isAdmin = false; }
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var userId, oldPassword, password, responce, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId = void 0, oldPassword = void 0;
                            password = req.body.password;
                            if (isAdmin) {
                                userId = req.params.userId;
                                if (!userId)
                                    throw new http_exception_1.default(404, 'User not found');
                            }
                            else {
                                if (!req.user)
                                    throw new http_exception_1.default(404, 'User not found');
                                userId = req.user._id;
                                if (withOldPassword)
                                    oldPassword = req.body.oldPassword;
                            }
                            return [4 /*yield*/, this.authService.updatePassword(userId, password, oldPassword)];
                        case 1:
                            responce = _a.sent();
                            res.status(200).json(responce);
                            return [3 /*break*/, 3];
                        case 2:
                            err_3 = _a.sent();
                            next(new http_exception_1.default(err_3.status, err_3.message, err_3.statusStrength));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        this.forgetPassword = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var account, responce, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        account = req.body.account;
                        return [4 /*yield*/, this.authService.forgetPassword(account)];
                    case 1:
                        responce = _a.sent();
                        res.status(200).json(responce);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        next(new http_exception_1.default(err_4.status, err_4.message, err_4.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.resetPassword = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, password, key, verifyToken, responce, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, password = _a.password, key = _a.key, verifyToken = _a.verifyToken;
                        return [4 /*yield*/, this.authService.resetPassword(key, verifyToken, password)];
                    case 1:
                        responce = _b.sent();
                        res.status(200).json(responce);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _b.sent();
                        next(new http_exception_1.default(err_5.status, err_5.message, err_5.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.verifyEmail = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, key, verifyToken, response, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, key = _a.key, verifyToken = _a.verifyToken;
                        return [4 /*yield*/, this.authService.verifyEmail(key, verifyToken)];
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
        this.verifyUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, response, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.body.userId;
                        return [4 /*yield*/, this.authService.verifyUser(userId)];
                    case 1:
                        response = _a.sent();
                        res.status(200).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        next(new http_exception_1.default(err_7.status, err_7.message, err_7.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.initialiseRoutes();
    }
    AuthController = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.AUTH_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], AuthController);
    return AuthController;
}());
exports.default = AuthController;
