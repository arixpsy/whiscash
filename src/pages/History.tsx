import { useEffect, useRef, useState } from 'react'
import { DateTime } from 'luxon'
import { VirtualizerHandle } from 'virtua'
import { Page, TransactionTile } from '@/components/commons'
import { CalendarCarousel, CalendarHeader } from '@/components/History'

const THRESHOLD = 7
const INIT_SIZE = 35

const History = () => {
  const [selectedDate, setSelectedDate] = useState(DateTime.now().toISO())
  const virtualizerRef = useRef<VirtualizerHandle>(null)
  const ready = useRef(false)
  const startFetchedCountRef = useRef(-1)
  const endFetchedCountRef = useRef(-1)
  const thisWeekIndex = useRef(14)
  const todayIndexOffset = useRef(0)
  const [shift, setShift] = useState(true)
  const [items, setItems] = useState(initDays)
  const [showReturn, setShowReturn] = useState<-1 | 0 | 1>(0)
  const count = items.length

  function initDays() {
    return Array.from({ length: INIT_SIZE }, (_, i) => {
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

  const handleSelectDate = (date: DateTime) =>
    setSelectedDate(date.toISO() || '')

  const handleGoToToday = () => {
    virtualizerRef.current?.scrollToIndex(thisWeekIndex.current, {
      smooth: true,
    })
    setSelectedDate(DateTime.now().toISO())
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
    if (items.length === INIT_SIZE) {
      virtualizerRef.current.scrollToIndex(thisWeekIndex.current)
    }
    ready.current = true
  }, [items])

  return (
    <Page>
      <div className="bg-primary-500 text-white">
        <CalendarHeader
          onClickTodayButton={handleGoToToday}
          selectedDate={selectedDate}
          showReturnState={showReturn}
        />

        <CalendarCarousel
          items={items}
          onDateSelect={handleSelectDate}
          onScroll={handleScroll}
          ref={virtualizerRef}
          selectedDate={selectedDate}
          virtualizerShift={shift}
        />
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
