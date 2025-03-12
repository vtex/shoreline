import {
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
  type ComponentPropsWithRef,
  useCallback,
} from 'react'
import type { EChartsOption } from 'echarts'
import ReactECharts, { type EChartsInstance } from 'echarts-for-react'
import type * as echarts from 'echarts'

import { defaultTheme } from '../../theme/themes'
import type { ChartConfig } from '../../types/chart'
import { getChartOptions } from '../../utils/chart'
import { canUseDOM } from '@vtex/shoreline-utils'
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
      ...otherProps
    } = props

    const chartRef = useRef<ReactECharts>(null)

    useImperativeHandle(ref, () => {
      if (chartRef.current) {
        return chartRef.current.getEchartsInstance()
      }
      return undefined
    })

    const chartOptions: EChartsOption = useMemo(() => {
      if (chartConfig === 'multitype') return option
      const { type, variant } = chartConfig
      return getChartOptions(option, type, variant) || option
    }, [option, chartConfig])

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
          ref={chartRef}
          theme={theme}
          option={chartOptions}
          style={{ minWidth: 300, minHeight: 200, ...style }}
          opts={{
            renderer: renderer,
          }}
          showLoading={loading}
          loadingOption={loadingConfig}
          onChartReady={(instance) => instance.resize()}
          {...otherProps}
        />
      </div>
    )
  }
)
export interface ChartOptions {
  /**
   * Configs containing **type** of chart and its **variants**, each variant is a pre-defined chart style for each type.
   * @default default
   * @example {type:"bar", variant:"horizontal"}
   */
  chartConfig: ChartConfig | 'multitype'
  /**
   * Echarts options for the chart, see [docs](https://echarts.apache.org/en/option.html#title).
   *
   * Includes the data that the chart will use and more advanced or specific configuration.
   */
  option: EChartsOption
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
   * Wether is loading
   * @default false
   */
  loading?: boolean
  /**
   * Echarts showLoading options, see [docs]("https://echarts.apache.org/en/api.html#echartsInstance.showLoading)
   * @default false
   */
  loadingConfig?: EChartsInstance['showLoading']
}

export type ChartProps = ChartOptions & ComponentPropsWithRef<'div'>
