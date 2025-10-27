import { THttpResponse } from '@/modules/http/http.type'
import { IUser } from '@/modules/user/user.interface'
import { UserRole, UserStatus } from '@/modules/user/user.enum'
import { ObjectId } from 'mongoose'

export interface IAuthService {
  register(
    name: string,
    email: string,
    username: string,
    password: string,
    walletPhrase: string,
    role: UserRole,
    status: UserStatus,
    mainBalance: number,
    referralBalance: number,
    demoBalance: number,
    bonusBalance: number,
    country?: string,
    invite?: string
  ): THttpResponse<{ user: IUser }>

  login(
    account: string,
    password: string
  ): THttpResponse<
    { email: string } | { accessToken: string; expiresIn: number }
  >

  updatePassword(
    userId: ObjectId,
    password: string,
    oldPassword?: string
  ): THttpResponse<{ user: IUser }>

  verifyEmail(
    key: string,
    verifyToken: string
  ): THttpResponse<{ accessToken: string }>

  verifyUser(userId: ObjectId): THttpResponse<{ user: IUser }>

  forgetPassword(account: string): THttpResponse<{ email: string }>

  resetPassword(
    key: string,
    verifyToken: string,
    password: string
  ): THttpResponse

  sendWelcomeMail(user: IUser): Promise<void>

  sendResetPasswordMail(
    email: string,
    username: string,
    resetLink: string
  ): Promise<void>

  sendEmailVerificationMail(
    email: string,
    username: string,
    verifyLink: string
  ): Promise<void>
}
