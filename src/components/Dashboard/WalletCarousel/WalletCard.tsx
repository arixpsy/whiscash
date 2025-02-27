type WalletCardProps = {
  name: string
  country: string
  currency: string
  spendingPeriodTotal: string
}

const WalletCard = (props: WalletCardProps) => {
  const { name, country, currency, spendingPeriodTotal } = props

  return (
    <div className="relative z-20 mb-10 w-[250px] rounded-2xl bg-white p-3 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="truncate text-xl">{name}</p>

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

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs text-gray-500">This Month</p>
          <p className="text-2xl font-bold">
            {new Intl.NumberFormat(`en-${country}`, {
              style: 'currency',
              currency,
            }).format(parseFloat(spendingPeriodTotal))}
          </p>
        </div>

        <p>{currency}</p>
      </div>
    </div>
  )
}

export default WalletCard
