import { ButtonHTMLAttributes, MouseEvent } from 'react'

type FeedbackButtonProps = {
  vibratePattern?: number | Array<number>
} & ButtonHTMLAttributes<HTMLButtonElement>

const FeedbackButton = (props: FeedbackButtonProps) => {
  const { children, onClick, vibratePattern = 50, ...rest } = props

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(vibratePattern)
    }
    onClick?.(event)
  }

  return (
    <button
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export default FeedbackButton
