import { clsx, ClassValue } from 'clsx'
import { DateTime } from 'luxon'
import { twMerge } from 'tailwind-merge'

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

// TODO: change toLocal to setZone
export const localDateTime = (datetime: string) =>
  DateTime.fromISO(datetime.replace(' ', 'T'), {
    zone: 'utc',
  }).toLocal()
