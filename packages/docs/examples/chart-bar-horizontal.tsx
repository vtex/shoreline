import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'bar', variant: 'horizontal', gap: 1 }}
      yAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
      series={[
        { data: [1, 2, 3, 4, 5, 6, 7, 8], name: 'Series 0' },
        { data: [1, 4, 2, 1, 4, 3, 5, 9], name: 'Series 1' },
      ]}
    />
  )
}
