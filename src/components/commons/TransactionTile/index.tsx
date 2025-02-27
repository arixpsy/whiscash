import { motion } from 'motion/react'
import { TransactionWithCurrency } from '@/@types/shared'
import { CATEGORY_ICON } from '@/utils/constants/categories'
import { amountWithCurrency } from '@/utils/functions'

type TransactionTileProps = {
  transaction: TransactionWithCurrency
}
const TransactionTile = (props: TransactionTileProps) => {
  const { transaction } = props
  const CategoryIcon = CATEGORY_ICON[transaction.category]

  return (
    <motion.div
      className="grid grid-cols-[auto_1fr] gap-3"
      initial={{ opacity: '0%' }}
      animate={{ opacity: '100%' }}
      exit={{ opacity: '0%' }}
    >
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

        <p className="text-xl">
          {amountWithCurrency(
            transaction.amount,
            transaction.country,
            transaction.currency
          )}
        </p>
      </div>
    </motion.div>
  )
}

const Skeleton = () => (
  <motion.div
    className="grid grid-cols-[auto_1fr] gap-3"
    initial={{ opacity: '0%' }}
    animate={{ opacity: '100%' }}
    exit={{ opacity: '0%' }}
  >
    <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-200" />

    <div className="flex w-full items-center justify-between">
      <div className="space-y-1">
        <div className="h-6 w-24 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-5 w-18 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="h-7 w-18 animate-pulse rounded-lg bg-gray-200" />
    </div>
  </motion.div>
)

TransactionTile.Skeleton = Skeleton

export default TransactionTile
