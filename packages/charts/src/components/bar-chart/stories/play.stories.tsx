import { expect, waitFor } from '@storybook/test'
import type { MutableRefObject } from 'react'

import { ChartContainer } from '../../../internal/chart-container'
import type { EChartsType } from '../../../internal/echarts'
import type { ChartTokens } from '../../../internal/theme'
import { buildBarOption, defaultMaxSeries } from '../bar-option'
import '../register'
import '../../../styles.css'

export default {
  title: 'charts/bar-chart',
  parameters: {
    // Play stories exist for interaction assertions, not visuals — the
    // tooltip's row model owns its own show story.
    chromatic: { disableSnapshot: true },
  },
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const channels = [
  { name: 'Website', data: [2300, 2900, 2500, 3400, 3100, 3800] },
  { name: 'Marketplace', data: [1200, 1400, 1500, 1800, 1900, 2200] },
  { name: 'Physical store', data: [700, 800, 800, 1100, 900, 1200] },
]

// The story's render and play share the instance through this module-scoped
// ref: the engine instance can't ride the DOM (FR-002 keeps it off the public
// component), so the render fills it and play reads it.
const tooltipChartRef: MutableRefObject<EChartsType | null> = { current: null }

/**
 * Hovering a stacked bar closes its rows with the stack's total — the one
 * number the reader cannot read off the chart, since every segment is sized
 * against the whole. The total is a virtual row: it has no series of its own,
 * so it draws no swatch, and it lands after the segments, which a vertical
 * stack lists bottom-up.
 *
 * Goes through `ChartContainer` + `chartRef` rather than the public `BarChart`
 * because the engine instance is deliberately not exposed to consumers
 * (FR-002) — the internal container's `chartRef` is the test seam.
 */
export function TooltipTotalsAStack() {
  return (
    // The container fills its parent, so the story gives it the height the
    // bar chart's own stylesheet would: an unsized one collapses to nothing.
    <div style={{ height: '20rem' }}>
      <ChartContainer
        chartRef={tooltipChartRef}
        option={(tokens: ChartTokens) =>
          buildBarOption({
            series: channels,
            categories: months,
            direction: 'vertical',
            grouping: 'stacked',
            othersLabel: 'Others',
            totalLabel: 'Total',
            locale: 'en-US',
            maxSeries: defaultMaxSeries,
            tokens,
          })
        }
      />
    </div>
  )
}

TooltipTotalsAStack.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement
}) => {
  const container = canvasElement.querySelector('[data-sl-chart-container]')
  expect(container).toBeInTheDocument()

  // Wait for the engine to finish its initial render before pointing.
  await waitFor(() => {
    expect(container?.querySelector('svg')).toBeInTheDocument()
    expect(tooltipChartRef.current).not.toBeNull()
  })

  // The tooltip is axis-triggered: drive it through the engine so the
  // assertion isn't hostage to exact pixel coordinates.
  tooltipChartRef.current?.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: 2,
  })

  await waitFor(() => {
    const tooltip = document.querySelector('[data-sl-chart-tooltip]')
    expect(tooltip).toBeInTheDocument()

    const labels = Array.from(
      tooltip?.querySelectorAll('[data-sl-chart-tooltip-row-label]') ?? []
    ).map((label) => label.textContent)

    // Bottom-up like the bar, then the total: 2500 + 1500 + 800, written in
    // the story's locale.
    expect(labels).toEqual([
      'Physical store',
      'Marketplace',
      'Website',
      'Total',
    ])
    expect(tooltip?.textContent).toContain('4,800')
  })
}
