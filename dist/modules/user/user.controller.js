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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var typedi_1 = require("typedi");
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var http_middleware_1 = __importDefault(require("@/modules/http/http.middleware"));
var user_enum_1 = require("@/modules/user/user.enum");
var user_validation_1 = __importDefault(require("@/modules/user/user.validation"));
var imageUploader_1 = __importDefault(require("../imageUploader/imageUploader"));
var user_service_1 = __importDefault(require("./user.service"));
var UserController = /** @class */ (function () {
    function UserController(userService) {
        var _this = this;
        this.userService = userService;
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.imageUploader = new imageUploader_1.default();
        this.initialiseRoutes = function () {
            // Fund User
            _this.router.patch("".concat(_this.path, "/:userId/force-fund-user"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), http_middleware_1.default.validate(user_validation_1.default.fundUser), _this.forceFundUser);
            // Update Profile
            _this.router.put("".concat(_this.path, "/update-profile"), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), http_middleware_1.default.validate(user_validation_1.default.updateProfile), _this.updateProfile(false));
            // Update Profile Images
            _this.router.put("".concat(_this.path, "/update-profile-images"), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), _this.imageUploader.setNames([
                { name: 'profile', maxCount: 1 },
                { name: 'cover', maxCount: 1 },
            ]), _this.imageUploader.resize(['profile', 'cover'], __spreadArray(__spreadArray([], user_service_1.default.coverImageSizes, true), user_service_1.default.profileImageSizes, true)), _this.updateProfileImages(false));
            // Update User Profile
            _this.router.put("".concat(_this.path, "/:userId/update-user-profile"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), http_middleware_1.default.validate(user_validation_1.default.updateProfile), _this.updateProfile(true));
            // Update User Email
            _this.router.patch("".concat(_this.path, "/:userId/update-user-email"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), http_middleware_1.default.validate(user_validation_1.default.updateEmail), _this.updateEmail(true));
            // Update User Status
            _this.router.patch("".concat(_this.path, "/:userId/update-user-status"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), http_middleware_1.default.validate(user_validation_1.default.updateStatus), _this.updateStatus);
            // Delete User
            _this.router.delete("".concat(_this.path, "/:userId/delete-user"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.deleteUser);
            // Get Referred Users
            _this.router.get("".concat(_this.path, "/referred-users"), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), _this.getReferredUsers(false));
            // Get All Referred Users
            _this.router.get("".concat(_this.path, "/all-referred-users"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.getReferredUsers(true));
            // Send Email
            _this.router.post("".concat(_this.path, "/send-email/:userId"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), http_middleware_1.default.validate(user_validation_1.default.sendEmail), _this.sendEmail);
            // Get Creators
            _this.router.get("".concat(_this.path, "/creators"), _this.getCreators);
            // Get User
            _this.router.get("".concat(_this.path, "/:userId"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.getUser);
            // Get Users
            _this.router.get("".concat(_this.path), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.getUsers);
        };
        this.getUsers = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var responce, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userService.fetchAll()];
                    case 1:
                        responce = _a.sent();
                        res.status(200).json(responce);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        next(new http_exception_1.default(err_1.status, err_1.message, err_1.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getCreators = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var responce, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userService.creators()];
                    case 1:
                        responce = _a.sent();
                        res.status(200).json(responce);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        next(new http_exception_1.default(err_2.status, err_2.message, err_2.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, responce, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        return [4 /*yield*/, this.userService.fetch(userId)];
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
        this.updateProfile = function (isAdmin) {
            if (isAdmin === void 0) { isAdmin = false; }
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var userId, _a, name_1, username, bio, responce, err_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            userId = void 0;
                            _a = req.body, name_1 = _a.name, username = _a.username, bio = _a.bio;
                            if (isAdmin) {
                                userId = req.params.userId;
                                if (!userId)
                                    throw new http_exception_1.default(404, 'User not found');
                            }
                            else {
                                if (!req.user)
                                    throw new http_exception_1.default(404, 'User not found');
                                userId = req.user._id;
                            }
                            return [4 /*yield*/, this.userService.updateProfile(userId, name_1, username, bio)];
                        case 1:
                            responce = _b.sent();
                            res.status(200).json(responce);
                            return [3 /*break*/, 3];
                        case 2:
                            err_4 = _b.sent();
                            next(new http_exception_1.default(err_4.status, err_4.message, err_4.statusStrength));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        this.updateProfileImages = function (isAdmin) {
            if (isAdmin === void 0) { isAdmin = false; }
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var profileImage, coverImage, userId, _a, profile, cover, responce, err_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            userId = void 0;
                            _a = req.body, profile = _a.profile, cover = _a.cover;
                            profileImage = profile && profile[0].name;
                            coverImage = cover && cover[0].name;
                            if (isAdmin) {
                                userId = req.params.userId;
                                if (!userId)
                                    throw new http_exception_1.default(404, 'User not found');
                            }
                            else {
                                if (!req.user)
                                    throw new http_exception_1.default(404, 'User not found');
                                userId = req.user._id;
                            }
                            return [4 /*yield*/, this.userService.updateProfileImages(userId, profileImage, coverImage)];
                        case 1:
                            responce = _b.sent();
                            res.status(200).json(responce);
                            return [3 /*break*/, 3];
                        case 2:
                            err_5 = _b.sent();
                            if (profileImage)
                                this.imageUploader.delete('profile', profileImage, __spreadArray(__spreadArray([], user_service_1.default.coverImageSizes, true), user_service_1.default.profileImageSizes, true));
                            if (coverImage)
                                this.imageUploader.delete('cover', coverImage, __spreadArray(__spreadArray([], user_service_1.default.coverImageSizes, true), user_service_1.default.profileImageSizes, true));
                            next(new http_exception_1.default(err_5.status, err_5.message, err_5.statusStrength));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        this.updateEmail = function (isAdmin) {
            if (isAdmin === void 0) { isAdmin = false; }
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var userId, email, responce, err_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId = void 0;
                            email = req.body.email;
                            if (isAdmin) {
                                userId = req.params.userId;
                                if (!userId)
                                    throw new http_exception_1.default(404, 'User not found');
                            }
                            else {
                                if (!req.user)
                                    throw new http_exception_1.default(404, 'User not found');
                                userId = req.user._id;
                            }
                            return [4 /*yield*/, this.userService.updateEmail(userId, email)];
                        case 1:
                            responce = _a.sent();
                            res.status(200).json(responce);
                            return [3 /*break*/, 3];
                        case 2:
                            err_6 = _a.sent();
                            next(new http_exception_1.default(err_6.status, err_6.message, err_6.statusStrength));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        this.updateStatus = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var status_1, userId, responce, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        status_1 = req.body.status;
                        userId = req.params.userId;
                        return [4 /*yield*/, this.userService.updateStatus(userId, status_1)];
                    case 1:
                        responce = _a.sent();
                        res.status(200).json(responce);
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        next(new http_exception_1.default(err_7.status, err_7.message, err_7.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, responce, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        return [4 /*yield*/, this.userService.delete(userId)];
                    case 1:
                        responce = _a.sent();
                        res.status(200).json(responce);
                        return [3 /*break*/, 3];
                    case 2:
                        err_8 = _a.sent();
                        next(new http_exception_1.default(err_8.status, err_8.message, err_8.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.forceFundUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, account, amount, responce, err_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        _a = req.body, account = _a.account, amount = _a.amount;
                        return [4 /*yield*/, this.userService.forceFund(userId, account, amount)];
                    case 1:
                        responce = _b.sent();
                        res.status(200).json(responce);
                        return [3 /*break*/, 3];
                    case 2:
                        err_9 = _b.sent();
                        next(new http_exception_1.default(err_9.status, err_9.message, err_9.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getReferredUsers = function (getAll) {
            if (getAll === void 0) { getAll = false; }
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var userId, responce, err_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId = void 0;
                            if (!getAll) {
                                if (!req.user)
                                    throw new http_exception_1.default(404, 'User not found');
                                userId = req.user._id;
                            }
                            return [4 /*yield*/, this.userService.getReferredUsers(getAll, userId)];
                        case 1:
                            responce = _a.sent();
                            res.status(200).json(responce);
                            return [3 /*break*/, 3];
                        case 2:
                            err_10 = _a.sent();
                            next(new http_exception_1.default(err_10.status, err_10.message, err_10.statusStrength));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        this.sendEmail = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, subject, heading, content, responce, err_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        _a = req.body, subject = _a.subject, heading = _a.heading, content = _a.content;
                        return [4 /*yield*/, this.userService.sendEmail(userId, subject, heading, content)];
                    case 1:
                        responce = _b.sent();
                        res.status(200).json(responce);
                        return [3 /*break*/, 3];
                    case 2:
                        err_11 = _b.sent();
                        next(new http_exception_1.default(err_11.status, err_11.message, err_11.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.initialiseRoutes();
    }
    UserController = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.USER_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], UserController);
    return UserController;
}());
exports.default = UserController;
