import { BarChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <BarChart
      label="Revenue by month"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
      series={[{ name: 'Revenue', data: [4200, 5100, 4800, 6300, 5900, 7200] }]}
    />
  )
}
