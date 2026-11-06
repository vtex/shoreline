import { Skeleton, VisuallyHidden, createMessageHook } from '@vtex/shoreline'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef, useId, useMemo } from 'react'

import { ChartContainer } from '../../internal/chart-container'
import { chartMessages, type ChartMessages } from '../../internal/messages'
import type { ChartTokens } from '../../internal/theme'
import type {
  ComposedChartGrouping,
  ComposedChartSeries,
} from './composed-option'
import { buildComposedOption, defaultMaxSeries } from './composed-option'
import './register'

const useMessage = createMessageHook(chartMessages)

/**
 * Composed charts pair bars with lines on a shared category axis, in the
 * Shoreline design language with zero styling effort. Bars always render below
 * lines, and a line whose unit differs from the bars' moves to a second, right
 * value axis automatically.
 * @status experimental
 * @example
 * <ComposedChart
 *   label="Revenue and conversion by month"
 *   categories={['Jan', 'Feb', 'Mar']}
 *   series={[
 *     { type: 'bar', name: 'Revenue', data: [1200, 2400, 1800] },
 *     {
 *       type: 'line',
 *       name: 'Conversion',
 *       data: [2.1, 2.4, 2.2],
 *       unit: 'percentage',
 *     },
 *   ]}
 * />
 */
export const ComposedChart = forwardRef<HTMLDivElement, ComposedChartProps>(
  function ComposedChart(props, ref) {
    const {
      series,
      categories,
      label,
      description,
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
        buildComposedOption({
          series,
          categories,
          grouping,
          othersLabel,
          maxSeries,
          tokens,
        }),
      [series, categories, grouping, othersLabel, maxSeries]
    )

    return (
      <div
        data-sl-composed-chart
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
          <div data-sl-composed-chart-empty>{emptyLabel}</div>
        )}
      </div>
    )
  }
)

export interface ComposedChartOptions {
  /**
   * Chart series, as bar or line members discriminated on `type`. Bars render
   * below lines and only bars aggregate past `maxSeries`; lines keep their own
   * names and colors and never count toward the limit.
   */
  series: ComposedChartSeries[]
  /**
   * Labels of the shared category axis, in render order. Every series provides
   * one value per category.
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
   * How bar series combine: side by side or stacked. Lines are never
   * affected.
   * @default 'grouped'
   */
  grouping?: ComposedChartGrouping
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
  messages?: ComposedChartMessages
  /**
   * How many bar series render at most. Raise it to give more bars their own
   * name and color instead of aggregating them; the default keeps the bars to
   * the primary and secondary series plus the aggregate.
   *
   * Capped at 6 — the palette has that many colors and never cycles them.
   * Bars past the cap still aggregate, so no data is dropped. Line series are
   * never aggregated and never counted toward this limit.
   * @default 3
   */
  maxSeries?: number
}

export type ComposedChartProps = ComposedChartOptions &
  ComponentPropsWithoutRef<'div'>

/**
 * Composed chart internal messages
 */
export type ComposedChartMessages = ChartMessages
