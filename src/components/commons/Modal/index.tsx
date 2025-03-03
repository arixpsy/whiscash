import { AnimatePresence, motion } from 'motion/react'
import { PropsWithChildren, ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useSearchParams } from 'react-router'
import { cn } from '@/utils/functions'

type ModalProps = {
  portalKey?: 'route' | 'field'
  paramKey: string
  paramValue: string
  withoutBackground?: boolean
} & PropsWithChildren

const Modal = (props: ModalProps) => {
  const { portalKey, paramKey, paramValue, children, withoutBackground } = props
  const [searchParams] = useSearchParams()

  return (
    <AnimatePresence>
      {searchParams.get(paramKey) === paramValue && (
        <Modal_ portalKey={portalKey} withoutBackground={withoutBackground}>
          {children}
        </Modal_>
      )}
    </AnimatePresence>
  )
}

const Modal_ = (props: {
  portalKey?: string
  children: ReactNode
  withoutBackground?: boolean
}) => {
  const { portalKey = 'route', children, withoutBackground = false } = props
  const isAnimationLocked = useRef(false)

  return createPortal(
    <div className="grid-stack fixed inset-0 mx-auto max-w-md place-items-end justify-items-center text-gray-700">
      <motion.div
        onClick={() => !isAnimationLocked.current && window.history.back()}
        className={cn('h-full w-full', !withoutBackground && 'bg-black')}
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
