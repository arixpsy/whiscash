import { useMemo, useState } from 'react'
import { Wallet } from '@/@types/shared'
import {
  Banner,
  CreateTransactionModal,
  CreateWalletModal,
  Page,
  TransactionTile,
} from '@/components/commons'
import { Header, WalletCarousel } from '@/components/Dashboard'
import useWallet from '@/hooks/useWallet'
import useTransaction from '@/hooks/useTransaction'

const Dashboard = () => {
  const { useGetDashboardWalletTransactionsQuery } = useTransaction()
  const { useGetDashboardWalletsQuery } = useWallet()
  const getDashboardWallets = useGetDashboardWalletsQuery({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
  const wallets = getDashboardWallets.data || []
  const transactions = useGetDashboardWalletTransactionsQuery(
    wallets.map(({ id }) => ({ walletId: id.toString() }))
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

  // display states
  const shouldDisplaySkeleton =
    getDashboardWallets.isPending ||
    transactions.length === 0 ||
    (transactions.length > 0 && activeTransactionQuery.isPending)
  const shouldDisplayTransactionData =
    transactions.length > 0 && activeTransactionQuery.data
  const shouldDisplayEmptyBanner =
    transactions.length > 0 &&
    activeTransactionQuery.data &&
    activeTransactionQuery.data.length === 0

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

        <div className="px-3 pb-28">
          <h1 className="mb-3 text-2xl font-bold">Recent Transactions</h1>
          <div className="grid gap-4">
            {shouldDisplaySkeleton &&
              Array.from({ length: 4 }).map((_, index) => (
                <TransactionTile.Skeleton key={index} />
              ))}

            {shouldDisplayTransactionData &&
              activeTransactionQuery.data.map((t) => (
                <TransactionTile key={t.id} transaction={t} />
              ))}

            {shouldDisplayEmptyBanner && <Banner.NoTransactionsFound />}
          </div>
        </div>
      </Page>

      {activeWallet && (
        <CreateTransactionModal
          walletId={activeWallet.id}
          currency={activeWallet.currency}
        />
      )}

      <CreateWalletModal />
    </>
  )
}

export default Dashboard
