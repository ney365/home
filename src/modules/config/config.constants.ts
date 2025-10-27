export class SiteConstants {
  static liveChatApi: string = process.env.LIVE_CHAT_API
  static siteName: string = process.env.SITE_NAME
  static protocool: string = process.env.SITE_PROTOCOOL
  static baseImageUrl: string = process.env.IMAGE_HOST
  static frontendLink: string = process.env.FRONTEND_LINK
  static siteDomain: string = process.env.SITE_DOMAIN
  static siteUrl: string = this.protocool + '://' + this.siteDomain + '/'
  static siteApi: string = this.siteUrl + 'api/'
  static siteEmail: string = 'support@' + this.siteDomain
  static siteAddress: string = process.env.SITE_ADDRESS
  static sitePhone: string = process.env.SITE_PHONE
  static siteLogo: string = this.siteUrl + 'images/logo-light.png'
}
