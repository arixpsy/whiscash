import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { DateTime } from 'luxon'
import { VirtualizerHandle } from 'virtua'
import { ConfirmationModal, Page, TransactionTile } from '@/components/commons'
import { CalendarCarousel, CalendarHeader } from '@/components/History'
import useTransaction from '@/hooks/useTransaction'
import { QUERY_KEYS } from '@/utils/constants/queryKey'
import { Route } from '@/utils/constants/routes'

const THRESHOLD = 7
const INIT_SIZE = 35

const History = () => {
  // TODO: allow add new transaction
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const { useGetTransactionsQuery, useDeleteTransactionMutation } =
    useTransaction()
  const [selectedDate, setSelectedDate] = useState(initSelectedDay)
  const getTransactions = useGetTransactionsQuery(selectedDate)
  const deleteTransaction = useDeleteTransactionMutation(
    deleteTransactionSuccessCB
  )
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
  const aggTransactionData = useMemo(
    () => getTransactions.data?.pages.flat(1) || [],
    [getTransactions.data]
  )

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

  function initSelectedDay() {
    const dateParam = searchParams.get('date')
    const parseDate = dateParam ? DateTime.fromISO(dateParam) : DateTime.now()

    if (parseDate.isValid) {
      return parseDate.toISODate()
    }

    return DateTime.now().toISODate()
  }

  const handleSelectDate = (date: DateTime<true>) => {
    const dateString = date.toISODate()
    searchParams.set('date', dateString)
    navigate(`${Route.HISTORY}?${searchParams.toString()}`, { replace: true })
    setSelectedDate(dateString)
  }

  const handleGoToToday = () => {
    virtualizerRef.current?.scrollToIndex(thisWeekIndex.current, {
      smooth: true,
    })

    handleSelectDate(DateTime.now())
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

  const handleNavigateToTransaction = (transactionId: number) =>
    document.startViewTransition(() =>
      navigate(`${Route.TRANSACTIONS}/${transactionId}`, {
        state: { from: Route.HISTORY + '?' + searchParams.toString() },
      })
    )

  const handleDeleteTransaction = () => {
    const id = Number(searchParams.get('id'))
    if (!id || isNaN(id)) return
    deleteTransaction.mutate(id)
  }

  function deleteTransactionSuccessCB() {
    queryClient.invalidateQueries({
      queryKey: ['whiscash', 'wallets', 'transactions'],
    })

    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.TRANSACTIONS(selectedDate),
    })

    searchParams.delete('confirmation')
    searchParams.delete('id')

    navigate(Route.HISTORY + '?' + searchParams.toString(), { replace: true })
  }

  useEffect(() => {
    if (!virtualizerRef.current) return
    if (items.length === INIT_SIZE) {
      virtualizerRef.current.scrollToIndex(thisWeekIndex.current)
    }
    ready.current = true
  }, [items])

  return (
    <>
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
          {getTransactions.isPending
            ? Array.from({ length: 5 }).map((_, index) => (
                <TransactionTile.Skeleton key={index} />
              ))
            : aggTransactionData.map((transaction) => (
                <TransactionTile
                  key={transaction.id}
                  transaction={transaction}
                  onClick={() => handleNavigateToTransaction(transaction.id)}
                  swipable
                />
              ))}
        </div>
      </Page>

      <ConfirmationModal
        paramValue="delete"
        title="Delete this transaction?"
        description="Deleting this transaction will remove it forever."
        onConfirm={handleDeleteTransaction}
        isConfirmLoading={deleteTransaction.isPending}
      />
    </>
  )
}

export default History
