import { Routes, Route } from 'react-router'
import {
  ActionBarLayout,
  Authenticated,
  MetaThemeColorRouter,
} from '@/components/commons'
import useNavigationTransition from '@/hooks/useNavigationTransition'
import {
  Dashboard,
  History,
  Login,
  Settings,
  Transaction,
  Wallet,
  Wallets,
} from '@/pages'
import { Route as RoutePath } from '@/utils/constants/routes'
import 'country-flag-icons/3x2/flags.css'

const App = () => {
  useNavigationTransition()

  return (
    <Routes>
      <Route element={<MetaThemeColorRouter />}>
        <Route index element={<Login />} />
        <Route element={<Authenticated />}>
          <Route element={<ActionBarLayout />}>
            <Route path={RoutePath.DASHBOARD} element={<Dashboard />} />
            <Route path={RoutePath.HISTORY} element={<History />} />
            <Route path={RoutePath.WALLETS} element={<Wallets />} />
          </Route>

          <Route path={RoutePath.SETTINGS} element={<Settings />} />
          <Route path={RoutePath.WALLETS + '/:walletId'} element={<Wallet />} />
          <Route
            path={RoutePath.TRANSACTIONS + '/:transactionId'}
            element={<Transaction />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
