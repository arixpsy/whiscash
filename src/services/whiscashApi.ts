import axios, { AxiosRequestConfig } from 'axios'
import {
  CreateTransactionRequest,
  CreateWalletRequest,
  GetDashboardWalletsResponse,
  GetTransactionsResponse,
  GetWalletsResponse,
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
  async (data: CreateTransactionRequest) =>
    whiscashApi.post('/transaction', data, await config).then((res) => res.data)

const createWallet =
  (config: Promise<AxiosRequestConfig>) =>
  async (data: CreateWalletRequest): Promise<Wallet> =>
    whiscashApi.post('/wallet', data, await config).then((res) => res.data)

const getDashboardWallets =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetDashboardWalletsResponse> =>
    whiscashApi.get('/wallet/dashboard', await config).then((res) => res.data)

const getMainWallets =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetWalletsResponse> =>
    whiscashApi.get('/wallet/main', await config).then((res) => res.data)

const getWallets =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetWalletsResponse> =>
    whiscashApi.get('/wallet', await config).then((res) => res.data)

const getWalletTransactions =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetTransactionsResponse> =>
    whiscashApi.get('/transactions', await config).then((res) => res.data)

export default {
  createTransaction,
  createWallet,
  getDashboardWallets,
  getMainWallets,
  getWallets,
  getWalletTransactions,
}
