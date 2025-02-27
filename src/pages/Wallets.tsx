import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Loader, Page, SearchBar } from '@/components/commons'
import { CreateWalletModal, WalletTile } from '@/components/Wallets'
import useWallet from '@/hooks/useWallet'
import { MdWallet } from 'react-icons/md'

const Wallets = () => {
  const { useGetWalletsQuery } = useWallet()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [debounceSearchPhrase] = useDebounce(searchPhrase, 250)
  const getWallets = useGetWalletsQuery({ searchPhrase: debounceSearchPhrase })
  const wallets = getWallets?.data || []

  return (
    <>
      <Page className="flex flex-col">
        <div className="sticky top-0 z-10 mt-6 flex items-center justify-center bg-white p-3">
          <h1 className="text-center text-2xl font-bold">Wallets</h1>
        </div>

        <SearchBar className="m-3" setValue={setSearchPhrase} />

        <div className="flex flex-1 flex-col gap-4 p-3 pb-28">
          {/* TODO: wallet tile skeleton */}
          {getWallets.isPending ? (
            <div className="grid h-full flex-1 place-items-center">
              <Loader />
            </div>
          ) : wallets.length === 0 ? (
            <div className="grid h-full flex-1 place-items-center">
              <div className="grid place-items-center gap-3 text-sm text-gray-500">
                <MdWallet className="h-16 w-16" />
                No wallets found
              </div>
            </div>
          ) : (
            wallets.map((wallet) => (
              <WalletTile key={wallet.id} wallet={wallet} />
            ))
          )}
        </div>
      </Page>

      <CreateWalletModal />
    </>
  )
}

export default Wallets
