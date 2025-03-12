import { DropdownButton, Page } from '@/components/commons'
import { FaTrash } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
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
  const shouldDisplayError = getTransaction.isError

  return (
    <Page className="flex flex-col p-3">
      <div className="flex justify-between">
        <button type="button" onClick={handleClickBack}>
          <TbArrowBackUp className="h-6 w-6" />
        </button>

        <DropdownButton>
          <DropdownButton.Trigger>
            <TbDotsVertical className="h-6 w-6" />
          </DropdownButton.Trigger>

          <DropdownButton.Content className="space-y-3">
            <button type="button" className="flex items-center gap-3 text-sm">
              <FiEdit className="h-4 w-4" />
              Edit
            </button>
            <button type="button" className="flex items-center gap-3 text-sm">
              <FaTrash className="h-4 w-4" />
              Delete
            </button>
          </DropdownButton.Content>
        </DropdownButton>
      </div>

      {shouldDisplaySkeleton && <TransactionDetails.Skeleton />}

      {shouldDisplayTransactionData && (
        <TransactionDetails transaction={transaction} />
      )}

      {shouldDisplayError && (
        // TODO: add banner
        <p className="text-center text-red-500"> Error fetching transaction </p>
      )}
    </Page>
  )
}

export default Transaction
