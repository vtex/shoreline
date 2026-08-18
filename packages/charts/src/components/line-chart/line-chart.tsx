import { Skeleton, VisuallyHidden, createMessageHook } from '@vtex/shoreline'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef, useId, useMemo } from 'react'

import { ChartContainer } from '../../internal/chart-container'
import { chartMessages, type ChartMessages } from '../../internal/messages'
import type { ChartTokens } from '../../internal/theme'
import type { LineChartSeries } from './line-option'
import { buildLineOption, defaultMaxSeries } from './line-option'
import './register'

const useMessage = createMessageHook(chartMessages)

/**
 * Line charts show trends over a continuous axis, in the Shoreline design
 * language with zero styling effort.
 * @status experimental
 * @example
 * <LineChart
 *   label="Revenue by month"
 *   categories={['Jan', 'Feb', 'Mar']}
 *   series={[{ name: 'Revenue', data: [1200, 2400, 1800] }]}
 * />
 */
export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
  function LineChart(props, ref) {
    const {
      series,
      categories,
      label,
      description,
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
        buildLineOption({
          series,
          categories,
          othersLabel,
          maxSeries,
          tokens,
        }),
      [series, categories, othersLabel, maxSeries]
    )

    return (
      <div
        data-sl-line-chart
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
          <div data-sl-line-chart-empty>{emptyLabel}</div>
        )}
      </div>
    )
  }
)

export interface LineChartOptions {
  /**
   * Chart series. At most `maxSeries` of them render: past that, the tail is
   * summed per category into a single aggregate series named after the
   * `others` message.
   */
  series: LineChartSeries[]
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
   * Shows a loading placeholder instead of the chart.
   * @default false
   */
  loading?: boolean
  /**
   * Overrides the chart's internal messages, which are otherwise localized from
   * the surrounding `LocaleProvider`.
   * @default undefined
   */
  messages?: LineChartMessages
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

export type LineChartProps = LineChartOptions & ComponentPropsWithoutRef<'div'>

/**
 * Line chart internal messages
 */
export type LineChartMessages = ChartMessages
