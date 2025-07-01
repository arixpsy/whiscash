import { motion } from 'motion/react'
import Modal from '@/components/commons/Modal'
import { TbArrowBackUp } from 'react-icons/tb'

const Camera = () => {
  const handleClose = () => window.history.back()

  return (
    <Modal
      portalKey="field"
      paramKey="field"
      paramValue="camera"
      withoutBackground
    >
      <motion.div
        className="grid h-full w-full grid-rows-[auto_1fr] overflow-auto rounded-t-2xl bg-white"
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ type: 'tween', ease: 'easeOut' }}
      >
        <div className="p-3">
          <button type="button" onClick={handleClose}>
            <TbArrowBackUp className="h-6 w-6" />
          </button>
        </div>
        <div>
          Hello! feature under development
          <input
            type="file"
            accept="image/*;capture=camera"
            className="border"
          />
        </div>
      </motion.div>
    </Modal>
  )
}

export default Camera
