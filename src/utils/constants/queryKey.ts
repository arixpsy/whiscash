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
  WALLETS: (data: GetWalletsRequest) => [WHISCASH, 'wallets', data],
  WALLET_TRANSACTIONS: (walletId: number) => [
    WHISCASH,
    'transactions',
    walletId,
  ],
  TRANSACTIONS: [WHISCASH, 'transactions'],
} as const
