import { Inject, Service } from 'typedi'
import {
  IDeposit,
  IDepositObject,
  IDepositService,
} from '@/modules/deposit/deposit.interface'
import depositModel from '@/modules/deposit/deposit.model'
import ServiceToken from '@/utils/enums/serviceToken'
import { DepositStatus } from '@/modules/deposit/deposit.enum'
import {
  IDepositMethodObject,
  IDepositMethodService,
} from '@/modules/depositMethod/depositMethod.interface'
import { IUser, IUserObject, IUserService } from '@/modules/user/user.interface'
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
import userModel from '../user/user.model'
import { ObjectId } from 'mongoose'

@Service()
class DepositService implements IDepositService {
  private depositModel = depositModel
  private userModel = userModel

  public constructor(
    @Inject(ServiceToken.DEPOSIT_METHOD_SERVICE)
    private depositMethodService: IDepositMethodService,
    @Inject(ServiceToken.USER_SERVICE) private userService: IUserService,
    @Inject(ServiceToken.TRANSACTION_SERVICE)
    private transactionService: ITransactionService,
    @Inject(ServiceToken.REFERRAL_SERVICE)
    private referralService: IReferralService,
    @Inject(ServiceToken.NOTIFICATION_SERVICE)
    private notificationService: INotificationService,
    @Inject(ServiceToken.TRANSACTION_MANAGER_SERVICE)
    private transactionManagerService: ITransactionManagerService<any>
  ) {}

  private async find(
    depositId: ObjectId,
    fromAllAccounts: boolean = true,
    userId?: ObjectId
  ): Promise<IDeposit> {
    let deposit

    if (fromAllAccounts) {
      deposit = await this.depositModel
        .findById(depositId)
        .populate('user', 'username name profile isDeleted')
    } else {
      deposit = await this.depositModel
        .findOne({
          _id: depositId,
          user: userId,
        })
        .populate('user', 'username name profile isDeleted')
    }

    if (!deposit) throw new HttpException(404, 'Deposit transaction not found')

    return deposit
  }

  public async _createTransaction(
    user: IUserObject,
    depositMethod: IDepositMethodObject,
    amount: number
  ): TTransaction<IDepositObject, IDeposit> {
    const deposit = new this.depositModel({
      depositMethod: depositMethod._id,
      depositMethodObject: depositMethod,
      user: user._id,
      userObject: user,
      amount,
      fee: depositMethod.fee,
      status: DepositStatus.PENDING,
    })

    return {
      object: deposit.toObject({ getters: true }),
      instance: {
        model: deposit,
        onFailed: `Delete the deposit with an id of (${deposit._id})`,
        async callback() {
          await deposit.deleteOne()
        },
      },
    }
  }

  public async _updateStatusTransaction(
    depositId: ObjectId,
    status: DepositStatus
  ): TTransaction<IDepositObject, IDeposit> {
    const deposit = await this.find(depositId)

    const oldStatus = deposit.status

    if (oldStatus !== DepositStatus.PENDING)
      throw new HttpException(400, 'Deposit as already been settled')

    deposit.status = status

    return {
      object: deposit.toObject({ getters: true }),
      instance: {
        model: deposit,
        onFailed: `Set the status of the deposit with an id of (${deposit._id}) to (${oldStatus})`,
        callback: async () => {
          deposit.status = oldStatus
          await deposit.save()
        },
      },
    }
  }

  public create = async (
    depositMethodId: ObjectId,
    userId: ObjectId,
    amount: number
  ): THttpResponse<{ deposit: IDeposit }> => {
    try {
      const depositMethod = await this.depositMethodService.get(depositMethodId)

      if (depositMethod.minDeposit > amount)
        throw new HttpException(
          400,
          'Amount is lower than the min deposit of the selected deposit method'
        )

      const user = await this.userService.get(userId)

      const transactionInstances: ITransactionInstance<any>[] = []

      const { object: deposit, instance: depositInstance } =
        await this._createTransaction(user, depositMethod, amount)

      transactionInstances.push(depositInstance)

      const transactionInstance = await this.transactionService.create(
        user,
        deposit.status,
        TransactionCategory.DEPOSIT,
        deposit,
        amount,
        UserEnvironment.LIVE
      )

      transactionInstances.push(transactionInstance)

      const adminNotification = await this.notificationService.create(
        `${
          user.username
        } just made a deposit request of ${formatNumber.toDollar(
          amount
        )} awaiting for your approval`,
        NotificationCategory.DEPOSIT,
        deposit,
        NotificationForWho.ADMIN,
        deposit.status,
        UserEnvironment.LIVE
      )

      transactionInstances.push(adminNotification)

      await this.transactionManagerService.execute(transactionInstances)

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Deposit has been registered successfully',
        data: { deposit: depositInstance.model },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to register this deposit, please try again'
      )
    }
  }

  public delete = async (
    depositId: ObjectId
  ): THttpResponse<{ deposit: IDeposit }> => {
    try {
      const deposit = await this.find(depositId)

      if (deposit.status === DepositStatus.PENDING)
        throw new HttpException(400, 'Deposit has not been settled yet')

      await deposit.deleteOne()
      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Deposit deleted successfully',
        data: { deposit },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to delete this deposit, please try again'
      )
    }
  }

  public updateStatus = async (
    depositId: ObjectId,
    status: DepositStatus
  ): THttpResponse<{ deposit: IDeposit }> => {
    try {
      const transactionInstances: ITransactionInstance<any>[] = []

      const { object: deposit, instance: depositInstance } =
        await this._updateStatusTransaction(depositId, status)

      transactionInstances.push(depositInstance)

      let user: IUserObject
      if (status === DepositStatus.APPROVED) {
        const userTransaction = await this.userService.fund(
          deposit.user._id,
          UserAccount.MAIN_BALANCE,
          deposit.amount - deposit.fee
        )

        user = userTransaction.object
        const userInstance = userTransaction.instance

        transactionInstances.push(userInstance)

        const referralInstances = await this.referralService.create(
          ReferralTypes.DEPOSIT,
          user,
          deposit.amount
        )

        referralInstances.forEach((instance) => {
          transactionInstances.push(instance)
        })
      } else {
        user = await this.userService.get(deposit.user._id)
      }

      const transactionInstance = await this.transactionService.updateStatus(
        deposit._id,
        status
      )

      transactionInstances.push(transactionInstance)

      const notificationInstance = await this.notificationService.create(
        `Your deposit of ${formatNumber.toDollar(
          deposit.amount
        )} was ${status}`,
        NotificationCategory.DEPOSIT,
        deposit,
        NotificationForWho.USER,
        status,
        UserEnvironment.LIVE,
        user
      )

      transactionInstances.push(notificationInstance)

      await this.transactionManagerService.execute(transactionInstances)

      const rawDepositIntance = await depositInstance.model

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Status updated successfully',
        data: { deposit: rawDepositIntance },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to update this deposit  status, please try again'
      )
    }
  }

  public fetch = async (
    fromAllAccounts: boolean,
    depositId: ObjectId,
    userId?: ObjectId
  ): THttpResponse<{ deposit: IDeposit }> => {
    try {
      const deposit = await this.find(depositId, fromAllAccounts, userId)

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Deposit fetched successfully',
        data: { deposit },
      }
    } catch (err: any) {
      throw new AppException(err, 'Failed to fetch deposit, please try again')
    }
  }

  public fetchAll = async (
    all: boolean,
    userId: ObjectId
  ): THttpResponse<{ deposits: IDeposit[] }> => {
    try {
      let deposits

      if (all) {
        deposits = await this.depositModel
          .find()
          .sort({ createdAt: -1 })
          .select('-userObject -depositMethod')
          .populate('user', 'username name profile isDeleted')
      } else {
        deposits = await this.depositModel
          .find({ user: userId })
          .sort({ createdAt: -1 })
          .select('-userObject -depositMethod')
      }

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Deposit history fetched successfully',
        data: { deposits },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to fetch deposit history, please try again'
      )
    }
  }
}

export default DepositService
