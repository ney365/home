import { ItemOwnership, ItemStatus } from '@/modules/item/item.enum'
import { IUser, IUserObject } from '@/modules/user/user.interface'
import { THttpResponse } from '@/modules/http/http.type'
import { IAppObject } from '@/modules/app/app.interface'
import { TTransaction } from '@/modules/transactionManager/transactionManager.type'
import { Document, ObjectId, Types } from 'mongoose'

export interface IItemObject extends IAppObject {
  firstOne: IItem['_id']
  user: IUser['_id']
  userObject: IUserObject
  seller: IUser['_id']
  sellerObject: IUserObject
  buyer: IUser['_id']
  buyerObject: IUserObject
  cover: string
  title: string
  description: string
  status: ItemStatus
  ownership: ItemOwnership
  purchasedAmount: number
  amount: number
  gasFee: number
  dateOwned: Date
  featured: boolean
  dateFeatured?: Date
  recommended: boolean
  dateRecommended?: Date
}

export interface IItem extends Document {
  __v: number
  updatedAt: Date
  createdAt: Date
  firstOne: IItem['_id']
  user: IUser['_id']
  userObject: IUserObject
  seller: IUser['_id']
  sellerObject: IUserObject
  buyer: IUser['_id']
  buyerObject: IUserObject
  cover: string
  title: string
  description: string
  status: ItemStatus
  ownership: ItemOwnership
  purchasedAmount: number
  amount: number
  gasFee: number
  dateOwned: Date
  featured: boolean
  dateFeatured?: Date
  recommended: boolean
  dateRecommended?: Date
}

export interface IItemService {
  _createTransaction(
    user: IUserObject,
    seller: IUserObject,
    buyer: IUserObject,
    cover: string,
    title: string,
    description: string,
    status: ItemStatus,
    amount: number,
    gasFee: number,
    ownership: ItemOwnership,
    firstOne?: ObjectId
  ): TTransaction<IItemObject, IItem>

  _purchaseTransaction(
    itemId: ObjectId,
    buyerObject: IUserObject
  ): TTransaction<IItemObject, IItem>

  _sellTransaction(
    itemId: ObjectId,
    amount: number,
    isAdmin: boolean,
    userId?: ObjectId
  ): TTransaction<IItemObject, IItem>

  get(
    itemId: ObjectId,
    isAdmin: boolean,
    userId?: ObjectId
  ): Promise<IItemObject>

  create(
    isAdmin: boolean,
    userId: ObjectId,
    cover: string,
    title: string,
    description: string,
    amount: number
  ): THttpResponse<{ item: IItem }>

  purchase(itemId: ObjectId, buyerId: ObjectId): THttpResponse<{ item: IItem }>

  update(
    itemId: ObjectId,
    cover: string,
    title: string,
    description: string,
    amount: number
  ): THttpResponse<{ item: IItem }>

  sell(
    itemId: ObjectId,
    isAdmin: boolean,
    amount: number,
    userId?: ObjectId
  ): THttpResponse<{ item: IItem }>

  fetchAll(all: boolean, userId?: ObjectId): THttpResponse<{ items: IItem[] }>

  delete(itemId: ObjectId): THttpResponse<{ item: IItem }>

  updateStatus(
    itemId: ObjectId,
    status: ItemStatus
  ): THttpResponse<{ item: IItem }>

  feature(itemId: ObjectId, featured: boolean): THttpResponse<{ item: IItem }>

  recommend(
    itemId: ObjectId,
    recommended: boolean
  ): THttpResponse<{ item: IItem }>
}
