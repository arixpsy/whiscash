import { useCallback, useRef, useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { RiCalendarEventFill } from 'react-icons/ri'
import { MdWallet } from 'react-icons/md'
import { useLocation, useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { FeedbackButton, LoadingDots } from '@/components/commons'
import useWallet from '@/hooks/useWallet'
import { Route } from '@/utils/constants/routes'
import ImageInput from './ImageInput'
import NavItem from './NavItem'

const navItems = [
  {
    icon: FaHome,
    route: Route.DASHBOARD,
  },
  {
    icon: MdWallet,
    route: Route.WALLETS,
  },
  {
    icon: RiCalendarEventFill,
    route: Route.HISTORY,
  },
]

const ActionBar = () => {
  const [, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()
  const { useGetDashboardWalletsQuery } = useWallet()
  const getDashboardWallets = useGetDashboardWalletsQuery({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
  const isAnimating = useRef(false)
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(
    null
  )
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const isDashboardPage = pathname === Route.DASHBOARD

  const handleClickAddButton = useCallback(() => {
    if (isAnimating.current) return

    if (pathname === Route.WALLETS) {
      setSearchParams({ create: 'wallet' }, { state: { from: pathname } })
      return
    }

    if (!getDashboardWallets.data || getDashboardWallets.data.length === 0)
      return

    switch (controlledSwiper?.realIndex) {
      case 0:
        setSearchParams(
          { create: 'transaction' },
          { state: { from: pathname } }
        )
        break
      case 1:
        cameraInputRef.current?.click()
        break
      case 2:
        galleryInputRef.current?.click()
        break
    }
  }, [pathname, setSearchParams, getDashboardWallets.data, controlledSwiper])

  return (
    <div className="fixed right-0 bottom-6 left-0 grid place-items-center">
      <div className="flex items-center gap-3">
        <div className="grid grid-cols-3 gap-2 rounded-full bg-white p-3 shadow-2xl">
          {navItems.map(({ icon, route }) => (
            <NavItem
              key={route}
              icon={icon}
              pathname={pathname}
              route={route}
            />
          ))}
        </div>

        <AnimatePresence>
          {pathname !== Route.HISTORY && (
            <motion.div
              className="h-12"
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 48,
                opacity: 1,
              }}
              exit={{
                width: 0,
                opacity: 0,
              }}
              onAnimationStart={() => (isAnimating.current = true)}
              onAnimationComplete={() => (isAnimating.current = false)}
            >
              <FeedbackButton
                type="button"
                className="bg-primary-500 h-12 w-12 overflow-hidden rounded-full p-3 text-white shadow-2xl"
                onClick={handleClickAddButton}
              >
                {getDashboardWallets.isPending ? (
                  <LoadingDots />
                ) : (
                  <Swiper
                    direction="vertical"
                    loop={isDashboardPage}
                    height={48}
                    pagination={false}
                    scrollbar={false}
                    modules={[Controller]}
                    onSwiper={setControlledSwiper}
                  >
                    <SwiperSlide>
                      <FaPlus className="h-6 w-6" />
                    </SwiperSlide>
                    {isDashboardPage && (
                      <SwiperSlide>
                        <ImageInput ref={cameraInputRef} />
                      </SwiperSlide>
                    )}
                    {isDashboardPage && (
                      <SwiperSlide>
                        <ImageInput ref={galleryInputRef} source="gallery" />
                      </SwiperSlide>
                    )}
                  </Swiper>
                )}
              </FeedbackButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ActionBar
