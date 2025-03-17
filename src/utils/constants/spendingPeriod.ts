export const SpendingPeriod = {
  Day: 'DAY',
  Week: 'WEEK',
  Month: 'MONTH',
  Year: 'YEAR',
  All: 'ALL',
} as const

export type SpendingPeriod =
  (typeof SpendingPeriod)[keyof typeof SpendingPeriod]

export const SPENDING_PERIOD_DASHBOARD_LABELS: Record<SpendingPeriod, string> =
  {
    [SpendingPeriod.Day]: 'Today',
    [SpendingPeriod.Week]: 'This Week',
    [SpendingPeriod.Month]: 'This Month',
    [SpendingPeriod.Year]: 'This Year',
    [SpendingPeriod.All]: 'All Time',
  }

export const SPENDING_PERIOD_INPUT_LABELS: Record<SpendingPeriod, string> = {
  [SpendingPeriod.Day]: 'Daily',
  [SpendingPeriod.Week]: 'Weekly',
  [SpendingPeriod.Month]: 'Monthly',
  [SpendingPeriod.Year]: 'Yearly',
  [SpendingPeriod.All]: 'All',
}

export const SPENDING_PERIOD_WALLET_LABELS: Record<SpendingPeriod, string> = {
  [SpendingPeriod.Day]: 'Daily Tracking',
  [SpendingPeriod.Week]: 'Weekly Tracking',
  [SpendingPeriod.Month]: 'Monthly Tracking',
  [SpendingPeriod.Year]: 'Yearly Tracking',
  [SpendingPeriod.All]: 'All Time Tracking',
}

export const SPENDING_PERIOD_UNIT_LABELS: Record<SpendingPeriod, string> = {
  [SpendingPeriod.Day]: 'Daily',
  [SpendingPeriod.Week]: 'Weekly',
  [SpendingPeriod.Month]: 'Monthly',
  [SpendingPeriod.Year]: 'Yearly',
  [SpendingPeriod.All]: 'All Time',
}
