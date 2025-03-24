import { PiePlot } from '@mui/x-charts/PieChart'
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer'
import * as d3 from 'd3'
import { useMemo, useState } from 'react'
import { Transaction, Wallet } from '@/@types/shared'
import { amountWithCurrency, cn } from '@/utils/functions'
import PieChartSkeleton from './Skeleton'

type PieChartProps = {
  wallet: Wallet
  data: Array<Transaction>
}

const PieChart = (props: PieChartProps) => {
  const { data, wallet } = props
  const [shouldShowPercentage, setShouldShowPercentage] = useState(false)

  const pieData = useMemo(() => {
    const totalSpending = data.reduce((value, t) => value + t.amount, 0)

    const groupedTransactions = Object.groupBy(data, ({ category }) => category)

    const colorScale: d3.ScaleOrdinal<string, unknown, never> = d3.scaleOrdinal(
      Object.keys(groupedTransactions),
      d3.schemePastel2
    )

    return Object.entries(groupedTransactions)
      .map(([category, transactions]) => ({
        id: category,
        color: colorScale(category) as string,
        value:
          Math.round(
            transactions.reduce((value, t) => value + t.amount, 0) * 100
          ) / 100,
        total: totalSpending,
      }))
      .sort((a, b) => b.value - a.value)
  }, [data])

  return (
    <div className="grid w-full grid-cols-[minmax(120px,1fr)_1fr] rounded-lg bg-white p-6 px-3 shadow-lg">
      <ResponsiveChartContainer
        height={120}
        series={[
          {
            data: pieData,
            type: 'pie',
            innerRadius: 20,
            outerRadius: 60,
            paddingAngle: 3,
            cornerRadius: 3,
          },
        ]}
      >
        <PiePlot />
      </ResponsiveChartContainer>
      <div
        onClick={() => setShouldShowPercentage((b) => !b)}
        className="grid gap-2 self-center justify-self-center"
      >
        {pieData.map(({ color, id, value, total }) => (
          <div
            key={id}
            className="flex items-center justify-between gap-4 text-xs"
          >
            <div className="flex items-center gap-1">
              <div
                className="h-4 w-4 rounded"
                style={{ backgroundColor: color }}
              />
              <p className="capitalize">{id.toLowerCase()}</p>
            </div>

            <div className="grid-stack justify-items-end">
              <p
                className={cn(
                  'transition-opacity',
                  !shouldShowPercentage && 'opacity-0'
                )}
              >{`${Math.round((value / total) * 100)}%`}</p>
              <p
                className={cn(
                  'transition-opacity',
                  shouldShowPercentage && 'opacity-0'
                )}
              >
                {amountWithCurrency(value, wallet?.country, wallet?.currency)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

PieChart.Skeleton = PieChartSkeleton

export default PieChart
