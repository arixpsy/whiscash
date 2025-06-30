import { useAuth, useClerk, SignedIn, useUser } from '@clerk/clerk-react'
import { usePostHog } from 'posthog-js/react'
import { Outlet } from 'react-router'
import { PageLoader } from '@/components/commons'
import { useEffect } from 'react'

const Authenticated = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const posthog = usePostHog()
  const clerk = useClerk()

  useEffect(() => {
    if (user && posthog) {
      posthog.identify(user.emailAddresses[0].emailAddress, {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName,
      })
    }
  }, [user, posthog])

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
