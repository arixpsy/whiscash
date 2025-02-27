import { useMutation, useQuery } from '@tanstack/react-query'
import {
  CreateTransactionRequest,
  GetTransactionRequest,
} from '@/@types/shared'
import useToken from '@/hooks/useToken'
import whiscashApi from '@/services/whiscashApi'
import { QUERY_KEYS } from '@/utils/constants/queryKey'

const useTransaction = () => {
  const { createRequestConfig } = useToken()

  const useCreateTransactionMutation = (
    onSuccess: (data: CreateTransactionRequest) => void
  ) =>
    useMutation({
      mutationFn: whiscashApi.createTransaction(createRequestConfig()),
      onSuccess,
    })

  const useGetWalletTransactionsQuery = (req: GetTransactionRequest) =>
    useQuery({
      queryKey: QUERY_KEYS.WALLET_TRANSACTIONS(req.walletId),
      queryFn: whiscashApi.getWalletTransactions(
        createRequestConfig({ params: req })
      ),
    })

  return {
    useCreateTransactionMutation,
    useGetWalletTransactionsQuery,
  }
}

export default useTransaction
