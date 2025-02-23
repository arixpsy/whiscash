import { HTMLAttributes, MouseEvent } from 'react'

type FeedbackButtonProps = {
  vibratePattern?: number | Array<number>
} & HTMLAttributes<HTMLButtonElement>

const FeedbackButton = (props: FeedbackButtonProps) => {
  const { children, onClick, vibratePattern = 50, ...rest } = props

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    navigator.vibrate(vibratePattern)
    onClick?.(event)
  }
  return (
    <button onClick={handleClick} {...rest}>
      {children}
    </button>
  )
}

export default FeedbackButton
