"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemOwnership = exports.ItemStatus = void 0;
var ItemStatus;
(function (ItemStatus) {
    ItemStatus["SOLD"] = "sold";
    ItemStatus["BOUGHT"] = "bought";
    ItemStatus["CREATED"] = "created";
    ItemStatus["ON_SALE"] = "on sales";
    ItemStatus["OFF_SALE"] = "off sales";
    ItemStatus["PRIVATE"] = "private";
    ItemStatus["HIDDEN"] = "hidden";
})(ItemStatus = exports.ItemStatus || (exports.ItemStatus = {}));
var ItemOwnership;
(function (ItemOwnership) {
    ItemOwnership["CREATED"] = "created";
    ItemOwnership["COLLECTED"] = "collected";
})(ItemOwnership = exports.ItemOwnership || (exports.ItemOwnership = {}));
