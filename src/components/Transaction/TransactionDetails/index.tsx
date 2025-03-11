import { TransactionWithWallet } from '@/@types/shared'
import { WalletCard } from '@/components/commons'
import { CATEGORY_ICON } from '@/utils/constants/categories'
import { amountWithCurrency, localDateTime } from '@/utils/functions'
import { createElement } from 'react'

type TransactionDetailsProps = {
  transaction: TransactionWithWallet
}

const TransactionDetails = (props: TransactionDetailsProps) => {
  const { transaction } = props
  return (
    <div className="mt-3 grid gap-3 text-center">
      <div className="bg-primary-100 mx-auto grid h-26 w-26 place-items-center rounded-lg">
        {createElement(CATEGORY_ICON[transaction.category], {
          className: 'text-primary-500 h-14 w-14',
        })}
      </div>

      <p className="text-xl">{transaction?.description}</p>

      <p className="text-4xl font-bold">
        {amountWithCurrency(
          transaction.amount,
          transaction.country,
          transaction.currency
        )}
      </p>

      <p className="text-xs text-gray-500">
        {localDateTime(transaction.paidAt).toFormat('ccc, d LLL y, h:mm a')}
      </p>

      <WalletCard
        className="mx-auto border border-gray-300"
        amount={transaction.amount}
        amountSubText={localDateTime(transaction.paidAt).toRelative() || ''}
        cardTitle={transaction.name}
        country={transaction.country}
        currency={transaction.currency}
      />
    </div>
  )
}

const Skeleton = () => (
  <div className="mt-3 grid gap-3 text-center">
    <div className="mx-auto h-26 w-26 animate-pulse rounded-lg bg-gray-200" />
    <div className="mx-auto h-7 w-16 animate-pulse rounded-md bg-gray-200" />
    <div className="mx-auto h-10 w-32 animate-pulse rounded-md bg-gray-200" />
    <div className="mx-auto h-4 w-42 animate-pulse rounded-md bg-gray-200" />

    <WalletCard.Skeleton className="mx-auto border border-gray-300" />
  </div>
)

TransactionDetails.Skeleton = Skeleton

export default TransactionDetails
