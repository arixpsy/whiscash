import { SpendingPeriod } from '@/utils/constants/spendingPeriod'
import { z } from 'zod'

const WalletSchema = z.object({
  id: z.number(),
  name: z.string(),
  currency: z.string(),
  country: z.string(),
  defaultSpendingPeriod: z.nativeEnum(SpendingPeriod),
  orderIndex: z.number(),
  archivedAt: z.string().nullable(),
  subWalletOf: z.number().nullable(),
  updatedAt: z.string().nullable(),
  createdAt: z.string(),
  deletedAt: z.string().nullable(),
})

export const CreateWalletRequestSchema = z.object({
  name: z.string().min(1).max(50),
  currency: z.string().length(3),
  country: z.string().length(2),
  defaultSpendingPeriod: z.nativeEnum(SpendingPeriod),
  subWalletOf: z.number().optional(),
})

// TODO:
export const GetDashboardWalletsResponse = z.array(z.object({}))

export const GetDashboardWalletsRequest = z.object({
  timezone: z.string()
})

export const GetWalletsResponseSchema = z.array(WalletSchema)

export const GetWalletsRequestSchema = z.object({
  searchPhrase: z.string().optional(),
  currency: z.string().length(3).optional(),
})

export type CreateWalletRequest = z.infer<typeof CreateWalletRequestSchema>
export type GetDashboardWalletsResponse = z.infer<typeof GetDashboardWalletsResponse>
export type GetDashboardWalletsRequest = z.infer<typeof GetDashboardWalletsRequest>
export type GetWalletsResponse = z.infer<typeof GetWalletsResponseSchema>
export type GetWalletsRequest = z.infer<typeof GetWalletsRequestSchema>
export type Wallet = z.infer<typeof WalletSchema>
