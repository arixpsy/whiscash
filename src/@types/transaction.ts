import { Category } from '@/utils/constants/categories'
import { z } from 'zod'

export const CreateTransactionRequestSchema = z.object({
  walletId: z.number(),
  amount: z.number(),
  category: z.nativeEnum(Category),
  description: z.string(),
  paidAt: z.string(),
})

export type CreateTransactionRequest = z.infer<
  typeof CreateTransactionRequestSchema
>
