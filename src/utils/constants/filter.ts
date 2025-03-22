export const WalletFilterOptions = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'archived',
} as const

export type WalletFilterOptions =
  (typeof WalletFilterOptions)[keyof typeof WalletFilterOptions]
