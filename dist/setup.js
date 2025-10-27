"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpMiddleware = exports.controllers = exports.authService = exports.forecastService = exports.tradeService = exports.itemService = exports.investmentService = exports.withdrawalService = exports.depositService = exports.transferService = exports.referralService = exports.userService = exports.transactionManagerService = exports.withdrawalMethodService = exports.depositMethodService = exports.transactionService = exports.failedTransactionService = exports.itemsSettingsService = exports.transferSettingsService = exports.referralSettingsService = exports.planService = exports.pairService = exports.sendMailService = exports.mailService = exports.mailOptionService = exports.assetService = exports.currencyService = exports.emailVerificationService = exports.resetPasswordService = exports.activityService = exports.notificationService = exports.mathService = exports.mathUtility = void 0;
require("reflect-metadata");
var typedi_1 = require("typedi");
var plan_service_1 = __importDefault(require("@/modules/plan/plan.service"));
var mailOption_service_1 = __importDefault(require("@/modules/mailOption/mailOption.service"));
var plan_controller_1 = __importDefault(require("@/modules/plan/plan.controller"));
var user_controller_1 = __importDefault(require("@/modules/user/user.controller"));
var mailOption_controller_1 = __importDefault(require("@/modules/mailOption/mailOption.controller"));
var user_service_1 = __importDefault(require("@/modules/user/user.service"));
var serviceToken_1 = __importDefault(require("@/utils/enums/serviceToken"));
var mail_service_1 = __importDefault(require("@/modules/mail/mail.service"));
var config_controller_1 = __importDefault(require("@/modules/config/config.controller"));
var auth_service_1 = __importDefault(require("@/modules/auth/auth.service"));
var auth_controller_1 = __importDefault(require("@/modules/auth/auth.controller"));
var referralSettings_service_1 = __importDefault(require("@/modules/referralSettings/referralSettings.service"));
var referralSettings_controller_1 = __importDefault(require("@/modules/referralSettings/referralSettings.controller"));
var notification_service_1 = __importDefault(require("@/modules/notification/notification.service"));
var referral_service_1 = __importDefault(require("@/modules/referral/referral.service"));
var transactionManager_service_1 = __importDefault(require("@/modules/transactionManager/transactionManager.service"));
var failedTransaction_service_1 = __importDefault(require("@/modules/failedTransaction/failedTransaction.service"));
var emailVerification_service_1 = __importDefault(require("@/modules/emailVerification/emailVerification.service"));
var resetPassword_service_1 = __importDefault(require("@/modules/resetPassword/resetPassword.service"));
var sendMail_service_1 = __importDefault(require("@/modules/sendMail/sendMail.service"));
var sendMail_controller_1 = __importDefault(require("@/modules/sendMail/sendMail.controller"));
var activity_service_1 = __importDefault(require("@/modules/activity/activity.service"));
var referral_controller_1 = __importDefault(require("@/modules/referral/referral.controller"));
var currency_service_1 = __importDefault(require("@/modules/currency/currency.service"));
var currency_controller_1 = __importDefault(require("@/modules/currency/currency.controller"));
var depositMethod_service_1 = __importDefault(require("@/modules/depositMethod/depositMethod.service"));
var depositMethod_controller_1 = __importDefault(require("@/modules/depositMethod/depositMethod.controller"));
var withdrawalMethod_service_1 = __importDefault(require("@/modules/withdrawalMethod/withdrawalMethod.service"));
var withdrawalMethod_controller_1 = __importDefault(require("@/modules/withdrawalMethod/withdrawalMethod.controller"));
var transaction_service_1 = __importDefault(require("@/modules/transaction/transaction.service"));
var deposit_service_1 = __importDefault(require("@/modules/deposit/deposit.service"));
var deposit_controller_1 = __importDefault(require("@/modules/deposit/deposit.controller"));
var withdrawal_service_1 = __importDefault(require("@/modules/withdrawal/withdrawal.service"));
var withdrawal_controller_1 = __importDefault(require("@/modules/withdrawal/withdrawal.controller"));
var activity_controller_1 = __importDefault(require("@/modules/activity/activity.controller"));
var http_middleware_1 = __importDefault(require("@/modules/http/http.middleware"));
var failedTransaction_controller_1 = __importDefault(require("@/modules/failedTransaction/failedTransaction.controller"));
var transaction_controller_1 = __importDefault(require("@/modules/transaction/transaction.controller"));
var transferSettings_service_1 = __importDefault(require("@/modules/transferSettings/transferSettings.service"));
var transfer_service_1 = __importDefault(require("@/modules/transfer/transfer.service"));
var transferSettings_controller_1 = __importDefault(require("@/modules/transferSettings/transferSettings.controller"));
var transfer_controller_1 = __importDefault(require("@/modules/transfer/transfer.controller"));
var asset_service_1 = __importDefault(require("@/modules/asset/asset.service"));
var asset_controller_1 = __importDefault(require("@/modules/asset/asset.controller"));
var investment_service_1 = __importDefault(require("@/modules/investment/investment.service"));
var investment_controller_1 = __importDefault(require("@/modules/investment/investment.controller"));
var notification_controller_1 = __importDefault(require("@/modules/notification/notification.controller"));
var pair_service_1 = __importDefault(require("@/modules/pair/pair.service"));
var pair_controller_1 = __importDefault(require("@/modules/pair/pair.controller"));
var math_service_1 = __importDefault(require("@/modules/math/math.service"));
var trade_service_1 = __importDefault(require("@/modules/trade/trade.service"));
var trade_controller_1 = __importDefault(require("@/modules/trade/trade.controller"));
var forecast_service_1 = __importDefault(require("@/modules/forecast/forecast.service"));
var math_utility_1 = __importDefault(require("./modules/math/math.utility"));
var itemSettings_service_1 = __importDefault(require("./modules/itemSettings/itemSettings.service"));
var item_service_1 = __importDefault(require("./modules/item/item.service"));
var itemSettings_controller_1 = __importDefault(require("./modules/itemSettings/itemSettings.controller"));
var item_controller_1 = __importDefault(require("./modules/item/item.controller"));
exports.mathUtility = typedi_1.Container.get(math_utility_1.default);
typedi_1.Container.set(serviceToken_1.default.MATH_UTILITY, exports.mathUtility);
exports.mathService = typedi_1.Container.get(math_service_1.default);
typedi_1.Container.set(serviceToken_1.default.MATH_SERVICE, exports.mathService);
exports.notificationService = typedi_1.Container.get(notification_service_1.default);
typedi_1.Container.set(serviceToken_1.default.NOTIFICATION_SERVICE, exports.notificationService);
exports.activityService = typedi_1.Container.get(activity_service_1.default);
typedi_1.Container.set(serviceToken_1.default.ACTIVITY_SERVICE, exports.activityService);
exports.resetPasswordService = typedi_1.Container.get(resetPassword_service_1.default);
typedi_1.Container.set(serviceToken_1.default.RESET_PASSWORD_SERVICE, exports.resetPasswordService);
exports.emailVerificationService = typedi_1.Container.get(emailVerification_service_1.default);
typedi_1.Container.set(serviceToken_1.default.EMAIL_VERIFICATION_SERVICE, exports.emailVerificationService);
exports.currencyService = typedi_1.Container.get(currency_service_1.default);
typedi_1.Container.set(serviceToken_1.default.CURRENCY_SERVICE, exports.currencyService);
exports.assetService = typedi_1.Container.get(asset_service_1.default);
typedi_1.Container.set(serviceToken_1.default.ASSET_SERVICE, exports.assetService);
exports.mailOptionService = typedi_1.Container.get(mailOption_service_1.default);
typedi_1.Container.set(serviceToken_1.default.MAIL_OPTION_SERVICE, exports.mailOptionService);
exports.mailService = typedi_1.Container.get(mail_service_1.default);
typedi_1.Container.set(serviceToken_1.default.MAIL_SERVICE, exports.mailService);
exports.sendMailService = typedi_1.Container.get(sendMail_service_1.default);
typedi_1.Container.set(serviceToken_1.default.SEND_MAIL_SERVICE, exports.sendMailService);
exports.pairService = typedi_1.Container.get(pair_service_1.default);
typedi_1.Container.set(serviceToken_1.default.PAIR_SERVICE, exports.pairService);
exports.planService = typedi_1.Container.get(plan_service_1.default);
typedi_1.Container.set(serviceToken_1.default.PLAN_SERVICE, exports.planService);
exports.referralSettingsService = typedi_1.Container.get(referralSettings_service_1.default);
typedi_1.Container.set(serviceToken_1.default.REFERRAL_SETTINGS_SERVICE, exports.referralSettingsService);
exports.transferSettingsService = typedi_1.Container.get(transferSettings_service_1.default);
typedi_1.Container.set(serviceToken_1.default.TRANSFER_SETTINGS_SERVICE, exports.transferSettingsService);
exports.itemsSettingsService = typedi_1.Container.get(itemSettings_service_1.default);
typedi_1.Container.set(serviceToken_1.default.ITEM_SETTINGS_SERVICE, exports.itemsSettingsService);
exports.failedTransactionService = typedi_1.Container.get(failedTransaction_service_1.default);
typedi_1.Container.set(serviceToken_1.default.FAILED_TRANSACTION_SERVICE, exports.failedTransactionService);
exports.transactionService = typedi_1.Container.get(transaction_service_1.default);
typedi_1.Container.set(serviceToken_1.default.TRANSACTION_SERVICE, exports.transactionService);
exports.depositMethodService = typedi_1.Container.get(depositMethod_service_1.default);
typedi_1.Container.set(serviceToken_1.default.DEPOSIT_METHOD_SERVICE, exports.depositMethodService);
exports.withdrawalMethodService = typedi_1.Container.get(withdrawalMethod_service_1.default);
typedi_1.Container.set(serviceToken_1.default.WITHDRAWAL_METHOD_SERVICE, exports.withdrawalMethodService);
exports.transactionManagerService = typedi_1.Container.get(transactionManager_service_1.default);
typedi_1.Container.set(serviceToken_1.default.TRANSACTION_MANAGER_SERVICE, exports.transactionManagerService);
exports.userService = typedi_1.Container.get(user_service_1.default);
typedi_1.Container.set(serviceToken_1.default.USER_SERVICE, exports.userService);
exports.referralService = typedi_1.Container.get(referral_service_1.default);
typedi_1.Container.set(serviceToken_1.default.REFERRAL_SERVICE, exports.referralService);
exports.transferService = typedi_1.Container.get(transfer_service_1.default);
typedi_1.Container.set(serviceToken_1.default.TRANSFER_SERVICE, exports.transferService);
exports.depositService = typedi_1.Container.get(deposit_service_1.default);
typedi_1.Container.set(serviceToken_1.default.DEPOSIT_SERVICE, exports.depositService);
exports.withdrawalService = typedi_1.Container.get(withdrawal_service_1.default);
typedi_1.Container.set(serviceToken_1.default.WITHDRAWAL_SERVICE, exports.withdrawalService);
exports.investmentService = typedi_1.Container.get(investment_service_1.default);
typedi_1.Container.set(serviceToken_1.default.INVESTMENT_SERVICE, exports.investmentService);
exports.itemService = typedi_1.Container.get(item_service_1.default);
typedi_1.Container.set(serviceToken_1.default.ITEM_SERVICE, exports.itemService);
exports.tradeService = typedi_1.Container.get(trade_service_1.default);
typedi_1.Container.set(serviceToken_1.default.TRADE_SERVICE, exports.tradeService);
exports.forecastService = typedi_1.Container.get(forecast_service_1.default);
typedi_1.Container.set(serviceToken_1.default.FORECAST_SERVICE, exports.forecastService);
exports.authService = typedi_1.Container.get(auth_service_1.default);
typedi_1.Container.set(serviceToken_1.default.AUTH_SERVICE, exports.authService);
var sendMailController = typedi_1.Container.get(sendMail_controller_1.default);
var authController = typedi_1.Container.get(auth_controller_1.default);
var userController = typedi_1.Container.get(user_controller_1.default);
var planController = typedi_1.Container.get(plan_controller_1.default);
var mailOptionController = typedi_1.Container.get(mailOption_controller_1.default);
var configController = typedi_1.Container.get(config_controller_1.default);
var referralSettingsController = typedi_1.Container.get(referralSettings_controller_1.default);
var referralController = typedi_1.Container.get(referral_controller_1.default);
var currencyController = typedi_1.Container.get(currency_controller_1.default);
var depositMethodController = typedi_1.Container.get(depositMethod_controller_1.default);
var withdrawalMethodController = typedi_1.Container.get(withdrawalMethod_controller_1.default);
var depositController = typedi_1.Container.get(deposit_controller_1.default);
var withdrawalController = typedi_1.Container.get(withdrawal_controller_1.default);
var activityController = typedi_1.Container.get(activity_controller_1.default);
var failedTransactionController = typedi_1.Container.get(failedTransaction_controller_1.default);
var transactionController = typedi_1.Container.get(transaction_controller_1.default);
var transferSettingsController = typedi_1.Container.get(transferSettings_controller_1.default);
var transferController = typedi_1.Container.get(transfer_controller_1.default);
var assetController = typedi_1.Container.get(asset_controller_1.default);
var investmentController = typedi_1.Container.get(investment_controller_1.default);
var notificationController = typedi_1.Container.get(notification_controller_1.default);
var pairController = typedi_1.Container.get(pair_controller_1.default);
var tradeController = typedi_1.Container.get(trade_controller_1.default);
var itemSettingsController = typedi_1.Container.get(itemSettings_controller_1.default);
var itemController = typedi_1.Container.get(item_controller_1.default);
exports.controllers = [
    referralSettingsController,
    sendMailController,
    authController,
    userController,
    planController,
    mailOptionController,
    configController,
    referralController,
    currencyController,
    depositMethodController,
    withdrawalMethodController,
    depositController,
    withdrawalController,
    activityController,
    failedTransactionController,
    transactionController,
    transferSettingsController,
    transferController,
    assetController,
    investmentController,
    notificationController,
    pairController,
    tradeController,
    itemSettingsController,
    itemController,
];
exports.httpMiddleware = typedi_1.Container.get(http_middleware_1.default);
