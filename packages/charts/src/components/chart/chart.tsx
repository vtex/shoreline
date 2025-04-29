import {
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  type ComponentPropsWithRef,
  useCallback,
} from 'react'
import type { EChartsOption } from 'echarts'
import ReactECharts, { type EChartsInstance } from 'echarts-for-react'
import type * as echarts from 'echarts'
import { defaultTheme } from '../../theme/themes'
import type { ChartConfig } from '../../types/chart'
import {
  applySeriesHook,
  defaultHooks,
  getChartOptions,
} from '../../utils/chart'
import { canUseDOM, useMergeRef } from '@vtex/shoreline-utils'
import { DEFAULT_LOADING_SPINNER } from '../../theme/chartStyles'
import type { Dictionary } from 'lodash'

/**
 * Render a Shoreline Chart with Echarts. Mixes user options with defaults determined by chart type.
 * @see https://echarts.apache.org/en/index.html
 * @example
 * <Chart
      chartConfig={{ type: 'bar', variant: 'default' }}
      option={{
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        series: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
      }}
      style={{ height: 550 }}
    />
 */
export const Chart = forwardRef<echarts.EChartsType | undefined, ChartProps>(
  function Charts(props, ref) {
    const {
      option,
      loading = false,
      loadingConfig = DEFAULT_LOADING_SPINNER,
      chartConfig,
      style,
      renderer = 'svg',
      theme = defaultTheme,
      seriesHooks = [],
      onEvents,
      ...otherProps
    } = props

    const chartRef = useRef<ReactECharts>(null)
    console.log(onEvents)
    const hookedSeries = useMemo(() => {
      const series = option.series

      if (typeof series === 'undefined' || seriesHooks === null) return series

      if (chartConfig === null) {
        return seriesHooks.reduce((out, fn) => applySeriesHook(out, fn), series)
      }

      const { type, variant = type === 'bar' ? 'vertical' : 'default' } =
        chartConfig
      const hooks = defaultHooks[type][variant]

      seriesHooks.push(...hooks)
      return seriesHooks.reduce((out, fn) => applySeriesHook(out, fn), series)
    }, [option, chartConfig, seriesHooks])

    const chartOptions: EChartsOption = useMemo(() => {
      if (chartConfig === null || typeof hookedSeries === 'undefined') {
        return option
      }

      return (
        getChartOptions({ ...option, series: hookedSeries }, chartConfig) ||
        option
      )
    }, [option, chartConfig, hookedSeries])

    const checkBoxLegend = useCallback((params: any) => {
      if (!chartRef.current) return
      params.selected[params.name] = !params.selected[params.name] // we flip the one that was selected, so that this represents the state of the legend before the user clicked it

      const notSelected: [string, boolean][] = []
      const selected: [string, boolean][] = []
      Object.entries(params.selected).forEach((v) => {
        if (v[1]) {
          selected
          selected.push(v as [string, boolean])
        } else {
          notSelected.push(v as [string, boolean])
        }
      })

      const chart = chartRef.current.getEchartsInstance()
      if (notSelected.length === 0) {
        chart.dispatchAction({ type: 'legendInverseSelect' })
      } else if (selected.length === 1 && selected[0][0] === params.name) {
        chart.dispatchAction({ type: 'legendAllSelect' })
      }
    }, [])

    const handleResize = useCallback(() => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize()
      }
    }, [chartRef])

    useEffect(() => {
      if (!canUseDOM) return

      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [handleResize, canUseDOM])

    return (
      <div data-sl-chart>
        <ReactECharts
          ref={useMergeRef(ref, chartRef)}
          // ref={chartRef}
          theme={theme}
          option={chartOptions}
          style={{ minWidth: 300, minHeight: 200, padding: 20, ...style }}
          opts={{
            renderer: renderer,
          }}
          showLoading={loading}
          loadingOption={loadingConfig}
          // onChartReady={(instance) => instance.resize()}
          onEvents={{
            legendselectchanged: checkBoxLegend,
            ...onEvents,
          }}
          {...otherProps}
        />
      </div>
    )
  }
)
export interface ChartOptions {
  /**
   * Configs containing **type** of chart and its **variants**, each variant is a pre-defined chart style for each type.
   *
   * **null** means that nothing will be done to the options, and the chart will be rendered as-is.
   * @example { type:"line", variant: "default" }
   */
  chartConfig: ChartConfig | null
  /**
   * Echarts options for the chart, see [docs](https://echarts.apache.org/en/option.html#title).
   *
   * Includes the data that the chart will use and more advanced or specific configuration.
   */
  option: EChartsOption
  /**
   * **Pure** functions that will be run on the series before the default styles are applied, in addition to any default hooks that may be applied per chart type.
   *
   * These functions should receive a **SeriesOptions** or one of the more specific versions, e.g. **BarSeriesOption** or **LineSeriesOption** and return the same.
   *
   * If set to null no default hooks will be applied.
   *
   * @example seriesHooks: [
      (series: BarSeriesOption) => { return { ...series, itemStyle: { ...series.itemStyle, color: '#ff1234' } }}
    ] // paints all bars in a bright red color, while making sure to preserve all of it's options.
   */
  seriesHooks?: ((series: any) => echarts.SeriesOption)[] | null
  /**
   * Whether to render the chart as a SVG or Canvas. Both are about equally as fast,
   * but SVGs have 'perfect' image quality.
   *
   * Canvas is required if the chart is meant to be downloaded as a png or jpg, as SVG-rendered charts can only be exported as SVG.
   * @default svg
   */
  renderer?: 'svg' | 'canvas'
  /**
   * Overrides default shoreline theme.
   * @default defaultTheme
   */
  theme?: Dictionary<any> | string
  /**
   * Wether is loading.
   * @default false
   */
  loading?: boolean
  /**
   * Echarts showLoading options, see [docs]("https://echarts.apache.org/en/api.html#echartsInstance.showLoading).
   * @default false
   */
  loadingConfig?: EChartsInstance['showLoading']
  /**
   * Binds callback functions to certain events, see [docs](https://echarts.apache.org/en/api.html#events)
   * for a complete list of available events and their parameters.
   */
  onEvents?: Record<string, CallableFunction>
}

export type ChartProps = ChartOptions & ComponentPropsWithRef<'div'>
