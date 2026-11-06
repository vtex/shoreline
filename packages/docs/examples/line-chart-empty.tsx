import { LineChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <LineChart
      label="Revenue by month"
      categories={[]}
      series={[]}
      messages={{ empty: 'No data for the selected period' }}
    />
  )
}
