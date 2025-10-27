import { THttpResponse } from '@/modules/http/http.type'
import { Document } from 'mongoose'

export interface IReferralSettings extends Document {
  __v: number
  updatedAt: Date
  createdAt: Date
  deposit: number
  stake: number
  winnings: number
  investment: number
  item: number
  completedPackageEarnings: number
}

export interface IReferralSettingsService {
  create(
    deposit: number,
    stake: number,
    winnings: number,
    investment: number,
    item: number,
    completedPackageEarnings: number
  ): THttpResponse<{ referralSettings: IReferralSettings }>

  update(
    deposit: number,
    stake: number,
    winnings: number,
    investment: number,
    item: number,
    completedPackageEarnings: number
  ): THttpResponse<{ referralSettings: IReferralSettings }>

  get(): Promise<IReferralSettings | null>

  fetch(): THttpResponse<{ referralSettings: IReferralSettings }>
}
