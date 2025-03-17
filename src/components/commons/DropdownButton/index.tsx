import React, {
  PropsWithChildren,
  useState,
  ReactElement,
  useMemo,
  ButtonHTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  HTMLAttributes,
} from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/utils/functions'

type DropdownButtonContextProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const DropdownButtonContext = createContext<DropdownButtonContextProps>({
  isOpen: false,
  setIsOpen: () => {},
})

const DropdownButton = (
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>
) => {
  const { children, className } = props
  const [isOpen, setIsOpen] = useState(false)

  const { triggerElement, contentElement } = useMemo(() => {
    let trigger: ReactElement | undefined = undefined
    let content: ReactElement | undefined = undefined
    const others: ReactNode[] = []

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return
      if (child.type === Trigger) trigger = child
      else if (child.type === Content) content = child
      else others.push(child)
    })

    return {
      triggerElement: trigger,
      contentElement: content,
    }
  }, [children])

  return (
    <DropdownButtonContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        className={cn('relative isolate', className)}
        style={{ display: 'inherit' }}
      >
        {triggerElement}

        {isOpen && (
          <div className="fixed inset-0" onClick={() => setIsOpen(false)}></div>
        )}

        {contentElement}
      </div>
    </DropdownButtonContext.Provider>
  )
}

const Content = (props: HTMLAttributes<HTMLDivElement>) => {
  const { children, className } = props
  const context = useContext(DropdownButtonContext)

  if (!context)
    throw new Error('DropdownButton.Content must be used within DropdownButton')

  const { isOpen } = context

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dropdown-menu"
          className={cn(
            'absolute top-0 right-0 rounded-lg bg-gray-100 p-3 shadow-lg',
            className
          )}
          initial={{
            opacity: 0,
            scaleX: 0,
            scaleY: 0,
            originX: 1,
            originY: 0,
          }}
          animate={{
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
          }}
          exit={{ opacity: 0, scaleX: 0, scaleY: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const ContentOption = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, className, onClick } = props
  const context = useContext(DropdownButtonContext)

  if (!context)
    throw new Error(
      'DropdownButton.ContentOption must be used within DropdownButton'
    )

  const { setIsOpen } = context

  const handleClickOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick?.(e)
    setIsOpen(false)
  }

  return (
    <button
      type="button"
      className={cn('w-full py-1 text-left text-sm', className)}
      onClick={handleClickOption}
    >
      {children}
    </button>
  )
}

const Trigger = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, className } = props
  const context = useContext(DropdownButtonContext)

  if (!context)
    throw new Error('DropdownButton.Trigger must be used within DropdownButton')

  const { setIsOpen } = context

  return (
    <button type="button" className={className} onClick={() => setIsOpen(true)}>
      {children}
    </button>
  )
}

DropdownButton.Content = Content
DropdownButton.ContentOption = ContentOption
DropdownButton.Trigger = Trigger

export default DropdownButton
