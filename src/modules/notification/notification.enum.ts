import { UserRole } from '@/modules/user/user.enum'

export enum NotificationCategory {
  REFERRAL = 'referral',
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
  TRADE = 'trade',
  INVESTMENT = 'investment',
  ITEM_CREATED = 'item created',
  ITEM_BOUGHT = 'item bought',
  ITEM_SOLD = 'item sold',
}

export enum NotificationForWho {
  ADMIN = UserRole.ADMIN,
  USER = UserRole.USER,
}
