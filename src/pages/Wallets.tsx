import { AuthPage } from '@/components/commons'
import useWallet from '@/hooks/useWallet'

const Wallets = () => {
  const { useGetWalletsQuery, useCreateWalletMutation } = useWallet()
  const getWallets = useGetWalletsQuery()
  const createWallet = useCreateWalletMutation()
  const wallets = getWallets?.data || []

  const handleCreateWallet = () => {
    createWallet.mutate({
      name: 'Main Wallet',
      currency: 'SGD',
      defaultSpendingPeriod: 'MONTH',
    })
  }

  return (
    <AuthPage>
      {JSON.stringify(wallets)}
      <button onClick={handleCreateWallet}>Create Wallet</button>
    </AuthPage>
  )
}

export default Wallets
