import { motion } from 'motion/react'
import Modal from '@/components/commons/Modal'
import { SPENDING_PERIOD_UNIT_LABELS } from '@/utils/constants/spendingPeriod'
import { SpendingPeriod } from '@/utils/enum'
import { cn } from '@/utils/functions'

type UnitSelectorModalProps = {
  selectedUnit: SpendingPeriod
  setSelectedPeriodIndex: (index: number) => void
  setSelectedUnit: (sp: SpendingPeriod) => void
}

const UnitSelectorModal = (props: UnitSelectorModalProps) => {
  const { selectedUnit, setSelectedPeriodIndex, setSelectedUnit } = props

  const handleCloseModal = () => window.history.back()

  const handleSelectOption = (sp: SpendingPeriod) => {
    setSelectedUnit(sp)
    setSelectedPeriodIndex(0)
    handleCloseModal()
  }

  return (
    <Modal paramKey="filter" paramValue="unit">
      <motion.div
        className="grid w-full gap-3 rounded-t-2xl bg-white p-3 py-6"
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ type: 'tween', ease: 'easeOut' }}
      >
        <p className="text-center text-xl font-bold">Chart View</p>

        <p className="text-center text-xs text-gray-500">
          Select how would you like to view your spendings
        </p>

        {Object.values(SpendingPeriod).map((sp) => (
          <div
            key={sp}
            onClick={() => handleSelectOption(sp)}
            className={cn(
              'flex items-center justify-between rounded-lg border border-gray-300 p-3'
            )}
          >
            {SPENDING_PERIOD_UNIT_LABELS[sp]}

            <div className="grid h-6 w-6 place-items-center rounded-full border border-gray-200">
              <div
                className={cn(
                  'bg-primary-500 h-4 w-4 scale-0 rounded-full transition-transform',
                  sp === selectedUnit && 'scale-100'
                )}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </Modal>
  )
}

export default UnitSelectorModal
