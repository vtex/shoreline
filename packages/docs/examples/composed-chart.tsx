import { ComposedChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <ComposedChart
      label="Revenue and conversion rate by month"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
      series={[
        {
          type: 'bar',
          name: 'Revenue',
          data: [4200, 5100, 4800, 6300, 5900, 7200],
        },
        {
          type: 'line',
          name: 'Conversion',
          unit: 'percentage',
          data: [2.1, 2.4, 2.2, 2.9, 2.7, 3.2],
        },
      ]}
    />
  )
}
