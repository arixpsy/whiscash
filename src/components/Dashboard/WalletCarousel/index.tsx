import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { GetDashboardWalletsResponse } from '@/@types/shared'
import { cn } from '@/utils/functions'
import 'swiper/swiper-bundle.css'

type WalletCarouselProps = {
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  wallets: GetDashboardWalletsResponse
}

const WalletCarousel = (props: WalletCarouselProps) => {
  const { activeIndex, setActiveIndex, wallets } = props

  const handleSlideChange = (swiper: SwiperClass) =>
    setActiveIndex(swiper.activeIndex)

  return (
    <div className="grid-stack isolate">
      <Swiper className="w-full" onSlideChange={handleSlideChange}>
        {wallets.map(({ name, currency, spendingPeriodTotal }) => (
          <SwiperSlide className="grid place-items-center">
            <div className="relative z-20 mb-10 grid w-[250px] place-items-center rounded-2xl bg-white p-3 shadow-lg">
              <p className="text-xl">
                {name} • {currency}
              </p>
              <p className="text-xs text-gray-500">This Month</p>
              <p className="mt-3 text-5xl">${spendingPeriodTotal}</p>
            </div>
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
        {wallets.map((_, index) => (
          <div
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
