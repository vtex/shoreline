import type { ReactNode } from 'react'

import { LocaleProvider } from '@vtex/shoreline'

import { LineChart } from '../index'
import type { LineChartSeries } from '../../../index'
import '../../../styles.css'

export default {
  title: 'charts/line-chart/show',
  parameters: {
    // The variant matrix IS the Chromatic baseline — snapshots stay on here,
    // unlike examples (dev sandbox) and play (interaction tests).
    chromatic: { disableSnapshot: false },
  },
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const revenue = [4200, 5100, 4800, 6300, 5900, 7200]
const cost = [2100, 2400, 2600, 2900, 2700, 3100]
const profit = revenue.map((value, i) => value - (cost[i] ?? 0))

const channels: LineChartSeries[] = [
  { name: 'Website', data: [2300, 2900, 2500, 3400, 3100, 3800] },
  { name: 'Marketplace', data: [1200, 1400, 1500, 1800, 1900, 2200] },
  { name: 'Physical store', data: [700, 800, 800, 1100, 900, 1200] },
  { name: 'Social', data: [300, 350, 400, 500, 450, 600] },
  { name: 'Phone', data: [120, 140, 90, 200, 160, 180] },
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
 * Every visual variant the design language defines for a line chart, stacked
 * so Chromatic captures the whole matrix in one baseline. New visual states
 * get a new Section here (AGENTS.md: adding a visual state means adding a row
 * to show.stories).
 */
export function Show() {
  return (
    <div>
      <Section label="Single series">
        <LineChart
          label="Revenue by month"
          categories={months}
          series={[{ name: 'Revenue', data: revenue }]}
        />
      </Section>

      <Section label="Multi-series (legend shown)">
        <LineChart
          label="Revenue, cost and profit by month"
          categories={months}
          series={[
            { name: 'Revenue', data: revenue },
            { name: 'Cost', data: cost },
            { name: 'Profit', data: profit },
          ]}
        />
      </Section>

      <Section label="Smooth curves">
        <LineChart
          label="Revenue by month"
          categories={months}
          smooth
          series={[{ name: 'Revenue', data: revenue }]}
        />
      </Section>

      <Section label="Missing data (gaps, not interpolated)">
        <LineChart
          label="Revenue by month, with gaps"
          categories={months}
          series={[
            { name: 'Revenue', data: [4200, null, 4800, null, 5900, 7200] },
          ]}
        />
      </Section>

      <Section label="Negative values">
        <LineChart
          label="Net result by month"
          categories={months}
          series={[
            { name: 'Net result', data: [1200, -400, 900, -1100, 300, 1800] },
          ]}
        />
      </Section>

      <Section label="Series aggregation (5 series, default maxSeries)">
        <LineChart
          label="Sales by channel"
          categories={months}
          series={channels}
        />
      </Section>

      <Section label="Loading">
        <LineChart
          label="Revenue by month"
          loading
          categories={months}
          series={[{ name: 'Revenue', data: revenue }]}
        />
      </Section>

      <Section label="Empty">
        <LineChart label="Revenue by month" categories={[]} series={[]} />
      </Section>

      <Section label="Localized (pt-BR)">
        <LocaleProvider locale="pt-BR">
          <LineChart
            label="Vendas por canal"
            categories={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']}
            series={channels}
          />
        </LocaleProvider>
      </Section>
    </div>
  )
}
