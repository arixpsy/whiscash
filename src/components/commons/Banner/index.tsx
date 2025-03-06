import { motion } from 'motion/react'
import { useSearchParams } from 'react-router'
import { FaQuestionCircle } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { MdWallet } from 'react-icons/md'
import { TbReportSearch } from 'react-icons/tb'

const Banner = () => {
  return <div />
}

const AddWalletCard = () => {
  const [, setSearchParams] = useSearchParams()

  const handleClickCard = () => {
    setSearchParams({ create: 'wallet' })
  }

  return (
    <motion.button
      className="relative z-20 mb-10 grid h-[140px] w-[250px] place-items-center rounded-2xl bg-white p-3 text-gray-500 shadow-lg"
      initial={{ opacity: '0%' }}
      animate={{ opacity: '100%' }}
      exit={{ opacity: '0%' }}
      onClick={handleClickCard}
    >
      <div className="grid place-items-center gap-2 text-lg font-bold">
        <FaPlus className="h-8 w-8" />
        Create wallet
      </div>
    </motion.button>
  )
}

const NoCategoryFound = () => (
  <motion.div
    initial={{ opacity: '0%' }}
    animate={{ opacity: '100%' }}
    exit={{ opacity: '0%' }}
    className="grid place-items-center gap-2 text-sm text-gray-400"
  >
    <FaQuestionCircle className="h-16 w-16" />
    Unable to find category
  </motion.div>
)

const NoCountryOrCurrencyFound = () => (
  <motion.div
    initial={{ opacity: '0%' }}
    animate={{ opacity: '100%' }}
    exit={{ opacity: '0%' }}
    className="grid place-items-center gap-2 text-sm text-gray-400"
  >
    <FaQuestionCircle className="h-16 w-16" />
    Unable to find country or currency
  </motion.div>
)

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
    className="my-12 grid place-items-center gap-2 text-center text-sm text-gray-400"
  >
    <TbReportSearch className="h-16 w-16" />
    No transactions found
  </motion.div>
)

Banner.AddWalletCard = AddWalletCard
Banner.NoCategoryFound = NoCategoryFound
Banner.NoCountryOrCurrencyFound = NoCountryOrCurrencyFound
Banner.NoTransactionsFound = NoTransactionsFound
Banner.NoWalletsFound = NoWalletsFound

export default Banner
