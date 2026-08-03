import type { ComponentPropsWithoutRef, MutableRefObject } from 'react'
import { forwardRef, useEffect, useRef } from 'react'
import { useMergeRef } from '@vtex/shoreline-utils'

import type { EChartsCoreOption, EChartsType } from '../echarts'
import { init } from '../echarts'
import { createChartTheme, createElementTokens } from '../theme'

/**
 * Hosts an engine instance inside a Shoreline-styled element: initializes it
 * with the token-bridged theme, keeps it sized to the container, and disposes
 * it on unmount. All engine access happens inside effects, so rendering is
 * SSR-safe. Every public chart composes this container; it is never exported
 * from the package.
 */
export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  function ChartContainer(props, ref) {
    const { option, chartRef, ...htmlProps } = props

    const containerRef = useRef<HTMLDivElement>(null)
    const instanceRef = useRef<EChartsType | null>(null)

    useEffect(() => {
      const element = containerRef.current

      if (!element) return

      const chart = init(
        element,
        createChartTheme(createElementTokens(element)),
        { renderer: 'svg' }
      )

      instanceRef.current = chart

      const observer = new ResizeObserver(() => {
        chart.resize()
      })

      observer.observe(element)

      return () => {
        observer.disconnect()
        chart.dispose()
        instanceRef.current = null
      }
    }, [])

    useEffect(() => {
      if (chartRef) {
        chartRef.current = instanceRef.current
      }
    })

    useEffect(() => {
      instanceRef.current?.setOption(option, { notMerge: true })
    }, [option])

    return (
      <div
        data-sl-chart-container
        ref={useMergeRef(ref, containerRef)}
        {...htmlProps}
      />
    )
  }
)

export interface ChartContainerOptions {
  /**
   * Engine option applied to the instance. Replaces the previous option
   * entirely on every change, so charts derive it as a pure function of their
   * props.
   */
  option: EChartsCoreOption
  /**
   * Imperative access to the engine instance, for internal use in tests.
   */
  chartRef?: MutableRefObject<EChartsType | null>
}

export type ChartContainerProps = ChartContainerOptions &
  ComponentPropsWithoutRef<'div'>
