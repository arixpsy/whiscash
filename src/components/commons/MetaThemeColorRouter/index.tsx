import { Route } from '@/utils/constants/routes'
import { useEffect } from 'react'
import { Outlet, useLocation, useSearchParams } from 'react-router'

const MetaThemeColorRouter = () => {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const metaElement: HTMLMetaElement = document.querySelector(
      "meta[name='theme-color']"
    )!

    if (!metaElement) return

    if (searchParams.get('create') || searchParams.get('field')) {
      metaElement.content = '#7F7F7F'
      return
    }

    if (pathname === Route.DASHBOARD) {
      metaElement.content = '#007bff'
      return
    }

    metaElement.content = '#ffffff'
  }, [pathname, searchParams])

  return <Outlet />
}

export default MetaThemeColorRouter
