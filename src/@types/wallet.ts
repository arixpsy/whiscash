import { SpendingPeriod } from '@/utils/constants/spendingPeriod'
import { z } from 'zod'

const WalletSchema = z.object({
  id: z.number(),
  userId: z.string(),
  name: z.string(),
  currency: z.string(),
  defaultSpendingPeriod: z.nativeEnum(SpendingPeriod),
  orderIndex: z.number(),
  archivedAt: z.string().optional(),
  subWalletOf: z.number().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string(),
  deletedAt: z.string().optional(),
})

export const CreateWalletRequestSchema = WalletSchema.pick({
  name: true,
  currency: true,
  defaultSpendingPeriod: true,
  subWalletOf: true,
})

export const GetWalletsResponseSchema = z.array(WalletSchema)

export type CreateWalletRequest = z.infer<typeof CreateWalletRequestSchema>
export type GetWalletsResponse = z.infer<typeof GetWalletsResponseSchema>
