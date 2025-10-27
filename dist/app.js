"use strict";
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
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var csrf_1 = require("@/utils/csrf");
var mongodb_database_1 = __importDefault(require("./database/mongodb.database"));
var setup_1 = require("./setup");
var App = /** @class */ (function () {
    function App(controllers, port, httpMiddleware, notTest, database) {
        var _this = this;
        this.controllers = controllers;
        this.port = port;
        this.httpMiddleware = httpMiddleware;
        this.notTest = notTest;
        this.database = database;
        this.express = (0, express_1.default)();
        this.beforeStart().then(function () {
            _this.initialiseMiddleware();
            _this.initialiseControllers(controllers);
            _this.initialiseStatic();
            _this.initialiseErrorHandling();
        });
    }
    App.prototype.initialiseMiddleware = function () {
        this.express.use((0, helmet_1.default)({
            crossOriginResourcePolicy: { policy: 'cross-origin' },
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*'],
                    imgSrc: ["'self'", 'blob:', '*'],
                    connectSrc: ["'self'", '*'],
                    frameSrc: ["'self'", '*'],
                },
            },
        }));
        this.express.use(function (req, res, next) {
            res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
            next();
        });
        this.express.use((0, cors_1.default)({
            origin: [
                'http://localhost:5173',
                'http://localhost:5174',
                'http://localhost:5175',
                'http://localhost:5176',
            ],
            credentials: true,
        }));
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
        this.express.use((0, cookie_parser_1.default)());
        if (this.notTest)
            this.express.use(csrf_1.doubleCsrfProtection);
        this.express.get('/api/token', function (req, res, next) {
            res.json({ token: req.csrfToken && req.csrfToken() });
        });
    };
    App.prototype.initialiseControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.express.use('/api', controller.router);
        });
    };
    App.prototype.initialiseStatic = function () {
        this.express.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
        this.express.use('/assets', express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'assets')));
        this.express.use('/css', express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'css')));
        this.express.use('/fonts', express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'fonts')));
        this.express.use('/form', express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'form')));
        this.express.use('/img', express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'img')));
        this.express.use('/js', express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'js')));
        this.express.use('/svg', express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'frontend', 'svg')));
        this.express.get(/.*/, function (req, res, next) {
            res.sendFile(path_1.default.join(__dirname, '..', 'src', 'frontend', 'index.html'));
        });
    };
    App.prototype.initialiseErrorHandling = function () {
        this.express.use(this.httpMiddleware.handle404Error);
        this.express.use(this.httpMiddleware.handleThrownError.bind(this.httpMiddleware));
    };
    App.prototype.initialiseDatabaseConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.database)
                    return [2 /*return*/];
                if (this.database.mogodb)
                    (0, mongodb_database_1.default)(this.database.mogodb);
                return [2 /*return*/];
            });
        });
    };
    App.prototype.beforeStart = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var transferSettings, referralSettings, itemSettings, depositMethod, currency, currencies, withdrawalMethod, currency, currencies;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.initialiseDatabaseConnection()
                        // TRANSFER SETTINGS
                    ];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, setup_1.transferSettingsService.get()];
                    case 2:
                        transferSettings = _e.sent();
                        if (!(!transferSettings && this.notTest)) return [3 /*break*/, 4];
                        return [4 /*yield*/, setup_1.transferSettingsService.create(false, 0)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4: return [4 /*yield*/, setup_1.referralSettingsService.get()];
                    case 5:
                        referralSettings = _e.sent();
                        if (!(!referralSettings && this.notTest)) return [3 /*break*/, 7];
                        return [4 /*yield*/, setup_1.referralSettingsService.create(10, 5, 15, 10, 10, 10)];
                    case 6:
                        _e.sent();
                        _e.label = 7;
                    case 7: return [4 /*yield*/, setup_1.itemsSettingsService.get()];
                    case 8:
                        itemSettings = _e.sent();
                        if (!(!itemSettings && this.notTest)) return [3 /*break*/, 10];
                        return [4 /*yield*/, setup_1.itemsSettingsService.create(false, 1)];
                    case 9:
                        _e.sent();
                        _e.label = 10;
                    case 10: return [4 /*yield*/, setup_1.depositMethodService.fetchAll(false)];
                    case 11:
                        depositMethod = (_a = (_e.sent()).data) === null || _a === void 0 ? void 0 : _a.depositMethods.length;
                        if (!(!depositMethod && this.notTest)) return [3 /*break*/, 16];
                        currency = void 0;
                        return [4 /*yield*/, setup_1.currencyService.fetchAll()];
                    case 12:
                        currencies = (_b = (_e.sent()).data) === null || _b === void 0 ? void 0 : _b.currencies;
                        currency = currencies === null || currencies === void 0 ? void 0 : currencies.find(function (currency) { return currency.name.toLowerCase() === 'ethereum'; });
                        if (!!currency) return [3 /*break*/, 14];
                        return [4 /*yield*/, setup_1.currencyService.create('Ethereum', 'ETH', 'eth.svg')];
                    case 13:
                        currency = (_e.sent())
                            .data.currency;
                        _e.label = 14;
                    case 14: return [4 /*yield*/, setup_1.depositMethodService.create(currency._id, '---ETH ADDRESS---', 'BEP20', 0, 1)];
                    case 15:
                        _e.sent();
                        _e.label = 16;
                    case 16: return [4 /*yield*/, setup_1.withdrawalMethodService.fetchAll(false)];
                    case 17:
                        withdrawalMethod = (_c = (_e.sent())
                            .data) === null || _c === void 0 ? void 0 : _c.withdrawalMethods.length;
                        if (!(!withdrawalMethod && this.notTest)) return [3 /*break*/, 22];
                        currency = void 0;
                        return [4 /*yield*/, setup_1.currencyService.fetchAll()];
                    case 18:
                        currencies = (_d = (_e.sent()).data) === null || _d === void 0 ? void 0 : _d.currencies;
                        currency = currencies === null || currencies === void 0 ? void 0 : currencies.find(function (currency) { return currency.name.toLowerCase() === 'ethereum'; });
                        if (!!currency) return [3 /*break*/, 20];
                        return [4 /*yield*/, setup_1.currencyService.create('Ethereum', 'ETH', 'eth.svg')];
                    case 19:
                        currency = (_e.sent())
                            .data.currency;
                        _e.label = 20;
                    case 20: return [4 /*yield*/, setup_1.withdrawalMethodService.create(currency._id, 'BEP20', 0, 1)];
                    case 21:
                        _e.sent();
                        _e.label = 22;
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.express.listen(this.port, function () {
            console.log("App listenig on port ".concat(_this.port));
        });
    };
    return App;
}());
exports.default = App;
