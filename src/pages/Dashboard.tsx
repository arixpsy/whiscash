import { AuthPage } from '@/components/commons'
import { MdFastfood } from 'react-icons/md'
import { Header } from '@/components/Dashboard'
import { cn } from '@/utils/functions'

const Dashboard = () => {
	return (
		<AuthPage className="flex flex-col">
			<Header>
				<div className="mx-auto">
					<div className="relative mx-auto mb-6 isolate">
						<div
							className="absolute top-0 right-1 z-10"
							style={{ animation: 'left-right 8s infinite' }}
						>
							<img
								src="/whiscash.png"
								className="h-12"
								style={{ animation: 'swim 2s infinite' }}
							/>
						</div>

						<div className="relative z-20 grid w-[250px] place-items-center rounded-2xl bg-white p-3 shadow-lg">
							<p className="text-xl">Main Wallet • SGD</p>
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
				</div>
			</Header>

			<div className="px-3">
				<h1 className="mb-3 text-2xl font-bold">Recent Transactions</h1>

				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(() => (
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
		</AuthPage>
	)
}

export default Dashboard
