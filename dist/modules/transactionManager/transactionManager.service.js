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
var failedTransaction_enum_1 = require("@/modules/failedTransaction/failedTransaction.enum");
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var app_exception_1 = __importDefault(require("@/modules/app/app.exception"));
var http_enum_1 = require("@/modules/http/http.enum");
var TransactionManagerService = /** @class */ (function () {
    function TransactionManagerService(failedTransactionService, sendMailService) {
        this.failedTransactionService = failedTransactionService;
        this.sendMailService = sendMailService;
    }
    TransactionManagerService.prototype.execute = function (transactionInstances) {
        return __awaiter(this, void 0, void 0, function () {
            var successfullyProccesedTransactions, failedTransactions, i, transactionInstance, err_1, i, transactionInstance, collectionName, err2_1, failedTransactionsResults, i, params, transacton, response, err3_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        successfullyProccesedTransactions = [];
                        failedTransactions = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 20]);
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < transactionInstances.length)) return [3 /*break*/, 5];
                        transactionInstance = transactionInstances[i];
                        return [4 /*yield*/, transactionInstance.model.save()];
                    case 3:
                        _a.sent();
                        successfullyProccesedTransactions.push(transactionInstance);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 20];
                    case 6:
                        err_1 = _a.sent();
                        i = 0;
                        _a.label = 7;
                    case 7:
                        if (!(i < successfullyProccesedTransactions.length)) return [3 /*break*/, 12];
                        transactionInstance = successfullyProccesedTransactions[i];
                        collectionName = transactionInstance.model.collection.name;
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, transactionInstance.callback()];
                    case 9:
                        _a.sent();
                        failedTransactions.push({
                            collectionName: collectionName,
                            message: transactionInstance.onFailed,
                            status: failedTransaction_enum_1.FailedTransactionStatus.SUCCESS,
                        });
                        return [3 /*break*/, 11];
                    case 10:
                        err2_1 = _a.sent();
                        console.log(err2_1);
                        this.sendMailService.sendDeveloperErrorMail(err2_1);
                        failedTransactions.push({
                            collectionName: collectionName,
                            message: transactionInstance.onFailed,
                            status: failedTransaction_enum_1.FailedTransactionStatus.FAILED,
                        });
                        return [3 /*break*/, 11];
                    case 11:
                        i++;
                        return [3 /*break*/, 7];
                    case 12:
                        if (!failedTransactions.length) return [3 /*break*/, 19];
                        _a.label = 13;
                    case 13:
                        _a.trys.push([13, 18, , 19]);
                        failedTransactionsResults = [];
                        // Send Email
                        this.sendMailService.sendDeveloperFailedTransactionMail(failedTransactions);
                        this.sendMailService.sendAdminFailedTransactionMail(failedTransactions);
                        i = 0;
                        _a.label = 14;
                    case 14:
                        if (!(i < failedTransactions.length)) return [3 /*break*/, 17];
                        params = failedTransactions[i];
                        return [4 /*yield*/, this.failedTransactionService.create(params.message, params.collectionName, params.status)];
                    case 15:
                        transacton = _a.sent();
                        failedTransactionsResults.push(transacton);
                        _a.label = 16;
                    case 16:
                        i++;
                        return [3 /*break*/, 14];
                    case 17:
                        response = {
                            status: http_enum_1.HttpResponseStatus.SUCCESS,
                            message: 'Failed transaction registered successfully',
                            data: { failedTransactions: failedTransactionsResults },
                        };
                        return [3 /*break*/, 19];
                    case 18:
                        err3_1 = _a.sent();
                        console.log(err3_1);
                        this.sendMailService.sendDeveloperErrorMail(err3_1);
                        return [3 /*break*/, 19];
                    case 19: throw new app_exception_1.default(err_1, 'Failed to process transactions, please try again later');
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    TransactionManagerService = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)(serviceToken_1.default.FAILED_TRANSACTION_SERVICE)),
        __param(1, (0, typedi_1.Inject)(serviceToken_1.default.SEND_MAIL_SERVICE)),
        __metadata("design:paramtypes", [Object, Object])
    ], TransactionManagerService);
    return TransactionManagerService;
}());
exports.default = TransactionManagerService;
