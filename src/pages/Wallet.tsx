import { useMemo, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { TbArrowBackUp, TbDotsVertical } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router'
import { DropdownButton, Page } from '@/components/commons'
import { BarChart } from '@/components/Wallet'
import useWallet from '@/hooks/useWallet'
import { SpendingPeriod } from '@/utils/enum'
import { amountWithCurrency } from '@/utils/functions'

const Wallet = () => {
  const { walletId } = useParams()
  const navigate = useNavigate()
  const { useGetWalletQuery, useGetWalletChartDataQuery } = useWallet()
  const getWallet = useGetWalletQuery(walletId)
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0)
  const [selectedUnit] = useState(getDefaultUnit())
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

  function getDefaultUnit(unit?: SpendingPeriod) {
    if (!unit) return SpendingPeriod.Month
    if (unit === SpendingPeriod.All) return SpendingPeriod.Year
    return unit
  }

  return (
    <Page className="grid auto-rows-min items-start bg-gray-100">
      <div className="bg-white">
        {/* Page Header */}
        <div className="sticky top-0 z-10 grid">
          <div className="grid grid-cols-[1fr_auto_1fr] bg-white p-3">
            <button type="button" onClick={handleClickBack}>
              <TbArrowBackUp className="h-6 w-6" />
            </button>

            <p className="self-center text-center text-lg font-bold">
              {wallet?.name}
            </p>

            <DropdownButton>
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
          <div className="flex items-start justify-between bg-white p-3">
            <div className="text-3xl">
              {!!wallet &&
                amountWithCurrency(
                  aggChartData[selectedPeriodIndex]?.spendingPeriodTotal,
                  wallet.country,
                  wallet.currency
                )}
              <p className="text-xs text-gray-500">
                Total spendings{' '}
                {selectedPeriodIndex === 0
                  ? 'this month'
                  : aggChartData[selectedPeriodIndex]?.startPeriod}
              </p>
            </div>

            <div className="bg-primary-100 text-primary-500 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold">
              <FaChevronDown className="h-3 w-3" />
              <span>Monthly</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <BarChart
          data={aggChartData}
          selectedIndex={selectedPeriodIndex}
          setSelectedIndex={setSelectedPeriodIndex}
          handleFetchMoreData={() => getChartData.fetchNextPage()}
          isFetchingMoreData={getChartData.isFetchingNextPage}
        />
      </div>

      <div className="h-full p-3 py-6">
        <p className="mb-1 text-lg font-bold">Breakdown</p>

        <div className="flex rounded-lg bg-white p-6 shadow-lg">
          <div className="bg-primary-100 h-[100px] w-[100px] rounded-full" />
        </div>
      </div>
    </Page>
  )
}

export default Wallet
