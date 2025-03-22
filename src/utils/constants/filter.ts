export const WalletFilterOptions = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
} as const

export type WalletFilterOptions =
  (typeof WalletFilterOptions)[keyof typeof WalletFilterOptions]
