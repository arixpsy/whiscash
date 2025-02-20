import { useMutation, useQuery } from '@tanstack/react-query'
import useToken from '@/hooks/useToken'
import whiscashApi from '@/services/whiscashApi'
import { QUERY_KEYS } from '@/utils/constants/queryKey'

const useWallet = () => {
  const { createRequestConfig } = useToken()

  const useCreateWalletMutation = () =>
    useMutation({
      mutationFn: whiscashApi.createWallet(createRequestConfig()),
    })

  const useGetWalletsQuery = () =>
    useQuery({
      queryKey: QUERY_KEYS.WALLETS,
      queryFn: whiscashApi.getWallets(createRequestConfig()),
    })

  return {
    useCreateWalletMutation,
    useGetWalletsQuery,
  }
}

export default useWallet
