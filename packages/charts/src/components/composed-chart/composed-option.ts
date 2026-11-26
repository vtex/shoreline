import type { BarChartGrouping, BarChartSeries } from '../bar-chart'
import { buildBarSeries } from '../bar-chart/bar-option'
import type { LineChartSeries } from '../line-chart'
import { buildLineSeries, forecastSeams } from '../line-chart/line-option'
import type { ChartCurve } from '../../internal/curve'
import type { EChartsCoreOption } from '../../internal/echarts'
import type { ChartAxisPointer } from '../../internal/option'
import {
  buildAxisTooltip,
  buildCategoryAxis,
  buildGrid,
  buildLegend,
  buildValueAxis,
  hasNegativeValues,
} from '../../internal/option'
import { createNumberFormatter } from '../../internal/format'
import { legendIcon } from '../../internal/legend'
import { collapseSeries, createDeltaLookup } from '../../internal/series'
import { pointMarkersFit } from '../../internal/symbols'
import type { ChartTokens } from '../../internal/theme'
import type { ChartUnit } from '../../internal/unit'
import { defaultChartUnit } from '../../internal/unit'

// Re-exported so the component's `maxSeries` default flows from the shared
// constant without the package re-exporting it a second time (it already ships
// via the bar chart).
export { defaultMaxSeries } from '../../internal/series'

/**
 * How a composed chart's bar series combine.
 */
export type ComposedChartGrouping = BarChartGrouping

/**
 * The measurement a series' values are expressed in.
 */
export type ComposedChartUnit = ChartUnit

/**
 * A bar series in a composed chart. Bars always render on the left value axis
 * and always below lines.
 */
export interface ComposedChartBarSeries extends BarChartSeries {
  /**
   * Marks the series as bars.
   */
  type: 'bar'
  /**
   * Measurement of the values. Bars share the left value axis regardless; a
   * line whose unit differs is the one that moves to the right axis.
   * @default 'number'
   */
  unit?: ComposedChartUnit
}

/**
 * A line series in a composed chart. Lines render above bars, and one whose
 * unit differs from the bars' moves to the right value axis.
 */
export interface ComposedChartLineSeries extends LineChartSeries {
  /**
   * Marks the series as lines.
   */
  type: 'line'
  /**
   * Measurement of the values. A line whose unit differs from the bar
   * series' is assigned to the right value axis; the axis is inferred, never
   * chosen by the consumer.
   * @default 'number'
   */
  unit?: ComposedChartUnit
}

/**
 * A composed chart series: a discriminated union on `type`, so bar and line
 * members carry their own chart's series shape.
 */
export type ComposedChartSeries =
  | ComposedChartBarSeries
  | ComposedChartLineSeries

export interface BuildComposedOptionArgs {
  series: ComposedChartSeries[]
  categories: string[]
  grouping: ComposedChartGrouping
  othersLabel: string
  /**
   * Label of the tooltip's total row for a stack, already localized.
   */
  totalLabel: string
  maxSeries: number
  /**
   * How the line series connect their points. Bars are unaffected.
   * @default 'linear'
   */
  curve?: ChartCurve
  /**
   * Locale the chart writes numbers in — the reader's, from `LocaleProvider`,
   * so `3100` reads `3,100` there, `3.100` where the locale groups with a dot,
   * and a percentage reads with the same separator before its `%` sign.
   */
  locale: string
  /**
   * Width of the chart in px, when known. Marker density is measured in pixels,
   * so a chart whose width is not measured yet keeps its markers.
   * @default undefined
   */
  width?: number
  tokens: ChartTokens
}

// Design spec, behaviour: hover overlay over the selected category. Bars are
// the composed chart's primary type, so their pointer wins when both render
// (mirrors the bar chart's pointer).
const hoverOverlayToken = '--sl-bg-muted-plain-hover'
// Design spec, tooltip: the guide line that follows the hover across the
// chart. Used for the line-only fallback, mirroring the line chart.
const guideLineToken = '--sl-color-gray-3'

/**
 * Compiles the designed ComposedChart props into an engine option. Pure: all
 * style values come from the resolved tokens.
 */
export function buildComposedOption(
  args: BuildComposedOptionArgs
): EChartsCoreOption {
  const {
    categories,
    grouping,
    othersLabel,
    totalLabel,
    maxSeries,
    curve,
    locale,
    width,
    tokens,
  } = args

  const formatNumber = createNumberFormatter(locale)

  // Bars and lines compile separately so each keeps its native treatment
  // (stacking + sign-aware radii vs. forecast seams), then render bars-first:
  // the engine paints later series on top, and the design language fixes bars
  // below lines.
  const barSeries = args.series.filter(
    (item): item is ComposedChartBarSeries => item.type === 'bar'
  )
  const lineSeries = args.series.filter(
    (item): item is ComposedChartLineSeries => item.type === 'line'
  )

  // Only bars aggregate: lines keep their own names and colors and never
  // count toward the limit. The synthesized aggregate has no chart-specific
  // fields, so it inherits the bar group's reference unit.
  const referenceBarUnit = barSeries[0]?.unit ?? defaultChartUnit
  const renderedBars = collapseSeries(barSeries, othersLabel, maxSeries).map(
    (item) => ({ ...item, unit: item.unit ?? referenceBarUnit })
  )
  const renderedLines = lineSeries.map((item) => ({
    ...item,
    unit: item.unit ?? defaultChartUnit,
  }))

  const renderedSeries = [...renderedBars, ...renderedLines]
  const showLegend = renderedSeries.length > 1
  // Bars always render vertically here, so a stack always piles bottom-up.
  const stacked = grouping === 'stacked'

  // Bars anchor the left axis. A line whose unit differs reads against a
  // second, right axis; with no bars there is nothing to differ from, so a
  // single axis is always enough — never a phantom second axis.
  const leftUnit =
    renderedBars[0]?.unit ?? renderedLines[0]?.unit ?? defaultChartUnit
  const secondaryLine = renderedBars.length
    ? renderedLines.find((item) => item.unit !== leftUnit)
    : undefined
  const hasSecondaryAxis = secondaryLine !== undefined

  const units = renderedSeries.map((item) => item.unit ?? defaultChartUnit)

  const seams = forecastSeams(renderedLines)

  // The category axis' line follows the primary value axis' zero, and only the
  // primary axis owns the grid: bars, plus any line that stays on their axis.
  // A negative line on the secondary axis lives on its own scale, so it must
  // not recolor the primary's zero.
  const primarySeries = hasSecondaryAxis
    ? [
        ...renderedBars,
        ...renderedLines.filter((item) => item.unit === leftUnit),
      ]
    : renderedSeries

  const axisPointer: ChartAxisPointer =
    renderedBars.length > 0
      ? {
          type: 'shadow',
          shadowStyle: { color: tokens.get(hoverOverlayToken) },
        }
      : {
          type: 'line',
          lineStyle: { color: tokens.get(guideLineToken) },
        }

  const lineOptionSeries = buildLineSeries({
    series: renderedLines,
    // The engine assigns palette colors by overall position, and the bars
    // occupy the first slots.
    paletteOffset: renderedBars.length,
    curve,
    // Every series shares the one category axis, so the density that decides
    // the markers is the chart's, never a single line's.
    showMarkers: pointMarkersFit({ count: categories.length, width }),
    tokens,
  }).map((item, seriesIndex) => ({
    ...item,
    yAxisIndex:
      hasSecondaryAxis &&
      (renderedLines[seriesIndex]?.unit ?? defaultChartUnit) !== leftUnit
        ? 1
        : 0,
  }))

  return {
    legend: buildLegend(
      renderedSeries.length,
      renderedSeries.map((item) => ({
        name: item.name,
        // Bars take the engine's square; lines draw their stroke, dashed
        // when the series is a forecast.
        icon: legendIcon(
          'variant' in item && item.variant === 'forecast'
            ? 'forecast'
            : 'type' in item && item.type === 'bar'
              ? 'bar'
              : 'standard'
        ),
      }))
    ),
    tooltip: buildAxisTooltip({
      tokens,
      axisPointer,
      // A vertical stack piles the first bar at the bottom, so its segments run
      // last-to-first down the bar and the tooltip has to list them in reverse
      // to read in the same order. Only the bars reverse: the lines drawn
      // after them already run in series order.
      reverseUpTo: stacked ? renderedBars.length : undefined,
      // A stack is the one grouping whose total the reader cannot read off the
      // chart, and only its bars contribute to it.
      total: stacked
        ? { label: totalLabel, seriesCount: renderedBars.length }
        : undefined,
      formatValue: formatNumber,
      getDelta: createDeltaLookup(renderedSeries),
      getUnit: (seriesIndex) => units[seriesIndex],
      // Seams are positions among the lines, and the bars occupy the leading
      // slots, so the shadowed index also keeps bar rows out of the lookup.
      skipRow: (seriesIndex, dataIndex) =>
        seams.get(seriesIndex - renderedBars.length)?.index === dataIndex,
      getDashed: (seriesIndex) =>
        renderedLines[seriesIndex - renderedBars.length]?.variant ===
        'forecast',
    }),
    grid: buildGrid({ tokens, showLegend }),
    xAxis: buildCategoryAxis(categories, {
      tokens,
      zeroLine: hasNegativeValues(primarySeries),
    }),
    // The left axis owns the horizontal grid. Both axes derive their own tick
    // intervals from their own scales, so drawing the secondary axis' ticks
    // too would place a second, overlapping set of gridlines at different
    // heights — the right axis keeps its labels, without gridlines.
    yAxis: hasSecondaryAxis
      ? [
          buildValueAxis({ unit: leftUnit, formatter: formatNumber }),
          buildValueAxis({
            unit: secondaryLine?.unit,
            formatter: formatNumber,
            showSplitLine: false,
          }),
        ]
      : buildValueAxis({ unit: leftUnit, formatter: formatNumber }),
    series: [
      ...buildBarSeries({
        series: renderedBars,
        direction: 'vertical',
        grouping,
        // Only bars aggregate here, and the aggregate wears the neutral color.
        aggregated: renderedBars.length < barSeries.length,
        tokens,
      }),
      ...lineOptionSeries,
    ],
  }
}
