"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationForWho = exports.NotificationCategory = void 0;
var NotificationCategory;
(function (NotificationCategory) {
    NotificationCategory["REFERRAL"] = "referral";
    NotificationCategory["DEPOSIT"] = "deposit";
    NotificationCategory["WITHDRAWAL"] = "withdrawal";
    NotificationCategory["TRANSFER"] = "transfer";
    NotificationCategory["TRADE"] = "trade";
    NotificationCategory["INVESTMENT"] = "investment";
    NotificationCategory["ITEM_CREATED"] = "item created";
    NotificationCategory["ITEM_BOUGHT"] = "item bought";
    NotificationCategory["ITEM_SOLD"] = "item sold";
})(NotificationCategory = exports.NotificationCategory || (exports.NotificationCategory = {}));
var NotificationForWho;
(function (NotificationForWho) {
    NotificationForWho[NotificationForWho["ADMIN"] = 2] = "ADMIN";
    NotificationForWho[NotificationForWho["USER"] = 1] = "USER";
})(NotificationForWho = exports.NotificationForWho || (exports.NotificationForWho = {}));
