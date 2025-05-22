import type { EChartsOption, SeriesOption } from 'echarts'
import { type ComponentPropsWithRef, forwardRef, useMemo } from 'react'
import type {
  BarChartVariants,
  ChartConfig,
  ChartUnit,
  LineChartVariants,
} from '../../types/chart'
import { Chart, type ChartOptions } from '../chart/chart'
import {
  applySeriesHook,
  checkValidVariant,
  getDataToChartCompositor,
  getDefaultByType,
  getTooltipChartCompositor,
  normalizeBarDataInner,
  normalizeHorizontalBarDataInner,
} from '../../utils/chart'
import { merge } from '@vtex/shoreline-utils'
import {
  DATAZOOM_DEFAULT_STYLE,
  GRID_DEFAULT_STYLE,
  LEGEND_DEFAULT_STYLE,
} from '../../theme/chartStyles'
import type EChartsReact from 'echarts-for-react'

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
    tooltip,
    zoom = false,
    options,
    style,
    renderer = 'svg',
    // ...otherProps
  } = props

  const hookedUnits: ChartUnit[] = useMemo(() => {
    return charts.map((chart) => {
      const { type, variant } = chart.chartConfig

      const checkedVariant =
        variant && checkValidVariant(type, variant)
          ? variant
          : getDefaultByType(type)
      const seriesHooks: CallableFunction[] = defaultHooks[type][checkedVariant]
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
    if (zoom) {
      finalOptions.grid ??= {}
      finalOptions.grid = { ...finalOptions.grid, height: '75%' }
      finalOptions.dataZoom = DATAZOOM_DEFAULT_STYLE
    }
    finalOptions.series = seriesOptions
    finalOptions.tooltip = tooltipOptions
    finalOptions.yAxis = yAxis
    finalOptions.xAxis = xAxis

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
      // {...otherProps}
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
  Omit<ChartOptions, 'chartConfig' | 'option'> &
  ComponentPropsWithRef<'div'>

type DefaultHooks = {
  bar: Record<BarChartVariants, ((series: SeriesOption) => SeriesOption)[]>
  line: Record<LineChartVariants, ((series: SeriesOption) => SeriesOption)[]>
}
/**
 * Functions that are always called for a certain chart config
 */
const defaultHooks: DefaultHooks = {
  bar: {
    vertical: [normalizeBarDataInner],
    horizontal: [normalizeHorizontalBarDataInner],
  },
  line: {
    default: [],
  },
}
