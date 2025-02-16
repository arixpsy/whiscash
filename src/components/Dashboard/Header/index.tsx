import { useUser } from '@clerk/clerk-react'
import { FaSearch } from 'react-icons/fa'

const Header = () => {
	const { user } = useUser()

	return (
		<div className="bg-primary-500 relative isolate flex items-center justify-between p-3 pb-9 text-white">
			<div className="flex items-center gap-3">
				<img src={user?.imageUrl} className="h-10 w-10 rounded-full" />

				<div>
					<p className="text-xs">Welcome back,</p>
					<b>{user?.fullName}</b>
				</div>
			</div>

			<div className="rounded-full p-3">
				<FaSearch className="h-4 w-4" />
			</div>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				className="absolute top-[100%] right-0"
			>
				<path
					fill="var(--color-primary-500)"
					fill-opacity="1"
					d="M0,192L48,192C96,192,192,192,288,176C384,160,480,128,576,144C672,160,768,224,864,213.3C960,203,1056,117,1152,101.3C1248,85,1344,139,1392,165.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
				></path>
			</svg>
		</div>
	)
}

export default Header
