import { useAuth, useClerk, SignedIn } from '@clerk/clerk-react'
import { Outlet } from 'react-router'
import { PageLoader } from '@/components/commons'

const Authenticated = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const clerk = useClerk()

  if (!isLoaded) return <PageLoader />

  if (!isSignedIn) {
    clerk.openSignIn()

    return <PageLoader />
  }

  return (
    <SignedIn>
      <Outlet />
    </SignedIn>
  )
}

export default Authenticated
