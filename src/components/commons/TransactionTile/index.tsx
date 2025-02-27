import { TransactionWithCurrency } from '@/@types/shared'
import { CATEGORY_ICON } from '@/utils/constants/categories'

type TransactionTileProps = {
  transaction: TransactionWithCurrency
}
const TransactionTile = (props: TransactionTileProps) => {
  const { transaction } = props
  const CategoryIcon = CATEGORY_ICON[transaction.category]

  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 py-2">
      <div className="bg-primary-100 grid h-12 w-12 place-items-center rounded-lg">
        {CategoryIcon && <CategoryIcon className="text-primary-500 h-6 w-6" />}
      </div>

      <div className="flex w-full items-center justify-between">
        <div>
          <p className="font-bold capitalize">
            {transaction.category.toLowerCase()}
          </p>
          <p className="text-sm text-gray-500">{transaction.description}</p>
        </div>

        <p className="text-xl">${transaction.amount}</p>
      </div>
    </div>
  )
}

const Skeleton = () => (
  <div className="grid grid-cols-[auto_1fr] gap-3 py-2">
    <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-200" />

    <div className="flex w-full items-center justify-between">
      <div className="space-y-1">
        <div className="h-6 w-24 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-5 w-18 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="h-7 w-18 animate-pulse rounded-lg bg-gray-200" />
    </div>
  </div>
)

TransactionTile.Skeleton = Skeleton

export default TransactionTile
