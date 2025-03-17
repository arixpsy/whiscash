import { motion } from 'motion/react'
import Modal from '@/components/commons/Modal'
import { SpendingPeriod } from '@/utils/enum'
import { cn } from '@/utils/functions'

type UnitSelectorModalProps = {
  selectedUnit: SpendingPeriod
  setSelectedUnit: (sp: SpendingPeriod) => void
}

const UnitSelectorModal = (props: UnitSelectorModalProps) => {
  const { selectedUnit, setSelectedUnit } = props

  const handleCloseModal = () => window.history.back()

  return (
    <Modal paramKey="filter" paramValue="unit">
      <motion.div
        className="grid w-full gap-3 rounded-t-2xl bg-white p-3 py-6"
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ type: 'tween', ease: 'easeOut' }}
      >
        Select Unit
        {/* TODO: cleanup */}
        {Object.values(SpendingPeriod).map((sp) => (
          <div
            key={sp}
            onClick={() => {
              setSelectedUnit(sp)
              handleCloseModal()
            }}
            className={cn(selectedUnit === sp && 'font-bold')}
          >
            {sp}
          </div>
        ))}
      </motion.div>
    </Modal>
  )
}

export default UnitSelectorModal
