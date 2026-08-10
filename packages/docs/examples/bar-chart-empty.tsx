import { BarChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <BarChart
      label="Revenue by month"
      categories={[]}
      series={[]}
      messages={{ empty: 'No data for the selected period' }}
    />
  )
}
