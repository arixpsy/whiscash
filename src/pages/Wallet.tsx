import { useQueryClient } from '@tanstack/react-query'
import { AnimatePresence } from 'motion/react'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { TbArrowBackUp, TbDotsVertical } from 'react-icons/tb'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router'
import {
  ConfirmationModal,
  DropdownButton,
  Page,
  WalletModal,
} from '@/components/commons'
import {
  ArchiveBanner,
  BarChart,
  ChartDetailsHeader,
  PieChart,
  TransactionsCard,
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

  const periodChartData = useDeferredValue(
    aggChartData[selectedPeriodIndex]?.transactions || []
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

  const handleClickEditOption = () => {
    if (!wallet) return
    setSearchParams({ update: 'wallet' }, { state: location.state })
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
    if (!selectedUnit && wallet) setSelectedUnit(wallet.spendingPeriod)
  }, [selectedUnit, wallet])

  return (
    <>
      <Page
        className={cn(
          'grid auto-rows-min items-start',
          wallet?.archivedAt && 'pb-[50px]'
        )}
      >
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
                <DropdownButton.ContentOption onClick={handleClickEditOption}>
                  Edit
                </DropdownButton.ContentOption>
                {wallet && !wallet.archivedAt && (
                  <DropdownButton.ContentOption
                    onClick={handleClickArchiveOption}
                  >
                    Archive
                  </DropdownButton.ContentOption>
                )}
                <DropdownButton.ContentOption onClick={handleClickDeleteOption}>
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
        <div className="bg-white">
          {getWallet.isPending ||
          (selectedUnit !== SpendingPeriod.All && getChartData.isPending) ? (
            <BarChart.Skeleton />
          ) : (
            wallet &&
            (selectedUnit === SpendingPeriod.All ? (
              <PieChart
                data={aggChartData[selectedPeriodIndex]?.transactions || []}
                wallet={wallet}
              />
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

        <div
          className={cn(
            'bg-gray-100 p-3 py-6',
            selectedUnit === SpendingPeriod.All && 'py-3'
          )}
        >
          {getWallet.isPending ||
          (selectedUnit !== SpendingPeriod.All && getChartData.isPending) ? (
            <div>
              <div className="mb-3 h-5 w-22 animate-pulse rounded-lg bg-gray-200" />
              <PieChart.Skeleton />
            </div>
          ) : (
            wallet &&
            selectedUnit !== SpendingPeriod.All && (
              <div>
                <p className="mb-1 text-lg font-bold">Breakdown</p>
                <PieChart
                  data={periodChartData}
                  wallet={wallet}
                  className="shadow-lg"
                />
              </div>
            )
          )}
        </div>

        <div className="bg-white">
          {getChartData.isPending ? (
            <TransactionsCard.Skeleton />
          ) : (
            wallet && (
              <TransactionsCard data={periodChartData} wallet={wallet} />
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

      {!!wallet && <WalletModal action="update" existingWallet={wallet} />}

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
