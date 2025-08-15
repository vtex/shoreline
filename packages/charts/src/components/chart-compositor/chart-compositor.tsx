import type { EChartsOption } from 'echarts'
import { type ComponentPropsWithRef, forwardRef, useMemo } from 'react'
import type { ChartConfig, ChartUnit, DefaultHooks } from '../../types/chart'
import { Chart, type ChartOptions } from '../chart/chart'
import {
  checkValidVariant,
  checkZoom,
  getDataToChartCompositor,
  getDefaultByType,
  getTooltipChartCompositor,
} from '../../utils/chart'
import { merge } from '@vtex/shoreline-utils'
import {
  DATAZOOM_DEFAULT_STYLE,
  GRID_DEFAULT_STYLE,
  LEGEND_DEFAULT_STYLE,
} from '../../theme/chartStyles'
import type EChartsReact from 'echarts-for-react'
import {
  applySeriesHook,
  normalizeBarData,
  normalizeHorizontalBarData,
  roundCap,
  setAreaColors,
  setAreaGradients,
} from '../../utils/hooks'

/**
 * Used to make charts with multiple different types.
 * @status stable
 * @example
 * <ChartCompositor
 *   charts={[
 *     { series: { data: [1, 2, 3, 4, 5] }, chartConfig: { type: 'bar' } },
 *     { series: { data: [1, 3, 2, 5, 4] }, chartConfig: { type: 'line' } },
 *   ]}
 *   tooltip={{ type: 'line' }}
 * />
 */
export const ChartCompositor = forwardRef<
  EChartsReact | undefined,
  ChartCompositorProps
>(function ChartCompositor(props, ref) {
  const {
    charts,
    xAxis = { type: 'category' },
    yAxis = { type: 'value' },
    title,
    tooltip,
    zoom,
    option,
    style,
    ...otherProps
  } = props

  const hookedUnits: ChartUnit[] = useMemo(() => {
    return charts.map((chart) => {
      if (chart.hooks === null) {
        return chart
      }
      const { type, variant } = chart.chartConfig
      const checkedVariant =
        variant && checkValidVariant(type, variant)
          ? variant
          : getDefaultByType(type)

      const seriesHooks: ((option: EChartsOption) => EChartsOption)[] =
        defaultHooks[type][checkedVariant]
      seriesHooks.push(...(chart.hooks ?? []))

      return {
        ...chart,
        series: seriesHooks.reduce(
          (out, fn) => applySeriesHook(out, fn),
          chart.series
        ),
      }
    })
  }, [])

  const seriesOptions: EChartsOption['series'] = useMemo(() => {
    return hookedUnits.map((u) => getDataToChartCompositor(u))
  }, [hookedUnits])

  const tooltipOptions: EChartsOption['tooltip'] = useMemo(() => {
    return getTooltipChartCompositor(tooltip)
  }, [tooltip])

  const chartOptions: EChartsOption = useMemo(() => {
    const finalOptions: EChartsOption = {}

    finalOptions.legend = LEGEND_DEFAULT_STYLE
    finalOptions.grid = GRID_DEFAULT_STYLE
    if (checkZoom(zoom, charts[0].chartConfig?.type)) {
      finalOptions.grid ??= {}
      finalOptions.grid = { ...finalOptions.grid, height: '75%' }
      finalOptions.dataZoom = DATAZOOM_DEFAULT_STYLE
    }
    finalOptions.series = seriesOptions
    finalOptions.tooltip = tooltipOptions
    finalOptions.yAxis = yAxis
    finalOptions.xAxis = xAxis
    finalOptions.title = title

    return option ? merge(option, finalOptions) : finalOptions
  }, [charts, tooltip, xAxis, yAxis, option])

  return (
    <Chart
      chartConfig={null}
      series={chartOptions.series ?? {}}
      xAxis={chartOptions.xAxis}
      yAxis={chartOptions.yAxis}
      option={chartOptions}
      style={style}
      ref={ref}
      optionHooks={null}
      zoom={zoom}
      {...otherProps}
    />
  )
})

export interface ChartCompositorOptions {
  /**
   * The data that will be rendered by the Compostior. Each unit contains
   * a SeriesOption from Echarts, the ChartConfig which determines the type of chart and, optionally,
   * an array of hook functions that will be applied to that series data. These are the same as
   * `Chart.optionHooks` except that they can only effect the series of each chart unit.
   *
   * By default certain hooks will always be applied to certain chart types.
   *  This behaviour can be disabled by explicitly passing **null** to hooks.
   * @example { series: { data: [1,2,3] }, config: { type: "bar", variant: "horizontal" } }
   */
  charts: ChartUnit[]
  /**
   * Defines which type of tooltip is going to be used by the chart.
   * @example { type: "bar", variant: "horizontal" }
   */
  tooltip: ChartConfig
}

export type ChartCompositorProps = ChartCompositorOptions &
  Omit<ComponentPropsWithRef<'div'>, 'title'> &
  Omit<ChartOptions, 'series' | 'chartConfig'>

/**
 * Functions that are always called for a certain chart config
 */
const defaultHooks: DefaultHooks = {
  bar: {
    vertical: [normalizeBarData],
    horizontal: [normalizeHorizontalBarData],
    stacked: [roundCap],
    'percentage stack': [],
  },
  line: {
    default: [],
  },
  area: {
    overlapping: [setAreaGradients],
    stacked: [setAreaColors],
  },
  funnel: {
    default: [],
  },
}
