import { BarChart } from '@vtex/shoreline-charts'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export default function Example() {
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
