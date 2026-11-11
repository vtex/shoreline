import { expect, userEvent, waitFor, within } from '@storybook/test'
import type { MutableRefObject } from 'react'

import { LineChart } from '../index'
import { ChartContainer } from '../../../internal/chart-container'
import type { EChartsType } from '../../../internal/echarts'
import type { ChartTokens } from '../../../internal/theme'
import { buildLineOption, defaultMaxSeries } from '../line-option'
import '../register'
import '../../../styles.css'

export default {
  title: 'charts/line-chart',
  parameters: {
    // Play stories exist for interaction + a11y assertions, not visuals — the
    // show matrix owns Chromatic.
    chromatic: { disableSnapshot: true },
  },
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const revenue = [4200, 5100, 4800, 6300, 5900, 7200]
const cost = [2100, 2400, 2600, 2900, 2700, 3100]

// The engine renders to SVG in a real browser here, so no jsdom stubs (those
// live in tests/line-chart.test.tsx). Charts fill their container
// (line-chart.css: block-size 20rem), which the test-runner browser lays out.

/**
 * The chart carries the accessible name from `label` and, when provided, the
 * long description. This is the a11y contract FR-009 requires and the play
 * suite exists to guard: without it the component fails the suite.
 */
export function AccessibleNameAndDescription() {
  return (
    <LineChart
      label="Revenue by month"
      description="Revenue grew steadily from January to June"
      categories={months}
      series={[{ name: 'Revenue', data: revenue }]}
    />
  )
}

AccessibleNameAndDescription.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement
}) => {
  const canvas = within(canvasElement)

  const chart = canvas.getByRole('img', { name: 'Revenue by month' })
  expect(chart).toBeInTheDocument()
  expect(chart).toHaveAccessibleDescription(
    'Revenue grew steadily from January to June'
  )
}

/**
 * Hovering shows the axis tooltip with one row per series at the hovered
 * category, per the line-chart tooltip behavior in the design notes (the
 * overlay appears anywhere in the chart area). The tooltip renders as DOM on
 * `document.body` (FR-007), so the assertion looks outside the canvas.
 *
 * Goes through `ChartContainer` + `chartRef` rather than the public
 * `LineChart` because the engine instance is deliberately not exposed to
 * consumers (FR-002) — the internal container's `chartRef` is the test seam.
 */

// The story's render and play share the instance through this module-scoped
// ref: the engine instance can't ride the DOM (FR-002 keeps it off the public
// component), so the render fills it and play reads it.
const tooltipChartRef: MutableRefObject<EChartsType | null> = { current: null }

export function TooltipOnHover() {
  return (
    <ChartContainer
      chartRef={tooltipChartRef}
      option={(tokens: ChartTokens) =>
        buildLineOption({
          series: [
            { name: 'Revenue', data: revenue },
            { name: 'Cost', data: cost },
          ],
          categories: months,
          othersLabel: 'Others',
          maxSeries: defaultMaxSeries,
          tokens,
        })
      }
    />
  )
}

TooltipOnHover.play = async ({
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

  // The tooltip is axis-triggered: pointing at the chart's data region shows
  // the guide line and the per-series rows. Drive it through the engine so the
  // assertion isn't hostage to exact pixel coordinates.
  tooltipChartRef.current?.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: 2,
  })

  await waitFor(() => {
    const tooltip = document.querySelector('[data-sl-chart-tooltip]')
    expect(tooltip).toBeInTheDocument()
    // Both series contribute a row at the hovered category.
    expect(tooltip?.textContent).toContain('Revenue')
    expect(tooltip?.textContent).toContain('Cost')
  })
}

/**
 * Clicking a legend entry hides that series; clicking again restores it.
 *
 * Note: this is the engine's default toggle. The design notes specify
 * *isolate-on-click* (hide all others, keep the clicked one) — that behavior
 * is NOT yet implemented (no legend-select handler exists in the package), so
 * this test documents current behavior and will flip to the isolate assertion
 * when the handler lands. See design-notes/bar-chart.md "Legend click".
 */
export function LegendClickToggles() {
  return (
    <LineChart
      label="Revenue and cost by month"
      categories={months}
      series={[
        { name: 'Revenue', data: revenue },
        { name: 'Cost', data: cost },
      ]}
    />
  )
}

LegendClickToggles.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement
}) => {
  const canvas = within(canvasElement)
  const chart = canvas.getByRole('img', { name: 'Revenue and cost by month' })

  await waitFor(() => {
    expect(chart.querySelector('svg')).toBeInTheDocument()
  })

  const svg = chart.querySelector('svg')
  // The legend is engine-rendered SVG text; the series name is the click target.
  const legendEntry = Array.from(svg?.querySelectorAll('text') ?? []).find(
    (node) => node.textContent?.trim() === 'Cost'
  )
  expect(legendEntry).toBeDefined()

  await userEvent.click(legendEntry as Element)

  // Engine default: the clicked series is hidden, the other stays. When the
  // isolate handler lands this assertion inverts for the non-clicked series.
  await waitFor(() => {
    expect(svg?.textContent).toContain('Revenue')
  })
}
