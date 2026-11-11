import type { EChartsCoreOption } from '../../internal/echarts'
import type { ChartTokens } from '../../internal/theme'
import type { ChartTooltipDelta } from '../../internal/tooltip'
import type { ChartAxisPointer } from '../../internal/option'
import {
  buildAxisTooltip,
  buildCategoryAxis,
  buildGrid,
  buildLegend,
  buildValueAxis,
} from '../../internal/option'
import type { ChartSeries } from '../../internal/series'
import { collapseSeries, createDeltaLookup } from '../../internal/series'

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

// Re-exported so the package's public `defaultMaxSeries` / `seriesLimit`
// exports keep flowing from the same path they always have.
export { defaultMaxSeries, seriesLimit } from '../../internal/series'

const radiusToken = '--sl-radius-1'
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
  series: ChartSeries[]
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

  const axisPointer: ChartAxisPointer = {
    type: 'shadow',
    shadowStyle: { color: tokens.get(hoverOverlayToken) },
  }

  return {
    legend: buildLegend(series.length),
    tooltip: buildAxisTooltip({
      tokens,
      axisPointer,
      reverse: reverseTooltipRows,
      getDelta: createDeltaLookup(series),
    }),
    grid: buildGrid({ tokens, showLegend }),
    xAxis:
      direction === 'vertical'
        ? buildCategoryAxis(categories)
        : buildValueAxis(),
    yAxis:
      direction === 'vertical'
        ? buildValueAxis()
        : buildCategoryAxis(categories),
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
