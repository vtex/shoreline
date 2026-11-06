import type { ChartCurve } from '../../internal/curve'
import { isSmoothCurve } from '../../internal/curve'
import type { EChartsCoreOption } from '../../internal/echarts'
import type { ChartAxisPointer } from '../../internal/option'
import {
  buildAxisTooltip,
  buildCategoryAxis,
  buildGrid,
  buildLegend,
  buildValueAxis,
} from '../../internal/option'
import {
  collapseSeries,
  createDeltaLookup,
  othersColorToken,
} from '../../internal/series'
import { createNumberFormatter } from '../../internal/format'
import { legendIcon } from '../../internal/legend'
import { lineSymbolSize } from '../../internal/symbols'
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
   * How the lines connect their points.
   * @default 'linear'
   */
  curve?: ChartCurve
  /**
   * Locale the chart writes numbers in — the reader's, from `LocaleProvider`,
   * so `3100` reads `3,100` there and `3.100` where the locale groups with a
   * dot.
   */
  locale: string
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
 * Where each forecast joins the series it continues: the position of the
 * continued series' last known value, which the forecast duplicates so the
 * dashed segment starts exactly where the solid one ends. A forecast that
 * already carries a value at that category is not seamed — that value is data,
 * not the drawing aid.
 */
function forecastSeams(
  series: LineChartSeries[]
): Map<number, { index: number; value: number }> {
  const seams = new Map<number, { index: number; value: number }>()

  series.forEach((item, seriesIndex) => {
    if (item.variant !== 'forecast') return

    const continued = series[seriesIndex - 1]
    const point = continued ? lastKnownPoint(continued.data) : undefined

    if (!point || item.data[point.index] !== null) return

    seams.set(seriesIndex, point)
  })

  return seams
}

/**
 * Duplicates the continued series' last known value into the forecast at its
 * seam. Writes to a copy: the consumer's data is never mutated.
 */
function withSeam(
  forecast: Array<number | null>,
  point: { index: number; value: number }
): Array<number | null> {
  const seam = [...forecast]

  seam[point.index] = point.value

  return seam
}

/**
 * Compiles shared-series line props into engine line series. Extracted so the
 * composed chart can paint lines with exactly this chart's forecast treatment
 * (dashed, symbol-free, color inherited from the predecessor); internal-only,
 * so no public API moves.
 */
export function buildLineSeries(args: {
  series: LineChartSeries[]
  /**
   * How the lines connect their points.
   * @default 'linear'
   */
  curve?: ChartCurve
  /**
   * Position of the first series in the chart's overall rendered series list.
   * The engine assigns palette colors by overall position, so a chart that
   * paints other series before these lines (a composed chart's bars) passes how
   * many precede them — that way a forecast still inherits the actual color of
   * the line it continues.
   * @default 0
   */
  paletteOffset?: number
  /**
   * Whether `series` ends with the aggregate `collapseSeries` synthesized, so
   * the last line wears the neutral color instead of a palette slot.
   * @default false
   */
  aggregated?: boolean
  tokens: ChartTokens
}) {
  const {
    series,
    curve = 'linear',
    paletteOffset = 0,
    aggregated = false,
    tokens,
  } = args
  const seams = forecastSeams(series)
  const othersColor = aggregated ? tokens.get(othersColorToken) : undefined

  return series.map((item, seriesIndex) => {
    if (item.variant !== 'forecast') {
      return {
        name: item.name,
        type: 'line',
        data: item.data,
        smooth: isSmoothCurve(curve),
        // The engine's `emptyCircle` draws a white center inside a ring of the
        // series' color; the size decides both, so it is the marker the design
        // draws rather than the engine's default 4.
        symbolSize: lineSymbolSize,
        ...(othersColor && seriesIndex === series.length - 1
          ? { itemStyle: { color: othersColor } }
          : {}),
      }
    }

    // The list order is the rendered order, so its palette position is also
    // the engine's: the forecast wears the color of the series it continues.
    // Setting it explicitly keeps the engine from taking a palette slot for
    // the forecast. `paletteOffset` accounts for series another chart type
    // paints ahead of these in the same chart.
    const continuedIndex = seriesIndex - 1
    const continued = continuedIndex >= 0 ? series[continuedIndex] : undefined
    const color =
      continued === undefined
        ? undefined
        : tokens.get(chartSeriesTokens[paletteOffset + continuedIndex])
    const seam = seams.get(seriesIndex)

    return {
      name: item.name,
      type: 'line',
      data: seam === undefined ? item.data : withSeam(item.data, seam),
      smooth: isSmoothCurve(curve),
      lineStyle: { type: 'dashed' },
      showSymbol: false,
      ...(color === undefined ? {} : { itemStyle: { color } }),
    }
  })
}

/**
 * Compiles the designed LineChart props into an engine option. Pure: all
 * style values come from the resolved tokens.
 */
export function buildLineOption(args: BuildLineOptionArgs): EChartsCoreOption {
  const {
    categories,
    othersLabel,
    maxSeries,
    curve = 'linear',
    locale,
    tokens,
  } = args

  const formatNumber = createNumberFormatter(locale)

  // Everything downstream — legend, palette order — reads the collapsed list,
  // so the aggregate behaves like any other series, except that it leaves the
  // palette for the neutral color.
  const series = collapseSeries(args.series, othersLabel, maxSeries)

  const showLegend = series.length > 1

  const axisPointer: ChartAxisPointer = {
    type: 'line',
    lineStyle: { color: tokens.get(guideLine) },
  }

  const seams = forecastSeams(series)

  return {
    legend: buildLegend(
      series.length,
      series.map((item) => ({
        name: item.name,
        icon: legendIcon(item.variant === 'forecast' ? 'forecast' : 'standard'),
      }))
    ),
    tooltip: buildAxisTooltip({
      tokens,
      axisPointer,
      formatValue: formatNumber,
      getDelta: createDeltaLookup(series),
      // The seam point is a duplicate of the predecessor's last value, so the
      // forecast has no row of its own there.
      skipRow: (seriesIndex, dataIndex) =>
        seams.get(seriesIndex)?.index === dataIndex,
      getDashed: (seriesIndex) => series[seriesIndex]?.variant === 'forecast',
    }),
    grid: buildGrid({ tokens, showLegend }),
    xAxis: buildCategoryAxis(categories),
    yAxis: buildValueAxis({ formatter: formatNumber }),
    // `connectNulls` defaults to false, so null values render as gaps rather
    // than being silently interpolated — the design spec's missing-data rule.
    series: buildLineSeries({
      series,
      curve,
      aggregated: series.length < args.series.length,
      tokens,
    }),
  }
}
