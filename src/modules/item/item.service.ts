import { ITradeObject } from '@/modules/trade/trade.interface'
import { Inject, Service } from 'typedi'
import { IItem, IItemObject, IItemService } from '@/modules/item/item.interface'
import itemModel from '@/modules/item/item.model'
import ServiceToken from '@/utils/enums/serviceToken'
import { ItemOwnership, ItemStatus } from '@/modules/item/item.enum'
import { IPlanObject, IPlanService } from '@/modules/plan/plan.interface'
import { IUserObject, IUserService } from '@/modules/user/user.interface'
import { ITransactionService } from '@/modules/transaction/transaction.interface'
import { TransactionCategory } from '@/modules/transaction/transaction.enum'
import { IReferralService } from '@/modules/referral/referral.interface'
import { INotificationService } from '@/modules/notification/notification.interface'
import formatNumber from '@/utils/formats/formatNumber'
import {
  NotificationCategory,
  NotificationForWho,
} from '@/modules/notification/notification.enum'
import { ReferralTypes } from '@/modules/referral/referral.enum'
import {
  ITransactionInstance,
  ITransactionManagerService,
} from '@/modules/transactionManager/transactionManager.interface'
import { UserAccount, UserEnvironment } from '@/modules/user/user.enum'
import { THttpResponse } from '@/modules/http/http.type'
import HttpException from '@/modules/http/http.exception'
import { HttpResponseStatus } from '@/modules/http/http.enum'
import AppException from '@/modules/app/app.exception'
import { TTransaction } from '@/modules/transactionManager/transactionManager.type'
import FormatNumber from '@/utils/formats/formatNumber'
import { TUpdateItemStatus } from './item.type'
import { ForecastStatus } from '../forecast/forecast.enum'
import { ObjectId } from 'mongoose'
import { ErrorCode } from '@/utils/enums/errorCodes.enum'
import tradeModel from '../trade/trade.model'
import { IMathService } from '../math/math.interface'
import ImageUploader from '../imageUploader/imageUploader'
import { IItemSettingsService } from '../itemSettings/itemSettings.interface'
import { ImageUploaderSizes } from '../imageUploader/imageUploader.enum'

@Service()
class ItemService implements IItemService {
  private itemModel = itemModel
  private imageUploader = new ImageUploader()
  public static itemImageSizes = [
    ImageUploaderSizes.ITEM_VIEW,
    ImageUploaderSizes.ITEM_COVER,
    ImageUploaderSizes.ITEM_HERO,
    ImageUploaderSizes.ITEM_PROFILE,
  ]

  public constructor(
    @Inject(ServiceToken.ITEM_SETTINGS_SERVICE)
    private itemSettingsService: IItemSettingsService,
    @Inject(ServiceToken.USER_SERVICE) private userService: IUserService,
    @Inject(ServiceToken.TRANSACTION_SERVICE)
    private transactionService: ITransactionService,
    @Inject(ServiceToken.NOTIFICATION_SERVICE)
    private notificationService: INotificationService,
    @Inject(ServiceToken.REFERRAL_SERVICE)
    private referralService: IReferralService,
    @Inject(ServiceToken.MATH_SERVICE)
    private mathService: IMathService,
    @Inject(ServiceToken.TRANSACTION_MANAGER_SERVICE)
    private transactionManagerService: ITransactionManagerService<any>
  ) {}

  private async find(
    itemId: ObjectId,
    fromAllAccounts: boolean = true,
    userId?: ObjectId
  ): Promise<IItem> {
    let item

    if (fromAllAccounts) {
      item = await this.itemModel
        .findById(itemId)
        .select('-userObject')
        .populate('user', 'username profile name isDeleted')
    } else {
      item = await this.itemModel
        .findOne({
          _id: itemId,
          user: userId,
        })
        .select('-userObject')
        .populate('user', 'username profile name isDeleted')
    }

    if (!item) throw new HttpException(404, 'item not found')

    return item
  }

  private async deleteCover(item: IItem) {
    const itemHasClonedCover =
      (await this.itemModel
        .count({ firstOne: item.firstOne, cover: item.cover })
        .exec()) > 1

    if (!itemHasClonedCover)
      this.imageUploader.delete('item', item.cover, ItemService.itemImageSizes)
  }

  public async get(itemId: ObjectId): Promise<IItemObject> {
    return (await this.find(itemId)).toObject({ getters: true })
  }

  public async _createTransaction(
    user: IUserObject,
    seller: IUserObject,
    buyer: IUserObject,
    cover: string,
    title: string,
    description: string,
    status: ItemStatus,
    amount: number,
    gasFee: number,
    ownership: ItemOwnership,
    firstOne?: ObjectId
  ): TTransaction<IItemObject, IItem> {
    const item = new this.itemModel({
      user: user._id,
      userObject: user,
      seller: seller._id,
      sellerObject: seller,
      buyer: buyer._id,
      buyerObject: buyer,
      title,
      cover,
      description,
      purchasedAmount: amount,
      amount,
      gasFee,
      status,
      ownership,
      dateOwned: new Date(),
    })

    item.firstOne = firstOne ? firstOne : item._id

    return {
      object: item.toObject({ getters: true }),
      instance: {
        model: item,
        onFailed: `Delete the item with an id of (${item._id})`,
        async callback() {
          await item.deleteOne()
        },
      },
    }
  }

  public async _purchaseTransaction(
    itemId: ObjectId,
    buyerObject: IUserObject
  ): TTransaction<IItemObject, IItem> {
    const item = await this.find(itemId)

    const oldBuyer = item.buyer
    const oldBuyerObject = JSON.parse(JSON.stringify(item.buyerObject))
    const oldStatus = item.status

    if (oldStatus === ItemStatus.SOLD)
      throw new HttpException(
        ErrorCode.BAD_REQUEST,
        'Item has already been sold'
      )

    item.buyer = buyerObject._id
    item.buyerObject = buyerObject
    item.status = ItemStatus.SOLD

    return {
      object: item.toObject({ getters: true }),
      instance: {
        model: item,
        onFailed: `working on`,
        async callback() {
          item.buyer = oldBuyer
          item.buyerObject = oldBuyerObject
          item.status = oldStatus

          await item.save()
        },
      },
    }
  }

  public async _sellTransaction(
    itemId: ObjectId,
    amount: number,
    isAdmin: boolean,
    userId?: ObjectId
  ): TTransaction<IItemObject, IItem> {
    const item = await this.find(itemId, isAdmin, userId)

    const oldStatus = item.status
    const oldAmount = item.amount

    if (oldStatus === ItemStatus.ON_SALE)
      throw new HttpException(ErrorCode.BAD_REQUEST, 'Item is already on sale')

    item.amount = amount
    item.status = ItemStatus.ON_SALE

    return {
      object: item.toObject({ getters: true }),
      instance: {
        model: item,
        onFailed: `working on`,
        async callback() {
          item.status = oldStatus
          item.amount = oldAmount
          await item.save()
        },
      },
    }
  }

  public create = async (
    isAdmin: boolean,
    userId: ObjectId,
    cover: string,
    title: string,
    description: string,
    amount: number
  ): THttpResponse<{ item: IItem }> => {
    try {
      const transactionInstances: ITransactionInstance<any>[] = []

      const itemSettings = await this.itemSettingsService.get()

      const gasFee = itemSettings ? itemSettings.fee : 1

      let user

      if (isAdmin) {
        user = await this.userService.get(userId)
      } else {
        // User Transaction Instance
        const { instance: userInstance, object: userObject } =
          await this.userService.fund(
            userId,
            UserAccount.MAIN_BALANCE,
            -gasFee,
            undefined,
            'You do not have sufficient funds to pay for gas fee'
          )
        transactionInstances.push(userInstance)
        user = userObject
      }

      // item Transaction Instance
      const { instance: itemInstance, object: item } =
        await this._createTransaction(
          user,
          user,
          user,
          cover,
          title,
          description,
          ItemStatus.ON_SALE,
          amount,
          gasFee,
          ItemOwnership.CREATED
        )
      transactionInstances.push(itemInstance)

      // Transaction Transaction Instance
      const transactionInstance = await this.transactionService.create(
        user,
        ItemStatus.CREATED,
        TransactionCategory.ITEM_CREATED,
        item,
        amount,
        UserEnvironment.LIVE,
        amount
      )
      transactionInstances.push(transactionInstance)

      // Notification Transaction Instance
      const userNotificationInstance = await this.notificationService.create(
        `Your item was created successfully`,
        NotificationCategory.ITEM_CREATED,
        item,
        NotificationForWho.USER,
        ItemStatus.CREATED,
        UserEnvironment.LIVE,
        user
      )
      transactionInstances.push(userNotificationInstance)

      // Admin Notification Transaction Instance
      const adminNotificationInstance = await this.notificationService.create(
        `${user.username} just created a new item`,
        NotificationCategory.ITEM_CREATED,
        item,
        NotificationForWho.ADMIN,
        ItemStatus.CREATED,
        UserEnvironment.LIVE
      )
      transactionInstances.push(adminNotificationInstance)

      await this.transactionManagerService.execute(transactionInstances)

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'item has been registered successfully',
        data: {
          item: await itemInstance.model.populate(
            'user',
            'username profile name isDeleted'
          ),
        },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to register this item, please try again'
      )
    }
  }

  public purchase = async (
    itemId: ObjectId,
    buyerId: ObjectId
  ): THttpResponse<{ item: IItem }> => {
    try {
      const transactionInstances: ITransactionInstance<any>[] = []

      const item = await this.get(itemId)

      if (item.status === ItemStatus.SOLD)
        throw new HttpException(
          ErrorCode.BAD_REQUEST,
          'Item has already been sold'
        )

      if (item.status !== ItemStatus.ON_SALE)
        throw new HttpException(
          ErrorCode.BAD_REQUEST,
          'This item is not yet for sale'
        )

      const sellerId = item.user._id
      const amount = item.amount

      if (sellerId.toString() === buyerId.toString())
        throw new HttpException(
          ErrorCode.BAD_REQUEST,
          'You cannot purchase your own item'
        )

      // buyer Transaction Instance
      const { instance: buyerInstance, object: buyerObject } =
        await this.userService.fund(buyerId, UserAccount.MAIN_BALANCE, -amount)
      transactionInstances.push(buyerInstance)

      // sold item transaction
      const { instance: soldItemInstance, object: soldItemObject } =
        await this._purchaseTransaction(itemId, buyerObject)
      transactionInstances.push(soldItemInstance)

      // Seller Transaction Instance
      const { instance: sellerInstance, object: sellerObject } =
        await this.userService.fund(sellerId, UserAccount.MAIN_BALANCE, amount)
      transactionInstances.push(sellerInstance)

      // item Transaction Instance
      const { instance: boughtItemInstance, object: boughtItemObject } =
        await this._createTransaction(
          buyerObject,
          sellerObject,
          buyerObject,
          soldItemObject.cover,
          soldItemObject.title,
          soldItemObject.description,
          ItemStatus.BOUGHT,
          amount,
          soldItemObject.gasFee,
          ItemOwnership.COLLECTED,
          soldItemObject._id
        )
      transactionInstances.push(boughtItemInstance)

      // seller Transaction Transaction Instance
      const sellerTransactionInstance = await this.transactionService.create(
        sellerObject,
        ItemStatus.SOLD,
        TransactionCategory.ITEM_SOLD,
        soldItemObject,
        amount,
        UserEnvironment.LIVE,
        amount
      )
      transactionInstances.push(sellerTransactionInstance)

      // buyer Transaction Transaction Instance
      const buyerTransactionInstance = await this.transactionService.create(
        buyerObject,
        ItemStatus.BOUGHT,
        TransactionCategory.ITEM_BOUGHT,
        boughtItemObject,
        amount,
        UserEnvironment.LIVE,
        amount
      )
      transactionInstances.push(buyerTransactionInstance)

      // Seller Notification Transaction Instance
      const sellerNotificationInstance = await this.notificationService.create(
        `Your item ("${boughtItemObject.title}") was purchased by ${buyerObject.username}`,
        NotificationCategory.ITEM_SOLD,
        soldItemObject,
        NotificationForWho.USER,
        ItemStatus.SOLD,
        UserEnvironment.LIVE,
        sellerObject
      )
      transactionInstances.push(sellerNotificationInstance)

      // buyer Notification Transaction Instance
      const buyerNotificationInstance = await this.notificationService.create(
        `Your purchase of "${boughtItemObject.title}" was successfull`,
        NotificationCategory.ITEM_BOUGHT,
        boughtItemObject,
        NotificationForWho.USER,
        ItemStatus.BOUGHT,
        UserEnvironment.LIVE,
        buyerObject
      )
      transactionInstances.push(buyerNotificationInstance)

      // Admin Notification Transaction Instance
      const adminNotificationInstance = await this.notificationService.create(
        `${buyerObject.username} just purchased item ("${boughtItemObject.title}") from ${sellerObject.username}`,
        NotificationCategory.ITEM_BOUGHT,
        boughtItemObject,
        NotificationForWho.ADMIN,
        ItemStatus.BOUGHT,
        UserEnvironment.LIVE
      )
      transactionInstances.push(adminNotificationInstance)

      await this.transactionManagerService.execute(transactionInstances)

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'item has been purchased successfully',
        data: { item: boughtItemInstance.model },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to purchase this item, please try again'
      )
    }
  }

  public update = async (
    itemId: ObjectId,
    cover: string,
    title: string,
    description: string,
    amount: number
  ): THttpResponse<{ item: IItem }> => {
    try {
      const item = await this.find(itemId)

      if (cover) {
        await this.deleteCover(item)
        item.cover = cover
      }

      item.title = title
      item.description = description
      item.amount = amount

      await item.save()

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'item has been updated successfully',
        data: { item },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to register this item, please try again'
      )
    }
  }

  public updateStatus = async (
    itemId: ObjectId,
    status: ItemStatus
  ): THttpResponse<{ item: IItem }> => {
    try {
      const item = await this.find(itemId)

      const oldStatus = item.status

      if (oldStatus === ItemStatus.SOLD)
        throw new HttpException(400, 'Item has already been sold')

      item.status = status

      await item.save()

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Status updated successfully',
        data: { item },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to update this item  status, please try again'
      )
    }
  }

  public feature = async (
    itemId: ObjectId,
    featuring: boolean
  ): THttpResponse<{ item: IItem }> => {
    try {
      const item = await this.find(itemId)

      item.featured = featuring

      if (featuring) {
        item.dateFeatured = new Date()
      } else {
        item.dateFeatured = undefined
      }

      await item.save()

      return {
        status: HttpResponseStatus.SUCCESS,
        message: `Item has been ${
          featuring ? 'featured' : 'unfeatured'
        } successfully`,
        data: { item },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        `Failed to ${
          featuring ? 'featured' : 'unfeatured'
        } this item  status, please try again`
      )
    }
  }

  public recommend = async (
    itemId: ObjectId,
    recommended: boolean
  ): THttpResponse<{ item: IItem }> => {
    try {
      const item = await this.find(itemId)

      item.recommended = recommended

      if (recommended) {
        item.dateRecommended = new Date()
      } else {
        item.dateRecommended = undefined
      }

      await item.save()

      return {
        status: HttpResponseStatus.SUCCESS,
        message: `Item has been ${
          recommended ? 'recommended' : 'unrecommended'
        } successfully`,
        data: { item },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        `Failed to ${
          recommended ? 'recommended' : 'unrecommended'
        } this item  status, please try again`
      )
    }
  }

  public sell = async (
    itemId: ObjectId,
    isAdmin: boolean,
    amount: number,
    userId?: ObjectId
  ): THttpResponse<{ item: IItem }> => {
    try {
      const transactionInstances: ITransactionInstance<any>[] = []

      const itemSettings = await this.itemSettingsService.get()

      const gasFee = itemSettings ? itemSettings.fee : 1

      const { instance: sellItemInstance, object: sellItemObject } =
        await this._sellTransaction(itemId, amount, isAdmin, userId)
      transactionInstances.push(sellItemInstance)

      if (userId) {
        // User Transaction Instance
        const { instance: userInstance, object: userObject } =
          await this.userService.fund(
            userId,
            UserAccount.MAIN_BALANCE,
            -gasFee,
            undefined,
            'You do not have sufficient funds to pay for gas fee'
          )
        transactionInstances.push(userInstance)
      }

      await this.transactionManagerService.execute(transactionInstances)

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'item has been registered successfully',
        data: { item: sellItemInstance.model },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to register this item, please try again'
      )
    }
  }

  public delete = async (itemId: ObjectId): THttpResponse<{ item: IItem }> => {
    try {
      const item = await this.find(itemId)

      this.deleteCover(item)

      await this.itemModel.deleteOne({ _id: item._id })

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'item deleted successfully',
        data: { item },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to delete this item, please try again'
      )
    }
  }

  public fetchAll = async (
    all: boolean,
    userId: ObjectId
  ): THttpResponse<{ items: IItem[] }> => {
    try {
      let items

      if (all) {
        items = await this.itemModel
          .find()
          .sort({ dateOwned: -1 })
          .select('-userObject')
          .populate('user', 'username profile name isDeleted')
      } else {
        items = await this.itemModel
          .find({ user: userId })
          .sort({ dateOwned: -1 })
          .select('-userObject')
          .populate('user', 'username profile name isDeleted')
      }

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'item history fetched successfully',
        data: { items },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to fetch item history, please try again'
      )
    }
  }
}

export default ItemService
