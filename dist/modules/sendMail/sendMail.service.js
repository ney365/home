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
var config_constants_1 = require("@/modules/config/config.constants");
var renderFile_1 = __importDefault(require("@/utils/renderFile"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var mailOption_enum_1 = require("@/modules/mailOption/mailOption.enum");
var http_type_1 = require("@/modules/http/http.type");
var http_enum_1 = require("@/modules/http/http.enum");
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var parseString_1 = __importDefault(require("@/utils/parsers/parseString"));
var SendMailService = /** @class */ (function () {
    function SendMailService(mailService) {
        this.mailService = mailService;
    }
    SendMailService.prototype.sendAdminMail = function (subject, content) {
        return __awaiter(this, void 0, void 0, function () {
            var email, emailContent, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = '';
                        if (!email)
                            return [2 /*return*/];
                        return [4 /*yield*/, (0, renderFile_1.default)('email/info', {
                                subject: subject,
                                content: content,
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
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SendMailService.prototype.sendAdminFailedTransactionMail = function (failedTransactions) {
        return __awaiter(this, void 0, void 0, function () {
            var email, subject, emailContent, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = '';
                        if (!email)
                            return [2 /*return*/];
                        subject = 'Failed Transaction(s) Registered';
                        return [4 /*yield*/, (0, renderFile_1.default)('email/failedTransaction', {
                                subject: subject,
                                failedTransactions: failedTransactions,
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
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SendMailService.prototype.sendDeveloperMail = function (subject, content) {
        return __awaiter(this, void 0, void 0, function () {
            var email, emailContent, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = process.env.DEVELOPER_EMAIL;
                        if (!email)
                            return [2 /*return*/];
                        return [4 /*yield*/, (0, renderFile_1.default)('email/info', {
                                subject: subject + ' - ' + config_constants_1.SiteConstants.siteDomain,
                                content: content,
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
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SendMailService.prototype.sendDeveloperFailedTransactionMail = function (failedTransactions) {
        return __awaiter(this, void 0, void 0, function () {
            var email, subject, emailContent, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = process.env.DEVELOPER_EMAIL;
                        if (!email)
                            return [2 /*return*/];
                        subject = 'Failed Transaction(s) Registered - ' + config_constants_1.SiteConstants.siteDomain;
                        return [4 /*yield*/, (0, renderFile_1.default)('email/failedTransaction', {
                                subject: subject,
                                failedTransactions: failedTransactions,
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
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SendMailService.prototype.sendDeveloperErrorMail = function (err) {
        return __awaiter(this, void 0, void 0, function () {
            var email, subject, time, errorObj_1, error, emailContent, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = process.env.DEVELOPER_EMAIL;
                        if (!email)
                            return [2 /*return*/];
                        subject = 'New Error Found - ' + config_constants_1.SiteConstants.siteDomain;
                        time = new Date();
                        errorObj_1 = {};
                        Object.getOwnPropertyNames(err).forEach(function (key) {
                            errorObj_1[key] = err[key];
                        });
                        error = JSON.stringify(errorObj_1);
                        return [4 /*yield*/, (0, renderFile_1.default)('email/error', {
                                error: error,
                                file: '',
                                line: '',
                                time: time,
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
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        console.log(err_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SendMailService.prototype.sendCustomMail = function (email, subject, heading, content) {
        return __awaiter(this, void 0, http_type_1.THttpResponse, function () {
            var emailContent, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.mailService.setSender(mailOption_enum_1.MailOptionName.TEST);
                        return [4 /*yield*/, (0, renderFile_1.default)('email/custom', {
                                heading: heading,
                                content: content,
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
                        return [2 /*return*/, {
                                status: http_enum_1.HttpResponseStatus.SUCCESS,
                                message: "Email has been sent successfully",
                            }];
                    case 2:
                        err_6 = _a.sent();
                        throw new app_exception_1.default(err_6, 'Unable to send email, please try again');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SendMailService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.MAIL_SERVICE)),
        __metadata("design:paramtypes", [Object])
    ], SendMailService);
    return SendMailService;
}());
exports.default = SendMailService;
