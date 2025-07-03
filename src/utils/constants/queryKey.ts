import { GetWalletsRequest } from '@/@types/shared'
import { SpendingPeriod } from '@/utils/enum'

const WHISCASH = 'whiscash'

export const QUERY_KEYS = {
  DASHBOARD: [WHISCASH, 'wallets', 'dashboard'],
  IMAGE_UPLOAD: (file?: File) => [WHISCASH, 'image', file],
  MAIN_WALLETS: (data: GetWalletsRequest) => [
    WHISCASH,
    'wallets',
    'main',
    data,
  ],
  WALLET: (walletId?: string) => [WHISCASH, 'wallets', walletId],
  WALLET_CHART_DATA: (walletId?: number, unit?: SpendingPeriod) => [
    WHISCASH,
    'wallets',
    'chart',
    walletId,
    unit,
  ],
  WALLETS: (data: GetWalletsRequest) => [WHISCASH, 'wallets', data],
  WALLET_TRANSACTIONS: (walletId: string) => [
    WHISCASH,
    'wallets',
    'transactions',
    walletId,
  ],
  TRANSACTION: (transactionId?: string) => [
    WHISCASH,
    'transactions',
    transactionId,
  ],
  TRANSACTIONS: (date: string) => [WHISCASH, 'transactions', date],
} as const
