import { useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Wallet } from '@/@types/shared'
import {
  Banner,
  TransactionModal,
  WalletModal,
  Page,
  TransactionTile,
  ConfirmationModal,
} from '@/components/commons'
import { Header, WalletCarousel } from '@/components/Dashboard'
import useWallet from '@/hooks/useWallet'
import useTransaction from '@/hooks/useTransaction'
import { QUERY_KEYS } from '@/utils/constants/queryKey'
import { Route } from '@/utils/constants/routes'

const Dashboard = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const {
    useGetDashboardWalletTransactionsQuery,
    useDeleteTransactionMutation,
  } = useTransaction()
  const deleteTransaction = useDeleteTransactionMutation(
    deleteTransactionSuccessCB
  )
  const { useGetDashboardWalletsQuery } = useWallet()
  const getDashboardWallets = useGetDashboardWalletsQuery({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
  const wallets = getDashboardWallets.data || []
  const transactions = useGetDashboardWalletTransactionsQuery(
    wallets.map(({ id }) => ({ walletId: id.toString(), limit: '5' }))
  )
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const activeWallet = useMemo<Wallet | undefined>(
    () =>
      getDashboardWallets.data
        ? getDashboardWallets.data[activeIndex]
        : undefined,
    [activeIndex, getDashboardWallets.data]
  )

  const activeTransactionQuery = useMemo(
    () => transactions[activeIndex],
    [activeIndex, transactions]
  )

  const handleDeleteTransaction = () => {
    const id = Number(searchParams.get('id'))
    if (!id || isNaN(id)) return
    deleteTransaction.mutate(id)
  }

  const handleNavigateToTransaction = (transactionId: number) =>
    document.startViewTransition(() =>
      navigate(`${Route.TRANSACTIONS}/${transactionId}`, {
        state: { from: Route.DASHBOARD },
      })
    )

  function deleteTransactionSuccessCB() {
    if (!activeWallet) return
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.WALLET_TRANSACTIONS(activeWallet.id.toString()),
    })

    if (activeWallet?.subWalletOf) {
      queryClient.invalidateQueries({
        queryKey: [
          'whiscash',
          'transactions',
          activeWallet.subWalletOf.toString(),
        ],
      })
    }

    queryClient.invalidateQueries({
      queryKey: ['whiscash', 'wallets', 'dashboard'],
    })

    navigate(Route.DASHBOARD, { replace: true })
  }

  // display states
  const shouldDisplaySkeleton =
    getDashboardWallets.isPending ||
    (transactions.length > 0 && activeTransactionQuery.isPending)
  const shouldDisplayTransactionData =
    transactions.length > 0 && activeTransactionQuery.data
  const shouldDisplayEmptyBanner =
    !shouldDisplaySkeleton &&
    ((getDashboardWallets.data || []).length === 0 ||
      (activeTransactionQuery.data || []).length === 0)

  return (
    <>
      <Page className="flex flex-col">
        <Header>
          <WalletCarousel
            activeIndex={activeIndex}
            isLoading={getDashboardWallets.isPending}
            setActiveIndex={setActiveIndex}
            wallets={wallets}
          />
        </Header>

        <div className="pb-28">
          <h1 className="mx-3 mb-2 text-2xl font-bold">Recent Transactions</h1>
          {shouldDisplaySkeleton &&
            Array.from({ length: 4 }).map((_, index) => (
              <TransactionTile.Skeleton key={index} />
            ))}

          {shouldDisplayTransactionData &&
            activeTransactionQuery.data.map((t) => (
              <TransactionTile
                key={t.id}
                transaction={t}
                onClick={() => handleNavigateToTransaction(t.id)}
                swipable
              />
            ))}

          {shouldDisplayEmptyBanner && <Banner.NoTransactionsFound />}
        </div>
      </Page>

      {activeWallet && (
        <TransactionModal
          key={activeWallet.id}
          walletId={activeWallet.id}
          mainWalletId={activeWallet.subWalletOf}
          currency={activeWallet.currency}
        />
      )}

      <WalletModal />

      <ConfirmationModal
        paramValue="delete"
        title="Delete this transaction?"
        description="Deleting this transaction will remove it forever."
        onConfirm={handleDeleteTransaction}
        isConfirmLoading={deleteTransaction.isPending}
      />
    </>
  )
}

export default Dashboard
