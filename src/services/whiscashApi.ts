import axios, { AxiosRequestConfig } from 'axios'
import {
  CreateTransactionRequest,
  CreateWalletRequest,
  GetDashboardWalletsResponse,
  GetTransactionsResponse,
  GetWalletChartDataResponse,
  GetWalletsResponse,
  Transaction,
  TransactionWithWallet,
  UpdateTransactionRequest,
  UpdateWalletRequest,
  Wallet,
} from '@/@types/shared'

const whiscashApi = axios.create({
  baseURL: `${import.meta.env.VITE_WHISCASH_BE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

const archiveWallet =
  (config: Promise<AxiosRequestConfig>) =>
  async (walletId: number): Promise<Wallet> =>
    whiscashApi
      .put(`/wallet/${walletId}/archive`, undefined, await config)
      .then((res) => res.data)

const createTransaction =
  (config: Promise<AxiosRequestConfig>) =>
  async (data: CreateTransactionRequest): Promise<Transaction> =>
    whiscashApi.post('/transaction', data, await config).then((res) => res.data)

const createWallet =
  (config: Promise<AxiosRequestConfig>) =>
  async (data: CreateWalletRequest): Promise<Wallet> =>
    whiscashApi.post('/wallet', data, await config).then((res) => res.data)

const deleteTransaction =
  (config: Promise<AxiosRequestConfig>) =>
  async (transactionId: number): Promise<null> =>
    whiscashApi
      .delete(`/transaction/${transactionId}`, await config)
      .then((res) => res.data)

const deleteWallet =
  (config: Promise<AxiosRequestConfig>) =>
  async (walletId: number): Promise<Wallet> =>
    whiscashApi
      .delete(`/wallet/${walletId}`, await config)
      .then((res) => res.data)

const getDashboardWallets =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetDashboardWalletsResponse> =>
    whiscashApi.get('/wallet/dashboard', await config).then((res) => res.data)

const getMainWallets =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetWalletsResponse> =>
    whiscashApi.get('/wallet/main', await config).then((res) => res.data)

const getTransaction =
  (config: Promise<AxiosRequestConfig>) =>
  async (transactionId?: string): Promise<TransactionWithWallet> =>
    whiscashApi
      .get(`/transaction/${transactionId}`, await config)
      .then((res) => res.data)

const getWallet =
  (config: Promise<AxiosRequestConfig>) =>
  async (walletId?: string): Promise<Wallet> =>
    whiscashApi.get(`/wallet/${walletId}`, await config).then((res) => res.data)

const getWalletChartData =
  (config: Promise<AxiosRequestConfig>) =>
  async (walletId?: string): Promise<GetWalletChartDataResponse> =>
    whiscashApi
      .get(`/wallet/${walletId}/chart`, await config)
      .then((res) => res.data)

const getWallets =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetWalletsResponse> =>
    whiscashApi.get('/wallet', await config).then((res) => res.data)

const getWalletTransactions =
  (config: Promise<AxiosRequestConfig>) =>
  async (walletId?: string): Promise<GetTransactionsResponse> =>
    whiscashApi.get(`/wallet/${walletId}/transaction`, await config).then((res) => res.data)

const updateTransaction =
  (config: Promise<AxiosRequestConfig>) =>
  async (data: UpdateTransactionRequest): Promise<Transaction> =>
    whiscashApi
      .put(`/transaction/${data.id}`, data, await config)
      .then((res) => res.data)

const updateWallet =
  (config: Promise<AxiosRequestConfig>) =>
  async (data: UpdateWalletRequest): Promise<Wallet> =>
    whiscashApi
      .put(`/wallet/${data.id}`, data, await config)
      .then((res) => res.data)

export default {
  archiveWallet,
  createTransaction,
  createWallet,
  deleteTransaction,
  deleteWallet,
  getDashboardWallets,
  getMainWallets,
  getTransaction,
  getWallet,
  getWalletChartData,
  getWallets,
  getWalletTransactions,
  updateTransaction,
  updateWallet,
}
