import { twMerge } from 'tailwind-merge'
import { clsx, ClassValue } from 'clsx'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const amountWithCurrency = (
  amount: number,
  country: string,
  currency: string
) =>
  new Intl.NumberFormat(`en-${country}`, {
    style: 'currency',
    currency: currency,
  }).format(amount)
