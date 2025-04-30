import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { useNavigate } from 'react-router'
import { GetDashboardWalletsResponse } from '@/@types/shared'
import { Banner, WalletCard } from '@/components/commons'
import { cn } from '@/utils/functions'
import { Route } from '@/utils/constants/routes'
import { SPENDING_PERIOD_DASHBOARD_LABELS } from '@/utils/constants/spendingPeriod'
import 'swiper/swiper-bundle.css'

type WalletCarouselProps = {
  activeIndex: number
  isLoading: boolean
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  wallets: GetDashboardWalletsResponse
}

const WalletCarousel = (props: WalletCarouselProps) => {
  const { activeIndex, isLoading, setActiveIndex, wallets } = props
  const navigate = useNavigate()

  const handleSlideChange = (swiper: SwiperClass) =>
    setActiveIndex(swiper.activeIndex)

  const handleNavigateToWallet = (walletId: number) =>
    document.startViewTransition(() =>
      navigate(`${Route.WALLETS}/${walletId}`, {
        state: { from: Route.WALLETS },
      })
    )

  return (
    <div className="grid-stack isolate">
      <Swiper className="w-full" onSlideChange={handleSlideChange}>
        {isLoading && (
          <SwiperSlide className="grid place-items-center">
            <WalletCard.Skeleton className="relative z-20 mb-10 shadow-lg" />
          </SwiperSlide>
        )}

        {!isLoading && wallets.length === 0 && (
          <SwiperSlide className="grid place-items-center">
            <Banner.AddWalletCard />
          </SwiperSlide>
        )}

        {wallets.map((w) => (
          <SwiperSlide
            key={w.id}
            className="grid place-items-center"
            onClick={() => handleNavigateToWallet(w.id)}
          >
            <WalletCard
              className="relative z-20 mb-10 shadow-lg"
              amount={w.spendingPeriodTotal}
              amountSubText={SPENDING_PERIOD_DASHBOARD_LABELS[w.spendingPeriod]}
              cardTitle={w.name}
              country={w.country}
              currency={w.currency}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative h-full w-[250px] place-self-center">
        <div
          className="absolute top-0 right-1 z-10"
          style={{ animation: 'left-right 8s infinite' }}
        >
          <img
            src="/whiscash.png"
            className="h-12"
            style={{ animation: 'swim 2s infinite' }}
            alt="whiscash swimmming"
          />
        </div>
      </div>

      <div className="mb-3 flex items-center justify-center gap-2 place-self-end justify-self-center">
        {wallets.map((w, index) => (
          <div
            key={w.id}
            className={cn(
              'h-1 w-1 rounded-full bg-gray-700 transition-transform',
              index === activeIndex && 'scale-200'
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default WalletCarousel
