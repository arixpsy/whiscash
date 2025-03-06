import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { GetTransactionRequest, Transaction } from '@/@types/shared'
import useToken from '@/hooks/useToken'
import whiscashApi from '@/services/whiscashApi'
import { QUERY_KEYS } from '@/utils/constants/queryKey'

const useTransaction = () => {
  const { createRequestConfig } = useToken()

  const useCreateTransactionMutation = (
    onSuccess: (data: Transaction) => void
  ) =>
    useMutation({
      mutationFn: whiscashApi.createTransaction(createRequestConfig()),
      onSuccess,
    })

  const useDeleteTransactionMutation = (onSuccess: () => void) =>
    useMutation({
      mutationFn: whiscashApi.deleteTransaction(createRequestConfig()),
      onSuccess,
    })

  const useGetWalletTransactionsQuery = (req: GetTransactionRequest) =>
    useQuery({
      queryKey: QUERY_KEYS.WALLET_TRANSACTIONS(req.walletId),
      queryFn: whiscashApi.getWalletTransactions(
        createRequestConfig({ params: req })
      ),
    })

  const useGetDashboardWalletTransactionsQuery = (
    reqs: Array<GetTransactionRequest>
  ) =>
    useQueries({
      queries: reqs.map((req) => ({
        queryKey: QUERY_KEYS.WALLET_TRANSACTIONS(req.walletId),
        queryFn: whiscashApi.getWalletTransactions(
          createRequestConfig({ params: req })
        ),
      })),
    })

  return {
    useCreateTransactionMutation,
    useDeleteTransactionMutation,
    useGetDashboardWalletTransactionsQuery,
    useGetWalletTransactionsQuery,
  }
}

export default useTransaction
