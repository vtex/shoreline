import type { EChartsCoreOption } from '../../internal/echarts'
import type { ChartAxisPointer } from '../../internal/option'
import {
  buildAxisTooltip,
  buildCategoryAxis,
  buildGrid,
  buildLegend,
  buildValueAxis,
} from '../../internal/option'
import { collapseSeries, createDeltaLookup } from '../../internal/series'
import { chartSeriesTokens } from '../../internal/theme'
import type { ChartTokens } from '../../internal/theme'
import type { ChartTooltipDelta } from '../../internal/tooltip'

// Re-exported so the component's `maxSeries` default flows from the shared
// constant without the package re-exporting it a second time (it already ships
// via the bar chart).
export { defaultMaxSeries } from '../../internal/series'

/**
 * How a line series renders. `'standard'` is a solid line with point symbols;
 * `'forecast'` is a dashed line without symbols that continues the series
 * immediately before it.
 */
export type LineChartSeriesVariant = 'standard' | 'forecast'

/**
 * A single line series.
 */
export interface LineChartSeries {
  /**
   * Series name, shown in the legend and tooltip.
   */
  name: string
  /**
   * One value per category, in category order. `null` renders a gap at that
   * category — the line is not interpolated across missing points unless a
   * future opt-in says otherwise.
   */
  data: Array<number | null>
  /**
   * How the series renders. A forecast continues the series immediately before
   * it in `series`: it is drawn dashed and without point symbols, in that
   * series' color, and the chart duplicates the predecessor's last known value
   * into the forecast so the dashed segment starts where the solid one ends.
   *
   * Supply a full-length, category-aligned array with `null` over the
   * historical range, so the forecast does not draw on top of the history. A
   * forecast with no predecessor (or whose predecessor has no value) renders
   * dashed throughout.
   * @default 'standard'
   */
  variant?: LineChartSeriesVariant
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

export interface BuildLineOptionArgs {
  series: LineChartSeries[]
  categories: string[]
  othersLabel: string
  maxSeries: number
  /**
   * Draw the lines as smooth curves instead of straight segments.
   * @default false
   */
  smooth?: boolean
  tokens: ChartTokens
}

// Design spec, tooltip: the guide line + marker that follow the hover across
// the chart. Driven from the same token the axis lines use.
const guideLine = '--sl-color-gray-3'

/**
 * The last value the series actually carries, position included: the seam has
 * to join the line where the history really ends, so a null at the boundary
 * category sends it back to the last non-null value before it.
 */
function lastKnownPoint(
  data: Array<number | null>
): { index: number; value: number } | undefined {
  for (let index = data.length - 1; index >= 0; index--) {
    const value = data[index]

    // A slot missing from a short or sparse array reads as a gap, like null.
    if (value !== null && value !== undefined) return { index, value }
  }

  return undefined
}

/**
 * Duplicates the continued series' last known value into the forecast at that
 * category, so the dashed segment starts exactly where the solid one ends.
 * Writes to a copy: the consumer's data is never mutated. A value the consumer
 * already gives the forecast at that category wins — the seam only fills gaps.
 */
function withSeam(
  forecast: Array<number | null>,
  continued: Array<number | null> | undefined
): Array<number | null> {
  if (!continued) return forecast

  const point = lastKnownPoint(continued)

  if (!point || forecast[point.index] !== null) return forecast

  const seam = [...forecast]

  seam[point.index] = point.value

  return seam
}

/**
 * Compiles the designed LineChart props into an engine option. Pure: all
 * style values come from the resolved tokens.
 */
export function buildLineOption(args: BuildLineOptionArgs): EChartsCoreOption {
  const { categories, othersLabel, maxSeries, smooth = false, tokens } = args

  // Everything downstream — legend, palette order — reads the collapsed list,
  // so the aggregate behaves like any other series.
  const series = collapseSeries(args.series, othersLabel, maxSeries)

  const showLegend = series.length > 1

  const axisPointer: ChartAxisPointer = {
    type: 'line',
    lineStyle: { color: tokens.get(guideLine) },
  }

  return {
    legend: buildLegend(series.length),
    tooltip: buildAxisTooltip({
      tokens,
      axisPointer,
      getDelta: createDeltaLookup(series),
    }),
    grid: buildGrid({ tokens, showLegend }),
    xAxis: buildCategoryAxis(categories),
    yAxis: buildValueAxis(),
    // `connectNulls` defaults to false, so null values render as gaps rather
    // than being silently interpolated — the design spec's missing-data rule.
    series: series.map((item, seriesIndex) => {
      if (item.variant !== 'forecast') {
        return { name: item.name, type: 'line', data: item.data, smooth }
      }

      // The collapsed list is the rendered order, so its palette position is
      // also the engine's: the forecast wears the color of the series it
      // continues. Setting it explicitly keeps the engine from taking a
      // palette slot for the forecast.
      const continuedIndex = seriesIndex - 1
      const continued = continuedIndex >= 0 ? series[continuedIndex] : undefined
      const color =
        continued === undefined
          ? undefined
          : tokens.get(chartSeriesTokens[continuedIndex])

      return {
        name: item.name,
        type: 'line',
        data: withSeam(item.data, continued?.data),
        smooth,
        lineStyle: { type: 'dashed' },
        showSymbol: false,
        ...(color === undefined ? {} : { itemStyle: { color } }),
      }
    }),
  }
}
