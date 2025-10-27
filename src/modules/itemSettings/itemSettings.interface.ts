import { THttpResponse } from '@/modules/http/http.type'
import { Document } from 'mongoose'

export interface IItemSettings extends Document {
  __v: number
  updatedAt: Date
  createdAt: Date
  approval: boolean
  fee: number
}

export interface IItemSettingsService {
  create(
    approval: boolean,
    fee: number
  ): THttpResponse<{ itemSettings: IItemSettings }>

  update(
    approval: boolean,
    fee: number
  ): THttpResponse<{ itemSettings: IItemSettings }>

  get(): Promise<IItemSettings | null>

  fetch(): THttpResponse<{ itemSettings: IItemSettings }>
}
