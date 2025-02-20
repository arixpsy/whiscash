import { useAuth, useClerk, SignedIn } from '@clerk/clerk-react'
import { Outlet } from 'react-router'

const Authenticated = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const clerk = useClerk()

  if (!isLoaded) return <div>LOADING</div>

  if (!isSignedIn) {
    clerk.openSignIn()

    return <div>LOADING</div>
  }

  return (
    <SignedIn>
      <Outlet />
    </SignedIn>
  )
}

export default Authenticated
