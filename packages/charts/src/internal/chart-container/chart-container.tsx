import type { ComponentPropsWithoutRef, MutableRefObject } from 'react'
import { forwardRef, useEffect, useRef } from 'react'
import { useMergeRef } from '@vtex/shoreline-utils'

import type { EChartsCoreOption, EChartsType } from '../echarts'
import { init } from '../echarts'
import type { ChartTokens } from '../theme'
import { createChartTheme, createElementTokens } from '../theme'

// A resize changes what fits on screen — marker density is measured in pixels —
// so the option is derived again once the layout settles. The observer fires on
// every frame of a drag, hence the wait.
const resizeSettleMs = 100

function applyOption(
  chart: EChartsType,
  element: HTMLElement,
  option: ChartContainerOptions['option']
) {
  const tokens = createElementTokens(element)
  const resolved =
    typeof option === 'function' ? option(tokens, element.clientWidth) : option

  chart.setOption(resolved, { notMerge: true })
}

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
    // Read by the resize handler, which outlives renders and must not
    // re-subscribe every time the option changes.
    const optionRef = useRef(option)

    useEffect(() => {
      const element = containerRef.current

      if (!element) return

      const chart = init(
        element,
        createChartTheme(createElementTokens(element)),
        { renderer: 'svg' }
      )

      instanceRef.current = chart

      let settledWidth = element.clientWidth
      let pending: ReturnType<typeof setTimeout> | undefined

      const observer = new ResizeObserver(() => {
        chart.resize()

        // Height-only resizes leave marker density untouched.
        const width = element.clientWidth

        if (width === settledWidth) return

        settledWidth = width

        clearTimeout(pending)
        pending = setTimeout(() => {
          if (chart.isDisposed()) return

          applyOption(chart, element, optionRef.current)
        }, resizeSettleMs)
      })

      observer.observe(element)

      return () => {
        clearTimeout(pending)
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
      const element = containerRef.current
      const chart = instanceRef.current

      if (!element || !chart) return

      optionRef.current = option
      applyOption(chart, element, option)
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
   * Engine option applied to the instance, or a function of the resolved
   * design tokens and the container width for options that depend on either —
   * token values per data item (e.g. sign-aware corner radii), or decisions
   * measured in pixels (e.g. marker density). Replaces the previous option
   * entirely on every change, and is derived again after a resize settles, so
   * charts derive it as a pure function of their props and the width.
   */
  option:
    | EChartsCoreOption
    | ((tokens: ChartTokens, width: number) => EChartsCoreOption)
  /**
   * Imperative access to the engine instance, for internal use in tests.
   */
  chartRef?: MutableRefObject<EChartsType | null>
}

export type ChartContainerProps = ChartContainerOptions &
  ComponentPropsWithoutRef<'div'>
