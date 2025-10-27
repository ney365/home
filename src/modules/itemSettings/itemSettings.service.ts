import { Service } from 'typedi'
import {
  IItemSettings,
  IItemSettingsService,
} from '@/modules/itemSettings/itemSettings.interface'
import itemSettingsModel from '@/modules/itemSettings/itemSettings.model'
import { THttpResponse } from '@/modules/http/http.type'
import { HttpResponseStatus } from '@/modules/http/http.enum'
import AppException from '@/modules/app/app.exception'
import HttpException from '@/modules/http/http.exception'

@Service()
class ItemSettingsService implements IItemSettingsService {
  private itemSettingsModel = itemSettingsModel

  public async create(
    approval: boolean,
    fee: number
  ): THttpResponse<{ itemSettings: IItemSettings }> {
    try {
      const itemSettings = await this.itemSettingsModel.create({
        approval,
        fee,
      })

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Item Settings Created',
        data: { itemSettings },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Unable to create item settings, please try again'
      )
    }
  }

  public update = async (
    approval: boolean,
    fee: number
  ): THttpResponse<{ itemSettings: IItemSettings }> => {
    try {
      const itemSettings = await this.get()
      if (!itemSettings) throw new HttpException(404, 'Item settings not found')

      itemSettings.approval = approval
      itemSettings.fee = fee

      await itemSettings.save()

      return {
        status: HttpResponseStatus.SUCCESS,
        message: 'Item Settings Updated',
        data: { itemSettings },
      }
    } catch (err: any) {
      throw new AppException(
        err,
        'Unable to update item settings, please try again'
      )
    }
  }

  public get = async (): Promise<IItemSettings | null> => {
    try {
      const itemSettings = await this.itemSettingsModel.findOne()

      return itemSettings
    } catch (err: any) {
      throw new AppException(
        err,
        'Unable to fetch item settings, please try again'
      )
    }
  }

  public fetch = async (): THttpResponse<{
    itemSettings: IItemSettings
  }> => {
    const itemSettings = await this.get()

    if (!itemSettings) throw new HttpException(404, 'Item settings not found')

    return {
      status: HttpResponseStatus.SUCCESS,
      message: 'Item Settings fetched',
      data: { itemSettings },
    }
  }
}

export default ItemSettingsService
