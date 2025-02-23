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
  currency: z.string().min(3),
  country: z.string().min(2),
  defaultSpendingPeriod: z.nativeEnum(SpendingPeriod),
  subWalletOf: z.number().optional(),
})

export const GetWalletsResponseSchema = z.array(WalletSchema)

export const GetWalletsRequestSchema = z.object({
  searchPhrase: z.string(),
})

export type CreateWalletRequest = z.infer<typeof CreateWalletRequestSchema>
export type GetWalletsResponse = z.infer<typeof GetWalletsResponseSchema>
export type GetWalletsRequest = z.infer<typeof GetWalletsRequestSchema>
export type Wallet = z.infer<typeof WalletSchema>
