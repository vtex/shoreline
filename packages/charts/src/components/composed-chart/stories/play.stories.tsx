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
      option={(tokens: ChartTokens, width: number) =>
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
          width,
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

const website = [2300, 2900, 2500, 3400, 3100, 3800]
const marketplace = [1200, 1400, 1500, 1800, 1900, 2200]
const physicalStore = [700, 800, 800, 1100, 900, 1200]

// Only the projected categories carry a forecast, aligned with the categories
// the history covers.
const forecast = [null, null, null, null, 2.6, null]

// The story's render and play share the instance through this module-scoped
// ref: the engine instance can't ride the DOM (FR-002 keeps it off the public
// component), so the render fills it and play reads it.
const stackTooltipChartRef: MutableRefObject<EChartsType | null> = {
  current: null,
}

/**
 * Hovering a stacked composed chart closes the bar rows with the stack's
 * total — a virtual row with no series of its own, so no swatch — and the
 * lines drawn after the bars keep their own rows and stay out of the sum. A
 * forecast's row wears its dashed swatch, matching the dashed line.
 *
 * Goes through `ChartContainer` + `chartRef` rather than the public component
 * because the engine instance is deliberately not exposed to consumers
 * (FR-002) — the internal container's `chartRef` is the test seam.
 */
export function TooltipTotalsTheStack() {
  return (
    // The container fills its parent, so the story gives it the height the
    // composed chart's own stylesheet would: an unsized one collapses.
    <div style={{ height: '20rem' }}>
      <ChartContainer
        chartRef={stackTooltipChartRef}
        option={(tokens: ChartTokens) =>
          buildComposedOption({
            series: [
              { type: 'bar', name: 'Website', data: website },
              { type: 'bar', name: 'Marketplace', data: marketplace },
              { type: 'bar', name: 'Physical store', data: physicalStore },
              {
                type: 'line',
                name: 'Conversion',
                data: conversion,
                unit: 'percentage',
              },
              {
                type: 'line',
                name: 'Forecast',
                data: forecast,
                variant: 'forecast',
                // The unit is per series: a forecast continuing a percentage
                // line states it too, so it lands on the same axis.
                unit: 'percentage',
              },
            ],
            categories: months,
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

TooltipTotalsTheStack.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement
}) => {
  const container = canvasElement.querySelector('[data-sl-chart-container]')
  expect(container).toBeInTheDocument()

  // Wait for the engine to finish its initial render before pointing.
  await waitFor(() => {
    expect(container?.querySelector('svg')).toBeInTheDocument()
    expect(stackTooltipChartRef.current).not.toBeNull()
  })

  // Point at the first projected category, so the forecast has a row of its
  // own — the seam category duplicates the history's last value instead.
  stackTooltipChartRef.current?.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: 4,
  })

  await waitFor(() => {
    const tooltip = document.querySelector('[data-sl-chart-tooltip]')
    expect(tooltip).toBeInTheDocument()

    const labels = Array.from(
      tooltip?.querySelectorAll('[data-sl-chart-tooltip-row-label]') ?? []
    ).map((label) => label.textContent)

    // The bars read bottom-up, the total closes the group it sums, and the
    // lines keep their series order after it.
    expect(labels).toEqual([
      'Physical store',
      'Marketplace',
      'Website',
      'Total',
      'Conversion',
      'Forecast',
    ])
    // 3100 + 1900 + 900, written in the story's locale.
    expect(tooltip?.textContent).toContain('5,900')
    // The forecast's swatch is dashed like its line.
    expect(
      tooltip?.querySelector('[data-sl-chart-tooltip-row-line][data-dashed]')
    ).toBeInTheDocument()
  })
}
