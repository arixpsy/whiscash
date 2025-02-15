// import { SignedIn, UserButton } from '@clerk/clerk-react'
import { AuthPage } from '@/components/commons'
import { FaHome } from 'react-icons/fa'
import { MdFastfood } from 'react-icons/md'
import { IoStatsChart } from 'react-icons/io5'
import { FaPlus } from 'react-icons/fa'
import { cn } from '@/utils/functions'

const Dashboard = () => {
	return (
		<AuthPage className="flex flex-col p-3">
			{/* Home page */}
			{/* <SignedIn>
        <UserButton />
      </SignedIn> */}
			<h1 className="mb-3 text-2xl font-bold">Expenses</h1>
			<p className="mb-3 text-center text-6xl font-bold">425</p>

			<div className="flex items-center justify-center gap-2">
				{[true, false, false].map((active) => (
					<div
						className={cn(
							'h-2 w-2 rounded-full bg-gray-700',
							active && 'h-3 w-3'
						)}
					></div>
				))}
			</div>

			<div>
				<h1 className="mb-3 text-2xl font-bold">Recent</h1>
			</div>

			{[1, 2, 3, 4, 5].map(() => (
				<div className="mb-2 grid grid-cols-[auto_1fr] gap-2 rounded-lg p-2 pr-3">
					<div className="bg-primary-100 grid h-12 w-12 place-items-center rounded-md">
						<MdFastfood className="text-secondary-600 h-6 w-6" />
					</div>

					<div className="flex w-full items-center justify-between">
						<div>
							<p className="font-bold">Food</p>
							<p className="text-sm text-gray-500">Chicken rice</p>
						</div>

						<p>+$6.50</p>
					</div>
				</div>
			))}

			<div className="absolute right-0 bottom-6 left-0 grid place-items-center">
				<div className="m-auto grid grid-cols-3 gap-3 rounded-full bg-white p-3 shadow-2xl">
					{[FaHome, IoStatsChart, FaPlus].map((Icon, index) => {
						const active = index === 0
						return (
							<div
								className={cn('rounded-full p-3', active && 'bg-primary-100')}
							>
								<Icon
									className={cn(
										'h-8 w-8 text-gray-300',
										active && 'text-primary-300'
									)}
								/>
							</div>
						)
					})}
				</div>
			</div>
		</AuthPage>
	)
}

export default Dashboard
