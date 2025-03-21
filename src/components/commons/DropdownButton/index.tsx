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
        className={cn('relative isolate w-min', className)}
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

type ContentProps = {
  contentAnchor?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  triggerAnchor?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
} & HTMLAttributes<HTMLDivElement>

const Content = (props: ContentProps) => {
  const {
    children,
    className,
    contentAnchor = 'topLeft',
    triggerAnchor = 'topleft',
  } = props
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
            'absolute min-w-max rounded-lg bg-gray-100 p-3 shadow-lg',
            {
              'top-0 left-0':
                triggerAnchor === 'topLeft' && contentAnchor === 'topLeft',
              'top-0 right-[100%]':
                triggerAnchor === 'topLeft' && contentAnchor === 'topRight',
              'bottom-[100%] left-0':
                triggerAnchor === 'topLeft' && contentAnchor === 'bottomLeft',
              'right-[100%] bottom-[100%]':
                triggerAnchor === 'topLeft' && contentAnchor === 'bottomRight',

              'top-0 left-[100%]':
                triggerAnchor === 'topRight' && contentAnchor === 'topLeft',
              'top-0 right-0':
                triggerAnchor === 'topRight' && contentAnchor === 'topRight',
              'bottom-[100%] left-[100%]':
                triggerAnchor === 'topRight' && contentAnchor === 'bottomLeft',
              'right-0 bottom-[100%]':
                triggerAnchor === 'topRight' && contentAnchor === 'bottomRight',

              'top-[100%] left-0':
                triggerAnchor === 'bottomLeft' && contentAnchor === 'topLeft',
              'top-[100%] right-[100%]':
                triggerAnchor === 'bottomLeft' && contentAnchor === 'topRight',
              'bottom-0 left-0':
                triggerAnchor === 'bottomLeft' &&
                contentAnchor === 'bottomLeft',
              'right-[100%] bottom-0':
                triggerAnchor === 'bottomLeft' &&
                contentAnchor === 'bottomRight',

              'top-[100%] left-[100%]':
                triggerAnchor === 'bottomRight' && contentAnchor === 'topLeft',
              'top-[100%] right-0':
                triggerAnchor === 'bottomRight' && contentAnchor === 'topRight',
              'bottom-0 left-[100%]':
                triggerAnchor === 'bottomRight' &&
                contentAnchor === 'bottomLeft',
              'right-0 bottom-0':
                triggerAnchor === 'bottomRight' &&
                contentAnchor === 'bottomRight',
            },
            className
          )}
          initial={{
            opacity: 0,
            scaleX: 0,
            scaleY: 0,
            originX:
              contentAnchor === 'topRight' || contentAnchor === 'bottomRight'
                ? 1
                : 0,
            originY:
              contentAnchor === 'topRight' || contentAnchor === 'topLeft'
                ? 0
                : 1,
          }}
          animate={{
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
          }}
          exit={{
            opacity: 0,
            scaleX: 0,
            scaleY: 0,
          }}
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
