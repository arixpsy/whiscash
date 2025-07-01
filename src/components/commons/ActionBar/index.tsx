import { useCallback } from 'react'
import { FaHome } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { RiCalendarEventFill } from 'react-icons/ri'
import { MdWallet } from 'react-icons/md'
import { useLocation, useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { FeedbackButton } from '@/components/commons'
import NavItem from '@/components/commons/ActionBar/NavItem'
import useWallet from '@/hooks/useWallet'
import { Route } from '@/utils/constants/routes'
import LoadingDots from './LoadingDots'

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

  const handleClickAddButton = useCallback(
    (longPress?: boolean) => {
      if (pathname === Route.WALLETS) {
        setSearchParams({ create: 'wallet' }, { state: { from: pathname } })
        return
      }

      if (!getDashboardWallets.data) return

      if (getDashboardWallets.data.length > 0)
        setSearchParams(
          { create: 'transaction', ...(longPress ? { field: 'camera' } : {}) },
          { state: { from: pathname } }
        )
    },
    [pathname, setSearchParams, getDashboardWallets.data]
  )

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
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{ width: 48, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
            >
              <FeedbackButton
                type="button"
                className="bg-primary-500 h-12 w-12 rounded-full p-3 text-white shadow-2xl"
                onClick={() => handleClickAddButton(false)}
                onLongPress={() => handleClickAddButton(true)}
              >
                {getDashboardWallets.isPending ? (
                  <LoadingDots />
                ) : (
                  <FaPlus className="h-6 w-6" />
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
