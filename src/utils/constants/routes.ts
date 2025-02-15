export const Routes = {
	LOGIN: '/',
	DASHBOARD: '/dashboard',
} as const

type Routes = (typeof Routes)[keyof typeof Routes]
