import { z } from 'zod'

export const CreateTransactionRequestSchema = z.object({})

export type CreateTransactionRequest = z.infer<
  typeof CreateTransactionRequestSchema
>
