import { SignIn, useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router'
import { Page } from '@/components/commons'

const Login = () => {
	const { isSignedIn } = useAuth()
	const navigate = useNavigate()

	if (isSignedIn) navigate('/dashboard')

	return (
		<Page className="grid place-items-center">
			<SignIn />
		</Page>
	)
}

export default Login
