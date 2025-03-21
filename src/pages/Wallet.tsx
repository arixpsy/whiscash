import { useQueryClient } from '@tanstack/react-query'
import { AnimatePresence } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { TbArrowBackUp, TbDotsVertical } from 'react-icons/tb'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router'
import { ConfirmationModal, DropdownButton, Page } from '@/components/commons'
import {
  ArchiveBanner,
  BarChart,
  ChartDetailsHeader,
  PieChart,
  UnitSelectorModal,
} from '@/components/Wallet'
import useWallet from '@/hooks/useWallet'
import { Route } from '@/utils/constants/routes'
import { SpendingPeriod } from '@/utils/enum'
import { cn } from '@/utils/functions'

const Wallet = () => {
  const { walletId } = useParams()
  const location = useLocation()
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    useArchiveWalletMutation,
    useDeleteWalletMutation,
    useGetWalletQuery,
    useGetWalletChartDataQuery,
  } = useWallet()
  const archiveWallet = useArchiveWalletMutation(archiveWalletSuccessCB)
  const unarchiveWallet = useArchiveWalletMutation(unarchiveWalletSuccessCB)
  const deleteWallet = useDeleteWalletMutation(deleteWalletSuccessCB)
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

  const handleClickArchiveOption = () => {
    if (!wallet) return
    setSearchParams({ confirmation: 'archive' })
  }

  const handleArchiveWallet = () => {
    if (!wallet) return
    archiveWallet.mutate(wallet.id)
  }

  const handleUnarchiveWallet = () => {
    if (!wallet) return
    unarchiveWallet.mutate(wallet.id)
  }

  const handleClickDeleteOption = () => {
    if (!wallet) return
    setSearchParams({ confirmation: 'delete' })
  }

  const handleDeleteWallet = () => {
    if (!wallet) return
    deleteWallet.mutate(wallet.id)
  }

  function archiveWalletSuccessCB() {
    queryClient.invalidateQueries({
      queryKey: ['whiscash', 'wallets', 'dashboard'],
    })

    if (wallet) {
      queryClient.invalidateQueries({
        queryKey: ['whiscash', 'wallets', wallet.id.toString()],
      })
    }

    navigate(-1)
  }

  function unarchiveWalletSuccessCB() {
    queryClient.invalidateQueries({
      queryKey: ['whiscash', 'wallets', 'dashboard'],
    })

    if (wallet) {
      queryClient.invalidateQueries({
        queryKey: ['whiscash', 'wallets', wallet.id.toString()],
      })
    }
  }

  function deleteWalletSuccessCB() {
    const lastRoute = location.state?.from

    navigate(lastRoute ?? Route.WALLETS, { replace: true })
  }

  useEffect(() => {
    if (wallet) setSelectedUnit(wallet.spendingPeriod)
  }, [wallet])

  return (
    <>
      <Page
        className={cn(
          'grid auto-rows-min items-start bg-gray-100',
          wallet?.archivedAt && 'pb-[50px]'
        )}
      >
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

              <DropdownButton className="z-20 justify-self-end">
                <DropdownButton.Trigger className="justify-self-end">
                  <TbDotsVertical className="h-6 w-6" />
                </DropdownButton.Trigger>

                <DropdownButton.Content
                  className="grid min-w-24 gap-3"
                  triggerAnchor="topRight"
                  contentAnchor="topRight"
                >
                  {/* TODO: */}
                  <DropdownButton.ContentOption>
                    Edit
                  </DropdownButton.ContentOption>
                  {wallet && !wallet.archivedAt && (
                    <DropdownButton.ContentOption
                      onClick={handleClickArchiveOption}
                    >
                      Archive
                    </DropdownButton.ContentOption>
                  )}

                  <DropdownButton.ContentOption
                    onClick={handleClickDeleteOption}
                  >
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
          {getWallet.isPending ||
          (selectedUnit !== SpendingPeriod.All && getChartData.isPending) ? (
            <BarChart.Skeleton />
          ) : (
            wallet &&
            (selectedUnit === SpendingPeriod.All ? (
              <PieChart data={[]} wallet={wallet} /> // TODO:
            ) : (
              <BarChart
                data={aggChartData}
                handleFetchMoreData={() => getChartData.fetchNextPage()}
                isFetchingMoreData={getChartData.isFetchingNextPage}
                selectedIndex={selectedPeriodIndex}
                setSelectedIndex={setSelectedPeriodIndex}
                unit={selectedUnit}
              />
            ))
          )}
        </div>

        <div className="p-3 py-6">
          {getWallet.isPending ||
          (selectedUnit !== SpendingPeriod.All && getChartData.isPending) ? (
            <>
              <div className="mb-3 h-5 w-22 animate-pulse rounded-lg bg-gray-200" />
              <PieChart.Skeleton />
            </>
          ) : (
            wallet &&
            selectedUnit !== SpendingPeriod.All && (
              <>
                <p className="mb-1 text-lg font-bold">Breakdown</p>
                <PieChart
                  data={aggChartData[selectedPeriodIndex]?.transactions || []}
                  wallet={wallet}
                />
              </>
            )
          )}
        </div>

        <AnimatePresence>
          {wallet && wallet.archivedAt && (
            <ArchiveBanner
              onClickRevert={handleUnarchiveWallet}
              isLoading={unarchiveWallet.isPending}
            />
          )}
        </AnimatePresence>
      </Page>

      {!!selectedUnit && (
        <UnitSelectorModal
          selectedUnit={selectedUnit}
          setSelectedUnit={setSelectedUnit}
          setSelectedPeriodIndex={setSelectedPeriodIndex}
        />
      )}

      <ConfirmationModal
        paramValue="archive"
        title="Archive this wallet?"
        description="Archiving a wallet will remove it from the dashboard view. You will still be able to view this wallet in your wallets list."
        onConfirm={handleArchiveWallet}
        isConfirmLoading={archiveWallet.isPending}
      />

      <ConfirmationModal
        paramValue="delete"
        title="Delete this wallet?"
        description="Deleting this wallet will remove it from your wallet list forever. Deleting a wallet will also remove all associated transactions as well."
        onConfirm={handleDeleteWallet}
        isConfirmLoading={deleteWallet.isPending}
      />
    </>
  )
}

export default Wallet
