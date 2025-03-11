import { motion } from 'motion/react'
import { createElement, HTMLAttributes } from 'react'
import {
  GetDashboardWalletsResponse,
  TransactionWithWallet,
} from '@/@types/shared'
import { SwipeActionContainer } from '@/components/commons'
import { CATEGORY_ICON } from '@/utils/constants/categories'
import { amountWithCurrency, localDateTime } from '@/utils/functions'
import useTransaction from '@/hooks/useTransaction'
import { useQueryClient } from '@tanstack/react-query'

type TransactionTileProps = {
  transaction: TransactionWithWallet
} & HTMLAttributes<HTMLButtonElement>

const TransactionTile = (props: TransactionTileProps) => {
  const { transaction, onClick } = props
  const queryClient = useQueryClient()
  const { useDeleteTransactionMutation } = useTransaction()
  const deleteTransaction = useDeleteTransactionMutation(
    deleteTransactionSuccessCB
  )

  const handleDeleteTransaction = () => deleteTransaction.mutate(transaction.id)

  function deleteTransactionSuccessCB() {
    queryClient.invalidateQueries({
      queryKey: ['whiscash', 'transactions', transaction.walletId.toString()],
    })

    if (transaction?.subWalletOf) {
      queryClient.invalidateQueries({
        queryKey: [
          'whiscash',
          'transactions',
          transaction.subWalletOf.toString(),
        ],
      })
    }

    queryClient.setQueryData(
      ['whiscash', 'wallets', 'dashboard'],
      (current: GetDashboardWalletsResponse) => {
        const walletIndex = current.findIndex(
          (w) => w.id === transaction.walletId
        )

        current[walletIndex].spendingPeriodTotal -= transaction.amount

        if (transaction?.subWalletOf) {
          const mainWalletIndex = current.findIndex(
            (w) => w.id === transaction.subWalletOf
          )
          current[mainWalletIndex].spendingPeriodTotal -= transaction.amount
        }

        return current
      }
    )
  }

  return (
    <motion.button
      initial={{ opacity: '0%' }}
      animate={{ opacity: '100%' }}
      exit={{ opacity: '0%' }}
      onClick={onClick}
      className="w-full"
    >
      <SwipeActionContainer
        className="grid grid-cols-[auto_1fr] gap-3 bg-white p-2"
        onTrigger={handleDeleteTransaction}
      >
        <div className="bg-primary-100 grid h-12 w-12 place-items-center rounded-lg">
          {createElement(CATEGORY_ICON[transaction.category], {
            className: 'text-primary-500 h-6 w-6',
          })}
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="text-left">
            <p className="font-bold capitalize">
              {transaction.category.toLowerCase()}
            </p>
            <p className="text-sm text-gray-500">{transaction.description}</p>
          </div>

          <div className="text-right">
            <p className="text-xl">
              {amountWithCurrency(
                transaction.amount,
                transaction.country,
                transaction.currency
              )}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {localDateTime(transaction.paidAt).toRelativeCalendar()}
            </p>
          </div>
        </div>
      </SwipeActionContainer>
    </motion.button>
  )
}

const Skeleton = () => (
  <motion.div
    className="grid grid-cols-[auto_1fr] gap-3 p-2"
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

      <div className="grid justify-items-end space-y-1">
        <div className="h-7 w-18 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-4 w-14 animate-pulse rounded-sm bg-gray-200" />
      </div>
    </div>
  </motion.div>
)

TransactionTile.Skeleton = Skeleton

export default TransactionTile
