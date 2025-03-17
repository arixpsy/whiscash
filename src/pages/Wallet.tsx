import { useEffect, useMemo, useState } from 'react'
import { TbArrowBackUp, TbDotsVertical } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router'
import { DropdownButton, Page } from '@/components/commons'
import { BarChart, ChartDetailsHeader } from '@/components/Wallet'
import useWallet from '@/hooks/useWallet'
import { SpendingPeriod } from '@/utils/enum'
import { cn } from '@/utils/functions'

const Wallet = () => {
  const { walletId } = useParams()
  const navigate = useNavigate()
  const { useGetWalletQuery, useGetWalletChartDataQuery } = useWallet()
  const getWallet = useGetWalletQuery(walletId)
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0)
  const [selectedUnit, setSelectedUnit] = useState<SpendingPeriod | undefined>(
    undefined
  )
  const getChartData = useGetWalletChartDataQuery({
    unit: selectedUnit,
    walletId: getWallet.data?.id,
  })
  const wallet = getWallet.data

  const aggChartData = useMemo(
    () => getChartData.data?.pages.flat(1) || [],
    [getChartData.data]
  )

  const handleClickBack = () => document.startViewTransition(() => navigate(-1))

  useEffect(() => {
    if (wallet) setSelectedUnit(wallet.spendingPeriod)
  }, [wallet])

  return (
    <Page className="grid auto-rows-min items-start bg-gray-100">
      <div className="bg-white">
        {/* Page Header */}
        <div className="sticky top-0 z-10 grid">
          <div className="grid h-[52px] grid-cols-[1fr_auto_1fr] bg-white p-3">
            <button type="button" onClick={handleClickBack}>
              <TbArrowBackUp className="h-6 w-6" />
            </button>

            <p
              className={cn(
                'h-7 min-w-32 self-center rounded-lg text-center text-lg font-bold',
                getWallet.isPending && 'animate-pulse bg-gray-200'
              )}
            >
              {wallet?.name}
            </p>

            {/* TODO: */}
            <DropdownButton className="z-20">
              <DropdownButton.Trigger className="justify-self-end">
                <TbDotsVertical className="h-6 w-6" />
              </DropdownButton.Trigger>

              <DropdownButton.Content className="grid min-w-24 gap-3">
                <DropdownButton.ContentOption>
                  Edit
                </DropdownButton.ContentOption>
                <DropdownButton.ContentOption>
                  Archive
                </DropdownButton.ContentOption>
                <DropdownButton.ContentOption>
                  Delete
                </DropdownButton.ContentOption>
              </DropdownButton.Content>
            </DropdownButton>
          </div>

          {/* Chart Header */}
          {getWallet.isPending ? (
            <ChartDetailsHeader.Skeleton />
          ) : wallet ? (
            <ChartDetailsHeader
              data={aggChartData}
              selectedIndex={selectedPeriodIndex}
              unit={selectedUnit}
              wallet={wallet}
            />
          ) : undefined}
        </div>

        {/* Chart */}
        {getWallet.isPending || getChartData.isPending ? (
          <BarChart.Skeleton />
        ) : (
          <BarChart
            data={aggChartData}
            selectedIndex={selectedPeriodIndex}
            setSelectedIndex={setSelectedPeriodIndex}
            handleFetchMoreData={() => getChartData.fetchNextPage()}
            isFetchingMoreData={getChartData.isFetchingNextPage}
          />
        )}
      </div>

      <div className="p-3 py-6">
        <p className="mb-1 text-lg font-bold">Breakdown</p>

        <div className="flex rounded-lg bg-white p-6 shadow-lg">
          <div className="bg-primary-100 h-[100px] w-[100px] rounded-full" />
        </div>
      </div>
    </Page>
  )
}

export default Wallet
