import { Page } from '@/components/commons'
import { TbArrowBackUp } from 'react-icons/tb'
import { TbDotsVertical } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router'
import { TransactionDetails } from '@/components/Transaction'
import useTransaction from '@/hooks/useTransaction'

const Transaction = () => {
  const { transactionId } = useParams()
  const { useGetTransactionQuery } = useTransaction()
  const getTransaction = useGetTransactionQuery(transactionId)
  const transaction = getTransaction.data
  const navigate = useNavigate()

  const handleClickBack = () => document.startViewTransition(() => navigate(-1))

  // display states
  const shouldDisplaySkeleton = getTransaction.isPending
  const shouldDisplayTransactionData =
    !getTransaction.isPending && !!transaction

  return (
    <Page className="flex flex-col p-3">
      <div className="flex justify-between">
        <button type="button" onClick={handleClickBack}>
          <TbArrowBackUp className="h-6 w-6" />
        </button>

        <button type="button">
          <TbDotsVertical className="h-6 w-6" />
        </button>
      </div>

      {shouldDisplaySkeleton && <TransactionDetails.Skeleton />}

      {shouldDisplayTransactionData && (
        <TransactionDetails transaction={transaction} />
      )}
    </Page>
  )
}

export default Transaction
