import { AnimatePresence, motion } from 'motion/react'
import { PropsWithChildren, ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useSearchParams } from 'react-router'

type ModalProps = {
  portalKey?: 'route' | 'field'
  paramKey: string
  paramValue: string
} & PropsWithChildren

const Modal = (props: ModalProps) => {
  const { portalKey, paramKey, paramValue, children } = props
  const [searchParams] = useSearchParams()

  return (
    <AnimatePresence>
      {searchParams.get(paramKey) === paramValue && (
        <Modal_ portalKey={portalKey}>{children}</Modal_>
      )}
    </AnimatePresence>
  )
}

const Modal_ = (props: { portalKey?: string; children: ReactNode }) => {
  const { portalKey = 'route', children } = props
  const isAnimationLocked = useRef(false)

  return createPortal(
    <div className="grid-stack fixed inset-0 place-items-end text-gray-700 ">
      <motion.div
        onClick={() => !isAnimationLocked.current && window.history.back()}
        className="h-full w-full max-w-md bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onAnimationStart={() => (isAnimationLocked.current = true)}
        onAnimationComplete={() => (isAnimationLocked.current = false)}
      />
      {children}
    </div>,
    document.getElementById(portalKey)!
  )
}

export default Modal
