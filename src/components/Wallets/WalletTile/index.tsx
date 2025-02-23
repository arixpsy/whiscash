import { Wallet } from '@/@types/wallet'
import { SPENDING_PERIOD_WALLET_LABELS } from '@/utils/constants/spendingPeriod'
import { HTMLAttributes } from 'react'

type WalletTileProps = {
  wallet: Wallet
} & HTMLAttributes<HTMLButtonElement>

const WalletTile = (props: WalletTileProps) => {
  const { onClick, wallet } = props

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-3"
      key={wallet.id}
    >
      <div className="grid h-12 w-12 place-items-center rounded-full bg-gray-200 p-2">
        <div
          className={`flag:${wallet.country}`}
          style={
            {
              '--CountryFlagIcon-height': '21.33px',
            } as React.CSSProperties
          }
        />
      </div>

      <div>
        <div className="flex gap-3">
          <p className="font-bold">{wallet.name}</p>
        </div>
        <p className="text-xs text-gray-500">
          {SPENDING_PERIOD_WALLET_LABELS[wallet.defaultSpendingPeriod]}
        </p>
      </div>

      {wallet.subWalletOf && (
        <div className="bg-primary-100 text-primary-500 my-auto ml-auto grid place-items-center rounded-full px-2 py-1.5 text-xs leading-none">
          Sub Wallet
        </div>
      )}
    </button>
  )
}

export default WalletTile
