import { motion } from 'motion/react'
import { PropsWithChildren, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'motion/react'
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
        <_Modal portalKey={portalKey}>{children}</_Modal>
      )}
    </AnimatePresence>
  )
}

const _Modal = (props: { portalKey?: string; children: ReactNode }) => {
  const { portalKey = 'route', children } = props

  return createPortal(
    <div className="fixed inset-0 grid place-items-center [&>*]:z-0 [&>*]:col-start-1 [&>*]:row-start-1">
      <motion.div
        onClick={() => window.history.back()}
        className="h-full w-full max-w-md bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
      />
      {children}
    </div>,
    document.getElementById(portalKey)!
  )
}

export default Modal

// type SearchParamModalProps = {} & PropsWithChildren

// export const SearchParamModal = (props: SearchParamModalProps) => {
//   const { paramKey, paramValue, children } = props
//   const [searchParams] = useSearchParams()

//   return (
//     <AnimatePresence>
//       {searchParams.get(paramKey) === paramValue && children}
//     </AnimatePresence>
//   )
// }
