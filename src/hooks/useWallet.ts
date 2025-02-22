import { useMutation, useQuery } from '@tanstack/react-query'
import { Wallet } from '@/@types/wallet'
import useToken from '@/hooks/useToken'
import whiscashApi from '@/services/whiscashApi'
import { QUERY_KEYS } from '@/utils/constants/queryKey'

const useWallet = () => {
  const { createRequestConfig } = useToken()

  const useCreateWalletMutation = (onSuccess: (data: Wallet) => void) =>
    useMutation({
      mutationFn: whiscashApi.createWallet(createRequestConfig()),
      onSuccess,
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
