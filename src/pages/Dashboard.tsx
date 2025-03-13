import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Wallet } from '@/@types/shared'
import {
  Banner,
  TransactionModal,
  CreateWalletModal,
  Page,
  TransactionTile,
} from '@/components/commons'
import { Header, WalletCarousel } from '@/components/Dashboard'
import useWallet from '@/hooks/useWallet'
import useTransaction from '@/hooks/useTransaction'
import { Route } from '@/utils/constants/routes'

const Dashboard = () => {
  const navigate = useNavigate()
  const { useGetDashboardWalletTransactionsQuery } = useTransaction()
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

  const handleNavigateToTransaction = (transactionId: number) =>
    document.startViewTransition(() =>
      navigate(`${Route.TRANSACTIONS}/${transactionId}`, {
        state: { from: Route.DASHBOARD },
      })
    )

  // display states
  const shouldDisplaySkeleton =
    getDashboardWallets.isPending ||
    (transactions.length > 0 && activeTransactionQuery.isPending)
  const shouldDisplayTransactionData =
    transactions.length > 0 && activeTransactionQuery.data
  const shouldDisplayEmptyBanner =
    (transactions.length > 0 &&
      activeTransactionQuery.data &&
      activeTransactionQuery.data.length === 0) ||
    (getDashboardWallets.data && getDashboardWallets.data.length === 0)

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

      <CreateWalletModal />
    </>
  )
}

export default Dashboard
