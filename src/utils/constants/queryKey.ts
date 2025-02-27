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
  TRANSACTIONS: [WHISCASH, 'transactions'],
} as const
