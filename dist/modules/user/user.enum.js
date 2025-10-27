"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEnvironment = exports.UserAccount = exports.UserStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["SUPER_ADMIN"] = 3] = "SUPER_ADMIN";
    UserRole[UserRole["ADMIN"] = 2] = "ADMIN";
    UserRole[UserRole["USER"] = 1] = "USER";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["SUSPENDED"] = "suspended";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var UserAccount;
(function (UserAccount) {
    UserAccount["MAIN_BALANCE"] = "mainBalance";
    UserAccount["REFERRAL_BALANCE"] = "referralBalance";
    UserAccount["DEMO_BALANCE"] = "demoBalance";
    UserAccount["BONUS_BALANCE"] = "bonusBalance";
})(UserAccount = exports.UserAccount || (exports.UserAccount = {}));
var UserEnvironment;
(function (UserEnvironment) {
    UserEnvironment["DEMO"] = "demo";
    UserEnvironment["LIVE"] = "live";
})(UserEnvironment = exports.UserEnvironment || (exports.UserEnvironment = {}));
