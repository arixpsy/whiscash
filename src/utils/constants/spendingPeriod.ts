export const SpendingPeriod = {
  Day: 'DAY',
  Week: 'WEEK',
  Month: 'MONTH',
  Year: 'YEAR',
  All: 'ALL',
} as const

export type SpendingPeriod =
  (typeof SpendingPeriod)[keyof typeof SpendingPeriod]

export const SPENDING_PERIOD_INPUT_LABELS: Record<SpendingPeriod, string> = {
  [SpendingPeriod.Day]: 'Daily',
  [SpendingPeriod.Week]: 'Weekly',
  [SpendingPeriod.Month]: 'Monthly',
  [SpendingPeriod.Year]: 'Yearly',
  [SpendingPeriod.All]: 'All',
}
