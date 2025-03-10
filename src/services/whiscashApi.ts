import axios, { AxiosRequestConfig } from 'axios'
import {
  CreateTransactionRequest,
  CreateWalletRequest,
  GetDashboardWalletsResponse,
  GetTransactionsResponse,
  GetWalletsResponse,
  Transaction,
  Wallet,
} from '@/@types/shared'

const whiscashApi = axios.create({
  baseURL: `${import.meta.env.VITE_WHISCASH_BE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

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

const getDashboardWallets =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetDashboardWalletsResponse> =>
    whiscashApi.get('/wallet/dashboard', await config).then((res) => res.data)

const getMainWallets =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetWalletsResponse> =>
    whiscashApi.get('/wallet/main', await config).then((res) => res.data)

const getWallet =
  (config: Promise<AxiosRequestConfig>) =>
  async (walletId?: string): Promise<Wallet> =>
    whiscashApi.get(`/wallet/${walletId}`, await config).then((res) => res.data)

const getWallets =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetWalletsResponse> =>
    whiscashApi.get('/wallet', await config).then((res) => res.data)

const getWalletTransactions =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetTransactionsResponse> =>
    whiscashApi.get('/transaction', await config).then((res) => res.data)

export default {
  createTransaction,
  createWallet,
  deleteTransaction,
  getDashboardWallets,
  getMainWallets,
  getWallet,
  getWallets,
  getWalletTransactions,
}
