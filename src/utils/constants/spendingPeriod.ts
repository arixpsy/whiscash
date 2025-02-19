export const SpendingPeriod = {
  Day: 'DAY',
  Week: 'WEEK',
  Month: 'MONTH',
  Year: 'YEAR',
  All: 'ALL',
} as const

export type SpendingPeriod =
  (typeof SpendingPeriod)[keyof typeof SpendingPeriod]
  