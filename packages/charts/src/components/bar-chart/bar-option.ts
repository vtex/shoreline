import type { EChartsCoreOption } from '../../internal/echarts'
import type { ChartTokens } from '../../internal/theme'
import { chartSeriesTokens } from '../../internal/theme'
import type { ChartTooltipDelta } from '../../internal/tooltip'
import {
  createAxisTooltipFormatter,
  createTooltipPositioner,
} from '../../internal/tooltip'

/**
 * A single bar series.
 */
export interface BarChartSeries {
  /**
   * Series name, shown in the legend and tooltip.
   */
  name: string
  /**
   * One value per category, in category order. `null` renders no bar for
   * that category.
   */
  data: Array<number | null>
  /**
   * How each value changed against whatever period it is being compared to,
   * in category order alongside `data`; `null` or a short array leaves that
   * category's row without a delta.
   *
   * Supplied explicitly rather than derived, because only the consumer knows
   * what the comparison is and whether a move reads as good or bad. The
   * comparison series need not be on the chart at all.
   * @default undefined
   */
  deltas?: Array<ChartTooltipDelta | null>
}

/**
 * Orientation of the bars.
 */
export type BarChartDirection = 'vertical' | 'horizontal'

/**
 * How multiple series are combined.
 */
export type BarChartGrouping = 'grouped' | 'stacked'

export interface BuildBarOptionArgs {
  series: BarChartSeries[]
  categories: string[]
  direction: BarChartDirection
  grouping: BarChartGrouping
  othersLabel: string
  maxSeries: number
  tokens: ChartTokens
}

/**
 * Hard ceiling on rendered series, set by the palette itself: there are only
 * this many designed colors and they are never cycled, so no chart can show
 * more distinct series than this regardless of what `maxSeries` asks for.
 */
export const seriesLimit = chartSeriesTokens.length

/**
 * Default number of rendered series: the primary and secondary series plus the
 * aggregate in the tertiary color.
 */
export const defaultMaxSeries = 3

/**
 * Folds the tail of `series` into a single aggregate so that no more than
 * `maxSeries` series render, keeping every value represented instead of
 * dropping data. Requests above `seriesLimit` clamp to it, because past that
 * point the palette has no color left to tell series apart.
 *
 * The aggregate takes the last rendered slot, so it wears that slot's color —
 * the tertiary color at the default `maxSeries`.
 *
 * Values are summed per category. A null contributes nothing, and a category
 * where every folded series is null stays null, so the aggregate renders no
 * bar rather than a spurious zero.
 *
 * The aggregate carries no deltas: they arrive already formatted, so there is
 * no sound way to combine those of the series it replaces. Series that keep
 * their own slot keep their own deltas.
 */
export function collapseSeries(
  series: BarChartSeries[],
  othersLabel: string,
  maxSeries: number
): BarChartSeries[] {
  // A fractional or non-finite request would otherwise slice unpredictably.
  const limit = Math.min(Math.max(Math.floor(maxSeries) || 1, 1), seriesLimit)

  if (series.length <= limit) return series

  // The aggregate occupies the last slot, so one fewer series keeps its name.
  const rest = series.slice(limit - 1)
  const length = Math.max(...rest.map((item) => item.data.length))

  const data = Array.from({ length }, (_, index) =>
    rest.reduce<number | null>((sum, item) => {
      const value = item.data[index]

      return value === null || value === undefined ? sum : (sum ?? 0) + value
    }, null)
  )

  return [...series.slice(0, limit - 1), { name: othersLabel, data }]
}

const radiusToken = '--sl-radius-1'
const spaceSmall = '--sl-space-2'
const spaceLegend = '--sl-space-10'
// Design spec, positioning: 8px between the hovered bar and the tooltip
const tooltipOffsetToken = '--sl-space-2'
const tooltipOffsetFallback = 8
// Design spec, behaviour: hover overlay over the selected category
const hoverOverlayToken = '--sl-bg-muted-plain-hover'

type BorderRadius = [number, number, number, number]

const noRadius: BorderRadius = [0, 0, 0, 0]

/**
 * The engine rounds the corners at the value-axis end of the [0, value]
 * range, so bars below zero would get rounded at the zero line instead of at
 * their far end. Rounding is resolved per data item from the value's sign
 * (a known engine gap, first solved in vtex/shoreline#2104).
 */
function barBorderRadius(args: {
  value: number | null
  direction: BarChartDirection
  isStackEnd: boolean
  radius: number | undefined
}): BorderRadius {
  const { value, direction, isStackEnd, radius } = args

  if (!radius || !isStackEnd || value === null || value === 0) return noRadius

  if (direction === 'vertical') {
    return value > 0 ? [radius, radius, 0, 0] : [0, 0, radius, radius]
  }

  return value > 0 ? [0, radius, radius, 0] : [radius, 0, 0, radius]
}

/**
 * Whether the segment is the outer end of its bar: in a stack, positive
 * values pile up and negative values pile down independently, so only the
 * last non-zero segment of each sign gets rounded. Grouped bars are always
 * their own end.
 */
function isStackEnd(args: {
  series: BarChartSeries[]
  seriesIndex: number
  categoryIndex: number
  grouping: BarChartGrouping
}): boolean {
  const { series, seriesIndex, categoryIndex, grouping } = args
  const value = series[seriesIndex]?.data[categoryIndex]

  if (value === null || value === undefined || value === 0) return false
  if (grouping === 'grouped') return true

  const positive = value > 0

  for (let i = series.length - 1; i > seriesIndex; i--) {
    const other = series[i]?.data[categoryIndex]

    if (other !== null && other !== undefined && other !== 0) {
      if (other > 0 === positive) return false
    }
  }

  return true
}

/**
 * Compiles the designed BarChart props into an engine option. Pure: all
 * style values come from the resolved tokens.
 */
export function buildBarOption(args: BuildBarOptionArgs): EChartsCoreOption {
  const { categories, direction, grouping, othersLabel, maxSeries, tokens } =
    args

  // Everything downstream — legend, palette order, stack-end resolution —
  // reads the collapsed list, so the aggregate behaves like any other series.
  const series = collapseSeries(args.series, othersLabel, maxSeries)

  const radius = tokens.px(radiusToken)
  const showLegend = series.length > 1

  // A vertical stack piles the first series at the bottom, so its segments run
  // last-to-first down the bar and the tooltip has to list them in reverse to
  // read in the same order. No other geometry needs it: a horizontal stack
  // grows left to right, and grouped bars sit side by side — both already put
  // the first series where the reader starts.
  const reverseTooltipRows = direction === 'vertical' && grouping === 'stacked'

  // Deltas are looked up by the series' position, not its name: names are not
  // required to be unique, and two series sharing one would otherwise both
  // resolve to whichever came last. The collapsed list is exactly the order
  // the engine receives its series in, so the index it reports lines up here.
  // Left undefined when no series supplied deltas, so the tooltip skips the
  // lookup entirely for the common case.
  const deltasBySeries = series.map((item) => item.deltas)

  const getDelta = deltasBySeries.some(Boolean)
    ? (seriesIndex: number, categoryIndex: number) =>
        deltasBySeries[seriesIndex]?.[categoryIndex] ?? undefined
    : undefined

  const categoryAxis = { type: 'category', data: categories }
  const valueAxis = { type: 'value' }

  return {
    legend: { show: showLegend, left: 0, bottom: 0 },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: { color: tokens.get(hoverOverlayToken) },
      },
      // The tooltip is allowed to overflow the chart. `confine` would push it
      // back inside the chart bounds, and leaving the element inside the chart
      // container lets any `overflow: hidden` ancestor clip it — so it renders
      // on `body` instead, above whatever the chart sits in.
      confine: false,
      appendTo: 'body',
      // Visuals come entirely from the formatter's own markup + tooltip.css
      // (data-sl-chart-tooltip*), not from the engine's tooltip container.
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
      extraCssText: 'box-shadow: none;',
      formatter: createAxisTooltipFormatter({
        reverse: reverseTooltipRows,
        getDelta,
      }),
      position: createTooltipPositioner(
        tokens.px(tooltipOffsetToken) ?? tooltipOffsetFallback
      ),
    },
    grid: {
      outerBoundsMode: 'same',
      outerBoundsContain: 'axisLabel',
      left: tokens.px(spaceSmall),
      right: tokens.px(spaceSmall),
      top: tokens.px(spaceSmall),
      bottom: tokens.px(showLegend ? spaceLegend : spaceSmall),
    },
    xAxis: direction === 'vertical' ? categoryAxis : valueAxis,
    yAxis: direction === 'vertical' ? valueAxis : categoryAxis,
    series: series.map((item, seriesIndex) => ({
      name: item.name,
      type: 'bar',
      stack: grouping === 'stacked' ? 'total' : undefined,
      data: item.data.map((value, categoryIndex) => ({
        value,
        itemStyle: {
          borderRadius: barBorderRadius({
            value,
            direction,
            radius,
            isStackEnd: isStackEnd({
              series,
              seriesIndex,
              categoryIndex,
              grouping,
            }),
          }),
        },
      })),
    })),
  }
}
