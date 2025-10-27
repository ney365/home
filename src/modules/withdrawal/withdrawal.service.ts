import { Inject, Service } from 'typedi'
import {
  IWithdrawal,
  IWithdrawalObject,
  IWithdrawalService,
} from '@/modules/withdrawal/withdrawal.interface'
import withdrawalModel from '@/modules/withdrawal/withdrawal.model'
import ServiceToken from '@/utils/enums/serviceToken'
import { WithdrawalStatus } from '@/modules/withdrawal/withdrawal.enum'
import {
  IWithdrawalMethodObject,
  IWithdrawalMethodService,
} from '@/modules/withdrawalMethod/withdrawalMethod.interface'
import { IUser, IUserObject, IUserService } from '@/modules/user/user.interface'
import {
  ITransaction,
  ITransactionService,
} from '@/modules/transaction/transaction.interface'
import { TransactionCategory } from '@/modules/transaction/transaction.enum'
import {
  INotification,
  INotificationService,
} from '@/modules/notification/notification.interface'
import formatNumber from '@/utils/formats/formatNumber'
import {
  NotificationCategory,
  NotificationForWho,
} from '@/modules/notification/notification.enum'
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
class WithdrawalService implements IWithdrawalService {
  private withdrawalModel = withdrawalModel
  private userModel = userModel

  public constructor(
    @Inject(ServiceToken.WITHDRAWAL_METHOD_SERVICE)
    private withdrawalMethodService: IWithdrawalMethodService,
    @Inject(ServiceToken.USER_SERVICE) private userService: IUserService,
    @Inject(ServiceToken.TRANSACTION_SERVICE)
    private transactionService: ITransactionService,
    @Inject(ServiceToken.NOTIFICATION_SERVICE)
    private notificationService: INotificationService,
    @Inject(ServiceToken.TRANSACTION_MANAGER_SERVICE)
    private transactionManagerService: ITransactionManagerService<any>
  ) {}

  private find = async (
    withdrawalId: ObjectId,
    fromAllAccounts: boolean = true,
    userId?: ObjectId
  ): Promise<IWithdrawal> => {
    let withdrawal

    if (fromAllAccounts) {
      withdrawal = await this.withdrawalModel
        .findById(withdrawalId)
        .populate('user', 'username isDeleted')
    } else {
      withdrawal = await this.withdrawalModel.findOne({
        _id: withdrawalId,
        user: userId,
      })
    }

    if (!withdrawal)
      throw new HttpException(404, 'Withdrawal transaction not found')

    return withdrawal
  }

  public async _updateStatusTransaction(
    withdrawalId: ObjectId,
    status: WithdrawalStatus
  ): TTransaction<IWithdrawalObject, IWithdrawal> {
    const withdrawal = await this.find(withdrawalId)

    if (!Object.values(WithdrawalStatus).includes(status))
      throw new HttpException(400, 'Invalid withdrawal status')

    const oldStatus = withdrawal.status

    if (oldStatus !== WithdrawalStatus.PENDING)
      throw new HttpException(400, 'Withdrawal as already been settled')

    withdrawal.status = status

    return {
      object: withdrawal.toObject({ getters: true }),
      instance: {
        model: withdrawal,
        onFailed: `Set the status of the withdrawal with an id of (${withdrawal._id}) to (${oldStatus})`,
        callback: async () => {
          withdrawal.status = oldStatus
          await withdrawal.save()
        },
      },
    }
  }

  public async _createTransaction(
    withdrawalMethod: IWithdrawalMethodObject,
    user: IUserObject,
    account: UserAccount,
    address: string,
    amount: number
  ): TTransaction<IWithdrawalObject, IWithdrawal> {
    const withdrawal = new this.withdrawalModel({
      withdrawalMethod: withdrawalMethod._id,
      withdrawalMethodObject: withdrawalMethod,
      user: user._id,
      userObject: user,
      account,
      address,
      amount,
      fee: withdrawalMethod.fee,
      status: WithdrawalStatus.PENDING,
    })

    return {
      object: withdrawal.toObject({ getters: true }),
      instance: {
        model: withdrawal,
        onFailed: `Delete the withdrawal with an id of (${withdrawal._id})`,
        async callback() {
          await withdrawal.deleteOne()
        },
      },
    }
  }

  public create = async (
    withdrawalMethodId: ObjectId,
    userId: ObjectId,
    account: UserAccount,
    address: string,
    amount: number
  ): THttpResponse<{ withdrawal: IWithdrawal }> => {
    try {
      const withdrawalMethod = await this.withdrawalMethodService.get(
        withdrawalMethodId
      )

      if (!withdrawalMethod)
        throw new HttpException(404, 'Withdrawal method not found')

      if (withdrawalMethod.minWithdrawal > amount)
        throw new HttpException(
          400,
          'Amount is lower than the min withdrawal of the selected withdrawal method'
        )

      const transactionInstances: ITransactionInstance<any>[] = []

      const userTransaction = await this.userService.fund(
        userId,
        account,
        -(amount + withdrawalMethod.fee)
      )

      transactionInstances.push(userTransaction.instance)

      const user = userTransaction.object

      const { object: withdrawal, instance: withdrawalInstance } =
        await this._createTransaction(
          withdrawalMethod,
          user,
          account,
          address,
          amount
        )
      transactionInstances.push(withdrawalInstance)

      const transaction = await this.transactionService.create(
        user,
        withdrawal.status,
        TransactionCategory.WITHDRAWAL,
        withdrawal,
        amount,
        UserEnvironment.LIVE
      )
      transactionInstances.push(transaction)

      const adminNotification = await this.notificationService.create(
        `${
          user.username
        } just made a withdrawal request of ${formatNumber.toDollar(
          amount
        )} awaiting for your approval`,
        NotificationCategory.WITHDRAWAL,
        withdrawal,
        NotificationForWho.ADMIN,
        withdrawal.status,
        UserEnvironment.LIVE
      )
      transactionInstances.push(adminNotification)

      await this.transactionManagerService.execute(transactionInstances)

      const rawWithdrawalIntance = withdrawalInstance.model

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Withdrawal has been registered successfully',
        data: { withdrawal: rawWithdrawalIntance },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to register this withdrawal, please try again'
      )
    }
  }

  public async get(
    withdrawalId: ObjectId,
    fromAllAccounts: boolean = true,
    userId?: ObjectId
  ): Promise<IWithdrawalObject> {
    return (await this.find(withdrawalId, fromAllAccounts, userId)).toObject()
  }

  public delete = async (
    withdrawalId: ObjectId
  ): THttpResponse<{ withdrawal: IWithdrawal }> => {
    try {
      const withdrawal = await this.find(withdrawalId)

      if (withdrawal.status === WithdrawalStatus.PENDING)
        throw new HttpException(400, 'Withdrawal has not been settled yet')

      await withdrawal.deleteOne()
      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Withdrawal deleted successfully',
        data: { withdrawal },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to delete this withdrawal, please try again'
      )
    }
  }

  public updateStatus = async (
    withdrawalId: ObjectId,
    status: WithdrawalStatus
  ): THttpResponse<{ withdrawal: IWithdrawal }> => {
    try {
      const transactionInstances: ITransactionInstance<any>[] = []

      const { instance: withdrawalInstance, object: withdrawal } =
        await this._updateStatusTransaction(withdrawalId, status)

      transactionInstances.push(withdrawalInstance)

      const transactionInstance = await this.transactionService.updateStatus(
        withdrawal._id,
        status
      )

      transactionInstances.push(transactionInstance)

      let user

      if (status === WithdrawalStatus.CANCELLED) {
        const fundedUserTransaction = await this.userService.fund(
          withdrawal.user._id,
          withdrawal.account,
          withdrawal.amount + withdrawal.fee
        )

        transactionInstances.push(fundedUserTransaction.instance)

        user = fundedUserTransaction.object
      } else {
        user = await this.userService.get(withdrawal.user._id)
      }

      const sendingNotification = await this.notificationService.create(
        `Your withdrawal of ${formatNumber.toDollar(
          withdrawal.amount
        )} was ${status}`,
        NotificationCategory.WITHDRAWAL,
        withdrawal,
        NotificationForWho.USER,
        status,
        UserEnvironment.LIVE,
        user
      )
      transactionInstances.push(sendingNotification)

      await this.transactionManagerService.execute(transactionInstances)

      const rawWithdrawalIntance = withdrawalInstance.model

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Status updated successfully',
        data: { withdrawal: rawWithdrawalIntance },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to update this withdrawal status, please try again'
      )
    }
  }

  public fetch = async (
    fromAllAccounts: boolean,
    withdrawalId: ObjectId,
    userId?: ObjectId
  ): THttpResponse<{ withdrawal: IWithdrawal }> => {
    try {
      const withdrawal = await this.find(withdrawalId, fromAllAccounts, userId)

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Withdrawal history fetched successfully',
        data: { withdrawal },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to fetch withdrawal history, please try again'
      )
    }
  }

  public fetchAll = async (
    all: boolean,
    userId: ObjectId
  ): THttpResponse<{ withdrawals: IWithdrawal[] }> => {
    try {
      let withdrawals
      if (all) {
        withdrawals = await this.withdrawalModel
          .find()
          .sort({ createdAt: -1 })
          .select('-userObject -withdrawalMethod')
          .populate('user', 'username name profile isDeleted')
      } else {
        withdrawals = await this.withdrawalModel
          .find({
            user: userId,
          })
          .sort({ createdAt: -1 })
          .select('-userObject -withdrawalMethod')
          .populate('user', 'username name profile isDeleted')
      }

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Withdrawal history fetched successfully',
        data: { withdrawals },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Failed to fetch withdrawal history, please try again'
      )
    }
  }
}

export default WithdrawalService
