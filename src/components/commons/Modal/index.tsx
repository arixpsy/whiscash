import { motion } from 'motion/react'

const Modal = () => {
  return (
    <div className="fixed inset-0 grid place-items-center [&>*]:z-0 [&>*]:col-start-1 [&>*]:row-start-1">
      <motion.div
        onClick={() => window.history.back()}
        className="h-full w-full max-w-md bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
      />

      {/* TODO: extract logic */}
      <motion.div
        className="h-full w-full max-w-md self-end rounded-t-2xl bg-white p-3"
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ type: 'tween', ease: 'easeOut' }}
      >
        <div className="flex justify-between">
          <div onClick={() => window.history.back()}>X</div>
          <div>Create Wallet</div>
        </div>
        <div>
          <p>Name</p>
          <p>Currency</p>
          <p>defaultSpendingPeriod</p>
          <p>Sub Wallet</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Modal
