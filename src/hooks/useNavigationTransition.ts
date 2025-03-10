import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

const useNavigationTransition = () => {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'PUSH') {
      document.documentElement.classList.remove('backward-transition')
      document.documentElement.classList.add('forward-transition')
    } else if (navigationType === 'POP') {
      document.documentElement.classList.remove('forward-transition')
      document.documentElement.classList.add('backward-transition')
    }
  }, [location, navigationType])
}

export default useNavigationTransition
