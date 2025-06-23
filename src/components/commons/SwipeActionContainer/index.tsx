import { motion, PanInfo, useMotionValue, useTransform } from 'motion/react'
import { HTMLAttributes, useRef, useState } from 'react'
import { FaTrash } from 'react-icons/fa6'

type SwipeActionContainerProps = {
  onTrigger: () => void
  isDisabled: boolean
} & HTMLAttributes<HTMLDivElement>

const SwipeActionContainer = (props: SwipeActionContainerProps) => {
  const { className, children, onTrigger, isDisabled } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const dragX = useMotionValue(0)
  const opacityIcon = useTransform(() => (dragX.get() * -1) / 100)
  const opacityBg = useTransform(() => dragX.get() * -1)
  const [hasTriggeredPoint, setHasTriggeredPoint] = useState({
    fromLeft: false,
    fromRight: false,
  })

  const handleDrag = (_: TouchEvent, info: PanInfo) => {
    if (isDisabled) return
    if (!containerRef.current) return

    const triggerOffset = (containerRef.current.clientWidth / 100) * 30 * -1

    if (info.offset.x <= triggerOffset && !hasTriggeredPoint.fromLeft) {
      setHasTriggeredPoint({ fromLeft: true, fromRight: false })
      vibrate()
    }

    if (
      info.offset.x >= triggerOffset &&
      hasTriggeredPoint.fromLeft &&
      !hasTriggeredPoint.fromRight
    ) {
      setHasTriggeredPoint({ fromLeft: false, fromRight: true })
      vibrate()
    }
  }

  const handleDragEnd = (_: TouchEvent, info: PanInfo) => {
    if (isDisabled) return
    if (!containerRef.current) return

    const triggerOffset = (containerRef.current.clientWidth / 100) * 30 * -1

    if (info.offset.x <= triggerOffset) {
      setTimeout(onTrigger, 150)
    }
  }

  const vibrate = () => {
    if (!('vibrate' in navigator)) return
    navigator.vibrate(1)
  }

  return (
    <motion.div
      className="grid-stack overflow-hidden"
      ref={containerRef}
      transition={{ delay: 0.15 }}
    >
      {/* TODO: make this props */}
      <motion.div
        className="flex items-center justify-end bg-red-400"
        style={{ opacity: opacityBg }}
      >
        <motion.div style={{ opacity: opacityIcon }}>
          <FaTrash className="mr-6 h-4 w-4 text-white" />
        </motion.div>
      </motion.div>

      <motion.div className={className} style={{ translateX: dragX }}>
        {children}
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 50 }}
        dragElastic={{ right: 0, left: isDisabled ? 0 : 1 }}
        _dragX={dragX}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      />
    </motion.div>
  )
}

export default SwipeActionContainer
