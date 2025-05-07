import { memo } from 'react'
import FeedbackButton from '@/components/commons/FeedbackButton'
import { Route } from '@/utils/constants/routes'
import { cn } from '@/utils/functions'
import { useNavigate } from 'react-router'
import { IconType } from 'react-icons/lib'

type NavItemProps = {
  route: Route
  pathname: string
  icon: IconType
}

const NavItem = ({ pathname, route, icon }: NavItemProps) => {
  const navigate = useNavigate()
  const active = route === pathname
  const Icon = icon

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
}

export default memo(NavItem)
