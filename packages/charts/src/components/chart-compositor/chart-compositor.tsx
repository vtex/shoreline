import type { EChartsOption } from 'echarts'
import { type ComponentPropsWithRef, forwardRef, useMemo } from 'react'
import type { BarChartConfig, ChartConfig, ChartUnit } from '../../types/chart'
import { Chart, type ChartOptions } from '../chart/chart'
import {
  checkValidVariant,
  getDataToChartCompositor,
  getDefaultByType,
  getTooltipChartCompositor,
  setBarGap,
} from '../../utils/chart'
import { merge } from '@vtex/shoreline-utils'
import { GRID_DEFAULT_STYLE } from '../../theme/chartStyles'
import type EChartsReact from 'echarts-for-react'
import { applySeriesHook } from '../../utils/hooks'
import { cloneDeep } from 'lodash'
import { chartCompositorDefaultHooks } from '../../utils/defaultHooks'

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
    option,
    style,
    loading,
    ...otherProps
  } = props

  const hookedUnits: ChartUnit[] = useMemo(() => {
    const chartsIn = cloneDeep(charts)

    let gap: BarChartConfig['gap']
    chartsIn.forEach((c) => {
      if (c.chartConfig.type === 'bar') {
        // We assume the last gap defined is the correct one, though it doesn't make sense
        // to set multiple different gap values.
        gap = c.chartConfig.gap ? c.chartConfig.gap : gap
        // we need to set series type to 'bar' since by this point in the pipeline it
        // hasn't been filled in yet, and setBarGap needs it to be.
        c.series.type = 'bar'
      }
    })

    setBarGap(
      chartsIn.map((c) => c.series),
      gap
    )

    return chartsIn.map((chartIn) => {
      if (chartIn.hooks === null) {
        return chartIn
      }

      const chart = cloneDeep(chartIn)
      const { type, variant } = chart.chartConfig
      const checkedVariant =
        variant && checkValidVariant(type, variant)
          ? variant
          : getDefaultByType(type)

      const seriesHooks: ((option: EChartsOption) => EChartsOption)[] =
        chartCompositorDefaultHooks[type][checkedVariant]
      seriesHooks.push(...(chart.hooks ?? []))

      chart.series = seriesHooks.reduce(
        (out, fn) => applySeriesHook(out, fn),
        chart.series
      )

      return chart
    })
  }, [charts])

  const seriesOptions: EChartsOption['series'] = useMemo(() => {
    return hookedUnits.map(getDataToChartCompositor)
  }, [hookedUnits])

  const tooltipOptions: EChartsOption['tooltip'] = useMemo(() => {
    return getTooltipChartCompositor(tooltip)
  }, [tooltip])

  const chartOptions: EChartsOption = useMemo(() => {
    const finalOptions: EChartsOption = {}

    if (loading) return { xAxis: xAxis, yAxis: yAxis }

    if (option) {
      finalOptions.grid = option.grid ? option.grid : GRID_DEFAULT_STYLE
    } else {
      finalOptions.grid = GRID_DEFAULT_STYLE
    }

    finalOptions.series = cloneDeep(seriesOptions)
    finalOptions.tooltip = cloneDeep(tooltipOptions)
    finalOptions.yAxis = cloneDeep(yAxis)
    finalOptions.xAxis = cloneDeep(xAxis)
    finalOptions.title = cloneDeep(title)

    return option ? merge(option, finalOptions) : finalOptions
  }, [xAxis, yAxis, option, tooltipOptions, title, seriesOptions, loading])

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
      loading={loading}
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
