"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doubleCsrfProtection = void 0;
var csrf_csrf_1 = require("csrf-csrf");
var doubleCsrfProtection = (0, csrf_csrf_1.doubleCsrf)({
    getSecret: function () { return process.env.CSRF_SECRET; },
    cookieName: 'x-csrf-token',
}).doubleCsrfProtection;
exports.doubleCsrfProtection = doubleCsrfProtection;
