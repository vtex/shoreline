import { expect, waitFor, within } from '@storybook/test'
import type { MutableRefObject } from 'react'

import { ComposedChart } from '../index'
import { ChartContainer } from '../../../internal/chart-container'
import type { EChartsType } from '../../../internal/echarts'
import type { ChartTokens } from '../../../internal/theme'
import { buildComposedOption, defaultMaxSeries } from '../composed-option'
import '../register'
import '../../../styles.css'

export default {
  title: 'charts/composed-chart',
  parameters: {
    // Play stories exist for interaction + a11y assertions, not visuals — the
    // show matrix owns Chromatic.
    chromatic: { disableSnapshot: true },
  },
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const revenue = [4200, 5100, 4800, 6300, 5900, 7200]
const conversion = [2.1, 2.4, 2.3, 2.8, 2.6, 3.1]

// The engine renders to SVG in a real browser here, so no jsdom stubs (those
// live in tests/composed-chart.test.tsx). Charts fill their container
// (composed-chart.css: block-size 20rem), which the test-runner browser lays
// out.

/**
 * The chart carries the accessible name from `label` and, when provided, the
 * long description — the same a11y contract the shipped charts guard.
 */
export function AccessibleNameAndDescription() {
  return (
    <ComposedChart
      label="Revenue and conversion rate by month"
      description="Revenue grew while conversion held steady around 2.5%"
      categories={months}
      series={[
        { type: 'bar', name: 'Revenue', data: revenue },
        {
          type: 'line',
          name: 'Conversion',
          data: conversion,
          unit: 'percentage',
        },
      ]}
    />
  )
}

AccessibleNameAndDescription.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement
}) => {
  const canvas = within(canvasElement)

  const chart = canvas.getByRole('img', {
    name: 'Revenue and conversion rate by month',
  })

  expect(chart).toBeInTheDocument()
  expect(chart).toHaveAccessibleDescription(
    'Revenue grew while conversion held steady around 2.5%'
  )
}

/**
 * Hovering shows one tooltip row per series at the category, each formatted in
 * its own unit: plain numbers for the bars, a `%` suffix for the percentage
 * line. The tooltip renders as DOM on `document.body` (FR-007), so the
 * assertion looks outside the canvas.
 *
 * Goes through `ChartContainer` + `chartRef` rather than the public component
 * because the engine instance is deliberately not exposed to consumers
 * (FR-002) — the internal container's `chartRef` is the test seam.
 */

// The story's render and play share the instance through this module-scoped
// ref: the engine instance can't ride the DOM (FR-002 keeps it off the public
// component), so the render fills it and play reads it.
const tooltipChartRef: MutableRefObject<EChartsType | null> = { current: null }

export function TooltipShowsBothUnits() {
  return (
    <ChartContainer
      chartRef={tooltipChartRef}
      option={(tokens: ChartTokens) =>
        buildComposedOption({
          series: [
            { type: 'bar', name: 'Revenue', data: revenue },
            {
              type: 'line',
              name: 'Conversion',
              data: conversion,
              unit: 'percentage',
            },
          ],
          categories: months,
          grouping: 'grouped',
          othersLabel: 'Others',
          maxSeries: defaultMaxSeries,
          tokens,
        })
      }
    />
  )
}

TooltipShowsBothUnits.play = async ({
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
    // Both series contribute a row at the hovered category...
    expect(tooltip?.textContent).toContain('Revenue')
    expect(tooltip?.textContent).toContain('Conversion')
    // ...and the percentage line's row carries its unit.
    expect(tooltip?.textContent).toContain('%')
  })
}
