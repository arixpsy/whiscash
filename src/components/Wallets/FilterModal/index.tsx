import { motion } from 'motion/react'
import { Modal, ModalRadioOption } from '@/components/commons'
import { WalletFilterOptions } from '@/utils/constants/filter'

type FilterModalProps = {
  filters: { type: WalletFilterOptions }
  setFilters: (filters: { type: WalletFilterOptions }) => void
}

const FilterModal = (props: FilterModalProps) => {
  const { filters, setFilters } = props

  const handleCloseModal = () => window.history.back()

  const handleSelectOption = (op: WalletFilterOptions) => {
    setFilters({ type: op })
    handleCloseModal()
  }

  return (
    <Modal paramKey="filter" paramValue="wallet">
      <motion.div
        className="grid w-full gap-3 rounded-t-2xl bg-white p-3 py-6"
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ type: 'tween', ease: 'easeOut' }}
      >
        <p className="text-center text-xl font-bold">Search Filters</p>

        <p className="text-center text-xs text-gray-500">
          Select what wallets you would like to view
        </p>

        {Object.values(WalletFilterOptions).map((op) => (
          <ModalRadioOption
            key={op}
            label={op}
            isSelected={op === filters.type}
            onClick={() => handleSelectOption(op)}
          />
        ))}
      </motion.div>
    </Modal>
  )
}

export default FilterModal
