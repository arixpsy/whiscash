import { Outlet } from 'react-router'
import ActionBar from '../ActionBar'

const ActionBarLayout = () => (
  <>
    <Outlet />
    <ActionBar />
  </>
)

export default ActionBarLayout
