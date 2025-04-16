import type { EChartsOption } from 'echarts'
import { type ComponentPropsWithRef, forwardRef, useMemo } from 'react'
import type { ChartConfig, ChartUnit } from '../../types/chart'
import { Chart, type ChartOptions } from '../chart/chart'
import {
  applySeriesHook,
  defaultHooks,
  getDataToChartCompositor,
  getTooltipChartCompositor,
} from '../../utils/chart'
import { merge } from '@vtex/shoreline-utils'
import {
  DATAZOOM_DEFAULT_STYLE,
  GRID_DEFAULT_STYLE,
  LEGEND_DEFAULT_STYLE,
} from '../../theme/chartStyles'

/**
 * Used to make charts with multiple different types.
 * @status stable
 * @example
 * <ChartCompositor
 *   charts={[
 *     { serie: { data: [1, 2, 3, 4, 5] }, config: { type: 'bar' } },
 *     { serie: { data: [1, 3, 2, 5, 4] }, config: { type: 'line' } },
 *   ]}
 *   background={{ type: 'bar' }}
 *   tooltip={{ type: 'line' }}
 * />
 */
export const ChartCompositor = forwardRef<
  echarts.EChartsType | undefined,
  ChartCompositorProps
>(function ChartCompositor(props, ref) {
  const {
    charts,
    xAxis = { type: 'category' },
    yAxis = { type: 'value' },
    tooltip,
    zoom = false,
    options,
    ...otherProps
  } = props

  const hookedUnits: ChartUnit[] = useMemo(() => {
    return charts.map((chart) => {
      const { type, variant = 'default' } = chart.chartConfig
      const seriesHooks: CallableFunction[] = defaultHooks[type][variant]
      if (chart.hooks === undefined) {
        return {
          ...chart,
          series: seriesHooks.reduce(
            (out, fn) => applySeriesHook(out, fn),
            chart.series
          ),
        }
      }
      if (chart.hooks === null) {
        return chart
      }
      seriesHooks.push(...chart.hooks)
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
    if (zoom) finalOptions.dataZoom = DATAZOOM_DEFAULT_STYLE

    finalOptions.series = seriesOptions
    finalOptions.tooltip = tooltipOptions
    finalOptions.yAxis = yAxis
    finalOptions.xAxis = xAxis

    return options ? merge(options, finalOptions) : finalOptions
  }, [charts, tooltip, xAxis, yAxis, options])

  return (
    <Chart
      chartConfig={null}
      option={chartOptions}
      style={{ height: 550 }}
      ref={ref}
      seriesHooks={null}
      {...otherProps}
    />
  )
})

export interface ChartCompositorOptions {
  /**
   * The data that will be rendered by the Compostior. Each unit contains
   * a SeriesOption from Echarts, the ChartConfig which determines the type of chart and, optionally,
   * an array of hook functions that will be applied to that series data.
   *
   * By default certain hooks will always be applied to certain chart types. This behaviour can be disabled by explicitly passing **null** to hooks.
   * @example { series: { data: [1,2,3] }, config: { type: "bar", variant: "horizontal" } }
   */
  charts: ChartUnit[]
  /**
   * Defines the yAxis setup for the chart, using the ECharts props.
   * By default it just returns the value passed in data to the axis.
   *
   * @default {type:'value'}
   */
  yAxis?: EChartsOption['yAxis']
  /**
   * Defines the xAxis setup for the chart, using the ECharts props.
   * By default it just returns the value passed in data to the axis.
   *
   * @default {type:'category'}
   */
  xAxis?: EChartsOption['xAxis']
  /**
   * Defines which type of tooltip is going to be used by the chart.
   * @example { type: "bar", variant: "horizontal" }
   */
  tooltip: ChartConfig
  /**
   * Whether to enable zoom.
   * @default false
   * @type boolean
   */
  zoom?: boolean
  /**
   * Merges the passed options to the final options.
   *
   * **series**, **xAxis**, **yAxis**, and **tooltip**
   *  should be configured using other props from this component.
   */
  options?: EChartsOption
}

export type ChartCompositorProps = ChartCompositorOptions &
  Omit<ChartOptions, 'chartConfig' | 'option'> &
  ComponentPropsWithRef<'div'>
