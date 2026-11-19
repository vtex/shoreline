import { ComposedChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <ComposedChart
      label="Revenue by channel and conversion rate"
      grouping="stacked"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
      series={[
        {
          type: 'bar',
          name: 'Website',
          data: [2300, 2900, 2500, 3400, 3100, 3800],
        },
        {
          type: 'bar',
          name: 'Marketplace',
          data: [1200, 1400, 1500, 1800, 1900, 2200],
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
