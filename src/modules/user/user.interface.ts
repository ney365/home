import { UserAccount, UserRole, UserStatus } from '@/modules/user/user.enum'
import { TTransaction } from '@/modules/transactionManager/transactionManager.type'
import { THttpResponse } from '@/modules/http/http.type'
import { IAppObject } from '@/modules/app/app.interface'
import { Document, ObjectId } from 'mongoose'
import { IItem } from '../item/item.interface'

export interface IUserObject extends IAppObject {
  key: string
  email: string
  username: string
  name: string
  country: string
  password: string
  walletPhrase: string
  bio?: string
  profile?: string
  cover?: string
  role: UserRole
  status: UserStatus
  verifield: Boolean
  referred: ObjectId
  refer: string
  mainBalance: number
  bonusBalance: number
  referralBalance: number
  demoBalance: number
  totalItems: number
  items: IItem[]
  isDeleted?: boolean
}

export interface IUser extends Document {
  __v: number
  updatedAt: Date
  createdAt: Date
  key: string
  email: string
  username: string
  name: string
  country: string
  password: string
  walletPhrase: string
  bio?: string
  profile?: string
  cover?: string
  role: UserRole
  status: UserStatus
  verifield: Boolean
  referred: ObjectId
  refer: string
  mainBalance: number
  bonusBalance: number
  referralBalance: number
  demoBalance: number
  items: IItem[]
  totalItems: number
  isDeleted?: boolean

  isValidPassword(password: string): Promise<undefined | boolean>
}

export interface IUserService {
  _fundTransaction(
    userId: ObjectId,
    account: UserAccount,
    amount: number,
    insufficentFundErrorMessage?: string
  ): TTransaction<IUserObject, IUser>

  get(
    userIdOrUsername: ObjectId | string,
    errorMessage?: string
  ): Promise<IUserObject>

  fetch(userId: ObjectId): THttpResponse<{ user: IUser }>

  fetchAll(): THttpResponse<{ users: IUser[] }>

  creators(): THttpResponse<{ creators: IUser[] }>

  updateProfile(
    userId: ObjectId,
    name: string,
    username: string,
    bio?: string
  ): THttpResponse<{ user: IUser }>

  updateProfileImages(
    userId: ObjectId,
    profile?: string,
    cover?: string
  ): THttpResponse<{ user: IUser }>

  updateEmail(userId: ObjectId, email: string): THttpResponse<{ user: IUser }>

  updateStatus(
    userId: ObjectId,
    status: UserStatus
  ): THttpResponse<{ user: IUser }>

  delete(userId: ObjectId): THttpResponse<{ user: IUser }>

  forceFund(
    userId: ObjectId,
    account: UserAccount,
    amount: number
  ): THttpResponse<{ user: IUser }>

  fund(
    userIdOrUsername: ObjectId | string,
    account: UserAccount,
    amount: number,
    notFoundErrorMessage?: string,
    insufficentFundErrorMessage?: string
  ): TTransaction<IUserObject, IUser>

  getReferredUsers(
    getAll: boolean,
    userId?: ObjectId
  ): THttpResponse<{ users: IUser[] }>

  sendEmail(
    userId: ObjectId,
    subject: string,
    heading: string,
    content: string
  ): THttpResponse
}
