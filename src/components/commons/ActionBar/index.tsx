import { useCallback, useMemo } from 'react'
import { FaHome } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { RiCalendarEventFill } from 'react-icons/ri'
import { MdWallet } from 'react-icons/md'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { FeedbackButton } from '@/components/commons'
import useWallet from '@/hooks/useWallet'
import { Route } from '@/utils/constants/routes'
import { cn } from '@/utils/functions'

const ActionBar = () => {
  const [, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { useGetDashboardWalletsQuery } = useWallet()
  const getDashboardWallets = useGetDashboardWalletsQuery({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })

  const navItems = useMemo(
    () => [
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
    ],
    []
  )

  const handleClickAddButton = useCallback(() => {
    if (pathname === Route.WALLETS) {
      setSearchParams({ create: 'wallet' })
      return
    }

    if (!getDashboardWallets.data) return

    if (getDashboardWallets.data.length > 0)
      setSearchParams({ create: 'transaction' })
  }, [pathname, setSearchParams, getDashboardWallets.data])

  return (
    <div className="fixed right-0 bottom-6 left-0 grid place-items-center">
      <div className="flex items-center gap-3">
        <div className="grid grid-cols-3 gap-2 rounded-full bg-white p-3 shadow-2xl">
          {navItems.map(({ icon: Icon, route }) => {
            const active = route === pathname

            return (
              <FeedbackButton
                type="button"
                key={route}
                className={cn(
                  'grid-stack relative isolate place-items-center text-gray-300',
                  active && 'text-primary-500'
                )}
                onClick={() => navigate(route)}
              >
                <div
                  className={cn(
                    'bg-primary-100 h-full w-full scale-0 rounded-full transition-transform',
                    active && 'scale-100'
                  )}
                />
                <Icon className="z-10 m-3 h-6 w-6" />
              </FeedbackButton>
            )
          })}
        </div>

        <FeedbackButton
          type="button"
          className="bg-primary-500 h-12 w-12 rounded-full p-3 text-white shadow-2xl"
          onClick={handleClickAddButton}
        >
          {getDashboardWallets.isPending ? (
            <div className="mx-auto flex h-6 w-5 items-center justify-between">
              <div className="h-[5px] w-[5px] animate-bounce justify-self-start rounded-full bg-white" />
              <div
                className="h-[5px] w-[5px] animate-bounce rounded-full bg-white"
                style={{ animationDelay: '100ms' }}
              />
              <div
                className="h-[5px] w-[5px] animate-bounce justify-self-end rounded-full bg-white"
                style={{ animationDelay: '200ms' }}
              />
            </div>
          ) : (
            <FaPlus className="h-6 w-6" />
          )}
        </FeedbackButton>
      </div>
    </div>
  )
}

export default ActionBar
