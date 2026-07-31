import { Skeleton, VisuallyHidden } from '@vtex/shoreline'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef, useId, useMemo } from 'react'

import { ChartContainer } from '../../internal/chart-container'
import type { ChartTokens } from '../../internal/theme'
import type {
  BarChartDirection,
  BarChartGrouping,
  BarChartSeries,
} from './bar-option'
import { buildBarOption } from './bar-option'
import './register'

/**
 * Bar charts compare values across categories, in the Shoreline design
 * language with zero styling effort.
 * @status experimental
 * @example
 * <BarChart
 *   label="Revenue by month"
 *   categories={['Jan', 'Feb', 'Mar']}
 *   series={[{ name: 'Revenue', data: [1200, 2400, 1800] }]}
 * />
 */
export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  function BarChart(props, ref) {
    const {
      series,
      categories,
      label,
      description,
      direction = 'vertical',
      grouping = 'grouped',
      loading = false,
      emptyLabel = 'No data',
      othersLabel = 'Others',
      ...htmlProps
    } = props

    const descriptionId = useId()
    const hasData = series.some((item) => item.data.length > 0)

    const option = useMemo(
      () => (tokens: ChartTokens) =>
        buildBarOption({
          series,
          categories,
          direction,
          grouping,
          othersLabel,
          tokens,
        }),
      [series, categories, direction, grouping, othersLabel]
    )

    return (
      <div
        data-sl-bar-chart
        ref={ref}
        role="img"
        aria-label={label}
        aria-describedby={description ? descriptionId : undefined}
        aria-busy={loading || undefined}
        {...htmlProps}
      >
        {description ? (
          <span id={descriptionId}>
            <VisuallyHidden>{description}</VisuallyHidden>
          </span>
        ) : null}
        {loading ? (
          <Skeleton />
        ) : hasData ? (
          <ChartContainer option={option} aria-hidden />
        ) : (
          <div data-sl-bar-chart-empty>{emptyLabel}</div>
        )}
      </div>
    )
  }
)

export interface BarChartOptions {
  /**
   * Chart series. Multiple series render per the `grouping` prop. Only the
   * first three keep their own name and color — any beyond that are summed
   * per category into a single `othersLabel` series.
   */
  series: BarChartSeries[]
  /**
   * Labels of the category axis, in render order. Every series provides one
   * value per category.
   */
  categories: string[]
  /**
   * Accessible name announced for the chart.
   */
  label: string
  /**
   * Accessible long description of what the chart shows.
   * @default undefined
   */
  description?: string
  /**
   * Orientation of the bars.
   * @default 'vertical'
   */
  direction?: BarChartDirection
  /**
   * How multiple series combine: side by side or stacked.
   * @default 'grouped'
   */
  grouping?: BarChartGrouping
  /**
   * Shows a loading placeholder instead of the chart.
   * @default false
   */
  loading?: boolean
  /**
   * Message rendered when there is no data to display.
   * @default 'No data'
   */
  emptyLabel?: string
  /**
   * Name of the series that aggregates everything past the third one.
   * @default 'Others'
   */
  othersLabel?: string
}

export type BarChartProps = BarChartOptions & ComponentPropsWithoutRef<'div'>
