import { ButtonHTMLAttributes, MouseEvent } from 'react'

type FeedbackButtonProps = {
  vibratePattern?: number | Array<number>
  onLongPress?: VoidFunction
} & ButtonHTMLAttributes<HTMLButtonElement>

const FeedbackButton = (props: FeedbackButtonProps) => {
  const { children, onClick, onLongPress, vibratePattern = 50, ...rest } = props

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(vibratePattern)
    }
    onClick?.(event)
  }

  const handleLongPress = (event: MouseEvent<HTMLButtonElement>) => {
    const timeout = setTimeout(() => {
      if ('vibrate' in navigator) {
        navigator.vibrate(vibratePattern)
      }
      onLongPress?.()
    }, 500)

    const clear = () => clearTimeout(timeout)

    event.currentTarget.addEventListener('pointerup', clear, {
      once: true,
    })
    event.currentTarget.addEventListener('pointerleave', clear, {
      once: true,
    })
  }

  return (
    <button onClick={handleClick} onPointerDown={handleLongPress} {...rest}>
      {children}
    </button>
  )
}

export default FeedbackButton
