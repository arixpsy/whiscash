import { Routes, Route, useLocation } from 'react-router'
import { ActionBarLayout, Authenticated } from '@/components/commons'
import { Dashboard, Login, Wallets } from '@/pages'
import { Route as RoutePath } from '@/utils/constants/routes'

const App = () => {
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation

  return (
    <Routes location={backgroundLocation || location}>
      <Route index element={<Login />} />
      <Route element={<Authenticated />}>
        <Route element={<ActionBarLayout />}>
          <Route path={RoutePath.DASHBOARD} element={<Dashboard />} />
          <Route path={RoutePath.HISTORY} element={<div>history</div>} />
          <Route path={RoutePath.WALLETS} element={<Wallets />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
