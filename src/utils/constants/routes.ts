export const Route = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  HISTORY: '/history',
  SETTINGS: '/settings',
  TRANSACTIONS: '/transactions',
  WALLETS: '/wallets',
} as const

export type Route = (typeof Route)[keyof typeof Route]
