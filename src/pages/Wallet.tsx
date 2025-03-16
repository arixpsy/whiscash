import { Page } from '@/components/commons'
import { FaChevronDown } from 'react-icons/fa'
import { TbArrowBackUp } from 'react-icons/tb'
import { RiSettingsLine } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router'
import useWallet from '@/hooks/useWallet'
import { BarChart } from '@/components/Wallet'

const Wallet = () => {
  const { walletId } = useParams()
  const { useGetWalletQuery, useGetWalletChartDataQuery } = useWallet()
  const getWallet = useGetWalletQuery(walletId)
  const getChartData = useGetWalletChartDataQuery({
    unit: getWallet.data?.spendingPeriod,
    walletId: getWallet.data?.id,
  })
  const wallet = getWallet.data
  const navigate = useNavigate()

  const handleClickBack = () => document.startViewTransition(() => navigate(-1))

  return (
    <Page className="grid auto-rows-min items-start py-3">
      <div className="flex justify-between px-3">
        <button type="button" onClick={handleClickBack}>
          <TbArrowBackUp className="h-6 w-6" />
        </button>

        <button type="button">
          <RiSettingsLine className="h-6 w-6" />
        </button>
      </div>

      <p className="mt-3 text-center text-lg font-bold">{wallet?.name}</p>

      <div className="mt-3 flex items-start justify-between px-3">
        <div className="text-3xl">
          $1203.30
          <p className="text-xs text-gray-500">Spendings this month</p>
        </div>
        <div className="bg-primary-100 text-primary-500 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold">
          <FaChevronDown className="h-3 w-3" />
          <span>Monthly</span>
        </div>
      </div>
      <BarChart data={getChartData.data?.pages || []} />

      <div className="h-full bg-gray-100 p-3 py-6">
        <p className="mb-1 text-lg font-bold">Breakdown</p>

        <div className="flex h-[300px] rounded-lg bg-white p-3 shadow-lg">
          <div className="bg-primary-100 h-[100px] w-[100px] rounded-full"></div>
        </div>

        <button
          className="bg-primary-100 mx-3 rounded-lg px-3 py-2"
          onClick={() => getChartData.fetchNextPage()}
        >
          Fetch Next Page
        </button>
      </div>
    </Page>
  )
}

export default Wallet
