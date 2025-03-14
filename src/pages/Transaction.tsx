import { TbArrowBackUp, TbDotsVertical } from 'react-icons/tb'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router'
import {
  Banner,
  ConfirmationModal,
  DropdownButton,
  Page,
  TransactionModal,
} from '@/components/commons'
import { TransactionDetails } from '@/components/Transaction'
import useTransaction from '@/hooks/useTransaction'
import { Route } from '@/utils/constants/routes'

const Transaction = () => {
  const location = useLocation()
  const [, setSearchParams] = useSearchParams()
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const { useGetTransactionQuery, useDeleteTransactionMutation } =
    useTransaction()
  const getTransaction = useGetTransactionQuery(transactionId)
  const deleteTransaction = useDeleteTransactionMutation(
    deleteTransactionSuccessCB
  )
  const transaction = getTransaction.data

  const handleClickBack = () => document.startViewTransition(() => navigate(-1))

  const handleClickDeleteOption = () => {
    if (!transaction) return
    setSearchParams({ confirmation: 'delete' }, { state: location.state })
  }

  const handleDeleteTransaction = () => {
    if (!transaction) return
    deleteTransaction.mutate(transaction.id)
  }

  function deleteTransactionSuccessCB() {
    const lastRoute = location.state?.from

    navigate(lastRoute ?? Route.DASHBOARD, { replace: true })
  }

  const handleClickEditOption = () => {
    if (!transaction) return
    setSearchParams({ update: 'transaction' }, { state: location.state })
  }

  // display states
  const shouldDisplaySkeleton = getTransaction.isPending
  const shouldDisplayTransactionData =
    !getTransaction.isPending && !!transaction
  const shouldDisplayError = getTransaction.isError

  return (
    <>
      <Page className="flex flex-col p-3">
        <div className="flex justify-between">
          <button type="button" onClick={handleClickBack}>
            <TbArrowBackUp className="h-6 w-6" />
          </button>

          <DropdownButton>
            <DropdownButton.Trigger>
              <TbDotsVertical className="h-6 w-6" />
            </DropdownButton.Trigger>

            <DropdownButton.Content className="grid min-w-24 gap-3">
              <DropdownButton.ContentOption onClick={handleClickEditOption}>
                Edit
              </DropdownButton.ContentOption>
              <DropdownButton.ContentOption onClick={handleClickDeleteOption}>
                Delete
              </DropdownButton.ContentOption>
            </DropdownButton.Content>
          </DropdownButton>
        </div>

        {shouldDisplaySkeleton && <TransactionDetails.Skeleton />}

        {shouldDisplayTransactionData && (
          <TransactionDetails transaction={transaction} />
        )}

        {shouldDisplayError && (
          <div className="flex flex-1 items-center justify-center">
            <Banner.TransactionDoesNotExist />
          </div>
        )}
      </Page>

      {!!transaction && (
        <TransactionModal
          action="update"
          walletId={transaction.walletId}
          mainWalletId={transaction.subWalletOf}
          currency={transaction.currency}
          existingTransaction={transaction}
        />
      )}

      <ConfirmationModal
        paramValue="delete"
        title="Are you sure you want to delete this transaction?"
        description="Deleting this transaction will remove it from your transaction history forever."
        onConfirm={handleDeleteTransaction}
        isConfirmLoading={deleteTransaction.isPending}
      />
    </>
  )
}

export default Transaction
