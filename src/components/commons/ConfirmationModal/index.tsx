import { motion } from 'motion/react'
import Modal from '@/components/commons/Modal'
import { cn } from '@/utils/functions'
import Loader from '@/components/commons/Loader'

type ConfirmationModalProps = {
  cancelText?: string
  confirmText?: string
  description: string
  isConfirmLoading?: boolean
  onConfirm: () => void
  paramValue: string
  title: string
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    description,
    isConfirmLoading,
    onConfirm,
    paramValue,
    title,
  } = props

  const handleCloseModal = () => window.history.back()

  return (
    <Modal paramKey="confirmation" paramValue={paramValue}>
      <motion.div
        className="grid w-full gap-3 rounded-t-2xl bg-white p-3 py-6"
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ type: 'tween', ease: 'easeOut' }}
      >
        <p className="text-center text-xl font-bold">{title}</p>

        <p className="text-center text-xs text-gray-500">{description}</p>

        <button
          className="grid-stack mt-3 place-items-center rounded-full bg-red-400 py-2 font-bold text-white"
          onClick={onConfirm}
          disabled={isConfirmLoading}
        >
          <Loader
            size="xs"
            color="white"
            trackColor="red"
            className={cn(!isConfirmLoading && 'invisible')}
          />
          <p className={cn(isConfirmLoading && 'invisible')}>{confirmText}</p>
        </button>
        <button
          className="font-bold text-gray-500"
          onClick={handleCloseModal}
          disabled={isConfirmLoading}
        >
          {cancelText}
        </button>
      </motion.div>
    </Modal>
  )
}

export default ConfirmationModal
