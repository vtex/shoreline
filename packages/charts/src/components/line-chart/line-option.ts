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
import type { ChartTooltipDelta } from '../../internal/tooltip'

// Re-exported so the component's `maxSeries` default flows from the shared
// constant without the package re-exporting it a second time (it already ships
// via the bar chart).
export { defaultMaxSeries } from '../../internal/series'

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
  tokens: ChartTokens
}

// Design spec, tooltip: the guide line + marker that follow the hover across
// the chart. Driven from the same token the axis lines use.
const guideLine = '--sl-color-gray-3'

/**
 * Compiles the designed LineChart props into an engine option. Pure: all
 * style values come from the resolved tokens.
 */
export function buildLineOption(args: BuildLineOptionArgs): EChartsCoreOption {
  const { categories, othersLabel, maxSeries, tokens } = args

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
    series: series.map((item) => ({
      name: item.name,
      type: 'line',
      data: item.data,
    })),
  }
}
