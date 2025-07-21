import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
} from '@tanstack/react-query'
import { ChangeEvent, useEffect, useRef } from 'react'
import { TbArrowBackUp } from 'react-icons/tb'
import { useNavigate, useSearchParams } from 'react-router'
import { useDebouncedCallback } from 'use-debounce'
import { GetTransactionsResponse, GetWalletsResponse } from '@/@types/shared'
import { Banner, Loader, Page, TransactionTile } from '@/components/commons'
import { WalletTile } from '@/components/Wallets'
import useTransaction from '@/hooks/useTransaction'
import useWallet from '@/hooks/useWallet'
import { Route } from '@/utils/constants/routes'

const Search = () => {
  const navigate = useNavigate()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchParams] = useSearchParams()
  const searchPhrase = searchParams.get('searchPhrase') || ''
  const debouncedSetSearchPhrase = useDebouncedCallback((searchPhrase) => {
    navigate(`${Route.SEARCH}?searchPhrase=${searchPhrase}`, {
      replace: true,
    })
  }, 250)
  const { useGetWalletsQuery } = useWallet()
  const { useSearchTransactionsQuery } = useTransaction()
  const getWallets = useGetWalletsQuery(
    {
      searchPhrase,
    },
    searchPhrase.trim().length > 0
  )
  const searchTransactions = useSearchTransactionsQuery(
    searchPhrase,
    searchPhrase.trim().length > 0
  )

  const handleClickBack = () => document.startViewTransition(() => navigate(-1))

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    debouncedSetSearchPhrase(e.target.value)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  return (
    <Page className="grid grid-rows-[auto_1fr]">
      <div className="bg-primary-500 sticky top-0 z-10 flex h-[72px] justify-between p-3">
        <div className="relative grid w-full grid-cols-[auto_1fr] place-items-center gap-2 rounded-full bg-white pr-6 pl-3">
          <TbArrowBackUp
            className="h-6 w-6 text-gray-400"
            onClick={handleClickBack}
          />
          <input
            ref={searchInputRef}
            className="peer h-full w-full outline-none"
            type="text"
            placeholder="Search for ..."
            onChange={handleInputChange}
            defaultValue={searchPhrase}
          />
        </div>
      </div>

      <div className="overflow-auto py-3">
        <SearchResults
          searchPhrase={searchPhrase}
          getWallets={getWallets}
          searchTransactions={searchTransactions}
        />
      </div>
    </Page>
  )
}

type SearchResultsProps = {
  searchPhrase: string
  getWallets: UseQueryResult<GetWalletsResponse>
  searchTransactions: UseInfiniteQueryResult<
    InfiniteData<GetTransactionsResponse>
  >
}

const SearchResults = (props: SearchResultsProps) => {
  const { getWallets, searchPhrase, searchTransactions } = props
  const wallets = getWallets.data || []
  const transactions = searchTransactions.data?.pages.flat(1) || []

  if (searchPhrase.trim() === '') return <Banner.SearchWalletOrTransaction />

  if (getWallets.isFetching && searchTransactions.isLoading)
    return (
      <div className="grid h-full place-items-center">
        <Loader />
      </div>
    )

  if (wallets.length === 0 && transactions.length === 0)
    return <Banner.NoWalletsFoundOrTransaction />

  const walletResults = (
    <div className="mb-3">
      <h1 className="mx-3 text-xl font-bold">Wallets</h1>
      {wallets.map((w) => (
        <WalletTile wallet={w} key={w.id} className="w-full px-3 py-2" />
      ))}
    </div>
  )

  const transactionResults = (
    <div>
      <h1 className="mx-3 text-xl font-bold">Transactions</h1>
      {transactions.map((t) => (
        <TransactionTile key={t.id} transaction={t} />
      ))}
    </div>
  )

  return (
    <>
      {wallets.length > 0 && walletResults}
      {transactions.length > 0 && transactionResults}
    </>
  )
}

export default Search
