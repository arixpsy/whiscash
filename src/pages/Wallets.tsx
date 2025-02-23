import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Page, SearchBar } from '@/components/commons'
import { CreateWalletModal, WalletTile } from '@/components/Wallets'
import useWallet from '@/hooks/useWallet'

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

        <div className="flex flex-col gap-4 p-3 pb-28">
          {wallets.map((wallet) => (
            <WalletTile key={wallet.id} wallet={wallet} />
          ))}
        </div>
      </Page>

      <CreateWalletModal />
    </>
  )
}

export default Wallets
