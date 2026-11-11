import { BarChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <BarChart
      label="Orders by category"
      direction="horizontal"
      categories={['Electronics', 'Apparel', 'Home', 'Beauty', 'Sports']}
      series={[{ name: 'Orders', data: [840, 620, 410, 380, 250] }]}
    />
  )
}
