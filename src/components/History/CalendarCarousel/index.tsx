import { FaCheck } from 'react-icons/fa'
import { DateTime } from 'luxon'
import { Virtualizer, VirtualizerHandle } from 'virtua'
import { FeedbackButton } from '@/components/commons'
import { cn } from '@/utils/functions'

type CalendarCarouselProps = {
  items?: Array<DateTime>
  onDateSelect: (date: DateTime) => void
  onScroll: VoidFunction
  ref: React.Ref<VirtualizerHandle>
  selectedDate: string
  virtualizerShift: boolean
}

const CalendarCarousel = (props: CalendarCarouselProps) => {
  const {
    items = [],
    onDateSelect,
    onScroll,
    ref,
    selectedDate,
    virtualizerShift,
  } = props

  return (
    <div className="hide-scrollbar h-18 w-full snap-x overflow-auto pb-2">
      <Virtualizer
        ref={ref}
        shift={virtualizerShift}
        horizontal
        onScroll={onScroll}
      >
        {items.map((day) => {
          const currentDay = day
          const isToday = currentDay.hasSame(DateTime.now(), 'day')
          const isSelected = DateTime.fromISO(selectedDate).hasSame(
            currentDay,
            'day'
          )

          return (
            <FeedbackButton
              key={currentDay.toISO()}
              onClick={() => onDateSelect(currentDay)}
              className="grid snap-start place-items-center justify-center"
              style={{ width: 'calc(min(100vw, 448px) / 7)' }}
            >
              <div
                className={cn(
                  `relative grid w-10.5 grid-rows-3 place-items-center justify-center gap-1 rounded-full p-1 text-xs transition-colors`,
                  isSelected && 'text-primary-500 bg-white'
                )}
              >
                {isToday && !isSelected && (
                  <div
                    className={cn(
                      'mx-auto aspect-square h-[6px] rounded-full bg-white',
                      isSelected && 'bg-primary-500'
                    )}
                  />
                )}
                {isSelected && <FaCheck className="text-[10px]" />}
                <p className="row-start-2">{currentDay.weekdayShort}</p>
                <p className="row-start-3">{currentDay.day}</p>
              </div>
            </FeedbackButton>
          )
        })}
      </Virtualizer>
    </div>
  )
}

export default CalendarCarousel
