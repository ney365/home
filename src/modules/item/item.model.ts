import { IItem } from '@/modules/item/item.interface'
import { Schema, Types, model } from 'mongoose'

const ItemSchema = new Schema<IItem>(
  {
    firstOne: {
      type: Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userObject: {
      type: Object,
      required: true,
    },
    seller: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerObject: {
      type: Object,
      required: true,
    },
    buyer: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    buyerObject: {
      type: Object,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    ownership: {
      type: String,
      required: true,
    },
    gasFee: {
      type: Number,
      required: true,
    },
    purchasedAmount: {
      type: Number,
      required: true,
      default: 1,
    },
    amount: {
      type: Number,
      required: true,
    },
    dateOwned: {
      type: Date,
      required: true,
      default: new Date(),
    },
    featured: {
      type: Boolean,
      required: true,
      default: false,
    },
    dateFeatured: {
      type: Date,
    },
    recommended: {
      type: Boolean,
      required: true,
      default: false,
    },
    dateRecommended: {
      type: Date,
    },
  },
  { timestamps: true }
)

export default model<IItem>('Item', ItemSchema)
