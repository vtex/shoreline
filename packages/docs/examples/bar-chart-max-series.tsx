import { BarChart } from '@vtex/shoreline-charts'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const channels = [
  { name: 'Website', data: [2300, 2900, 2500, 3400, 3100, 3800] },
  { name: 'Marketplace', data: [1200, 1400, 1500, 1800, 1900, 2200] },
  { name: 'Physical store', data: [700, 800, 800, 1100, 900, 1200] },
  { name: 'Social', data: [300, 350, 400, 500, 450, 600] },
  { name: 'Phone', data: [120, 140, 90, 200, 160, 180] },
]

export default function Example() {
  return (
    <BarChart
      label="Sales by channel"
      grouping="stacked"
      categories={months}
      series={channels}
      maxSeries={5}
    />
  )
}
