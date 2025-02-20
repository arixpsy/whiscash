import { Page } from '@/components/commons'
import { WalletTile } from '@/components/Wallets'
import useWallet from '@/hooks/useWallet'
import { FaSearch } from 'react-icons/fa'

const Wallets = () => {
  const { useGetWalletsQuery } = useWallet()
  const getWallets = useGetWalletsQuery()
  const wallets = getWallets?.data || []

  return (
    <Page className="flex flex-col">
      <div className="sticky top-0 z-10 mt-6 flex items-center justify-center bg-white p-3">
        <h1 className="text-center text-2xl font-bold">Wallets</h1>
      </div>

      <div className="p-3">
        <div className="flex h-8 items-center gap-3 rounded-full bg-gray-100 px-3 text-gray-500">
          <FaSearch /> Search
        </div>
      </div>

      <div className="p-3">
        {wallets.map((wallet) => (
          <WalletTile wallet={wallet} />
        ))}
      </div>
    </Page>
  )
}

export default Wallets
