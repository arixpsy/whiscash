import { motion } from 'motion/react'
import { PropsWithChildren } from 'react'

const Modal = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <div className="fixed inset-0 grid place-items-center [&>*]:z-0 [&>*]:col-start-1 [&>*]:row-start-1">
      <motion.div
        onClick={() => window.history.back()}
        className="h-full w-full max-w-md bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
      />
      {children}
    </div>
  )
}

export default Modal
