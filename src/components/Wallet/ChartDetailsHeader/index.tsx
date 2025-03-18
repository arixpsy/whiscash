import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { FaChevronDown } from 'react-icons/fa'
import { GetWalletChartDataResponse, Wallet } from '@/@types/shared'
import { SPENDING_PERIOD_UNIT_LABELS } from '@/utils/constants/spendingPeriod'
import { SpendingPeriod } from '@/utils/enum'
import { amountWithCurrency } from '@/utils/functions'

type ChartDetailsHeaderProps = {
  data: GetWalletChartDataResponse
  selectedIndex: number
  unit?: SpendingPeriod
  wallet: Wallet
}

const ChartDetailsHeader = (props: ChartDetailsHeaderProps) => {
  const { data, selectedIndex, unit, wallet } = props
  const [, setSearchParams] = useSearchParams()

  const spendingLabel = useMemo(() => {
    if (unit === SpendingPeriod.All) return ''

    if (selectedIndex === 0) {
      switch (unit) {
        case SpendingPeriod.Day:
          return 'today'
        case SpendingPeriod.Week:
          return 'this week'
        case SpendingPeriod.Month:
          return 'this month'
        case SpendingPeriod.Year:
          return 'this year'
      }
    }

    const dateTime = DateTime.fromISO(
      data[selectedIndex]?.startPeriod.replace(' ', 'T') || ''
    )

    switch (unit) {
      case SpendingPeriod.Year:
        return `for ${dateTime.toFormat('yyyy')}`
      case SpendingPeriod.Month:
        return `for ${dateTime.toFormat('LLLL yyyy')}`
      case SpendingPeriod.Week:
        return `for ${dateTime.toFormat('d LLLL')}`
      case SpendingPeriod.Day:
      default:
        return `for ${dateTime.toFormat('d LLLL')}`
    }
  }, [unit, selectedIndex, data])

  const handleClickUnitSelector = () => setSearchParams({ filter: 'unit' })

  return (
    <div className="flex flex-col bg-white p-3">
      <div className="flex items-start justify-between">
        <p className="text-3xl">
          {amountWithCurrency(
            data[selectedIndex]?.spendingPeriodTotal || 0,
            wallet.country,
            wallet.currency
          )}
        </p>

        <button
          type="button"
          className="bg-primary-100 text-primary-500 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold"
          onClick={handleClickUnitSelector}
        >
          <FaChevronDown className="h-3 w-3" />
          <span>{unit && SPENDING_PERIOD_UNIT_LABELS[unit]}</span>
        </button>
      </div>

      <p className="text-xs text-gray-500">Total spendings {spendingLabel}</p>
    </div>
  )
}

const Skeleton = () => (
  <div className="flex flex-col bg-white p-3">
    <div className="mb-1 flex items-start justify-between">
      <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
    </div>
    <div className="h-3 w-38 animate-pulse rounded-md bg-gray-200" />
  </div>
)

ChartDetailsHeader.Skeleton = Skeleton

export default ChartDetailsHeader
