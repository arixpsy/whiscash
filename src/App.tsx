import { AnimatePresence } from 'motion/react'
import { Routes, Route, useLocation } from 'react-router'
import { Route as RoutePath } from '@/utils/constants/routes'
import { ActionBarLayout, Authenticated } from '@/components/commons'
import { Dashboard, Login, Wallets } from '@/pages'
import Modal from '@/components/commons/Modal'

const App = () => {
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation

  return (
    <AnimatePresence>
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

      {backgroundLocation && (
        <Routes location={location} key="modal-routes">
          <Route path={RoutePath.CREATE_WALLET} element={<Modal />} />
        </Routes>
      )}
    </AnimatePresence>
  )
}

export default App
