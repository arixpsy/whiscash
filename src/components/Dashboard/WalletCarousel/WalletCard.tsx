import { WalletWithSpendingPeriodTotal } from '@/@types/shared'
import { SPENDING_PERIOD_DASHBOARD_LABELS } from '@/utils/constants/spendingPeriod'

type WalletCardProps = {
  wallet: WalletWithSpendingPeriodTotal
}

const WalletCard = (props: WalletCardProps) => {
  const { wallet } = props

  return (
    <div className="relative z-20 mb-10 grid h-[140px] w-[250px] rounded-2xl bg-white p-3 shadow-lg">
      <div className="flex items-center justify-between self-start">
        <p className="truncate text-xl">{wallet.name}</p>

        <div className="grid h-9 w-11 shrink-0 place-items-center rounded-lg bg-gray-200">
          <div
            className={`flag:${wallet.country}`}
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
          <p className="mb-1 text-xs text-gray-500">
            {SPENDING_PERIOD_DASHBOARD_LABELS[wallet.spendingPeriod]}
          </p>
          <p className="text-2xl font-bold">
            {new Intl.NumberFormat(`en-${wallet.country}`, {
              style: 'currency',
              currency: wallet.currency,
            }).format(parseFloat(wallet.spendingPeriodTotal))}
          </p>
        </div>

        <p>{wallet.currency}</p>
      </div>
    </div>
  )
}

const Skeleton = () => (
  <div className="relative z-20 mb-10 grid h-[140px] w-[250px] rounded-2xl bg-white p-3 shadow-lg">
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
  </div>
)

WalletCard.Skeleton = Skeleton

export default WalletCard
