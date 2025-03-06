import { Routes, Route, useLocation } from 'react-router'
import {
  ActionBarLayout,
  Authenticated,
  MetaThemeColorRouter,
} from '@/components/commons'
import { Dashboard, Login, Settings, Wallets } from '@/pages'
import { Route as RoutePath } from '@/utils/constants/routes'
import 'country-flag-icons/3x2/flags.css'

const App = () => {
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation

  return (
    <Routes location={backgroundLocation || location}>
      <Route element={<MetaThemeColorRouter />}>
        <Route index element={<Login />} />
        <Route element={<Authenticated />}>
          <Route element={<ActionBarLayout />}>
            <Route path={RoutePath.DASHBOARD} element={<Dashboard />} />
            <Route path={RoutePath.HISTORY} element={<div>history</div>} />
            <Route path={RoutePath.WALLETS} element={<Wallets />} />
          </Route>

          <Route path={RoutePath.SETTINGS} element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
