import { PiePlot } from '@mui/x-charts/PieChart'
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer'
import * as d3 from 'd3'
import { useMemo } from 'react'
import { GetWalletChartDataResponse, Wallet } from '@/@types/shared'
import { amountWithCurrency } from '@/utils/functions'

type PieChartProps = {
  wallet: Wallet
  data: GetWalletChartDataResponse[0]
}

const PieChart = (props: PieChartProps) => {
  const { data, wallet } = props

  const pieData = useMemo(() => {
    if (!data.transactions) return []

    const totalSpending = data.transactions.reduce(
      (value, t) => value + t.amount,
      0
    )

    const groupedTransactions = Object.groupBy(
      data.transactions,
      ({ category }) => category
    )

    const colorScale: d3.ScaleOrdinal<string, unknown, never> = d3.scaleOrdinal(
      Object.keys(groupedTransactions),
      d3.schemePastel2
    )

    return Object.entries(groupedTransactions).map(
      ([category, transactions]) => ({
        id: category,
        color: colorScale(category) as string,
        value:
          Math.round(
            transactions.reduce((value, t) => value + t.amount, 0) * 100
          ) / 100,
        total: totalSpending,
      })
    )
  }, [data])

  return (
    <div className="grid w-full grid-cols-2 rounded-lg bg-white p-6 px-3 shadow-lg">
      <ResponsiveChartContainer
        height={120}
        series={[
          {
            data: pieData,
            type: 'pie',
            innerRadius: 20,
            outerRadius: 60,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
      >
        <PiePlot />
      </ResponsiveChartContainer>
      <div className="grid gap-2 self-center justify-self-center">
        {pieData.map(({ color, id, value }) => (
          <div className="flex items-center justify-between gap-6 text-xs">
            <div className="flex items-center gap-1">
              <div
                className="h-4 w-4 rounded"
                style={{ backgroundColor: color }}
              />
              <p className="capitalize">{id.toLowerCase()}</p>
            </div>

            <p>
              {amountWithCurrency(value, wallet?.country, wallet?.currency)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PieChart
