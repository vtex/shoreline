import { LocaleProvider } from '@vtex/shoreline'

import type { ChartTooltipDelta } from '../../../index'
import { LineChart } from '../index'
import '../../../styles.css'

export default {
  title: 'charts/line-chart',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const revenue = [4200, 5100, 4800, 6300, 5900, 7200]
const cost = [2100, 2400, 2600, 2900, 2700, 3100]
const profit = revenue.map((value, i) => value - (cost[i] ?? 0))

export function Default() {
  return (
    <LineChart
      label="Revenue by month"
      categories={months}
      series={[{ name: 'Revenue', data: revenue }]}
    />
  )
}

export function MultiSeries() {
  return (
    <LineChart
      label="Revenue, cost and profit by month"
      categories={months}
      series={[
        { name: 'Revenue', data: revenue },
        { name: 'Cost', data: cost },
        { name: 'Profit', data: profit },
      ]}
    />
  )
}

const previousRevenue = [3900, 5300, 4800, 5500, 6100, 6400]
const complaints = [180, 140, 155, 120, 95, 70]
const previousComplaints = [160, 175, 130, 145, 130, 90]

/**
 * Formats one period-over-period change the way a consumer would: the value
 * carries whatever unit they want, `direction` follows the actual movement,
 * and `tone` says what that movement means — which is why the caller passes
 * `goodWhen` instead of it being inferred from the sign.
 */
function percentChange(
  current: number[],
  previous: number[],
  goodWhen: 'up' | 'down'
): Array<ChartTooltipDelta | null> {
  return current.map((value, index) => {
    const before = previous[index]

    // No comparable figure for this category, so its row shows no delta.
    if (before === undefined || before === 0) return null

    const change = ((value - before) / before) * 100

    if (change === 0) return { value: '0.0%', direction: 'flat' }

    const direction = change > 0 ? 'up' : 'down'

    return {
      value: `${Math.abs(change).toFixed(1)}%`,
      direction,
      tone: direction === goodWhen ? 'success' : 'critical',
    }
  })
}

/**
 * Hover a point: each tooltip row carries the change against the previous
 * period. The comparison data need not be plotted — `previousRevenue` is
 * nowhere on the chart, it only feeds `deltas`.
 */
export function WithDeltas() {
  return (
    <LineChart
      label="Revenue by month, compared with the previous period"
      categories={months}
      series={[
        {
          name: 'Revenue',
          data: revenue,
          deltas: percentChange(revenue, previousRevenue, 'up'),
        },
      ]}
    />
  )
}

/**
 * `direction` and `tone` are independent, so the same downward arrow can read
 * either way: revenue falling is critical, complaints falling is a success.
 * Only the consumer knows which, so neither is derived from the sign.
 */
export function DeltaToneIsTheConsumers() {
  return (
    <LineChart
      label="Revenue and complaints by month, compared with the previous period"
      categories={months}
      series={[
        {
          name: 'Revenue',
          data: revenue,
          deltas: percentChange(revenue, previousRevenue, 'up'),
        },
        {
          name: 'Complaints',
          data: complaints,
          deltas: percentChange(complaints, previousComplaints, 'down'),
        },
      ]}
    />
  )
}

/**
 * Deltas are per category and optional: only the first three months have a
 * comparable figure here, so the rest of the tooltips show plain values.
 */
export function PartialDeltas() {
  return (
    <LineChart
      label="Revenue by month, compared where data exists"
      categories={months}
      series={[
        {
          name: 'Revenue',
          data: revenue,
          deltas: percentChange(revenue, previousRevenue.slice(0, 3), 'up'),
        },
      ]}
    />
  )
}

const channels = [
  { name: 'Website', data: [2300, 2900, 2500, 3400, 3100, 3800] },
  { name: 'Marketplace', data: [1200, 1400, 1500, 1800, 1900, 2200] },
  { name: 'Physical store', data: [700, 800, 800, 1100, 900, 1200] },
  { name: 'Social', data: [300, 350, 400, 500, 450, 600] },
  { name: 'Phone', data: [120, 140, 90, 200, 160, 180] },
]

/**
 * Five series, default `maxSeries`: Website and Marketplace keep their names,
 * the other three fold into "Others" in the tertiary color.
 */
export function GroupedIntoOthers() {
  return (
    <LineChart label="Sales by channel" categories={months} series={channels} />
  )
}

/**
 * The same five series with aggregation opted out, so each gets its own color
 * from the extended palette.
 */
export function AllSeries() {
  return (
    <LineChart
      label="Sales by channel"
      categories={months}
      series={channels}
      maxSeries={5}
    />
  )
}

/**
 * Nine series against a `maxSeries` above the palette limit: five keep their
 * names, the remaining four still fold into "Others" so no data is dropped.
 */
export function BeyondTheLimit() {
  return (
    <LineChart
      label="Sales by channel"
      categories={months}
      maxSeries={99}
      series={Array.from({ length: 9 }, (_, i) => ({
        name: `Channel ${i + 1}`,
        data: months.map((_, month) => 400 + i * 120 + month * 60),
      }))}
    />
  )
}

export function NegativeValues() {
  return (
    <LineChart
      label="Net result by month"
      categories={months}
      series={[
        { name: 'Net result', data: [1200, -400, 900, -1100, 300, 1800] },
      ]}
    />
  )
}

/**
 * `null` values render as gaps: the line is not interpolated across the
 * missing months, per the design spec's missing-data rule.
 */
export function MissingData() {
  return (
    <LineChart
      label="Revenue by month, with gaps where data is missing"
      categories={months}
      series={[{ name: 'Revenue', data: [4200, null, 4800, null, 5900, 7200] }]}
    />
  )
}

export function Loading() {
  return (
    <LineChart
      label="Revenue by month"
      loading
      categories={months}
      series={[{ name: 'Revenue', data: revenue }]}
    />
  )
}

export function Empty() {
  return (
    <LineChart
      label="Revenue by month"
      categories={[]}
      series={[]}
      messages={{ empty: 'No data for the selected period' }}
    />
  )
}

/**
 * Internal messages — the empty state and the "Others" aggregate — localize from
 * the surrounding `LocaleProvider`. Data supplied through props is not
 * translated: series names and categories are the consumer's to localize.
 */
export function Localized() {
  return (
    <LocaleProvider locale="pt-BR">
      <LineChart
        label="Vendas por canal"
        categories={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']}
        series={channels}
      />
    </LocaleProvider>
  )
}
