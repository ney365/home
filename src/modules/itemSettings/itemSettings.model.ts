import { Schema, model } from 'mongoose'
import { IItemSettings } from '@/modules/itemSettings/itemSettings.interface'

const ItemSettingsSchema = new Schema(
  {
    approval: {
      type: Boolean,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

export default model<IItemSettings>('ItemSettings', ItemSettingsSchema)
