import { Outlet } from 'react-router'
import ActionBar from '../ActionBar'
import ImageProvider from '@/contexts/ImageProvider'

const ActionBarLayout = () => (
  <ImageProvider>
    <Outlet />
    <ActionBar />
  </ImageProvider>
)

export default ActionBarLayout
