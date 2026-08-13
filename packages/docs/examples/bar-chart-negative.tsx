import { BarChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <BarChart
      label="Net result by month"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
      series={[
        { name: 'Net result', data: [1200, -400, 900, -1100, 300, 1800] },
      ]}
    />
  )
}
