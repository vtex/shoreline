import {
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
  type ComponentPropsWithRef,
  useCallback,
} from 'react'
import type { EChartsOption, SetOptionOpts } from 'echarts'
import ReactECharts from 'echarts-for-react'
import type * as echarts from 'echarts'

import { defaultTheme } from './theme/themes'
import type { ChartConfig } from './types/chart'
import { getChartOptions } from './utils/chart'
import { canUseDOM } from '@vtex/shoreline-utils'

/**
 * Render a Shoreline Chart with echarts
 * @see https://echarts.apache.org/en/index.html
 */
export const Chart = forwardRef<echarts.EChartsType | undefined, ChartProps>(
  function Charts(props, ref) {
    const {
      option,
      settings,
      loading = false,
      chartConfig,
      style,
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
      const { type, variant } = chartConfig
      return getChartOptions(option, type, variant) || option
    }, [option, chartConfig])

    const handleResize = useCallback(() => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize()
      }
    }, [])

    useEffect(() => {
      if (!canUseDOM) return

      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [handleResize, canUseDOM])

    if (loading) return <div>loading...</div>

    return (
      <div data-sl-chart {...otherProps}>
        <ReactECharts
          ref={chartRef}
          theme={defaultTheme}
          option={chartOptions}
          style={style}
          opts={{
            renderer: 'svg',
          }}
        />
      </div>
    )
  }
)

export interface ChartsOptions {
  /**
   * Echarts options
   */
  option: EChartsOption
  /**
   * Echarts settings
   */
  settings?: SetOptionOpts
  /**
   * Wether is loading
   * @default false
   */
  loading?: boolean
  /**
   * Configs containing type of chart and its variants, each variant is a pre-defined chart style for each type
   * @default default
   */
  chartConfig: ChartConfig
}

export type ChartProps = ChartsOptions & ComponentPropsWithRef<'div'>
