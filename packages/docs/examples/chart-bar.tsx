import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'bar', variant: 'vertical' }}
      xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
      series={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
    />
  )
}
