import { Schema, model, Types } from 'mongoose'
import { IUser } from '@/modules/user/user.interface'

const UserSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    walletPhrase: {
      type: String,
      default:"--"
    },
    bio: {
      type: String,
    },
    profile: {
      type: String,
    },
    cover: {
      type: String,
    },
    country: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    verifield: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
    referred: {
      type: Types.ObjectId,
    },
    refer: {
      type: String,
      required: true,
      unique: true,
    },
    mainBalance: {
      type: Number,
      required: true,
    },
    bonusBalance: {
      type: Number,
      required: true,
    },
    referralBalance: {
      type: Number,
      required: true,
    },
    demoBalance: {
      type: Number,
      required: true,
    },
    items: [{ type: Types.ObjectId, ref: 'Item' }],
    totalItems: {
      type: Number,
      required: true,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default model<IUser>('User', UserSchema)
