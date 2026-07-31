import type { EChartsCoreOption } from '../../internal/echarts'
import type { ChartTokens } from '../../internal/theme'
import { chartSeriesTokens } from '../../internal/theme'

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

  const categoryAxis = { type: 'category', data: categories }
  const valueAxis = { type: 'value' }

  return {
    legend: { show: showLegend, left: 0, bottom: 0 },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      containLabel: true,
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
