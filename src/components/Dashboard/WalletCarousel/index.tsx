import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { GetDashboardWalletsResponse } from '@/@types/shared'
import { cn } from '@/utils/functions'
import WalletCard from './WalletCard'
import 'swiper/swiper-bundle.css'

type WalletCarouselProps = {
  activeIndex: number
  isLoading: boolean
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  wallets: GetDashboardWalletsResponse
}

const WalletCarousel = (props: WalletCarouselProps) => {
  const { activeIndex, isLoading, setActiveIndex, wallets } = props

  const handleSlideChange = (swiper: SwiperClass) =>
    setActiveIndex(swiper.activeIndex)

  return (
    <div className="grid-stack isolate">
      <Swiper className="w-full" onSlideChange={handleSlideChange}>
        {isLoading && (
          <SwiperSlide className="grid place-items-center">
            <WalletCard.Skeleton />
          </SwiperSlide>
        )}

        {wallets.map((w) => (
          <SwiperSlide key={w.id} className="grid place-items-center">
            <WalletCard
              name={w.name}
              country={w.country}
              currency={w.currency}
              spendingPeriod={w.spendingPeriod}
              spendingPeriodTotal={w.spendingPeriodTotal}
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
