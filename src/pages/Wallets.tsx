import { useState } from 'react'
import { BiFilter } from 'react-icons/bi'
import { PiSquaresFour } from 'react-icons/pi'
import { useNavigate } from 'react-router'
import { useDebounce } from 'use-debounce'
import {
  Banner,
  CreateWalletModal,
  Page,
  SearchBar,
} from '@/components/commons'
import { WalletTile } from '@/components/Wallets'
import useWallet from '@/hooks/useWallet'
import { Route } from '@/utils/constants/routes'

const Wallets = () => {
  const navigate = useNavigate()
  const { useGetWalletsQuery } = useWallet()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [debounceSearchPhrase] = useDebounce(searchPhrase, 250)
  const getWallets = useGetWalletsQuery({ searchPhrase: debounceSearchPhrase })
  const wallets = getWallets?.data || []

  const handleNavigateToWallet = (walletId: number) =>
    document.startViewTransition(() => navigate(`${Route.WALLETS}/${walletId}`))

  // display states
  const shouldDisplaySkeleton = getWallets.isPending
  const shouldDisplayWalletsData = !getWallets.isPending && wallets.length > 0
  const shouldDisplayEmptyBanner = !getWallets.isPending && wallets.length === 0

  return (
    <>
      <Page className="grid max-h-svh grid-rows-[auto_1fr]">
        <div className="p-3">
          <div className="flex w-full justify-between">
            <button type="button">
              <BiFilter className="h-6 w-6" />
            </button>

            <button type="button">
              <PiSquaresFour className="h-6 w-6" />
            </button>
          </div>

          <h1 className="my-3 text-center text-2xl font-bold">Wallets</h1>

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
    </>
  )
}

export default Wallets
