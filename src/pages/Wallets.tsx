import { useState } from 'react'
import { BiFilter } from 'react-icons/bi'
import { useNavigate, useSearchParams } from 'react-router'
import { useDebounce } from 'use-debounce'
import {
  Banner,
  CreateWalletModal,
  Page,
  SearchBar,
} from '@/components/commons'
import { FilterModal, WalletTile } from '@/components/Wallets'
import useWallet from '@/hooks/useWallet'
import { WalletFilterOptions } from '@/utils/constants/filter'
import { Route } from '@/utils/constants/routes'

const Wallets = () => {
  const navigate = useNavigate()
  const [, setSearchParams] = useSearchParams()
  const { useGetWalletsQuery } = useWallet()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [filters, setFilters] = useState<{ type: WalletFilterOptions }>({
    type: WalletFilterOptions.ALL,
  })
  const [debounceSearchPhrase] = useDebounce(searchPhrase, 250)
  const getWallets = useGetWalletsQuery({
    searchPhrase: debounceSearchPhrase,
    ...filters,
  })
  const wallets = getWallets?.data || []

  const handleNavigateToWallet = (walletId: number) =>
    document.startViewTransition(() =>
      navigate(`${Route.WALLETS}/${walletId}`, {
        state: { from: Route.WALLETS },
      })
    )

  const handleClickFilter = () => setSearchParams({ filter: 'wallet' })

  // display states
  const shouldDisplaySkeleton = getWallets.isPending
  const shouldDisplayWalletsData = !getWallets.isPending && wallets.length > 0
  const shouldDisplayEmptyBanner = !getWallets.isPending && wallets.length === 0

  return (
    <>
      <Page className="grid max-h-svh grid-rows-[auto_1fr]">
        <div className="grid gap-3 p-3">
          <div className="grid grid-cols-[1fr_auto_1fr]">
            <div />
            <h1 className="text-center text-lg font-bold">Wallets</h1>

            <button
              type="button"
              className="justify-self-end"
              onClick={handleClickFilter}
            >
              <BiFilter className="h-6 w-6" />
            </button>
          </div>

          <SearchBar setValue={setSearchPhrase} />
        </div>

        <div className="grid h-full auto-rows-min gap-3 overflow-auto p-3 pb-28">
          {shouldDisplaySkeleton &&
            Array.from({ length: 5 }).map((_, index) => (
              <WalletTile.Skeleton key={index} />
            ))}

          {shouldDisplayEmptyBanner && (
            <div className="grid h-full flex-1 place-items-center">
              <Banner.NoWalletsFound />
            </div>
          )}

          {shouldDisplayWalletsData &&
            wallets.map((wallet) => (
              <WalletTile
                key={wallet.id}
                wallet={wallet}
                onClick={() => handleNavigateToWallet(wallet.id)}
              />
            ))}
        </div>
      </Page>

      <CreateWalletModal />

      <FilterModal filters={filters} setFilters={setFilters} />
    </>
  )
}

export default Wallets
