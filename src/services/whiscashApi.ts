import axios, { AxiosRequestConfig } from 'axios'
import { CreateTransactionRequest } from '@/@types/transaction'
import {
  CreateWalletRequest,
  GetWalletsResponse,
  Wallet,
} from '@/@types/wallet'

const whiscashApi = axios.create({
  baseURL: `${import.meta.env.VITE_WHISCASH_BE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

const createTransaction =
  (config: Promise<AxiosRequestConfig>) =>
  async (data: CreateTransactionRequest) =>
    whiscashApi.post('/transaction', data, await config)

const createWallet =
  (config: Promise<AxiosRequestConfig>) =>
  async (data: CreateWalletRequest): Promise<Wallet> =>
    whiscashApi.post('/wallet', data, await config).then((res) => res.data)

const getWallets =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetWalletsResponse> =>
    whiscashApi.get('/wallet', await config).then((res) => res.data)

export default {
  createTransaction,
  createWallet,
  getWallets,
}
