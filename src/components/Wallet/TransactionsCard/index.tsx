import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { Transaction, Wallet } from '@/@types/shared'
import { Banner, TransactionTile } from '@/components/commons'
import { Route } from '@/utils/constants/routes'

type TransactionsCardProps = {
  data: Array<Transaction>
  wallet: Wallet
}

const TransactionsCard = (props: TransactionsCardProps) => {
  const { data, wallet } = props
  const navigate = useNavigate()
  const listRef = useRef<HTMLDivElement>(null)

  const handleNavigateToTransaction = (transactionId: number) =>
    document.startViewTransition(() =>
      navigate(`${Route.TRANSACTIONS}/${transactionId}`, {
        state: { from: Route.WALLETS + '/' + wallet.id },
      })
    )

  const virtualizer = useWindowVirtualizer({
    count: data.length,
    scrollMargin: listRef.current?.offsetTop ?? 0,
    estimateSize: () => 64,
    overscan: 5,
  })

  return (
    <div className="py-3">
      <p className="mb-1 px-3 text-lg font-bold">Transactions</p>
      <div ref={listRef}>
        <div
          className="relative w-full"
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualizer.getVirtualItems().map((item) => (
            <div
              key={item.index}
              className="absolute top-0 left-0 w-full"
              style={{
                height: `${item.size}px`,
                transform: `translateY(${
                  item.start - virtualizer.options.scrollMargin
                }px)`,
              }}
            >
              <TransactionTile
                key={data.length - item.index}
                transaction={{
                  ...data[data.length - 1 - item.index],
                  name: wallet.name,
                  currency: wallet.currency,
                  country: wallet.country,
                  subWalletOf: wallet.subWalletOf,
                }}
                onClick={() =>
                  handleNavigateToTransaction(
                    data[data.length - 1 - item.index].id
                  )
                }
              />
            </div>
          ))}
          {virtualizer.getVirtualItems().length === 0 && (
            <div className="py-3">
              <Banner.NoTransactionsFound />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

TransactionsCard.Skeleton = () => {
  return (
    <div className="py-3">
      <div className="mx-3 mb-1 h-5 w-26 animate-pulse rounded-lg bg-gray-200" />
      {Array.from({ length: 5 }).map((_, index) => (
        <TransactionTile.Skeleton key={index} />
      ))}
    </div>
  )
}

export default TransactionsCard
