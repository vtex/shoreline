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
import type { ChartTypes, ChartVariants } from './types/chart'
import { getChartOptions } from './utils/chart'

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
      variant = 'default',
      type,
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
      return getChartOptions(option, type, variant) || option
    }, [option, type, variant])

    const handleResize = useCallback(() => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize()
      }
    }, [])

    useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [handleResize])

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
   */
  loading?: boolean
  /**
   * Chart type to be rendered
   */
  type: ChartTypes
  /**
   * Pre-defined chart style for each type
   * @default default
   */
  variant?: ChartVariants
}

export type ChartProps = ChartsOptions & ComponentPropsWithRef<'div'>
