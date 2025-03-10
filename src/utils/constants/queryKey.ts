import { GetWalletsRequest } from '@/@types/shared'

const WHISCASH = 'whiscash'

export const QUERY_KEYS = {
  DASHBOARD: [WHISCASH, 'wallets', 'dashboard'],
  MAIN_WALLETS: (data: GetWalletsRequest) => [
    WHISCASH,
    'wallets',
    'main',
    data,
  ],
  WALLET: (walletId?: string) => [WHISCASH, 'wallets', walletId],
  WALLETS: (data: GetWalletsRequest) => [WHISCASH, 'wallets', data],
  WALLET_TRANSACTIONS: (walletId: string) => [
    WHISCASH,
    'transactions',
    walletId,
  ],
  TRANSACTIONS: [WHISCASH, 'transactions'],
} as const
