import { useEffect, useRef, useState } from 'react'
import { DateTime } from 'luxon'
import { Virtualizer, VirtualizerHandle } from 'virtua'
import { RiArrowRightSFill, RiArrowLeftSFill } from 'react-icons/ri'
import { FeedbackButton, Page, TransactionTile } from '@/components/commons'
import { cn } from '@/utils/functions'
import { motion } from 'motion/react'

const History = () => {
  const [selectedDay, setSelectedDay] = useState<string>(DateTime.now().toISO())
  const virtualizerRef = useRef<VirtualizerHandle>(null)
  const ready = useRef(false)
  const startFetchedCountRef = useRef(-1)
  const endFetchedCountRef = useRef(-1)
  const thisWeekIndex = useRef(14)
  const todayIndexOffset = useRef(0)
  const [shift, setShift] = useState(true)
  const [items, setItems] = useState(initDays)
  const [showReturn, setShowReturn] = useState<-1 | 0 | 1>(0)
  const THRESHOLD = 7
  const count = items.length

  function initDays() {
    return Array.from({ length: 35 }, (_, i) => {
      const day = DateTime.now()
        .minus({ weeks: 2 })
        .startOf('week')
        .plus({ days: i - 1 })
      if (day.hasSame(DateTime.now(), 'day')) {
        todayIndexOffset.current = i - thisWeekIndex.current
      }
      return day
    })
  }

  const handleDaySelect = (day: DateTime) => {
    const iso = day.toISO()
    if (iso) {
      setSelectedDay(iso)
    }
  }

  const handleGoToToday = () => {
    virtualizerRef.current?.scrollToIndex(thisWeekIndex.current, {
      smooth: true,
    })
    setSelectedDay(DateTime.now().toISO())
  }

  const prepend = () => {
    setShift(true)
    setItems((c) => [
      ...Array.from({ length: 21 }, (_, i) =>
        c[0].minus({ days: i + 1 })
      ).reverse(),
      ...c,
    ])

    thisWeekIndex.current = thisWeekIndex.current + 21
  }

  const append = () => {
    setShift(false)
    setItems((c) => [
      ...c,
      ...Array.from({ length: 21 }, (_, i) =>
        c[c.length - 1].plus({ days: i + 1 })
      ),
    ])
  }

  const handleScroll = () => {
    if (!ready.current) return
    if (!virtualizerRef.current) return
    if (
      endFetchedCountRef.current < count &&
      virtualizerRef.current.findEndIndex() + THRESHOLD > count
    ) {
      endFetchedCountRef.current = count
      append()
    } else if (
      startFetchedCountRef.current < count &&
      virtualizerRef.current.findStartIndex() - THRESHOLD < 0
    ) {
      startFetchedCountRef.current = count
      prepend()
    }

    const todayIndex = thisWeekIndex.current + todayIndexOffset.current

    if (todayIndex >= virtualizerRef.current.findEndIndex()) {
      setShowReturn(1)
    }

    if (todayIndex <= virtualizerRef.current.findStartIndex()) {
      setShowReturn(-1)
    }

    if (
      todayIndex > virtualizerRef.current.findStartIndex() &&
      todayIndex < virtualizerRef.current.findEndIndex()
    ) {
      setShowReturn(0)
    }
  }

  useEffect(() => {
    if (!virtualizerRef.current) return
    if (items.length === 35) {
      virtualizerRef.current.scrollToIndex(thisWeekIndex.current)
    }
    ready.current = true
  }, [items])

  return (
    <Page>
      <div className="bg-primary-500 text-white">
        <div className="relative flex items-center justify-center p-3">
          {showReturn !== 0 &&
            !DateTime.fromISO(selectedDay).hasSame(DateTime.now(), 'day') && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-primary-500 absolute left-0 flex items-center rounded-r-full bg-white p-1 pr-2 pl-1 text-xs font-bold"
                onClick={handleGoToToday}
              >
                <RiArrowLeftSFill
                  className={cn(
                    'text-sm opacity-0',
                    showReturn < 0 && 'opacity-100'
                  )}
                />
                Today
                <RiArrowRightSFill
                  className={cn(
                    'text-sm opacity-0',
                    showReturn > 0 && 'opacity-100'
                  )}
                />
              </motion.button>
            )}

          <div className="text-center font-bold">
            {DateTime.fromISO(selectedDay).hasSame(DateTime.now(), 'day')
              ? 'Today'
              : DateTime.fromISO(selectedDay).toLocaleString({
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
          </div>
        </div>

        <div className="hide-scrollbar h-18 w-full snap-x overflow-auto pb-2">
          <Virtualizer
            ref={virtualizerRef}
            shift={shift}
            horizontal
            onScroll={handleScroll}
          >
            {items.map((i) => {
              const currentDay = i
              const isToday = currentDay.hasSame(DateTime.now(), 'day')
              const isSelected = DateTime.fromISO(selectedDay).hasSame(
                currentDay,
                'day'
              )

              return (
                <FeedbackButton
                  key={i.toISO()}
                  onClick={() => handleDaySelect(currentDay)}
                  className="grid snap-start place-items-center justify-center"
                  style={{ width: 'calc(min(100vw, 448px) / 7)' }}
                >
                  <div
                    className={cn(
                      `relative grid w-10.5 snap-start gap-1 rounded-full p-1 pt-4 pb-3 text-xs transition-colors`,
                      isSelected && 'text-primary-500 bg-white'
                    )}
                  >
                    {isToday && (
                      <div
                        className={cn(
                          'absolute top-1.5 right-0 left-0 mx-auto aspect-square h-[5px] rounded-full bg-white',
                          isSelected && 'bg-primary-500'
                        )}
                      />
                    )}
                    <p>{currentDay.weekdayShort}</p>
                    <p>{currentDay.day}</p>
                  </div>
                </FeedbackButton>
              )
            })}
          </Virtualizer>
        </div>
      </div>

      <div className="pt-3">
        <TransactionTile.Skeleton />
        <TransactionTile.Skeleton />
        <TransactionTile.Skeleton />
        <TransactionTile.Skeleton />
        <TransactionTile.Skeleton />
        <TransactionTile.Skeleton />
      </div>
    </Page>
  )
}

export default History
