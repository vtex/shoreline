import { LineChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <LineChart
      label="Revenue by month, with gaps where data is missing"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
      series={[{ name: 'Revenue', data: [4200, null, 4800, null, 5900, 7200] }]}
    />
  )
}
