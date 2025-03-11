import { HTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { amountWithCurrency, cn } from '@/utils/functions'

type WalletCardProps = {
  amount: number
  amountSubText: string
  cardTitle: string
  country: string
  currency: string
} & HTMLAttributes<HTMLDivElement>

const WalletCard = (props: WalletCardProps) => {
  const { amount, amountSubText, cardTitle, country, currency, className } =
    props

  return (
    <motion.div
      className={cn(
        'grid h-[140px] w-[250px] rounded-2xl bg-white p-3',
        className
      )}
      initial={{ opacity: '0%' }}
      animate={{ opacity: '100%' }}
      exit={{ opacity: '0%' }}
    >
      <div className="flex items-center justify-between self-start">
        <p className="truncate text-xl">{cardTitle}</p>

        <div className="grid h-9 w-11 shrink-0 place-items-center rounded-lg bg-gray-200">
          <div
            className={`flag:${country}`}
            style={
              {
                '--CountryFlagIcon-height': '21.33px',
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      <div className="flex items-end justify-between self-end">
        <div>
          <p className="mb-1 text-xs text-gray-500">{amountSubText}</p>
          <p className="text-2xl font-bold">
            {amountWithCurrency(amount, country, currency)}
          </p>
        </div>

        <p>{currency}</p>
      </div>
    </motion.div>
  )
}

const Skeleton = (props: HTMLAttributes<HTMLDivElement>) => (
  <motion.div
    className={cn(
      'grid h-[140px] w-[250px] rounded-2xl bg-white p-3',
      props.className
    )}
    initial={{ scale: '0%' }}
    animate={{ scale: '100%' }}
    exit={{ scale: '0%' }}
    transition={{ type: 'tween', ease: 'easeOut' }}
  >
    <div className="flex items-center justify-between self-start">
      <div className="h-7 w-30 animate-pulse rounded-lg bg-gray-200" />
      <div className="grid h-9 w-11 shrink-0 animate-pulse place-items-center rounded-lg bg-gray-200" />
    </div>

    <div className="flex items-end justify-between self-end">
      <div>
        <div className="mb-1 h-4 w-14 animate-pulse rounded bg-gray-200" />
        <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-200" />
      </div>
      <div className="h-6 w-8 animate-pulse rounded-lg bg-gray-200" />
    </div>
  </motion.div>
)

WalletCard.Skeleton = Skeleton

export default WalletCard
