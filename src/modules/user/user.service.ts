import activityModel from '@/modules/activity/activity.model'
import userModel from '@/modules/user/user.model'
import { IUser, IUserObject, IUserService } from '@/modules/user/user.interface'
import { UserAccount, UserRole, UserStatus } from '@/modules/user/user.enum'
import { Service, Inject } from 'typedi'
import ServiceToken from '@/utils/enums/serviceToken'
import {
  IActivity,
  IActivityService,
} from '@/modules/activity/activity.interface'
import {
  ActivityCategory,
  ActivityForWho,
} from '@/modules/activity/activity.enum'
import { TTransaction } from '@/modules/transactionManager/transactionManager.type'
import HttpException from '@/modules/http/http.exception'
import AppException from '@/modules/app/app.exception'
import { THttpResponse } from '@/modules/http/http.type'
import { HttpResponseStatus } from '@/modules/http/http.enum'
import FormatNumber from '@/utils/formats/formatNumber'
import FormatString from '@/utils/formats/formatString'
import { IMailService } from '@/modules/mail/mail.interface'
import ParseString from '@/utils/parsers/parseString'
import renderFile from '@/utils/renderFile'
import { MailOptionName } from '@/modules/mailOption/mailOption.enum'
import { INotification } from '@/modules/notification/notification.interface'
import notificationModel from '@/modules/notification/notification.model'
import { SiteConstants } from '@/modules/config/config.constants'
import { ObjectId, isValidObjectId } from 'mongoose'
import { ErrorCode } from '@/utils/enums/errorCodes.enum'
import ImageUploader from '../imageUploader/imageUploader'
import { ImageUploaderSizes } from '../imageUploader/imageUploader.enum'
import itemModel from '../item/item.model'
import depositModel from '../deposit/deposit.model'
import withdrawalModel from '../withdrawal/withdrawal.model'

@Service()
class UserService implements IUserService {
  private userModel = userModel
  private notificationModel = notificationModel
  private activityModel = activityModel
  private itemModel = itemModel
  private depositModel = depositModel
  private withdrawalModel = withdrawalModel
  private imageUploader = new ImageUploader()

  static profileImageSizes = [
    ImageUploaderSizes.PROFILE_CARD,
    ImageUploaderSizes.PROFILE_ICON,
    ImageUploaderSizes.PROFILE_MAIN,
    ImageUploaderSizes.PROFILE_NAV,
  ]

  static coverImageSizes = [
    ImageUploaderSizes.COVER_MAIN,
    ImageUploaderSizes.COVER_MENU,
    ImageUploaderSizes.COVER_CARD,
    ImageUploaderSizes.COVER_PROFILE,
  ]

  public constructor(
    @Inject(ServiceToken.ACTIVITY_SERVICE)
    private activityService: IActivityService,
    @Inject(ServiceToken.MAIL_SERVICE) private mailService: IMailService
  ) {}

  private async find(
    userIdOrUsername: ObjectId | string,
    errorMessage?: string
  ): Promise<IUser> {
    let user

    user = await this.userModel
      .findOne({ username: userIdOrUsername })
      .select('-password')

    if (!user && isValidObjectId(userIdOrUsername))
      user = await this.userModel.findById(userIdOrUsername).select('-password')

    if (!user) throw new HttpException(404, errorMessage || 'User not found')
    return user
  }

  private setFund = async (
    user: IUser,
    account: UserAccount,
    amount: number,
    insufficentFundErrorMessage?: string
  ): Promise<IUser> => {
    if (isNaN(amount) || amount === 0)
      throw new HttpException(400, 'Invalid amount')

    if (!Object.values(UserAccount).includes(account))
      throw new HttpException(400, 'Invalid account')

    user[account] += +amount

    if (user[account] < 0)
      throw new HttpException(
        400,
        insufficentFundErrorMessage ||
          `insufficient balance in ${FormatString.fromCamelToTitleCase(
            account
          )} Account`
      )

    return user
  }

  public async _fundTransaction(
    userIdOrUsername: ObjectId | string,
    account: UserAccount,
    amount: number,
    notFoundErrorMessage?: string,
    insufficentFundErrorMessage?: string
  ): TTransaction<IUserObject, IUser> {
    const user = await this.find(userIdOrUsername, notFoundErrorMessage)

    const fundedUser = await this.setFund(
      user,
      account,
      amount,
      insufficentFundErrorMessage
    )

    const onFailed = `${amount > 0 ? 'substract' : 'add'} ${
      amount > 0
        ? FormatNumber.toDollar(amount)
        : FormatNumber.toDollar(-amount)
    } ${amount > 0 ? 'from' : 'to'} the ${FormatString.fromCamelToTitleCase(
      account
    )} of the user with an id of (${fundedUser._id})`

    return {
      object: user.toObject({ getters: true }),
      instance: {
        model: user,
        onFailed,
        callback: async () => {
          const user = await this.setFund(fundedUser, account, -amount)
          await user.save()
        },
      },
    }
  }

  public fund = async (
    userIdOrUsername: ObjectId | string,
    account: UserAccount,
    amount: number,
    notFoundErrorMessage?: string,
    insufficentFundErrorMessage?: string
  ): TTransaction<IUserObject, IUser> => {
    return await this._fundTransaction(
      userIdOrUsername,
      account,
      amount,
      notFoundErrorMessage,
      insufficentFundErrorMessage
    )
  }

  public forceFund = async (
    userId: ObjectId,
    account: UserAccount,
    amount: number
  ): THttpResponse<{ user: IUser }> => {
    try {
      const user = await this.find(userId)

      const fundedUser = await this.setFund(user, account, amount)

      await fundedUser.save()

      return {
        status: HttpResponseStatus.SUCCESS,
        message: `User has been ${
          amount > 0 ? 'credited' : 'debited'
        } successfully`,
        data: { user: fundedUser.toObject() },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        `Unable to ${amount > 0 ? 'credit' : 'debit'} user, please try again`
      )
    }
  }

  public fetchAll = async (): THttpResponse<{ users: IUser[] }> => {
    try {
      const users = await this.userModel
        .find({ role: UserRole.USER })
        .sort({ createdAt: -1 })
        .select('-password')

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Users fetched',
        data: {
          users,
        },
      }
    } catch (err: any) {
      throw new AppException(err, 'Unable to get users, please try again')
    }
  }

  public creators = async (): THttpResponse<{ creators: IUser[] }> => {
    try {
      const creators = await this.userModel
        .find({ role: UserRole.USER, status: UserStatus.ACTIVE })
        .select('-password')

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Creators fetched',
        data: {
          creators,
        },
      }
    } catch (err: any) {
      throw new AppException(err, 'Unable to get users, please try again')
    }
  }

  public get = async (
    userIdOrUsername: ObjectId | string,
    errorMessage?: string
  ): Promise<IUserObject> => {
    return (await this.find(userIdOrUsername, errorMessage)).toObject()
  }

  public fetch = async (userId: ObjectId): THttpResponse<{ user: IUser }> => {
    try {
      const user = await this.find(userId)

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'User fetched',
        data: { user },
      }
    } catch (err: any) {
      throw new AppException(err, 'Unable to get user, please try again')
    }
  }

  public updateProfile = async (
    userId: ObjectId,
    name: string,
    username: string,
    bio?: string
  ): THttpResponse<{ user: IUser }> => {
    try {
      const usernameExist = await this.userModel.findOne({
        username,
        _id: { $ne: userId },
      })

      if (usernameExist)
        throw new HttpException(
          ErrorCode.REQUEST_CONFLICT,
          'Username already exist'
        )

      const user = await this.find(userId)

      user.name = name
      user.username = username
      user.bio = bio
      await user.save()

      this.activityService.set(
        user.toObject(),
        ActivityForWho.USER,
        ActivityCategory.PROFILE,
        'You updated your profile details'
      )

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Profile updated successfully',
        data: { user },
      }
    } catch (err: any) {
      throw new AppException(err, 'Unable to update profile, please try again')
    }
  }

  public updateProfileImages = async (
    userId: ObjectId,
    profile?: string,
    cover?: string
  ): THttpResponse<{ user: IUser }> => {
    try {
      const user = await this.find(userId)

      if (profile) {
        this.imageUploader.delete(
          'profile',
          profile,
          UserService.coverImageSizes
        )
        if (user.profile) {
          this.imageUploader.delete(
            'profile',
            user.profile,
            UserService.profileImageSizes
          )
        }
        user.profile = profile
      }

      if (cover) {
        this.imageUploader.delete('cover', cover, UserService.profileImageSizes)
        if (user.cover) {
          this.imageUploader.delete(
            'cover',
            user.cover,
            UserService.coverImageSizes
          )
        }
        user.cover = cover
      }

      await user.save()

      this.activityService.set(
        user.toObject(),
        ActivityForWho.USER,
        ActivityCategory.PROFILE,
        'You updated your profile details'
      )

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Profile updated successfully',
        data: { user },
      }
    } catch (err: any) {
      throw new AppException(err, 'Unable to update profile, please try again')
    }
  }

  public updateEmail = async (
    userId: ObjectId,
    email: string
  ): THttpResponse<{ user: IUser }> => {
    try {
      const emailExist = await this.userModel.findOne({
        email,
        _id: { $ne: userId },
      })

      if (emailExist)
        throw new HttpException(
          ErrorCode.REQUEST_CONFLICT,
          'Email already exist'
        )

      const user = await this.find(userId)

      user.email = email
      await user.save()

      this.activityService.set(
        user.toObject(),
        ActivityForWho.USER,
        ActivityCategory.PROFILE,
        'Your updated your email address'
      )

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Email updated successfully',
        data: { user },
      }
    } catch (err: any) {
      throw new AppException(err, 'Unable to update email, please try again')
    }
  }

  public updateStatus = async (
    userId: ObjectId,
    status: UserStatus
  ): THttpResponse<{ user: IUser }> => {
    try {
      if (!userId) throw new HttpException(404, 'User not found')

      const user = await this.find(userId)

      if (user.role >= UserRole.ADMIN && status === UserStatus.SUSPENDED)
        throw new HttpException(
          400,
          'Users with admin role can not be suspended'
        )

      user.status = status
      await user.save()
      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Status updated successfully',
        data: { user },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Unable to update user status, please try again'
      )
    }
  }

  public delete = async (userId: ObjectId): THttpResponse<{ user: IUser }> => {
    try {
      const user = await this.find(userId)

      if (user.role >= UserRole.ADMIN)
        throw new HttpException(400, 'Users with admin role can not be deleted')

      if (user.profile) {
        this.imageUploader.delete(
          'profile',
          user.profile,
          UserService.profileImageSizes
        )
      }

      if (user.cover) {
        this.imageUploader.delete(
          'cover',
          user.cover,
          UserService.coverImageSizes
        )
      }

      await this.userModel.deleteOne({ _id: userId })

      this.itemModel.deleteMany({ user: userId })

      this.depositModel.deleteMany({ user: userId })

      this.withdrawalModel.deleteMany({ user: userId })

      this.notificationModel.deleteMany({ user: userId })

      this.activityModel.deleteMany({ user: userId })

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'User deleted successfully',
        data: { user },
      }
    } catch (err: any) {
      throw new AppException(err, 'Unable to delete user, please try again')
    }
  }

  public getReferredUsers = async (
    getAll: boolean,
    userId?: ObjectId
  ): THttpResponse<{ users: IUser[] }> => {
    try {
      let users: IUser[] = []
      if (!getAll) {
        if (!userId) throw new HttpException(404, 'User not specifield')

        await this.find(userId)

        users = await this.userModel
          .find({
            referred: userId,
          })
          .select('-password')
      } else {
        users = await this.userModel
          .find({ referred: { $exists: true } })
          .select('-password')
      }

      return {
        status: HttpResponseStatus.SUCCESS,
        message: `Referred users fetched successfully`,
        data: { users },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Unable to get referred users, please try again'
      )
    }
  }

  public async sendEmail(
    userId: ObjectId,
    subject: string,
    heading: string,
    content: string
  ): THttpResponse {
    try {
      const user = await this.find(userId)

      this.mailService.setSender(MailOptionName.TEST)

      const emailContent = await renderFile('email/custom', {
        heading,
        content,
        config: SiteConstants,
      })

      this.mailService.sendMail({
        subject: subject,
        to: user.email,
        text: ParseString.clearHtml(emailContent),
        html: emailContent,
      })

      return {
        status: HttpResponseStatus.SUCCESS,
        message: `Email has been sent successfully`,
      }
    } catch (err: any) {
      throw new AppException(err, 'Unable to send email, please try again')
    }
  }
}

export default UserService
