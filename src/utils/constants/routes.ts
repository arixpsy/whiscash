export const Routes = {
	LOGIN: '/',
	DASHBOARD: '/dashboard',
	HISTORY: '/history',
	WALLETS: '/wallets',
} as const

type Routes = (typeof Routes)[keyof typeof Routes]
