import React, { useRef, useEffect, useMemo } from 'react'
import { init, getInstanceByDom } from 'echarts'
import type { ComponentPropsWithoutRef } from 'react'
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts'
import { defaultTheme } from './theme/themes'
import { getChartOptions } from './utils/chart'
import type { ChartTypes, ChartVariants } from './types/chart'

/**
 * Render a Shoreline Chart with echarts
 * @see https://echarts.apache.org/en/index.html
 */
export function Chart(props: ChartProps) {
  const {
    option,
    settings,
    loading,
    variant = 'default',
    type,
    ...otherProps
  } = props

  const chartRef = useRef<HTMLDivElement>(null)

  const chartOptions: EChartsOption = useMemo(() => {
    return getChartOptions(option, type, variant) || option
  }, [option, type, variant])

  useEffect(
    /**
     * Initializes echarts instance
     */
    function initChart() {
      // Initialize chart
      let chart: ECharts | undefined

      if (chartRef.current !== null) {
        chart = init(chartRef.current, defaultTheme)
      }

      // Add chart resize listener
      // ResizeObserver is leading to a bit janky UX
      function resizeChart() {
        chart?.resize()
      }

      window.addEventListener('resize', resizeChart)

      // Return cleanup function
      return () => {
        chart?.dispose()
        window.removeEventListener('resize', resizeChart)
      }
    },
    [defaultTheme]
  )

  useEffect(
    /**
     * Whenever theme changes we need to add option and setting
     * due to it being deleted in cleanup function
     */
    function optionEffect() {
      // Update chart
      if (!chartRef.current) return

      const chart = getInstanceByDom(chartRef.current)

      if (chart) {
        chart.setOption(chartOptions, settings)
      }
    },
    [settings, defaultTheme, chartOptions]
  )

  useEffect(
    /**
     * React to loading state
     */
    function loadingEffect() {
      if (!chartRef.current) return

      const chart = getInstanceByDom(chartRef.current)

      if (!chart) return

      if (loading) {
        chart.showLoading()
      } else {
        chart.hideLoading()
      }
    },
    [loading, defaultTheme]
  )

  return <div data-sl-chart ref={chartRef} {...otherProps} />
}

export interface ChartOptions {
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
   */
  variant?: ChartVariants
}

export type ChartProps = ChartOptions & ComponentPropsWithoutRef<'div'>
