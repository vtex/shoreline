import { describe, expect, render, test, vi } from '@vtex/shoreline-test-utils'
import { BarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import type { MutableRefObject } from 'react'
import { createRef } from 'react'

import type { EChartsCoreOption, EChartsType } from '../../echarts'
import { use } from '../../echarts'
import { ChartContainer } from '../chart-container'

// Charts register their own engine modules (see internal/echarts.ts); tests
// stand in for the public charts of later PRs.
use([BarChart, GridComponent])

class ResizeObserverStub {
  static instances: ResizeObserverStub[] = []

  readonly targets: Element[] = []

  constructor(readonly callback: ResizeObserverCallback) {
    ResizeObserverStub.instances.push(this)
  }

  observe(target: Element) {
    this.targets.push(target)
  }

  unobserve() {}

  disconnect() {}
}

vi.stubGlobal('ResizeObserver', ResizeObserverStub)

// jsdom does no layout, so give elements a size for the engine to render into
vi.spyOn(Element.prototype, 'clientWidth', 'get').mockReturnValue(400)
vi.spyOn(Element.prototype, 'clientHeight', 'get').mockReturnValue(300)

// jsdom has no canvas implementation; the engine only uses the 2d context to
// measure text, even when rendering to SVG.
vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
  font: '',
  measureText: (text: string) => ({ width: text.length * 8 }),
} as unknown as CanvasRenderingContext2D)

function chartRefStub(): MutableRefObject<EChartsType | null> {
  return { current: null }
}

const option: EChartsCoreOption = {
  xAxis: { type: 'category', data: ['A', 'B'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: [1, 2] }],
}

describe('chart-container', () => {
  test('renders the container element, forwarding ref and html props', () => {
    const ref = createRef<HTMLDivElement>()

    const { container } = render(
      <ChartContainer ref={ref} option={option} id="revenue" />
    )

    const element = container.querySelector('[data-sl-chart-container]')

    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute('id', 'revenue')
    expect(ref.current).toBe(element)
  })

  test('initializes the engine and applies the option', () => {
    const chartRef = chartRefStub()

    const { container } = render(
      <ChartContainer option={option} chartRef={chartRef} />
    )

    const applied = chartRef.current?.getOption()

    expect(applied?.series).toMatchObject([{ type: 'bar', data: [1, 2] }])
    expect(applied?.xAxis).toMatchObject([{ data: ['A', 'B'] }])
    expect(
      container.querySelector('[data-sl-chart-container] svg')
    ).toBeInTheDocument()
  })

  test('replaces the option when the prop changes', () => {
    const chartRef = chartRefStub()

    const { rerender } = render(
      <ChartContainer option={option} chartRef={chartRef} />
    )

    rerender(
      <ChartContainer
        option={{
          ...option,
          series: [{ type: 'bar', data: [3, 4] }],
        }}
        chartRef={chartRef}
      />
    )

    expect(chartRef.current?.getOption()?.series).toMatchObject([
      { type: 'bar', data: [3, 4] },
    ])
  })

  test('resizes the chart when the container resizes', () => {
    const chartRef = chartRefStub()

    const { container } = render(
      <ChartContainer option={option} chartRef={chartRef} />
    )

    const chart = chartRef.current

    if (!chart) throw new Error('chart was not initialized')

    const resize = vi.spyOn(chart, 'resize')
    const observer = ResizeObserverStub.instances.at(-1)

    expect(observer?.targets).toContain(
      container.querySelector('[data-sl-chart-container]')
    )

    observer?.callback([], observer as unknown as ResizeObserver)

    expect(resize).toHaveBeenCalled()
  })

  test('disposes the engine instance on unmount', () => {
    const chartRef = chartRefStub()

    const { unmount } = render(
      <ChartContainer option={option} chartRef={chartRef} />
    )

    const chart = chartRef.current

    if (!chart) throw new Error('chart was not initialized')

    unmount()

    expect(chart.isDisposed()).toBe(true)
  })
})
