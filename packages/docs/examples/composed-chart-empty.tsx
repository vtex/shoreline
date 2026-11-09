import { ComposedChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <ComposedChart
      label="Revenue and conversion rate by month"
      categories={[]}
      series={[]}
      messages={{ empty: 'No data for the selected period' }}
    />
  )
}
