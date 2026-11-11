import { Skeleton, VisuallyHidden, createMessageHook } from '@vtex/shoreline'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef, useId, useMemo } from 'react'

import { ChartContainer } from '../../internal/chart-container'
import type { ChartTokens } from '../../internal/theme'
import type {
  BarChartDirection,
  BarChartGrouping,
  BarChartSeries,
} from './bar-option'
import { buildBarOption, defaultMaxSeries } from './bar-option'
import { messages } from './messages'
import './register'

const useMessage = createMessageHook(messages)

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
      messages: messageOverrides,
      maxSeries = defaultMaxSeries,
      ...htmlProps
    } = props

    const getMessage = useMessage(messageOverrides)
    const emptyLabel = getMessage('empty')
    const othersLabel = getMessage('others')

    const descriptionId = useId()
    const hasData = series.some((item) =>
      item.data.some((value) => value !== null)
    )
    const option = useMemo(
      () => (tokens: ChartTokens) =>
        buildBarOption({
          series,
          categories,
          direction,
          grouping,
          othersLabel,
          maxSeries,
          tokens,
        }),
      [series, categories, direction, grouping, othersLabel, maxSeries]
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
   * Chart series. Multiple series render per the `grouping` prop. At most
   * `maxSeries` of them render: past that, the tail is summed per category
   * into a single aggregate series named after the `others` message.
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
   * Overrides the chart's internal messages, which are otherwise localized from
   * the surrounding `LocaleProvider`.
   * @default undefined
   */
  messages?: BarChartMessages
  /**
   * How many series render at most. Raise it to give more series their own
   * name and color instead of aggregating them; the default keeps the chart
   * to the primary and secondary series plus the aggregate.
   *
   * Capped at 6 — the palette has that many colors and never cycles them.
   * Series past the cap still aggregate, so no data is dropped.
   * @default 3
   */
  maxSeries?: number
}

export type BarChartProps = BarChartOptions & ComponentPropsWithoutRef<'div'>

/**
 * Bar chart internal messages
 */
export type BarChartMessages = Partial<{
  [key in BarChartMessagesKeys]: string
}>

/**
 * Bar chart internal messages intl keys
 */
type BarChartMessagesKeys =
  /** Rendered in place of the chart when there is no data to display */
  | 'empty'
  /** Names the series that aggregates the tail of `series` */
  | 'others'
