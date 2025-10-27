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
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var express_1 = require("express");
var typedi_1 = require("typedi");
var activity_enum_1 = require("@/modules/activity/activity.enum");
var http_middleware_1 = __importDefault(require("@/modules/http/http.middleware"));
var user_enum_1 = require("@/modules/user/user.enum");
var http_exception_1 = __importDefault(require("@/modules/http/http.exception"));
var ActivityController = /** @class */ (function () {
    function ActivityController(activityService) {
        var _this = this;
        this.activityService = activityService;
        this.path = '/activity';
        this.router = (0, express_1.Router)();
        this.initialiseRoutes = function () {
            // Get Activity logs
            _this.router.get("".concat(_this.path), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), _this.fetchAll(user_enum_1.UserRole.USER));
            // Get Users Activity logs
            _this.router.get("".concat(_this.path, "/users"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.fetchAll(user_enum_1.UserRole.ADMIN));
            // Get User Activity logs
            _this.router.get("".concat(_this.path, "/user/:userId"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.fetchAll(user_enum_1.UserRole.ADMIN, false));
            // Get Admin Activity logs
            _this.router.get("".concat(_this.path, "/admin"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.fetchAllAdmin);
            // Hide Activity
            _this.router.patch("".concat(_this.path, "/hide/:activityId"), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), _this.hide);
            // Hide All Activity
            _this.router.patch("".concat(_this.path, "/hide"), http_middleware_1.default.authenticate(user_enum_1.UserRole.USER), _this.hideAll);
            // Delete All users Activities
            _this.router.delete("".concat(_this.path, "/delete/all"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.deleteAll(true, activity_enum_1.ActivityForWho.USER));
            // Delete All selected user Activity
            _this.router.delete("".concat(_this.path, "/delete/user/:userId"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.deleteAll(false, activity_enum_1.ActivityForWho.USER));
            // Delete Admin Activity
            _this.router.delete("".concat(_this.path, "/delete/admin/:activityId"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.delete(user_enum_1.UserRole.ADMIN, activity_enum_1.ActivityForWho.ADMIN));
            // Delete All active Admin Activity
            _this.router.delete("".concat(_this.path, "/delete/admin"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.deleteAll(false, activity_enum_1.ActivityForWho.ADMIN));
            // Delete Activity
            _this.router.delete("".concat(_this.path, "/delete/:activityId"), http_middleware_1.default.authenticate(user_enum_1.UserRole.ADMIN), _this.delete(user_enum_1.UserRole.USER, activity_enum_1.ActivityForWho.USER));
        };
        this.fetchAll = function (role, all) {
            if (all === void 0) { all = true; }
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var response, userId, userId, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 7, , 8]);
                            response = void 0;
                            if (!(role >= user_enum_1.UserRole.ADMIN && all)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.activityService.fetchAll(role, activity_enum_1.ActivityForWho.USER)];
                        case 1:
                            response = _a.sent();
                            return [3 /*break*/, 6];
                        case 2:
                            if (!(role >= user_enum_1.UserRole.ADMIN && !all)) return [3 /*break*/, 4];
                            userId = req.params.userId;
                            return [4 /*yield*/, this.activityService.fetchAll(role, activity_enum_1.ActivityForWho.USER, userId)];
                        case 3:
                            response = _a.sent();
                            return [3 /*break*/, 6];
                        case 4:
                            userId = req.user._id;
                            return [4 /*yield*/, this.activityService.fetchAll(role, activity_enum_1.ActivityForWho.USER, userId)];
                        case 5:
                            response = _a.sent();
                            _a.label = 6;
                        case 6:
                            res.status(200).json(response);
                            return [3 /*break*/, 8];
                        case 7:
                            err_1 = _a.sent();
                            next(new http_exception_1.default(err_1.status, err_1.message, err_1.statusStrength));
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            }); };
        };
        this.fetchAllAdmin = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.activityService.fetchAll(user_enum_1.UserRole.ADMIN, activity_enum_1.ActivityForWho.ADMIN, req.user._id)];
                    case 1:
                        response = _a.sent();
                        res.status(200).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        next(new http_exception_1.default(err_2.status, err_2.message, err_2.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.hide = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, activityId, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user._id;
                        activityId = req.params.activityId;
                        return [4 /*yield*/, this.activityService.hide(userId, activityId, activity_enum_1.ActivityForWho.USER)];
                    case 1:
                        response = _a.sent();
                        res.status(200).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        next(new http_exception_1.default(err_3.status, err_3.message, err_3.statusStrength));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.hideAll = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user._id;
                        return [4 /*yield*/, this.activityService.hideAll(userId, activity_enum_1.ActivityForWho.USER)];
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
        this.delete = function (role, forWho) {
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var activityId, response, err_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            activityId = req.params.activityId;
                            response = void 0;
                            if (!(role >= user_enum_1.UserRole.ADMIN)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.activityService.delete(activityId, forWho, req.user._id)];
                        case 1:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.activityService.delete(activityId, forWho)];
                        case 3:
                            response = _a.sent();
                            _a.label = 4;
                        case 4:
                            res.status(200).json(response);
                            return [3 /*break*/, 6];
                        case 5:
                            err_5 = _a.sent();
                            next(new http_exception_1.default(err_5.status, err_5.message, err_5.statusStrength));
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); };
        };
        this.deleteAll = function (fromAllAccounts, forWho) {
            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var userId, response, err_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId = req.params.userId || req.user._id;
                            return [4 /*yield*/, this.activityService.deleteAll(fromAllAccounts, forWho, userId)];
                        case 1:
                            response = _a.sent();
                            res.status(200).json(response);
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
        this.initialiseRoutes();
    }
    ActivityController = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.ACTIVITY_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], ActivityController);
    return ActivityController;
}());
exports.default = ActivityController;
