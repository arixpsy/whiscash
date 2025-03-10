import { useState } from 'react'
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

  // display states
  const shouldDisplaySkeleton = getWallets.isPending
  const shouldDisplayWalletsData = !getWallets.isPending && wallets.length > 0
  const shouldDisplayEmptyBanner = !getWallets.isPending && wallets.length === 0

  const handleNavigateToWallet = (walletId: number) =>
    document.startViewTransition(() => navigate(`${Route.WALLETS}/${walletId}`))

  return (
    <>
      <Page className="flex flex-col">
        <div className="sticky top-0 z-10 mt-6 flex items-center justify-center bg-white p-3">
          <h1 className="text-center text-2xl font-bold">Wallets</h1>
        </div>

        <SearchBar className="m-3" setValue={setSearchPhrase} />

        <div className="flex flex-1 flex-col gap-4 p-3 pb-28">
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
