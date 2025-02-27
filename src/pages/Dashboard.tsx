import { useState } from 'react'
import {
  CreateTransactionModal,
  Page,
  // TransactionTile,
} from '@/components/commons'
import { Header, WalletCarousel } from '@/components/Dashboard'
import useWallet from '@/hooks/useWallet'

const Dashboard = () => {
  const { useGetDashboardWalletsQuery } = useWallet()
  const getDashboardWallets = useGetDashboardWalletsQuery({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
  const wallets = getDashboardWallets.data || []
  const [activeIndex, setActiveIndex] = useState<number>(0)

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

          {/* {wallets[activeIndex] &&
            wallets[activeIndex].transactions.map((t) => (
              <TransactionTile transaction={t} />
            ))} */}
        </div>
      </Page>

      <CreateTransactionModal walletId={1} currency="SGD" />
    </>
  )
}

export default Dashboard
