import { useMutation, useQuery } from '@tanstack/react-query'
import { GetDashboardWalletsRequest, GetWalletsRequest, Wallet } from '@/@types/wallet'
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

  const useGetDashboardWalletsQuery = (req: GetDashboardWalletsRequest) =>
      useQuery({
        queryKey: QUERY_KEYS.DASHBOARD,
        queryFn: whiscashApi.getDashboardWallets(createRequestConfig({ params: req })),
      })

  const useGetMainWalletsQuery = (req: GetWalletsRequest) =>
    useQuery({
      queryKey: QUERY_KEYS.MAIN_WALLETS(req),
      queryFn: whiscashApi.getMainWallets(createRequestConfig({ params: req })),
    })

  const useGetWalletsQuery = (req: GetWalletsRequest) =>
    useQuery({
      queryKey: QUERY_KEYS.WALLETS(req),
      queryFn: whiscashApi.getWallets(createRequestConfig({ params: req })),
    })

  return {
    useCreateWalletMutation,
    useGetDashboardWalletsQuery,
    useGetMainWalletsQuery,
    useGetWalletsQuery,
  }
}

export default useWallet
