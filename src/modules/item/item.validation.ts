import Joi from 'joi'
import { ItemStatus } from '@/modules/item/item.enum'

const create = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().positive().required(),
})

const masterCreate = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().positive().required(),
})

const update = Joi.object({
  itemId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().positive().required(),
})

const purchase = Joi.object({
  itemId: Joi.string().required(),
})

const sell = Joi.object({
  itemId: Joi.string().required(),
  amount: Joi.number().positive().required(),
})

const updateStatus = Joi.object({
  itemId: Joi.string().required(),
  status: Joi.string()
    .valid(...Object.values(ItemStatus))
    .required(),
})

const feature = Joi.object({
  itemId: Joi.string().required(),
  featured: Joi.boolean().required(),
})

const recommend = Joi.object({
  itemId: Joi.string().required(),
  recommended: Joi.boolean().required(),
})

export default {
  create,
  update,
  purchase,
  sell,
  updateStatus,
  masterCreate,
  feature,
  recommend,
}
