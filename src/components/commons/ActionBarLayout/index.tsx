import { Outlet } from 'react-router'
import { ActionBar } from '@/components/Dashboard'

const ActionBarLayout = () => (
	<>
		<Outlet />
		<ActionBar />
	</>
)

export default ActionBarLayout
