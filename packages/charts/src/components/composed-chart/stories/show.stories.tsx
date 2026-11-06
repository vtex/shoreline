import type { ReactNode } from 'react'

import { LocaleProvider } from '@vtex/shoreline'

import type { ComposedChartBarSeries } from '../../../index'
import { ComposedChart } from '../index'
import '../../../styles.css'

export default {
  title: 'charts/composed-chart',
  parameters: {
    // The variant matrix IS the Chromatic baseline — snapshots stay on here,
    // unlike examples (dev sandbox) and play (interaction tests).
    //
    // `delay` waits out the engine's entrance animation. Chromatic pauses CSS
    // animations at their last frame by default, but the chart animates from
    // JavaScript (a requestAnimationFrame loop), so without this every capture
    // lands on a different frame and the story is reported as Unstable.
    chromatic: { disableSnapshot: false, delay: 2000 },
  },
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const revenue = [4200, 5100, 4800, 6300, 5900, 7200]
const cost = [2100, 2400, 2600, 2900, 2700, 3100]
const conversion = [2.1, 2.4, 2.3, 2.8, 2.6, 3.1]

const channels: ComposedChartBarSeries[] = [
  { type: 'bar', name: 'Website', data: [2300, 2900, 2500, 3400, 3100, 3800] },
  {
    type: 'bar',
    name: 'Marketplace',
    data: [1200, 1400, 1500, 1800, 1900, 2200],
  },
  {
    type: 'bar',
    name: 'Physical store',
    data: [700, 800, 800, 1100, 900, 1200],
  },
  { type: 'bar', name: 'Social', data: [300, 350, 400, 500, 450, 600] },
  { type: 'bar', name: 'Phone', data: [120, 140, 90, 200, 160, 180] },
]

function Section(props: { label: string; children: ReactNode }) {
  return (
    <div style={{ padding: '1rem 0', borderTop: '1px solid #e0e0e0' }}>
      <div style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
        {props.label}
      </div>
      {props.children}
    </div>
  )
}

/**
 * Every visual variant the design language defines for a composed chart,
 * stacked so Chromatic captures the whole matrix in one baseline. New visual
 * states get a new Section here (AGENTS.md: adding a visual state means adding
 * a row to show.stories).
 */
export function Show() {
  return (
    <div>
      <Section label="Default (bars + percentage line)">
        <ComposedChart
          label="Revenue and conversion rate by month"
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
      </Section>

      <Section label="Mixed units (percentage bars + number line)">
        <ComposedChart
          label="Conversion rate and traffic by month"
          categories={months}
          series={[
            {
              type: 'bar',
              name: 'Conversion',
              data: conversion,
              unit: 'percentage',
            },
            { type: 'line', name: 'Traffic', data: revenue },
          ]}
        />
      </Section>

      <Section label="Stacked bars with a line overlay">
        <ComposedChart
          label="Revenue, cost and conversion rate by month"
          grouping="stacked"
          categories={months}
          series={[
            { type: 'bar', name: 'Revenue', data: revenue },
            { type: 'bar', name: 'Cost', data: cost },
            {
              type: 'line',
              name: 'Conversion',
              data: conversion,
              unit: 'percentage',
            },
          ]}
        />
      </Section>

      <Section label="Aggregation (5 bars, default maxSeries; lines kept)">
        <ComposedChart
          label="Sales by channel and conversion"
          categories={months}
          series={[
            ...channels,
            {
              type: 'line',
              name: 'Conversion',
              data: conversion,
              unit: 'percentage',
            },
          ]}
        />
      </Section>

      <Section label="Loading">
        <ComposedChart
          label="Revenue and conversion rate by month"
          loading
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
      </Section>

      <Section label="Empty">
        <ComposedChart
          label="Revenue and conversion rate by month"
          categories={[]}
          series={[]}
        />
      </Section>

      <Section label="Localized (pt-BR)">
        <LocaleProvider locale="pt-BR">
          <ComposedChart
            label="Vendas por canal e conversão"
            categories={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']}
            series={[
              ...channels,
              {
                type: 'line',
                name: 'Conversão',
                data: conversion,
                unit: 'percentage',
              },
            ]}
          />
        </LocaleProvider>
      </Section>
    </div>
  )
}
