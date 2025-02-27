import { Transaction } from '@/@types/shared'
import { CATEGORY_ICON } from '@/utils/constants/categories'

type TransactionTileProps = {
  transaction: Transaction
}
const TransactionTile = (props: TransactionTileProps) => {
  const { transaction } = props
  const CategoryIcon = CATEGORY_ICON[transaction.category]

  return (
    <div className="mb-2 grid grid-cols-[auto_1fr] gap-3 rounded-lg py-2">
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

export default TransactionTile
