import { ComposedChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <ComposedChart
      label="Revenue, refunds and conversion rate"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
      series={[
        {
          type: 'bar',
          name: 'Revenue',
          data: [4200, 5100, 4800, 6300, 5900, 7200],
        },
        {
          type: 'bar',
          name: 'Refunds',
          data: [-900, -1200, -800, -1400, -1100, -700],
        },
        {
          type: 'line',
          name: 'Conversion',
          unit: 'percentage',
          data: [2.1, 2.4, 2.3, 2.8, 2.6, 3.1],
        },
      ]}
    />
  )
}
