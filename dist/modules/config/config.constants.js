"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteConstants = void 0;
var SiteConstants = /** @class */ (function () {
    function SiteConstants() {
    }
    var _a;
    _a = SiteConstants;
    SiteConstants.liveChatApi = process.env.LIVE_CHAT_API;
    SiteConstants.siteName = process.env.SITE_NAME;
    SiteConstants.protocool = process.env.SITE_PROTOCOOL;
    SiteConstants.baseImageUrl = process.env.IMAGE_HOST;
    SiteConstants.frontendLink = process.env.FRONTEND_LINK;
    SiteConstants.siteDomain = process.env.SITE_DOMAIN;
    SiteConstants.siteUrl = _a.protocool + '://' + _a.siteDomain + '/';
    SiteConstants.siteApi = _a.siteUrl + 'api/';
    SiteConstants.siteEmail = 'support@' + _a.siteDomain;
    SiteConstants.siteAddress = process.env.SITE_ADDRESS;
    SiteConstants.sitePhone = process.env.SITE_PHONE;
    SiteConstants.siteLogo = _a.siteUrl + 'images/logo-light.png';
    return SiteConstants;
}());
exports.SiteConstants = SiteConstants;
