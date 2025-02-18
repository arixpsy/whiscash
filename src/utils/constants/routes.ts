export const Route = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  HISTORY: '/history',
  WALLETS: '/wallets',
} as const

type Route = (typeof Route)[keyof typeof Route]
