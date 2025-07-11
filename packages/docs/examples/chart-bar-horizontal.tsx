import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'bar', variant: 'horizontal', gap: 3 }}
      yAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }}
      series={[
        { data: [1, 2, 3, 4, 5], name: 'Series 1' },
        { data: [1, 4, 2, 1, 4], name: 'Series 2' },
      ]}
      style={{ height: 400 }}
    />
  )
}
