import {
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQuery,
} from '@tanstack/react-query'
import { GetWalletTransactionsRequest, Transaction } from '@/@types/shared'
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

  const useDeleteTransactionMutation = (onSuccess: VoidFunction) =>
    useMutation({
      mutationFn: whiscashApi.deleteTransaction(createRequestConfig()),
      onSuccess,
    })

  const useGetTransactionQuery = (transactionId?: string) =>
    useQuery({
      queryKey: QUERY_KEYS.TRANSACTION(transactionId),
      queryFn: () =>
        whiscashApi.getTransaction(createRequestConfig())(transactionId),
      enabled: !!transactionId,
    })

  const useGetTransactionsQuery = (date: string) =>
    useInfiniteQuery({
      initialPageParam: {
        limit: 10,
        offset: 0,
      },
      queryKey: QUERY_KEYS.TRANSACTIONS(date),
      queryFn: ({ pageParam }) =>
        whiscashApi.getTransactions(
          createRequestConfig({ params: { ...pageParam, date } })
        )(),
      getNextPageParam: (_, __, lastPage) => ({
        ...lastPage,
        offset: lastPage.offset + lastPage.limit,
      }),
    })

  const useGetDashboardWalletTransactionsQuery = (
    reqs: Array<GetWalletTransactionsRequest>
  ) =>
    useQueries({
      queries: reqs.map((req) => ({
        queryKey: QUERY_KEYS.WALLET_TRANSACTIONS(req.walletId),
        queryFn: () =>
          whiscashApi.getWalletTransactions(
            createRequestConfig({ params: req })
          )(req.walletId),
      })),
    })

  const useUpdateTransactionMutation = (
    onSuccess: (data: Transaction) => void
  ) =>
    useMutation({
      mutationFn: whiscashApi.updateTransaction(createRequestConfig()),
      onSuccess,
    })

  return {
    useCreateTransactionMutation,
    useDeleteTransactionMutation,
    useGetTransactionQuery,
    useGetTransactionsQuery,
    useGetDashboardWalletTransactionsQuery,
    useUpdateTransactionMutation,
  }
}

export default useTransaction
