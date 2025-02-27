import { motion } from 'motion/react'
import { MdWallet } from 'react-icons/md'
import { TbReportSearch } from 'react-icons/tb'

const Banner = () => {
  return <div />
}

const NoWalletsFound = () => (
  <motion.div
    initial={{ opacity: '0%' }}
    animate={{ opacity: '100%' }}
    exit={{ opacity: '0%' }}
    className="grid place-items-center gap-2 text-sm text-gray-400"
  >
    <MdWallet className="h-16 w-16" />
    No wallets found
  </motion.div>
)

const NoTransactionsFound = () => (
  <motion.div
    initial={{ opacity: '0%' }}
    animate={{ opacity: '100%' }}
    exit={{ opacity: '0%' }}
    className="my-3 grid place-items-center gap-2 text-center text-sm text-gray-400"
  >
    <TbReportSearch className="h-16 w-16" />
    No transactions found
  </motion.div>
)

Banner.NoTransactionsFound = NoTransactionsFound
Banner.NoWalletsFound = NoWalletsFound

export default Banner
