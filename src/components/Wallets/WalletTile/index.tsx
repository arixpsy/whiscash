import { motion } from 'motion/react'
import { HTMLAttributes } from 'react'
import { FaBoxArchive } from 'react-icons/fa6'
import { Wallet } from '@/@types/shared'
import { SPENDING_PERIOD_WALLET_LABELS } from '@/utils/constants/spendingPeriod'
import { cn } from '@/utils/functions'

type WalletTileProps = {
  wallet: Wallet
} & HTMLAttributes<HTMLButtonElement>

const WalletTile = (props: WalletTileProps) => {
  const { onClick, wallet, className } = props

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn('flex gap-3', className)}
      key={wallet.id}
      initial={{ opacity: '0%' }}
      animate={{ opacity: '100%' }}
      exit={{ opacity: '0%' }}
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

      <div className="text-left">
        <div className="flex items-center gap-2 font-bold">
          <p>{wallet.name}</p>
          {wallet.archivedAt && (
            <div className="bg-accent-100 text-accent-400 rounded p-1">
              <FaBoxArchive className="h-3 w-3" />
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500">
          {SPENDING_PERIOD_WALLET_LABELS[wallet.spendingPeriod]}
        </p>
      </div>

      {wallet.subWalletOf && (
        <div className="bg-primary-100 text-primary-500 my-auto ml-auto grid place-items-center rounded-full px-2 py-1.5 text-xs leading-none">
          Sub Wallet
        </div>
      )}
    </motion.button>
  )
}

const Skeleton = () => (
  <motion.div
    className="flex gap-3"
    initial={{ opacity: '0%' }}
    animate={{ opacity: '100%' }}
    exit={{ opacity: '0%' }}
  >
    <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />

    <div className="space-y-1 text-left">
      <div className="h-6 w-26 animate-pulse rounded-lg bg-gray-200" />
      <p className="h-4 w-14 animate-pulse rounded bg-gray-200" />
    </div>

    <div className="my-auto ml-auto h-6 w-19 animate-pulse rounded-full bg-gray-200" />
  </motion.div>
)

WalletTile.Skeleton = Skeleton

export default WalletTile
