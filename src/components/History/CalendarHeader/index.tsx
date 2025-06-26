import { cn } from '@/utils/functions'
import { motion } from 'motion/react'
import { DateTime } from 'luxon'
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri'

type CalendarHeaderProps = {
  onClickTodayButton: VoidFunction
  selectedDate: string
  showReturnState: -1 | 0 | 1
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { onClickTodayButton, selectedDate, showReturnState } = props
  const date = DateTime.fromISO(selectedDate)
  const dateLabel = date.hasSame(DateTime.now(), 'day')
    ? 'Today'
    : date.toLocaleString({
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })

  return (
    <div className="relative flex items-center justify-center p-3 pb-1">
      {showReturnState !== 0 && !date.hasSame(DateTime.now(), 'day') && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary-500 absolute left-0 flex items-center rounded-r-full bg-white p-1 pr-2 pl-1 text-xs font-bold"
          onClick={onClickTodayButton}
        >
          <RiArrowLeftSFill
            className={cn(
              'text-sm opacity-0',
              showReturnState < 0 && 'opacity-100'
            )}
          />
          Today
          <RiArrowRightSFill
            className={cn(
              'text-sm opacity-0',
              showReturnState > 0 && 'opacity-100'
            )}
          />
        </motion.button>
      )}

      <div className="text-center text-lg font-bold">{dateLabel}</div>
    </div>
  )
}

export default CalendarHeader
