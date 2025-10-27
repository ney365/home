"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = __importDefault(require("jsdom"));
var ParseString = /** @class */ (function () {
    function ParseString() {
    }
    ParseString.clearHtml = function (body) {
        var dom = new jsdom_1.default.JSDOM(body);
        var links = dom.window.document.querySelectorAll('a[data-link-replace]');
        links.forEach(function (link) {
            var linkText = link.getAttribute('data-link-replace') || '';
            link.innerHTML = linkText;
            link.removeAttribute('href');
        });
        var text = dom.window.document.documentElement.textContent;
        return text || '';
    };
    return ParseString;
}());
exports.default = ParseString;
