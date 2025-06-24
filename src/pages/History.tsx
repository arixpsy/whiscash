import { useEffect, useRef, useState } from 'react'
import { DateTime } from 'luxon'
import { Virtualizer, VirtualizerHandle } from 'virtua'
import { FeedbackButton, Page, TransactionTile } from '@/components/commons'
import { cn } from '@/utils/functions'

const History = () => {
  const [selectedDay, setSelectedDay] = useState<string>(DateTime.now().toISO())
  const virtualizerRef = useRef<VirtualizerHandle>(null)
  const ready = useRef<boolean>(false)
  const startFetchedCountRef = useRef(-1)
  const endFetchedCountRef = useRef(-1)
  const thisWeekIndex = useRef(7)
  const [shift, setShift] = useState(true)
  const [items, setItems] = useState(initDays())
  const THRESHOLD = 7
  const count = items.length

  function initDays() {
    return Array.from({ length: 21 }, (_, i) =>
      DateTime.now()
        .minus({ weeks: 1 })
        .startOf('week')
        .plus({ days: i - 1 })
    )
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

    thisWeekIndex.current += 21
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
  }

  useEffect(() => {
    if (!virtualizerRef.current) return
    virtualizerRef.current.scrollToIndex(thisWeekIndex.current)
    ready.current = true
  }, [items])

  return (
    <Page>
      <div className="bg-primary-500 text-white">
        <div className="flex items-center justify-between p-3">
          <button onClick={handleGoToToday}>today</button>
          <div className="text-center font-bold">
            {DateTime.fromISO(selectedDay).hasSame(DateTime.now(), 'day')
              ? 'Today'
              : DateTime.fromISO(selectedDay).toLocaleString({
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
          </div>
          <button></button>
        </div>

        <div className="h-20 w-full snap-x overflow-auto">
          <Virtualizer
            ref={virtualizerRef}
            shift={shift}
            horizontal
            onScroll={handleScroll}
          >
            {items.map((i) => {
              const currentDay = i
              const isToday = currentDay.hasSame(DateTime.now(), 'day')
              const isSelected = currentDay.toISO() === selectedDay

              return (
                <FeedbackButton
                  key={i.toISO()}
                  onClick={() => handleDaySelect(currentDay)}
                  className="grid snap-start place-items-center justify-center text-sm"
                  style={{ width: 'calc(min(100vw, 448px) / 7)' }}
                >
                  <div
                    className={cn(
                      `grid w-10.5 snap-start gap-1 rounded-full p-1 py-3 text-sm transition-colors`,
                      {
                        'bg-primary-400': isSelected,
                        'text-primary-500 bg-white': isToday,
                      }
                    )}
                  >
                    {currentDay
                      .toLocaleString({
                        weekday: 'short',
                        day: 'numeric',
                      })
                      .split(' ')
                      .map((c) => (
                        <p key={c}>{c}</p>
                      ))}
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
