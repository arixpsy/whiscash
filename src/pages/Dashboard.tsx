import { useUser } from '@clerk/clerk-react'
import { AuthPage } from '@/components/commons'
import { FaHome, FaSearch } from 'react-icons/fa'
import { MdFastfood } from 'react-icons/md'
import { RiCalendarEventFill } from 'react-icons/ri'
import { FaPlus } from 'react-icons/fa'
import { MdWallet } from 'react-icons/md'
import { cn } from '@/utils/functions'

const Dashboard = () => {
	const { user } = useUser()

	return (
		<AuthPage className="flex flex-col">
			<div className="bg-primary-500 relative isolate flex items-center justify-between p-3 pb-9 text-white">
				<div className="flex items-center gap-3">
					<img src={user?.imageUrl} className="h-10 w-10 rounded-full" />
					<div className="grid">
						<p className="text-xs">Welcome back,</p>
						<b>{user?.fullName}</b>
					</div>
				</div>

				<div className="rounded-full p-3 text-white">
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

			<div className="relative isolate mx-auto mb-6">
				<div
					className="absolute top-0 right-1 -z-0"
					style={{ animation: 'left-right 8s infinite' }}
				>
					<img
						src="/whiscash.png"
						className="h-10"
						style={{ animation: 'swim 2s infinite' }}
					/>
				</div>
				<div className="relative grid w-[250px] place-items-center rounded-2xl bg-white p-3 shadow-lg">
					<p className="text-lg">Main Wallet • SGD</p>
					<p className="text-xs text-gray-500">This Month</p>
					<p className="mt-3 text-5xl">$425</p>
				</div>
			</div>

			<div className="mb-3 flex items-center justify-center gap-2">
				{[true, false, false].map((active) => (
					<div
						className={cn(
							'h-1 w-1 rounded-full bg-gray-700',
							active && 'h-2 w-2'
						)}
					></div>
				))}
			</div>

			<div className="px-3">
				<h1 className="mb-3 text-2xl font-bold">Recent Transactions</h1>

				{[1, 2, 3, 4, 5].map(() => (
					<div className="mb-2 grid grid-cols-[auto_1fr] gap-3 rounded-lg py-2">
						<div className="bg-primary-100 grid h-12 w-12 place-items-center rounded-lg">
							<MdFastfood className="text-primary-500 h-6 w-6" />
						</div>

						<div className="flex w-full items-center justify-between">
							<div>
								<p className="font-bold">Food</p>
								<p className="text-sm text-gray-500">Chicken rice</p>
							</div>

							<p className="text-xl">$6.50</p>
						</div>
					</div>
				))}
			</div>

			<div className="absolute right-0 bottom-6 left-0 grid place-items-center">
				<div className="flex items-center gap-3">
					<div className="grid grid-cols-3 gap-2 rounded-full bg-white p-3 shadow-2xl">
						{[FaHome, MdWallet, RiCalendarEventFill].map((Icon, index) => {
							const active = index === 0
							return (
								<div
									className={cn('rounded-full p-3', active && 'bg-primary-100')}
								>
									<Icon
										className={cn(
											'h-6 w-6 text-gray-300',
											active && 'text-primary-500'
										)}
									/>
								</div>
							)
						})}
					</div>

					<div className="bg-primary-500 rounded-full shadow-2xl">
						<div className={cn('rounded-full p-3')}>
							<FaPlus className={cn('h-6 w-6 text-white')} />
						</div>
					</div>
				</div>
			</div>
		</AuthPage>
	)
}

export default Dashboard
