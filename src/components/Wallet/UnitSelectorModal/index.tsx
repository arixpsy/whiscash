import { motion } from 'motion/react'
import { Modal, ModalRadioOption } from '@/components/commons'
import { SPENDING_PERIOD_UNIT_LABELS } from '@/utils/constants/spendingPeriod'
import { SpendingPeriod } from '@/utils/enum'

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
          <ModalRadioOption
            key={sp}
            label={SPENDING_PERIOD_UNIT_LABELS[sp]}
            onClick={() => handleSelectOption(sp)}
            isSelected={sp === selectedUnit}
          />
        ))}
      </motion.div>
    </Modal>
  )
}

export default UnitSelectorModal
