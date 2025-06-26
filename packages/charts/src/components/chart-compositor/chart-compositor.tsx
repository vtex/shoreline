import type { EChartsOption } from 'echarts'
import { type ComponentPropsWithRef, forwardRef, useMemo } from 'react'
import type { ChartConfig, ChartUnit, DefaultHooks } from '../../types/chart'
import { Chart } from '../chart/chart'
import {
  checkValidVariant,
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
    options,
    style,
    renderer = 'svg',
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
    if (zoom) {
      finalOptions.grid ??= {}
      finalOptions.grid = { ...finalOptions.grid, height: '75%' }
      finalOptions.dataZoom = DATAZOOM_DEFAULT_STYLE
    }
    finalOptions.series = seriesOptions
    finalOptions.tooltip = tooltipOptions
    finalOptions.yAxis = yAxis
    finalOptions.xAxis = xAxis
    finalOptions.title = title

    return options ? merge(options, finalOptions) : finalOptions
  }, [charts, tooltip, xAxis, yAxis, options])

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
      renderer={renderer}
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
   * Defines the look and data of the X axis. Generally you **will** need to pass the name of the labels here,
   * as this is by default the categorical axis.
   * @example xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
   * @default { type:'category' }
   */
  xAxis?: EChartsOption['xAxis']
  /**
   * Defines the look and data of the Y axis. Generally you won't need to fill this out, as this is the value axis by default.
   * @default { type:'value' }
   */
  yAxis?: EChartsOption['yAxis']
  /**
   * Defines the title, as well as its position and style.
   */
  title?: EChartsOption['title']
  /**
   * Defines which type of tooltip is going to be used by the chart.
   * @example { type: "bar", variant: "horizontal" }
   */
  tooltip: ChartConfig
  /**
   * Defines the group that the chart will be part of. Charts in the same group share many features among them.
   * These features include: sharing the tooltip and sharing the same legend.
   *
   * See [echarts docs](https://echarts.apache.org/en/api.html#echarts.connect).
   */
  group?: string
  /**
   * Whether to enable zoom.
   * @default false
   * @type boolean
   */
  zoom?: boolean
  /**
   * Echarts options for the chart, see [docs](https://echarts.apache.org/en/option.html#title).
   *
   * **series**, **xAxis**, **yAxis**, and **tooltip**
   *  should be configured using other props from this component.
   */
  options?: EChartsOption
  /**
   * Whether to render the chart as a SVG or Canvas. Both are about equally as fast,
   * but SVGs can scale to any size.
   *
   * Canvas is required if the chart is meant to be downloaded as a png or jpg, as SVG-rendered charts can only be exported as SVG.
   * @default svg
   */
  renderer?: 'svg' | 'canvas'
}

export type ChartCompositorProps = ChartCompositorOptions &
  Omit<ComponentPropsWithRef<'div'>, 'title'>

/**
 * Functions that are always called for a certain chart config
 */
const defaultHooks: DefaultHooks = {
  bar: {
    vertical: [normalizeBarData],
    horizontal: [normalizeHorizontalBarData],
  },
  line: {
    default: [],
  },
  area: {
    overlapping: [setAreaGradients],
    stacked: [],
  },
}
