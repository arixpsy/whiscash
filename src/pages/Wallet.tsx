import { Page } from '@/components/commons'
import { TbArrowBackUp } from 'react-icons/tb'
import { RiSettingsLine } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router'
import useWallet from '@/hooks/useWallet'

const Wallet = () => {
  const { walletId } = useParams()
  const { useGetWalletQuery } = useWallet()
  const getWallet = useGetWalletQuery(walletId)
  const wallet = getWallet.data
  const navigate = useNavigate()

  const handleClickBack = () => document.startViewTransition(() => navigate(-1))

  return (
    <Page className="flex flex-col p-3">
      <div className="flex justify-between">
        <button type="button" onClick={handleClickBack}>
          <TbArrowBackUp className="h-6 w-6" />
        </button>

        <button type="button">
          <RiSettingsLine className="h-6 w-6" />
        </button>
      </div>

      <p className="mt-3 text-center text-2xl font-bold">{wallet?.name}</p>
    </Page>
  )
}

export default Wallet
