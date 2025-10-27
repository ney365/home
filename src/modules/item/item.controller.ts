import { IItemService } from '@/modules/item/item.interface'
import { Inject, Service } from 'typedi'
import { Router, Request, Response, NextFunction } from 'express'
import validate from '@/modules/item/item.validation'
import ServiceToken from '@/utils/enums/serviceToken'
import { IAppController } from '@/modules/app/app.interface'
import HttpMiddleware from '@/modules/http/http.middleware'
import { UserEnvironment, UserRole } from '@/modules/user/user.enum'
import HttpException from '@/modules/http/http.exception'
import { ObjectId } from 'mongoose'
import ImageUploader from '../imageUploader/imageUploader'
import ItemService from './item.service'
import { ErrorCode } from '@/utils/enums/errorCodes.enum'

@Service()
class ItemController implements IAppController {
  public path = '/item'
  public router = Router()
  private imageUploader = new ImageUploader()

  constructor(
    @Inject(ServiceToken.ITEM_SERVICE)
    private itemService: IItemService
  ) {
    this.intialiseRoutes()
  }

  private intialiseRoutes(): void {
    this.router.post(
      `${this.path}/create`,
      HttpMiddleware.authenticate(UserRole.USER),
      this.imageUploader.setNames([{ name: 'item', maxCount: 1 }]),
      HttpMiddleware.validate(validate.create),
      this.imageUploader.resize(['item'], ItemService.itemImageSizes),
      this.create(false)
    )

    this.router.post(
      `${this.path}/create/master`,
      HttpMiddleware.authenticate(UserRole.USER),
      this.imageUploader.setNames([{ name: 'item', maxCount: 1 }]),
      HttpMiddleware.validate(validate.masterCreate),
      this.imageUploader.resize(['item'], ItemService.itemImageSizes),
      this.create(true)
    )

    this.router.put(
      `${this.path}/update`,
      HttpMiddleware.authenticate(UserRole.ADMIN),
      this.imageUploader.setNames([{ name: 'item', maxCount: 1 }]),
      HttpMiddleware.validate(validate.update),
      this.imageUploader.resize(['item'], ItemService.itemImageSizes),
      this.update
    )

    this.router.post(
      `${this.path}/purchase`,
      HttpMiddleware.authenticate(UserRole.USER),
      HttpMiddleware.validate(validate.purchase),
      this.purchase
    )

    this.router.post(
      `${this.path}/sell`,
      HttpMiddleware.authenticate(UserRole.USER),
      HttpMiddleware.validate(validate.sell),
      this.sell(false)
    )

    this.router.post(
      `${this.path}/sell/master`,
      HttpMiddleware.authenticate(UserRole.ADMIN),
      HttpMiddleware.validate(validate.sell),
      this.sell(true)
    )

    this.router.patch(
      `${this.path}/update-status`,
      HttpMiddleware.authenticate(UserRole.ADMIN),
      HttpMiddleware.validate(validate.updateStatus),
      this.updateStatus
    )

    this.router.patch(
      `${this.path}/feature`,
      HttpMiddleware.authenticate(UserRole.ADMIN),
      HttpMiddleware.validate(validate.feature),
      this.feature
    )

    this.router.patch(
      `${this.path}/recommend`,
      HttpMiddleware.authenticate(UserRole.ADMIN),
      HttpMiddleware.validate(validate.recommend),
      this.recommend
    )

    this.router.delete(
      `${this.path}/delete/:itemId`,
      HttpMiddleware.authenticate(UserRole.ADMIN),
      this.delete
    )

    // this.router.get(
    //   `${this.path}/master`,
    //   HttpMiddleware.authenticate(UserRole.ADMIN),
    //   this.fetchAll(true)
    // )

    this.router.get(`${this.path}`, this.fetchAll(true))
  }

  private fetchAll =
    (all: boolean) =>
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      try {
        const response = await this.itemService.fetchAll(all)
        res.status(200).json(response)
      } catch (err: any) {
        next(new HttpException(err.status, err.message, err.statusStrength))
      }
    }

  private create =
    (isAdmin: boolean) =>
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      let itemName
      try {
        const {
          userId,
          title,
          description,
          amount,
          item: itemImages,
        } = req.body

        if (!itemImages)
          throw new HttpException(ErrorCode.BAD_REQUEST, 'Image is required')

        const [{ name: cover }] = itemImages

        itemName = cover
        const user_Id = isAdmin ? userId : req.user._id
        const response = await this.itemService.create(
          isAdmin,
          user_Id,
          cover,
          title,
          description,
          amount
        )
        res.status(201).json(response)
      } catch (err: any) {
        if (itemName)
          this.imageUploader.delete(
            'item',
            itemName,
            ItemService.itemImageSizes
          )
        next(new HttpException(err.status, err.message, err.statusStrength))
      }
    }

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    let itemName
    try {
      const { itemId, title, description, amount, item: itemImages } = req.body

      let item
      if (itemImages) {
        ;[{ name: item }] = itemImages
      }

      itemName = item
      const response = await this.itemService.update(
        itemId,
        item,
        title,
        description,
        amount
      )
      res.status(201).json(response)
    } catch (err: any) {
      if (itemName)
        this.imageUploader.delete('item', itemName, ItemService.itemImageSizes)
      next(new HttpException(err.status, err.message, err.statusStrength))
    }
  }

  private purchase = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { itemId } = req.body
      const userId = req.user._id
      const response = await this.itemService.purchase(itemId, userId)
      res.status(200).json(response)
    } catch (err: any) {
      next(new HttpException(err.status, err.message, err.statusStrength))
    }
  }

  private sell =
    (isAdmin: boolean) =>
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      try {
        const { itemId, amount } = req.body
        const userId = req.user._id
        const response = await this.itemService.sell(
          itemId,
          isAdmin,
          amount,
          userId
        )
        res.status(200).json(response)
      } catch (err: any) {
        next(new HttpException(err.status, err.message, err.statusStrength))
      }
    }

  private updateStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { itemId, status } = req.body
      const response = await this.itemService.updateStatus(itemId, status)
      res.status(200).json(response)
    } catch (err: any) {
      next(new HttpException(err.status, err.message, err.statusStrength))
    }
  }

  private feature = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { itemId, featured } = req.body
      const response = await this.itemService.feature(itemId, featured)
      res.status(200).json(response)
    } catch (err: any) {
      next(new HttpException(err.status, err.message, err.statusStrength))
    }
  }

  private recommend = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { itemId, recommended } = req.body
      const response = await this.itemService.recommend(itemId, recommended)
      res.status(200).json(response)
    } catch (err: any) {
      next(new HttpException(err.status, err.message, err.statusStrength))
    }
  }

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const itemId = req.params.itemId as unknown as ObjectId
      const response = await this.itemService.delete(itemId)
      res.status(200).json(response)
    } catch (err: any) {
      next(new HttpException(err.status, err.message, err.statusStrength))
    }
  }
}

export default ItemController
