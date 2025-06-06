export const Route = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  HISTORY: '/history',
  SETTINGS: '/settings',
  TRANSACTIONS: '/transactions',
  WALLETS: '/wallets',
  CREATE_WALLET: '/create-wallet',
  CREATE_TRANSACTION: '/create-transaction',
} as const

export type Route = (typeof Route)[keyof typeof Route]
