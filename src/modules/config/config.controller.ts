import { Service } from 'typedi'
import { NextFunction, Request, Response, Router } from 'express'
import { SiteConstants } from '@/modules/config/config.constants'
import { IAppController } from '@/modules/app/app.interface'
import { HttpResponseStatus } from '@/modules/http/http.enum'
import { IConfigConstants } from './config.interface'
import axios from 'axios'

@Service()
export default class ConfigController implements IAppController {
  public path = '/configurations'
  public router = Router()
  public ethereumRate = 4203.63

  constructor() {
    this.initialiseRoutes()
    this.getCoinsRate()
    setInterval(this.getCoinsRate, 10 * 60 * 1000)
  }

  private initialiseRoutes = (): void => {
    this.router.get(`${this.path}/constants`, this.getConstants)
  }

  private getCoinsRate = async () => {
    try {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      )

      if (res?.data?.ethereum?.usd) {
        this.ethereumRate = +res?.data?.ethereum?.usd || this.ethereumRate
        // console.log(this.ethereumRate)
      }
    } catch (error) {
      console.log(error)
    }
  }

  private getConstants = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const constants: IConfigConstants = {
      liveChatApi: SiteConstants.liveChatApi,
      siteName: SiteConstants.siteName,
      siteDomain: SiteConstants.siteDomain,
      siteApi: SiteConstants.siteApi,
      siteUrl: SiteConstants.siteUrl,
      baseImageUrl: SiteConstants.baseImageUrl,
      siteEmail: SiteConstants.siteEmail,
      siteAddress: SiteConstants.siteAddress,
      sitePhone: SiteConstants.sitePhone,
      ethereumRate: this.ethereumRate,
    }
    res.status(200).json({
      status: HttpResponseStatus.SUCCESS,
      message: 'Constants fetched',
      data: { constants },
    })
  }
}
