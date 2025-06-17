import { Transaction, Wallet } from '@/@types/shared'
import { TransactionTile } from '@/components/commons'
import { Route } from '@/utils/constants/routes'
import { useNavigate } from 'react-router'

type TransactionsCardProps = {
  data: Array<Transaction>
  wallet: Wallet
}

// TODO: clean up

const TransactionsCard = (props: TransactionsCardProps) => {
  const { data, wallet } = props
  const navigate = useNavigate()

  const handleNavigateToTransaction = (transactionId: number) =>
    document.startViewTransition(() =>
      navigate(`${Route.TRANSACTIONS}/${transactionId}`, {
        state: { from: Route.WALLETS + '/' + wallet.id },
      })
    )

  return (
    <div className="py-3">
      <p className="mb-1 px-3 text-lg font-bold">Transactions</p>
      <div className="rounded-lg bg-white">
        {data
          .slice()
          .reverse()
          .map((r) => (
            <TransactionTile
              key={r.id}
              transaction={{
                ...r,
                name: wallet.name,
                currency: wallet.currency,
                country: wallet.country,
                subWalletOf: wallet.subWalletOf,
              }}
              onClick={() => handleNavigateToTransaction(r.id)}
            />
          ))}
      </div>
    </div>
  )
}

export default TransactionsCard
