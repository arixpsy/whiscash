import { Transaction, Wallet } from '@/@types/shared'
import { TransactionTile } from '@/components/commons'

type TransactionsCardProps = {
  data: Array<Transaction>
  wallet: Wallet
}

// TODO: clean up

const TransactionsCard = (props: TransactionsCardProps) => {
  const { data, wallet } = props

  return (
    <div className='py-3'>
      <p className="mb-1 text-lg font-bold px-3">Transactions</p>
      <div className="rounded-lg bg-white">
        {data.slice().reverse().map((r) => (
          <TransactionTile
            transaction={{
              ...r,
              name: wallet.name,
              currency: wallet.currency,
              country: wallet.country,
              subWalletOf: wallet.subWalletOf,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default TransactionsCard
