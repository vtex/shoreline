import { BarChart } from '../index'
import '../../../styles.css'

export default {
  title: 'charts/bar-chart',
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
    <BarChart
      label="Revenue by month"
      categories={months}
      series={[{ name: 'Revenue', data: revenue }]}
    />
  )
}

export function MultiSeries() {
  return (
    <BarChart
      label="Revenue and cost by month"
      categories={months}
      series={[
        { name: 'Revenue', data: revenue },
        { name: 'Cost', data: cost },
        { name: 'Profit', data: profit },
      ]}
    />
  )
}

export function Stacked() {
  return (
    <BarChart
      label="Sales by channel"
      grouping="stacked"
      categories={months}
      series={[
        { name: 'Website', data: [2300, 2900, 2500, 3400, 3100, 3800] },
        { name: 'Marketplace', data: [1200, 1400, 1500, 1800, 1900, 2200] },
        { name: 'Physical store', data: [700, 800, 800, 1100, 900, 1200] },
      ]}
    />
  )
}

export function GroupedIntoOthers() {
  return (
    <BarChart
      label="Sales by channel"
      grouping="stacked"
      categories={months}
      series={[
        { name: 'Website', data: [2300, 2900, 2500, 3400, 3100, 3800] },
        { name: 'Marketplace', data: [1200, 1400, 1500, 1800, 1900, 2200] },
        { name: 'Physical store', data: [700, 800, 800, 1100, 900, 1200] },
        // Beyond the third series, so both fold into "Others".
        { name: 'Social', data: [300, 350, 400, 500, 450, 600] },
        { name: 'Phone', data: [120, 140, 90, 200, 160, 180] },
      ]}
    />
  )
}

export function Horizontal() {
  return (
    <BarChart
      label="Orders by category"
      direction="horizontal"
      categories={['Electronics', 'Apparel', 'Home', 'Beauty', 'Sports']}
      series={[{ name: 'Orders', data: [840, 620, 410, 380, 250] }]}
    />
  )
}

export function NegativeValues() {
  return (
    <BarChart
      label="Net result by month"
      categories={months}
      series={[
        { name: 'Net result', data: [1200, -400, 900, -1100, 300, 1800] },
      ]}
    />
  )
}

export function StackedWithNegatives() {
  return (
    <BarChart
      label="Cash flow by month"
      grouping="stacked"
      categories={months}
      series={[
        { name: 'Inflow', data: [3200, 2900, 3500, 3400, 3100, 3800] },
        { name: 'Outflow', data: [-2100, -3400, -2600, -2900, -2700, -3100] },
        { name: 'Adjustments', data: [300, -200, 150, null, 250, -100] },
      ]}
    />
  )
}

export function Loading() {
  return (
    <BarChart
      label="Revenue by month"
      loading
      categories={months}
      series={[{ name: 'Revenue', data: revenue }]}
    />
  )
}

export function Empty() {
  return (
    <BarChart
      label="Revenue by month"
      categories={[]}
      series={[]}
      emptyLabel="No data for the selected period"
    />
  )
}
