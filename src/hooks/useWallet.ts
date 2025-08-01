import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import {
  GetDashboardWalletsRequest,
  GetWalletsRequest,
  Wallet,
} from '@/@types/shared'
import useToken from '@/hooks/useToken'
import whiscashApi from '@/services/whiscashApi'
import { QUERY_KEYS } from '@/utils/constants/queryKey'
import { SpendingPeriod } from '@/utils/enum'

const useWallet = () => {
  const { createRequestConfig } = useToken()

  const useArchiveWalletMutation = (onSuccess: (data: Wallet) => void) =>
    useMutation({
      mutationFn: whiscashApi.archiveWallet(createRequestConfig()),
      onSuccess,
    })

  const useCreateWalletMutation = (onSuccess: (data: Wallet) => void) =>
    useMutation({
      mutationFn: whiscashApi.createWallet(createRequestConfig()),
      onSuccess,
    })

  const useDeleteWalletMutation = (onSuccess: (data: Wallet) => void) =>
    useMutation({
      mutationFn: whiscashApi.deleteWallet(createRequestConfig()),
      onSuccess,
    })

  const useGetDashboardWalletsQuery = (req: GetDashboardWalletsRequest) =>
    useQuery({
      queryKey: QUERY_KEYS.DASHBOARD,
      queryFn: whiscashApi.getDashboardWallets(
        createRequestConfig({ params: req })
      ),
    })

  const useGetMainWalletsQuery = (req: GetWalletsRequest) =>
    useQuery({
      queryKey: QUERY_KEYS.MAIN_WALLETS(req),
      queryFn: whiscashApi.getMainWallets(createRequestConfig({ params: req })),
    })

  const useGetWalletQuery = (walletId?: string) =>
    useQuery({
      queryKey: QUERY_KEYS.WALLET(walletId),
      queryFn: () => whiscashApi.getWallet(createRequestConfig())(walletId),
      enabled: !!walletId,
    })

  const useGetWalletChartDataQuery = ({
    unit,
    walletId,
  }: {
    unit?: SpendingPeriod
    walletId?: number
  }) =>
    useInfiniteQuery({
      queryKey: QUERY_KEYS.WALLET_CHART_DATA(walletId, unit),
      initialPageParam: {
        unit,
        walletId,
        limit: 10,
        offset: 0,
      },
      queryFn: ({ pageParam }) =>
        whiscashApi.getWalletChartData(
          createRequestConfig({ params: pageParam })
        )(walletId?.toString()),
      getNextPageParam: (_, __, lastPage) => ({
        ...lastPage,
        offset: lastPage.offset + lastPage.limit,
      }),
      enabled: !!walletId && !!unit,
    })

  const useGetWalletsQuery = (req: GetWalletsRequest, enabled = true) =>
    useQuery({
      queryKey: QUERY_KEYS.WALLETS(req),
      queryFn: whiscashApi.getWallets(createRequestConfig({ params: req })),
      enabled,
    })

  const useUpdateWalletMutation = (onSuccess: (data: Wallet) => void) =>
    useMutation({
      mutationFn: whiscashApi.updateWallet(createRequestConfig()),
      onSuccess,
    })

  return {
    useArchiveWalletMutation,
    useCreateWalletMutation,
    useDeleteWalletMutation,
    useGetDashboardWalletsQuery,
    useGetMainWalletsQuery,
    useGetWalletQuery,
    useGetWalletChartDataQuery,
    useGetWalletsQuery,
    useUpdateWalletMutation,
  }
}

export default useWallet
