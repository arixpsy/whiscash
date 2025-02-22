import { Wallet } from '@/@types/wallet'

type WalletTileProps = {
  wallet: Wallet
}

const WalletTile = (props: WalletTileProps) => {
  const { wallet } = props

  return (
    <div className="flex gap-3" key={wallet.id}>
      <div className="grid h-12 w-12 place-items-center rounded-full bg-gray-200 p-2">
        <img
          alt="Singapore"
          src="http://purecatamphetamine.github.io/country-flag-icons/3x2/SG.svg"
        />
      </div>

      <div>
        <div className="flex gap-3">
          <p className="font-bold">{wallet.name}</p>
        </div>
        <p className="text-sm text-gray-500 capitalize">
          {wallet.defaultSpendingPeriod.toLocaleLowerCase()}
        </p>
      </div>

      {!wallet.subWalletOf && (
        <div className="bg-primary-100 text-primary-500 my-auto ml-auto grid place-items-center rounded-full px-2 py-1.5 text-xs leading-none">
          Sub Wallet
        </div>
      )}
    </div>
  )
}

export default WalletTile
