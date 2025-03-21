import type { EChartsOption, SeriesOption } from 'echarts'
import { type ComponentPropsWithRef, forwardRef, useMemo } from 'react'
import type { ChartConfig, MultiChart } from '../../types/chart'
import { Chart, type ChartOptions } from '../chart/chart'
import { CHART_STYLES } from '../../theme/chartStyles'
import {
  getBackgroundMultitype,
  getDataToMultichart,
  getTooltipMultitype,
} from '../../utils/chart'
import { merge } from '@vtex/shoreline-utils'

export const ChartCompositor = forwardRef<
  echarts.EChartsType | undefined,
  ChartCompositorProps
>(function ChartCompositor(props, ref) {
  const { charts, background, tooltip, options, ...otherProps } = props

  const chartOptions: EChartsOption = useMemo(() => {
    let finalOptions: EChartsOption = {} // creates an EChartOption object that will be filled u
    const series: SeriesOption[] = []
    for (let i = 0; i < charts.length; i++) {
      const serie = charts[i]
      series.push(getDataToMultichart(serie)) // process the series object that will be passaed to the options object

      finalOptions = merge(
        finalOptions,
        CHART_STYLES[serie.config.type].default
      ) as EChartsOption // takes the default options of each type of graphic passes to the options
      // why make this ? the options has many attributes that can be made for each chart separatly
      // and doing this makes the chart compositor has all the attributes it needs to make the correct
      // chart for each type
    }
    finalOptions.series = series

    if (tooltip) finalOptions.tooltip = getTooltipMultitype(tooltip) // passes the tooltip selected to the chart

    if (background) {
      const { xAxis, yAxis } = getBackgroundMultitype(background) // gets the background config and passes each of it to the chart component
      finalOptions.xAxis = xAxis
      finalOptions.yAxis = yAxis
    }

    if (options) {
      finalOptions = merge(options, finalOptions)
    }

    return finalOptions
  }, [charts, tooltip, background])

  return (
    <Chart
      chartConfig={null}
      option={chartOptions}
      style={{ height: 550 }}
      ref={ref}
      {...otherProps}
    />
  )
})

export interface ChartsCompositorOptions {
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
   * Merges the passed options to the final options.
   * It doesn't allow passing the props 'series', 'xAxis', 'yAxis', and 'toolbox',
   * since they should be selected using other props from this component.
   */
  options?: Omit<EChartsOption, 'series' | 'xAxis' | 'yAxis' | 'tooltip'>
}

export type ChartCompositorProps = ChartsCompositorOptions &
  Omit<ChartOptions, 'chartConfig' | 'option'> &
  ComponentPropsWithRef<'div'>
