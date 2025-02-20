export const Route = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  HISTORY: '/history',
  WALLETS: '/wallets',
  CREATE_WALLET: '/create-wallet',
  CREATE_TRANSACTION: '/create-transaction',
} as const

type Route = (typeof Route)[keyof typeof Route]
