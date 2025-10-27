import express, { Application } from 'express'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import HttpMiddleware from '@/modules/http/http.middleware'
import { IAppController } from '@/modules/app/app.interface'
import path from 'path'
import cookieParser from 'cookie-parser'
import { doubleCsrfProtection } from '@/utils/csrf'
import mongodbDatabase from './database/mongodb.database'
import {
  currencyService,
  depositMethodService,
  itemsSettingsService,
  referralSettingsService,
  transferSettingsService,
  withdrawalMethodService,
} from './setup'
import { ICurrency } from './modules/currency/currency.interface'

class App {
  public express: Application

  constructor(
    public controllers: IAppController[],
    public port: number,
    private httpMiddleware: HttpMiddleware,
    private notTest: boolean,
    private database?: {
      mogodb?: string
    }
  ) {
    this.express = express()

    this.beforeStart().then(() => {
      this.initialiseMiddleware()
      this.initialiseControllers(controllers)
      this.initialiseStatic()
      this.initialiseErrorHandling()
    })
  }

  private initialiseMiddleware(): void {
    this.express.use(
      helmet({
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
      })
    )

    this.express.use((req, res, next) => {
      res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none')
      next()
    })

    this.express.use(
      cors({
        origin: [
          'http://localhost:5173',
          'http://localhost:5174',
          'http://localhost:5175',
          'http://localhost:5176',
        ],
        credentials: true,
      })
    )
    this.express.use(morgan('dev'))
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(compression())
    this.express.use(cookieParser())
    if (this.notTest) this.express.use(doubleCsrfProtection)
    this.express.get('/api/token', (req, res, next) => {
      res.json({ token: req.csrfToken && req.csrfToken() })
    })
  }

  private initialiseControllers(controllers: IAppController[]): void {
    controllers.forEach((controller: IAppController) => {
      this.express.use('/api', controller.router)
    })
  }

  private initialiseStatic(): void {
    this.express.use('/images', express.static(path.join(__dirname, 'images')))
    this.express.use(
      '/assets',
      express.static(path.join(__dirname, '..', 'src', 'frontend', 'assets'))
    )
    this.express.use(
      '/css',
      express.static(path.join(__dirname, '..', 'src', 'frontend', 'css'))
    )
    this.express.use(
      '/fonts',
      express.static(path.join(__dirname, '..', 'src', 'frontend', 'fonts'))
    )
    this.express.use(
      '/form',
      express.static(path.join(__dirname, '..', 'src', 'frontend', 'form'))
    )
    this.express.use(
      '/img',
      express.static(path.join(__dirname, '..', 'src', 'frontend', 'img'))
    )
    this.express.use(
      '/js',
      express.static(path.join(__dirname, '..', 'src', 'frontend', 'js'))
    )
    this.express.use(
      '/svg',
      express.static(path.join(__dirname, '..', 'src', 'frontend', 'svg'))
    )
    this.express.get(/.*/, (req, res, next) => {
      res.sendFile(path.join(__dirname, '..', 'src', 'frontend', 'index.html'))
    })
  }

  private initialiseErrorHandling(): void {
    this.express.use(this.httpMiddleware.handle404Error)
    this.express.use(
      this.httpMiddleware.handleThrownError.bind(this.httpMiddleware)
    )
  }

  private async initialiseDatabaseConnection(): Promise<void> {
    if (!this.database) return
    if (this.database.mogodb) mongodbDatabase(this.database.mogodb)
  }

  private async beforeStart(): Promise<void> {
    await this.initialiseDatabaseConnection()
    // TRANSFER SETTINGS
    const transferSettings = await transferSettingsService.get()
    if (!transferSettings && this.notTest) {
      await transferSettingsService.create(false, 0)
    }
    // REFERRAL SETTINGS
    const referralSettings = await referralSettingsService.get()
    if (!referralSettings && this.notTest) {
      await referralSettingsService.create(10, 5, 15, 10, 10, 10)
    }
    // ITEMS SETTINGS
    const itemSettings = await itemsSettingsService.get()
    if (!itemSettings && this.notTest) {
      await itemsSettingsService.create(false, 1)
    }
    // DEPOSIT METHOD
    const depositMethod = (await depositMethodService.fetchAll(false)).data
      ?.depositMethods.length
    if (!depositMethod && this.notTest) {
      let currency: ICurrency
      const currencies = (await currencyService.fetchAll()).data?.currencies
      currency = currencies?.find(
        (currency) => currency.name.toLowerCase() === 'ethereum'
      )!
      if (!currency) {
        currency = (await currencyService.create('Ethereum', 'ETH', 'eth.svg'))
          .data!.currency
      }
      await depositMethodService.create(
        currency._id,
        '---ETH ADDRESS---',
        'BEP20',
        0,
        1
      )
    }
    // WITHDRAWAL METHOD
    const withdrawalMethod = (await withdrawalMethodService.fetchAll(false))
      .data?.withdrawalMethods.length
    if (!withdrawalMethod && this.notTest) {
      let currency: ICurrency
      const currencies = (await currencyService.fetchAll()).data?.currencies
      currency = currencies?.find(
        (currency) => currency.name.toLowerCase() === 'ethereum'
      )!
      if (!currency) {
        currency = (await currencyService.create('Ethereum', 'ETH', 'eth.svg'))
          .data!.currency
      }
      await withdrawalMethodService.create(currency._id, 'BEP20', 0, 1)
    }
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listenig on port ${this.port}`)
    })
  }
}

export default App
