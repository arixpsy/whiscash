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

    if (searchParams.get('create') && pathname === Route.DASHBOARD) {
      metaElement.content = '#083D7F'
      return
    }

    if (
      searchParams.get('create') ||
      searchParams.get('update') ||
      searchParams.get('field') ||
      searchParams.get('confirmation') ||
      searchParams.get('filter')
    ) {
      metaElement.content = '#7F7F7F'
      return
    }

    if (
      pathname === Route.DASHBOARD ||
      pathname === Route.HISTORY ||
      pathname === Route.SEARCH
    ) {
      metaElement.content = '#007bff'
      return
    }

    metaElement.content = '#ffffff'
  }, [pathname, searchParams])

  return <Outlet />
}

export default MetaThemeColorRouter
