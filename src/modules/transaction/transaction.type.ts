import { DepositStatus } from '../deposit/deposit.enum'
import { InvestmentStatus } from '../investment/investment.enum'
import { ReferralStatus } from '../referral/referral.enum'
import { ForecastStatus } from '../forecast/forecast.enum'
import { TransferStatus } from '../transfer/transfer.enum'
import { WithdrawalStatus } from '../withdrawal/withdrawal.enum'
import { ItemStatus } from '../item/item.enum'

export type TransactionStatus =
  | TransferStatus
  | DepositStatus
  | WithdrawalStatus
  | InvestmentStatus
  | ReferralStatus
  | ForecastStatus
  | ItemStatus
