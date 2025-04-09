import type { EChartsOption, SeriesOption } from 'echarts'
import { type ComponentPropsWithRef, forwardRef, useMemo } from 'react'
import type { ChartConfig, MultiChart } from '../../types/chart'
import { Chart, type ChartOptions } from '../chart/chart'
import {
  getBackgroundChartCompositor,
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
    background,
    tooltip,
    dataZoom = false,
    options,
    ...otherProps
  } = props

  const seriesOptions: EChartsOption['series'] = useMemo(() => {
    const series: SeriesOption[] = []

    for (let i = 0; i < charts.length; i++) {
      const serie = charts[i]
      series.push(getDataToChartCompositor(serie))
    }

    return series
  }, [charts])

  const tooltipOptions: EChartsOption['tooltip'] = useMemo(() => {
    return getTooltipChartCompositor(tooltip)
  }, [tooltip])

  const backgroundOptions: {
    xAxis: EChartsOption['xAxis']
    yAxis: EChartsOption['yAxis']
  } = useMemo(() => {
    return getBackgroundChartCompositor(background)
  }, [background])

  const chartOptions: EChartsOption = useMemo(() => {
    const finalOptions: EChartsOption = {}

    finalOptions.legend = LEGEND_DEFAULT_STYLE
    finalOptions.grid = GRID_DEFAULT_STYLE
    if (dataZoom) finalOptions.dataZoom = DATAZOOM_DEFAULT_STYLE

    finalOptions.series = seriesOptions
    finalOptions.tooltip = tooltipOptions
    finalOptions.xAxis = backgroundOptions.xAxis
    finalOptions.yAxis = backgroundOptions.yAxis

    return options ? merge(options, finalOptions) : finalOptions
  }, [charts, tooltip, background, options])

  return (
    <Chart
      chartConfig={null}
      option={chartOptions}
      style={{ height: 550 }}
      ref={ref}
      // seriesHooks={}
      {...otherProps}
    />
  )
})

export interface ChartCompositorOptions {
  /**
   * The data that will be render by the multitype chart, each of it contains
   * a SerieOption from Echarts and the ChartConfig that will be applied to the data.
   * @example { serie: { data: [1,2,3] }, config: { type: "bar", variant: "horizontal" } }
   */
  charts: MultiChart[]
  /**
   * Config the background style, setting acording each kind of line.
   * @example { type: 'line' }
   */
  background: ChartConfig
  /**
   * Defines which type of tooltip is going to be used by the chart.
   * @example { type: "bar", variant: "horizontal" }
   */
  tooltip: ChartConfig
  /**
   * Turns on the dataZooom configuration, using the line chart dataZoom implementation.
   * @default false
   * @type boolean
   */
  dataZoom?: boolean
  /**
   * Merges the passed options to the final options.
   * It doesn't allow passing the props 'series', 'xAxis', 'yAxis', and 'toolbox',
   * since they should be selected using other props from this component.
   */
  options?: EChartsOption
}

export type ChartCompositorProps = ChartCompositorOptions &
  Omit<ChartOptions, 'chartConfig' | 'option'> &
  ComponentPropsWithRef<'div'>
