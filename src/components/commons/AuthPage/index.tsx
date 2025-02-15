import { HTMLAttributes, PropsWithChildren } from 'react'
import { Page } from '@/components/commons'
import { useAuth, useClerk } from '@clerk/clerk-react'

type AuthPageProps = PropsWithChildren & HTMLAttributes<HTMLDivElement>

const AuthPage = (props: AuthPageProps) => {
	const { children, ...rest } = props
	const { isLoaded, isSignedIn } = useAuth()
	const clerk = useClerk()

	if (!isLoaded) return <div>LOADING</div>

	if (!isSignedIn) {
		clerk.openSignIn()

		return <div>LOADING</div>
	}

	return <Page {...rest}>{children}</Page>
}

export default AuthPage
