import type { BarChartGrouping, BarChartSeries } from '../bar-chart'
import { buildBarSeries } from '../bar-chart/bar-option'
import type { LineChartSeries } from '../line-chart'
import { buildLineSeries } from '../line-chart/line-option'
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
  maxSeries: number
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
  const { categories, grouping, othersLabel, maxSeries, tokens } = args

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
    legend: buildLegend(renderedSeries.length),
    tooltip: buildAxisTooltip({
      tokens,
      axisPointer,
      getDelta: createDeltaLookup(renderedSeries),
      getUnit: (seriesIndex) => units[seriesIndex],
    }),
    grid: buildGrid({ tokens, showLegend }),
    xAxis: buildCategoryAxis(categories),
    yAxis: hasSecondaryAxis
      ? [
          buildValueAxis({ unit: leftUnit }),
          buildValueAxis({ unit: secondaryLine?.unit }),
        ]
      : buildValueAxis({ unit: leftUnit }),
    series: [
      ...buildBarSeries({
        series: renderedBars,
        direction: 'vertical',
        grouping,
        tokens,
      }),
      ...lineOptionSeries,
    ],
  }
}
