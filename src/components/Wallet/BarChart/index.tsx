import * as d3 from 'd3'
import { DateTime } from 'luxon'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GetWalletChartDataResponse } from '@/@types/shared'
import { Loader } from '@/components/commons'
import {
  BAR_WIDTH,
  CHART_HEIGHT,
  CHART_WIDTH,
  PADDING,
  X_OFFSET_AXIS,
  X_OFFSET_BAR,
} from './chartConfig'
import BarChartSkeleton from './Skeleton'

type BarChartProps = {
  data: GetWalletChartDataResponse
  selectedIndex: number
  setSelectedIndex: (selectedIndex: number) => void
  isFetchingMoreData: boolean
  handleFetchMoreData: () => void
}

const BarChart = (props: BarChartProps) => {
  const {
    data,
    selectedIndex,
    setSelectedIndex,
    handleFetchMoreData,
    isFetchingMoreData,
  } = props
  const axisElementRef = useRef(null)
  const chartElementRef = useRef(null)
  const scrollableRef = useRef<HTMLDivElement>(null)
  const yScaleRef = useRef<d3.ScaleLinear<number, number, never>>(
    d3.scaleLinear()
  )
  const xScaleRef = useRef<d3.ScaleLinear<number, number, never>>(
    d3.scaleLinear()
  )
  const [hasMounted, setHasMounted] = useState(false)

  {/* TODO: change format based on unit */}
  const GetXAxisLabel = useCallback(
    (v: d3.NumberValue) =>
      DateTime.fromISO(
        data[v as number].startPeriod.replace(' ', 'T')
      ).toFormat('LLL yy'),
    [data]
  )

  const handleScroll = useCallback(
    (e: Event) => {
      const screenWidth = (e.target as HTMLElement).clientWidth
      const maxScrollWidth = (e.target as HTMLElement).scrollWidth * -1
      const scrollLeft = (e.target as HTMLElement).scrollLeft - screenWidth

      if (maxScrollWidth === scrollLeft) {
        handleFetchMoreData()
      }
    },
    [handleFetchMoreData]
  )

  const renderChart = useCallback(() => {
    const yScale = yScaleRef.current
    const xScale = xScaleRef.current

    if (!chartElementRef.current) return
    if (!axisElementRef.current) return
    if (!yScale) return
    if (!xScale) return

    const maxY = d3.max(data.flatMap((d) => d.spendingPeriodTotal))

    const yMaxDomain = parseInt(
      Math.ceil(maxY || 400)
        .toString()
        .split('')
        .map((n, i) => (i === 0 ? parseInt(n) + 1 : 0))
        .join('')
    )

    xScaleRef.current
      .domain([data.length - 1, 0])
      .range([0, CHART_WIDTH(data.length) - PADDING.LEFT - PADDING.RIGHT])

    yScaleRef.current
      .domain([0, yMaxDomain])
      .range([CHART_HEIGHT - PADDING.BOTTOM - PADDING.TOP, 0])

    d3.select(chartElementRef.current).attr('width', CHART_WIDTH(data.length))

    // X Axis
    d3.select(chartElementRef.current).select('.x-tick').remove()
    d3.select(chartElementRef.current)
      .append('g')
      .call(
        d3
          .axisBottom(xScaleRef.current)
          .ticks(data.length)
          .tickFormat(GetXAxisLabel)
      )
      .call((g) => g.select('.domain').remove())
      .call((g) => g.selectAll('.tick line').remove())
      .call((g) => g.selectAll('text').attr('color', 'gray'))
      .attr('class', 'x-tick')
      .attr(
        'transform',
        `translate(${X_OFFSET_AXIS}, ${CHART_HEIGHT - PADDING.TOP})`
      )

    // Y Axis
    d3.select(axisElementRef.current).select('g').remove()
    d3.select(axisElementRef.current)
      .append('g')
      .call(d3.axisLeft(yScaleRef.current).ticks(6))
      .call((g) => g.select('.domain').remove())
      .call((g) => g.selectAll('.tick line').remove())
      .call((g) =>
        g
          .selectAll('text')
          .attr('text-anchor', 'start')
          .attr('transform', 'translate(0, -5)')
          .attr('color', 'gray')
          .attr('font-size', '0.725em')
      )
      .attr('transform', `translate(${PADDING.LEFT}, ${PADDING.TOP})`)

    if (data.length === 0) return

    d3.select(chartElementRef.current)
      .selectAll('rect')
      .data(data)
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr('width', BAR_WIDTH)
            .attr('height', 0)
            .attr('x', (_, i) => xScale(i))
            .attr('y', yScale(0))
            .attr('rx', 5)
            .attr('transform', `translate(${X_OFFSET_BAR}, ${PADDING.TOP})`)
            .attr('fill', (_, i) =>
              selectedIndex === i ? '#007bff' : '#e8e8e8'
            )
            .on('click', (_, t) => {
              const index = data.findIndex(
                (d) => d.startPeriod === t.startPeriod
              )
              setSelectedIndex(index)
            }),
        (update) => update.attr('x', (_, i) => xScale(i))
      )

    d3.select(chartElementRef.current)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .transition()
      .duration(750)
      .attr(
        'height',
        (v) =>
          CHART_HEIGHT -
          PADDING.TOP -
          PADDING.BOTTOM -
          yScale(v.spendingPeriodTotal)
      )
      .attr('y', (v) => yScale(v.spendingPeriodTotal))
      .duration(350)
      .attr('fill', (_, i) => (selectedIndex === i ? '#007bff' : '#e8e8e8'))
  }, [GetXAxisLabel, data, selectedIndex, setSelectedIndex])

  // Mount chart base
  useEffect(() => {
    d3.select(chartElementRef.current)
      .attr('height', CHART_HEIGHT)
      .attr('width', 0)
      .style('margin-left', PADDING.LEFT)
      .style('margin-right', PADDING.RIGHT)

    d3.select(axisElementRef.current)
      .attr('height', CHART_HEIGHT)
      .attr('width', '100%')
      .style('position', 'absolute')
      .style('inset', 0)
      .style('pointer-events', 'none')

    setHasMounted(true)
  }, [])

  useEffect(() => {
    const scrollableDiv = scrollableRef.current

    if (!scrollableDiv) return

    scrollableDiv.addEventListener('scroll', handleScroll, { passive: true })

    return () => scrollableDiv.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (!hasMounted) return
    renderChart()
  }, [hasMounted, renderChart])

  return (
    <div className="relative isolate grid max-w-lg overflow-x-auto" dir="rtl">
      {isFetchingMoreData && (
        <div className="absolute top-1 right-3">
          <Loader size="xs" />
        </div>
      )}

      <svg ref={axisElementRef} />

      <div
        className="hide-scrollbar relative overflow-x-auto"
        style={{ marginLeft: `${PADDING.LEFT}px` }}
        ref={scrollableRef}
      >
        <svg ref={chartElementRef} />
      </div>
    </div>
  )
}

BarChart.Skeleton = BarChartSkeleton

export default BarChart
