import { useMemo } from 'react'
import { FaHome, FaPlus } from 'react-icons/fa'
import { RiCalendarEventFill } from 'react-icons/ri'
import { MdWallet } from 'react-icons/md'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { Route } from '@/utils/constants/routes'
import { cn } from '@/utils/functions'

const ActionBar = () => {
  const [, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()

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

  const handleClickAddButton = () => setSearchParams({ create: 'new' })

  return (
    <div className="fixed right-0 bottom-6 left-0 grid place-items-center">
      <div className="flex items-center gap-3">
        <div className="grid grid-cols-3 gap-2 rounded-full bg-white p-3 shadow-2xl">
          {navItems.map(({ icon: Icon, route }) => {
            const active = route === pathname

            return (
              <button
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
              </button>
            )
          })}
        </div>

        <button
          className="bg-primary-500 rounded-full p-3 text-white shadow-2xl"
          onClick={handleClickAddButton}
        >
          <FaPlus className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export default ActionBar
